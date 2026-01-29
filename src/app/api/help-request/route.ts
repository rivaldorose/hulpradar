import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import type { Database, HelpRequestInsert } from "@/types/database";
import { findMatches, createMatches } from "@/lib/matching";

// Create admin client for server-side operations
function getAdminClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      phone,
      contact_preference,
      postcode,
      gemeente,
      source = "website",
      source_organisation_id,
      konsensi_user_id,
    } = body;

    // Validation
    if (!name || !postcode || !gemeente) {
      return NextResponse.json(
        { error: "Naam, postcode en gemeente zijn verplicht" },
        { status: 400 }
      );
    }

    // Validate contact preference and corresponding field
    if (contact_preference === "email" && !email) {
      return NextResponse.json(
        { error: "E-mailadres is verplicht voor e-mail contact" },
        { status: 400 }
      );
    }

    if (contact_preference === "sms" && !phone) {
      return NextResponse.json(
        { error: "Telefoonnummer is verplicht voor SMS contact" },
        { status: 400 }
      );
    }

    const supabase = getAdminClient();

    // Create the help request
    const helpRequestData: HelpRequestInsert = {
      name,
      email: email || null,
      phone: phone || null,
      contact_preference: contact_preference || "email",
      postcode: postcode.toUpperCase().replace(/\s/g, ""),
      gemeente,
      source,
      source_organisation_id: source_organisation_id || null,
      konsensi_user_id: konsensi_user_id || null,
      status: "matching",
    };

    const { data: helpRequest, error: insertError } = await supabase
      .from("help_requests")
      .insert(helpRequestData)
      .select()
      .single();

    if (insertError || !helpRequest) {
      console.error("Error creating help request:", insertError);
      return NextResponse.json(
        { error: "Er ging iets mis bij het aanmaken van je aanvraag" },
        { status: 500 }
      );
    }

    // Find matching organisations
    let matchedOrganisations;
    try {
      matchedOrganisations = await findMatches(gemeente, postcode);
    } catch (matchError) {
      console.error("Error finding matches:", matchError);
      // Still return success - we can find matches later
      matchedOrganisations = [];
    }

    // Create matches if we found organisations
    if (matchedOrganisations.length > 0) {
      try {
        await createMatches(helpRequest.id, matchedOrganisations);

        // Update help request status to matched
        await supabase
          .from("help_requests")
          .update({
            status: "matched",
            matched_at: new Date().toISOString(),
          })
          .eq("id", helpRequest.id);
      } catch (createMatchError) {
        console.error("Error creating matches:", createMatchError);
      }
    } else {
      // No matches found - keep as pending
      await supabase
        .from("help_requests")
        .update({ status: "pending" })
        .eq("id", helpRequest.id);
    }

    // TODO: Send notification emails to matched organisations
    // TODO: Send confirmation email to help seeker

    return NextResponse.json({
      success: true,
      help_request_id: helpRequest.id,
      matches_count: matchedOrganisations.length,
      message:
        matchedOrganisations.length > 0
          ? `We hebben ${matchedOrganisations.length} organisaties gevonden. Je ontvangt bericht zodra er een match is.`
          : "Je aanvraag is ontvangen. We zoeken naar organisaties in jouw regio.",
    });
  } catch (error) {
    console.error("Error in help request API:", error);
    return NextResponse.json(
      { error: "Er ging iets mis. Probeer het later opnieuw." },
      { status: 500 }
    );
  }
}
