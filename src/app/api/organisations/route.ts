import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

// Create admin client for server-side operations
function getAdminClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const gemeente = searchParams.get("gemeente");
    const postcode = searchParams.get("postcode");

    const supabase = getAdminClient();

    let query = supabase
      .from("organisations")
      .select(
        `
        id,
        name,
        slug,
        gemeente,
        estimated_wait_days,
        is_verified,
        nvvk_member,
        description
      `
      )
      .eq("is_verified", true)
      .eq("is_active", true);

    // Filter by gemeente if provided
    if (gemeente) {
      query = query.eq("gemeente", gemeente);
    }

    // Filter by postcode prefix if provided (and no gemeente)
    if (postcode && !gemeente) {
      const postcodePrefix = postcode.substring(0, 2);
      query = query.like("postcode", `${postcodePrefix}%`);
    }

    const { data: organisations, error } = await query.order("name");

    if (error) {
      console.error("Error fetching organisations:", error);
      return NextResponse.json(
        { error: "Er ging iets mis bij het ophalen van organisaties" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      organisations: organisations || [],
    });
  } catch (error) {
    console.error("Error in organisations API:", error);
    return NextResponse.json(
      { error: "Er ging iets mis. Probeer het later opnieuw." },
      { status: 500 }
    );
  }
}
