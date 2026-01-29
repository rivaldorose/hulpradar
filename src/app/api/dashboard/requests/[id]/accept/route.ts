import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: helpRequestId } = await params;
    const supabase = getAdminClient();

    // Get the body for optional note
    const body = await request.json().catch(() => ({}));
    const { note, organisation_id } = body;

    if (!organisation_id) {
      return NextResponse.json(
        { error: "Organisation ID is required" },
        { status: 400 }
      );
    }

    // Find the match
    const { data: match, error: matchError } = await supabase
      .from("matches")
      .select("id, status")
      .eq("help_request_id", helpRequestId)
      .eq("organisation_id", organisation_id)
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
