import type { Organisation } from "@/types/database";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

// Create admin client for server-side operations
function getAdminClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

interface MatchScore {
  organisation: Organisation;
  score: number;
}

/**
 * Calculate a score for an organisation based on various factors
 */
function calculateScore(org: Organisation): number {
  let score = 100;

  // Lower wait time = higher score (max 30 points reduction)
  score -= Math.min(org.estimated_wait_days * 2, 30);

  // More capacity = higher score (max 20 points bonus)
  const capacityPercent =
    (org.max_capacity - org.current_capacity) / org.max_capacity;
  score += capacityPercent * 20;

  // NVVK member bonus
  if (org.nvvk_member) score += 10;

  // Verified bonus (should always be true for matched orgs, but extra safety)
  if (org.is_verified) score += 5;

  return score;
}

/**
 * Find matching organisations for a help request
 */
export async function findMatches(
  gemeente: string,
  postcode: string
): Promise<Organisation[]> {
  const supabase = getAdminClient();

  // 1. Find organisations in the same gemeente
  const { data: localMatches, error: localError } = await supabase
    .from("organisations")
    .select("*")
    .eq("gemeente", gemeente)
    .eq("is_verified", true)
    .eq("is_active", true);

  if (localError) {
    console.error("Error finding local matches:", localError);
    throw new Error("Failed to find matching organisations");
  }

  // Filter for organisations with capacity
  let matches = (localMatches || []).filter(
    (org) => org.current_capacity < org.max_capacity
  );

  // 2. If we have less than 3 matches, try to find nearby organisations
  if (matches.length < 3) {
    // Get first 4 digits of postcode for regional search
    const postcodePrefix = postcode.substring(0, 2);

    const { data: nearbyMatches, error: nearbyError } = await supabase
      .from("organisations")
      .select("*")
      .neq("gemeente", gemeente) // Exclude already matched gemeente
      .like("postcode", `${postcodePrefix}%`) // Same region
      .eq("is_verified", true)
      .eq("is_active", true);

    if (!nearbyError && nearbyMatches) {
      const filteredNearby = nearbyMatches.filter(
        (org) => org.current_capacity < org.max_capacity
      );
      matches = [...matches, ...filteredNearby];
    }
  }

  // 3. If still no matches, get any available organisations (province-wide)
  if (matches.length === 0) {
    const { data: anyMatches, error: anyError } = await supabase
      .from("organisations")
      .select("*")
      .eq("is_verified", true)
      .eq("is_active", true)
      .limit(10);

    if (!anyError && anyMatches) {
      matches = anyMatches.filter(
        (org) => org.current_capacity < org.max_capacity
      );
    }
  }

  // 4. Score and sort matches
  const scoredMatches: MatchScore[] = matches.map((org) => ({
    organisation: org,
    score: calculateScore(org),
  }));

  scoredMatches.sort((a, b) => b.score - a.score);

  // 5. Return top 4 matches
  return scoredMatches.slice(0, 4).map((m) => m.organisation);
}

/**
 * Create matches for a help request
 */
export async function createMatches(
  helpRequestId: string,
  organisations: Organisation[]
): Promise<void> {
  const supabase = getAdminClient();

  const matchInserts = organisations.map((org, index) => ({
    help_request_id: helpRequestId,
    organisation_id: org.id,
    priority: index + 1, // Priority based on score ranking
    status: "pending" as const,
    expires_at: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(), // 48 hours
  }));

  const { error } = await supabase.from("matches").insert(matchInserts);

  if (error) {
    console.error("Error creating matches:", error);
    throw new Error("Failed to create matches");
  }
}
