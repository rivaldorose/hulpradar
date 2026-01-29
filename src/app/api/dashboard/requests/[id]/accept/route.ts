import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: helpRequestId } = await params;
    const supabase = await createClient();

    // Check authentication
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
    }

    // Get user's organisation
    const { data: orgUser } = await supabase
      .from("organisation_users")
      .select("organisation_id")
      .eq("user_id", user.id)
      .single();

    if (!orgUser) {
      return NextResponse.json(
        { error: "Geen organisatie gevonden" },
        { status: 403 }
      );
    }

    // Get the body for optional note
    const body = await request.json().catch(() => ({}));
    const { note } = body;

    // Find the match
    const { data: match, error: matchError } = await supabase
      .from("matches")
      .select("id, status")
      .eq("help_request_id", helpRequestId)
      .eq("organisation_id", orgUser.organisation_id)
      .single();

    if (matchError || !match) {
      return NextResponse.json(
        { error: "Match niet gevonden" },
        { status: 404 }
      );
    }

    if (match.status !== "pending") {
      return NextResponse.json(
        { error: "Deze aanvraag is al beantwoord" },
        { status: 400 }
      );
    }

    // Update the match to accepted
    const { error: updateError } = await supabase
      .from("matches")
      .update({
        status: "accepted",
        responded_at: new Date().toISOString(),
        response_note: note || null,
      })
      .eq("id", match.id);

    if (updateError) {
      console.error("Error updating match:", updateError);
      return NextResponse.json(
        { error: "Kon aanvraag niet accepteren" },
        { status: 500 }
      );
    }

    // Update help request status
    await supabase
      .from("help_requests")
      .update({ status: "accepted" })
      .eq("id", helpRequestId);

    // Update organisation capacity
    await supabase.rpc("increment_capacity", {
      org_id: orgUser.organisation_id,
    }).catch(() => {
      // If RPC doesn't exist, do manual update
      return supabase
        .from("organisations")
        .update({
          current_capacity: supabase.rpc("coalesce", {
            value: "current_capacity + 1",
            default: 1,
          }),
        })
        .eq("id", orgUser.organisation_id);
    });

    // TODO: Create conversation for chat
    // TODO: Send notification to help seeker

    return NextResponse.json({
      success: true,
      message: "Aanvraag geaccepteerd",
    });
  } catch (error) {
    console.error("Error accepting request:", error);
    return NextResponse.json(
      { error: "Er ging iets mis" },
      { status: 500 }
    );
  }
}
