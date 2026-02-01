import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: helpRequestId } = await params;
    const cookieStore = await cookies();

    // Create authenticated client
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll() {
            // Read-only in route handler
          },
        },
      }
    );

    // Check authentication
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Niet ingelogd" },
        { status: 401 }
      );
    }

    // Get user's organisation
    const { data: orgUser } = await supabase
      .from("organisation_users")
      .select("organisation_id")
      .eq("user_id", user.id)
      .single();

    if (!orgUser) {
      return NextResponse.json(
        { error: "Niet gekoppeld aan een organisatie" },
        { status: 403 }
      );
    }

    // Use service role for full access to help request data
    const { createClient } = await import("@supabase/supabase-js");
    const adminClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Get the help request
    const { data: helpRequest, error: hrError } = await adminClient
      .from("help_requests")
      .select("*")
      .eq("id", helpRequestId)
      .single();

    if (hrError || !helpRequest) {
      return NextResponse.json(
        { error: "Aanvraag niet gevonden" },
        { status: 404 }
      );
    }

    // Get the match for this organisation
    const { data: match } = await adminClient
      .from("matches")
      .select("*")
      .eq("help_request_id", helpRequestId)
      .eq("organisation_id", orgUser.organisation_id)
      .single();

    if (!match) {
      return NextResponse.json(
        { error: "Geen match gevonden voor jouw organisatie" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      helpRequest: {
        id: helpRequest.id,
        name: helpRequest.name,
        email: helpRequest.email,
        phone: helpRequest.phone,
        gemeente: helpRequest.gemeente,
        postcode: helpRequest.postcode,
        situation: helpRequest.situation,
        contact_preference: helpRequest.contact_preference,
        status: helpRequest.status,
        created_at: helpRequest.created_at,
      },
      match: {
        id: match.id,
        status: match.status,
        priority: match.priority,
        expires_at: match.expires_at,
        responded_at: match.responded_at,
        response_note: match.response_note,
        organisation_id: match.organisation_id,
      },
    });
  } catch (error) {
    console.error("Error in aanvraag detail API:", error);
    return NextResponse.json(
      { error: "Er ging iets mis" },
      { status: 500 }
    );
  }
}
