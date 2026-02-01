import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { findMatches, createMatches } from "@/lib/matching";
import {
  sendConfirmationEmail,
  sendMatchFoundEmail,
  sendNewRequestToOrganisation,
} from "@/lib/email";

// Create admin client for server-side operations
function getAdminClient() {
  return createClient(
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
      situation,
      source = "website",
      source_organisation_id,
      konsensi_user_id,
    } = body;

    // Validation
    if (!postcode || !gemeente) {
      return NextResponse.json(
        { error: "Postcode en gemeente zijn verplicht" },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        { error: "E-mailadres is verplicht" },
        { status: 400 }
      );
    }

    const supabase = getAdminClient();

    // Create the help request
    const helpRequestData = {
      name: name || "Anoniem",
      email: email || null,
      phone: phone || null,
      contact_preference: contact_preference || "email",
      postcode: postcode.toUpperCase().replace(/\s/g, ""),
      gemeente,
      situation: situation || null,
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

    // Send confirmation email to help seeker
    if (email) {
      sendConfirmationEmail(email, {
        name: name || "Anoniem",
        helpRequestId: helpRequest.id,
      }).catch((err) => console.error("Failed to send confirmation email:", err));
    }

    // Find matching organisations
    let matchedOrganisations: Awaited<ReturnType<typeof findMatches>> = [];
    try {
      matchedOrganisations = await findMatches(gemeente, postcode);
    } catch (matchError) {
      console.error("Error finding matches:", matchError);
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

        // Send "matches found" email to help seeker
        if (email) {
          sendMatchFoundEmail(email, {
            name: name || "Anoniem",
            helpRequestId: helpRequest.id,
            matchCount: matchedOrganisations.length,
          }).catch((err) => console.error("Failed to send match found email:", err));
        }

        // Send notification emails to each matched organisation
        for (let i = 0; i < matchedOrganisations.length; i++) {
          const org = matchedOrganisations[i];
          if (org.email) {
            sendNewRequestToOrganisation(org.email, {
              organisationName: org.name,
              helpSeekerName: name || "Anoniem",
              gemeente,
              situation: situation || "",
              helpRequestId: helpRequest.id,
              priority: i + 1,
              expiresInHours: 48,
            }).catch((err) =>
              console.error(`Failed to send notification to ${org.name}:`, err)
            );
          }
        }
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
