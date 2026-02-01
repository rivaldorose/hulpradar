import { Resend } from "resend";
import { render } from "@react-email/components";
import ConfirmationEmail from "../../emails/confirmation";
import MatchFoundEmail from "../../emails/match-found";
import NewRequestOrganisationEmail from "../../emails/new-request-organisation";
import AcceptedOrgEmail from "../../emails/accepted";
import AcceptedSeekerEmail from "../../emails/accepted-seeker";

// Lazy initialization to prevent build errors when env var is not set
let _resend: Resend | null = null;
function getResend() {
  if (!_resend) {
    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error("RESEND_API_KEY is not set");
    _resend = new Resend(key);
  }
  return _resend;
}

const FROM_EMAIL = "HulpRadar <hulpradar@konsensi-budgetbeheer.nl>";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://hulpradar.konsensi-budgetbeheer.nl";

// ──────────────── 1. Bevestiging naar hulpzoekende ────────────────

export async function sendConfirmationEmail(to: string, data: {
  name: string;
  helpRequestId: string;
}) {
  try {
    const html = await render(ConfirmationEmail({
      name: data.name,
      helpRequestId: data.helpRequestId,
      appUrl: APP_URL,
    }));

    await getResend().emails.send({
      from: FROM_EMAIL,
      to,
      subject: "Je hulpvraag is ontvangen — HulpRadar",
      html,
    });
    console.log(`[Email] Confirmation sent to ${to}`);
    return { success: true };
  } catch (error) {
    console.error("[Email] Failed to send confirmation:", error);
    return { success: false, error };
  }
}

// ──────────────── 2. Matches gevonden → hulpzoekende ────────────────

export async function sendMatchFoundEmail(to: string, data: {
  name: string;
  helpRequestId: string;
  matchCount: number;
}) {
  try {
    const html = await render(MatchFoundEmail({
      name: data.name,
      helpRequestId: data.helpRequestId,
      matchCount: data.matchCount,
      appUrl: APP_URL,
    }));

    await getResend().emails.send({
      from: FROM_EMAIL,
      to,
      subject: `${data.matchCount} ${data.matchCount === 1 ? "match" : "matches"} gevonden — HulpRadar`,
      html,
    });
    console.log(`[Email] Match found sent to ${to}`);
    return { success: true };
  } catch (error) {
    console.error("[Email] Failed to send match found:", error);
    return { success: false, error };
  }
}

// ──────────────── 3. Nieuwe hulpvraag → organisatie ────────────────

export async function sendNewRequestToOrganisation(to: string, data: {
  organisationName: string;
  gemeente: string;
  categorie?: string;
  helpRequestId: string;
  expiresInHours: number;
}) {
  try {
    const html = await render(NewRequestOrganisationEmail({
      organisationName: data.organisationName,
      gemeente: data.gemeente,
      categorie: data.categorie || "Schuldhulpverlening",
      helpRequestId: data.helpRequestId,
      expiresInHours: data.expiresInHours,
      appUrl: APP_URL,
    }));

    await getResend().emails.send({
      from: FROM_EMAIL,
      to,
      subject: `Nieuwe hulpvraag uit ${data.gemeente} — HulpRadar`,
      html,
    });
    console.log(`[Email] New request notification sent to ${to}`);
    return { success: true };
  } catch (error) {
    console.error("[Email] Failed to send new request notification:", error);
    return { success: false, error };
  }
}

// ──────────────── 4. Acceptatie + contactgegevens → organisatie ────────────────

export async function sendAcceptedToOrganisation(to: string, data: {
  organisationName: string;
  helpSeekerName: string;
  helpSeekerEmail: string;
  helpSeekerPhone: string | null;
  gemeente: string;
  situation: string | null;
  helpRequestId: string;
}) {
  try {
    const html = await render(AcceptedOrgEmail({
      organisationName: data.organisationName,
      helpSeekerName: data.helpSeekerName,
      helpSeekerEmail: data.helpSeekerEmail,
      helpSeekerPhone: data.helpSeekerPhone,
      gemeente: data.gemeente,
      situation: data.situation,
      helpRequestId: data.helpRequestId,
      appUrl: APP_URL,
    }));

    await getResend().emails.send({
      from: FROM_EMAIL,
      to,
      subject: `Hulpvraag geaccepteerd — contactgegevens beschikbaar — HulpRadar`,
      html,
    });
    console.log(`[Email] Acceptance + contact details sent to org ${to}`);
    return { success: true };
  } catch (error) {
    console.error("[Email] Failed to send acceptance to org:", error);
    return { success: false, error };
  }
}

// ──────────────── 5. "Ze nemen contact op" → hulpzoekende ────────────────

export async function sendAcceptedToSeeker(to: string, data: {
  name: string;
  organisationName: string;
  helpRequestId: string;
}) {
  try {
    const html = await render(AcceptedSeekerEmail({
      name: data.name,
      organisationName: data.organisationName,
      helpRequestId: data.helpRequestId,
      appUrl: APP_URL,
    }));

    await getResend().emails.send({
      from: FROM_EMAIL,
      to,
      subject: `Goed nieuws! ${data.organisationName} gaat contact met je opnemen — HulpRadar`,
      html,
    });
    console.log(`[Email] Acceptance notification sent to seeker ${to}`);
    return { success: true };
  } catch (error) {
    console.error("[Email] Failed to send acceptance to seeker:", error);
    return { success: false, error };
  }
}
