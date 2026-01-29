import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Create admin client for server-side operations
function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

interface MatchWithOrg {
  id: string;
  status: string;
  priority: number;
  responded_at: string | null;
  organisation_id: string;
  organisations: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    website: string | null;
    gemeente: string;
    estimated_wait_days: number;
    is_verified: boolean;
  } | null;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = getAdminClient();

    // Get the help request
    const { data: helpRequest, error: helpRequestError } = await supabase
      .from("help_requests")
      .select("*")
      .eq("id", id)
      .single();

    if (helpRequestError || !helpRequest) {
      return NextResponse.json(
        { error: "Aanvraag niet gevonden" },
        { status: 404 }
      );
    }

    // Get matches with organisation details
    const { data: matches, error: matchesError } = await supabase
      .from("matches")
      .select(
        `
        id,
        status,
        priority,
        responded_at,
        organisation_id,
        organisations (
          id,
          name,
          email,
          phone,
          website,
          gemeente,
          estimated_wait_days,
          is_verified
        )
      `
      )
      .eq("help_request_id", id)
      .order("priority", { ascending: true });

    if (matchesError) {
      console.error("Error fetching matches:", matchesError);
    }

    // Format the response
    const formattedMatches = ((matches || []) as unknown as MatchWithOrg[]).map((match) => {
      const org = match.organisations;

      return {
        id: match.id,
        status: match.status,
        responded_at: match.responded_at,
        organisation: {
          name: org?.name || "Onbekend",
          email: match.status === "accepted" ? org?.email || "" : "",
          phone: match.status === "accepted" ? org?.phone : null,
          website: match.status === "accepted" ? org?.website : null,
          gemeente: org?.gemeente || "",
          estimated_wait_days: org?.estimated_wait_days || 14,
          is_verified: org?.is_verified || false,
        },
      };
    });

    return NextResponse.json({
      id: helpRequest.id,
      status: helpRequest.status,
      name: helpRequest.name,
      gemeente: helpRequest.gemeente,
      created_at: helpRequest.created_at,
      matches: formattedMatches,
    });
  } catch (error) {
    console.error("Error in status API:", error);
    return NextResponse.json(
      { error: "Er ging iets mis. Probeer het later opnieuw." },
      { status: 500 }
    );
  }
}
