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

    // Get the body for optional reason
    const body = await request.json().catch(() => ({}));
    const { reason, organisation_id } = body;

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

    // Update the match to rejected
    const { error: updateError } = await supabase
      .from("matches")
      .update({
        status: "rejected",
        responded_at: new Date().toISOString(),
        response_note: reason || null,
      })
      .eq("id", match.id);

    if (updateError) {
      console.error("Error updating match:", updateError);
      return NextResponse.json(
        { error: "Kon aanvraag niet afwijzen" },
        { status: 500 }
      );
    }

    // Check if there are other pending matches for this help request
    const { count } = await supabase
      .from("matches")
      .select("*", { count: "exact", head: true })
      .eq("help_request_id", helpRequestId)
      .eq("status", "pending");

    // If no more pending matches, update help request status
    if (count === 0) {
      await supabase
        .from("help_requests")
        .update({ status: "pending" }) // Back to pending to find new matches
        .eq("id", helpRequestId);
    }

    return NextResponse.json({
      success: true,
      message: "Aanvraag afgewezen",
    });
  } catch (error) {
    console.error("Error rejecting request:", error);
    return NextResponse.json(
      { error: "Er ging iets mis" },
      { status: 500 }
    );
  }
}
