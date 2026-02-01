import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendNewOrganisationNotification } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      organisatienaam,
      kvkNummer,
      website,
      specialisaties,
      gemeenten,
      contactNaam,
      email,
      telefoon,
    } = body;

    // Validate required fields
    if (!organisatienaam || !email || !contactNaam) {
      return NextResponse.json(
        { error: "Verplichte velden ontbreken" },
        { status: 400 }
      );
    }

    // Create slug from organisation name
    const slug = organisatienaam
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    // Insert into Supabase
    const supabase = await createClient();
    const { data: org, error: orgError } = await supabase
      .from("organisations")
      .insert({
        name: organisatienaam,
        slug,
        email,
        kvk_number: kvkNummer,
        website: website ? `https://${website}` : null,
        specialisaties,
        gemeente: gemeenten.join(", "),
        contact_naam: contactNaam,
        contact_email: email,
        contact_telefoon: telefoon,
        status: "pending_verification",
      })
      .select()
      .single();

    if (orgError) {
      console.error("[API] Error creating organisation:", orgError);
      return NextResponse.json(
        { error: "Er is iets misgegaan bij het aanmaken" },
        { status: 500 }
      );
    }

    // Send admin notification email (fire-and-forget, don't block response)
    sendNewOrganisationNotification({
      organisatienaam,
      contactNaam,
      email,
      telefoon: telefoon || "",
      specialisaties: specialisaties || [],
      gemeenten: gemeenten.join(", "),
      kvkNummer: kvkNummer || "",
      website: website ? `https://${website}` : "",
    }).catch((err) => {
      console.error("[API] Failed to send admin notification email:", err);
    });

    return NextResponse.json({ success: true, organisation: org });
  } catch (error) {
    console.error("[API] Organisation signup error:", error);
    return NextResponse.json(
      { error: "Er is een onverwachte fout opgetreden" },
      { status: 500 }
    );
  }
}
