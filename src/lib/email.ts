import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = "HulpRadar <hulpradar@konsensi-budgetbeheer.nl>";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://hulpradar.konsensi-budgetbeheer.nl";

// ──────────────── Email Templates ────────────────

function baseTemplate(content: string) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f4f7f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
    <!-- Logo -->
    <div style="text-align:center;margin-bottom:32px;">
      <h1 style="color:#1a3a1a;font-size:24px;margin:0;">
        🟢 HulpRadar
      </h1>
      <p style="color:#618964;font-size:14px;margin:4px 0 0;">
        by Konsensi
      </p>
    </div>

    <!-- Card -->
    <div style="background:#ffffff;border-radius:16px;padding:40px 32px;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
      ${content}
    </div>

    <!-- Footer -->
    <div style="text-align:center;margin-top:32px;color:#9ca3af;font-size:12px;">
      <p style="margin:0;">© ${new Date().getFullYear()} HulpRadar — Konsensi Budgetbeheer</p>
      <p style="margin:4px 0 0;">Je ontvangt deze e-mail omdat je onze hulpservice hebt gebruikt.</p>
    </div>
  </div>
</body>
</html>`;
}

// ──────────────── 1. Bevestiging naar hulpzoekende ────────────────

export async function sendConfirmationEmail(to: string, data: {
  name: string;
  helpRequestId: string;
}) {
  const statusUrl = `${APP_URL}/status/${data.helpRequestId}`;

  const html = baseTemplate(`
    <h2 style="color:#1a3a1a;font-size:22px;margin:0 0 8px;">
      Hoi ${data.name || "daar"} 👋
    </h2>
    <p style="color:#4b5563;font-size:16px;line-height:1.6;margin:0 0 24px;">
      We hebben je hulpvraag ontvangen! Onze radar scant nu organisaties in jouw regio om de beste match te vinden.
    </p>

    <div style="background:#f0fdf0;border-radius:12px;padding:20px;margin-bottom:24px;">
      <p style="color:#166534;font-size:14px;margin:0;font-weight:600;">
        ⏱ Wat kun je verwachten?
      </p>
      <ul style="color:#166534;font-size:14px;margin:12px 0 0;padding-left:20px;line-height:1.8;">
        <li>We zoeken de beste hulporganisaties voor jou</li>
        <li>Organisaties hebben 48 uur om te reageren</li>
        <li>Je ontvangt een e-mail zodra er een match is</li>
      </ul>
    </div>

    <a href="${statusUrl}" style="display:inline-block;background:#22c55e;color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:100px;font-weight:600;font-size:16px;">
      Bekijk je status →
    </a>

    <p style="color:#9ca3af;font-size:13px;margin:24px 0 0;">
      Of kopieer deze link: ${statusUrl}
    </p>
  `);

  try {
    await resend.emails.send({
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
  const statusUrl = `${APP_URL}/status/${data.helpRequestId}`;

  const html = baseTemplate(`
    <div style="text-align:center;margin-bottom:24px;">
      <div style="display:inline-block;background:#f0fdf0;border-radius:50%;width:64px;height:64px;line-height:64px;font-size:32px;">
        🎉
      </div>
    </div>

    <h2 style="color:#1a3a1a;font-size:22px;margin:0 0 8px;text-align:center;">
      We hebben ${data.matchCount} ${data.matchCount === 1 ? "match" : "matches"} gevonden!
    </h2>
    <p style="color:#4b5563;font-size:16px;line-height:1.6;margin:0 0 24px;text-align:center;">
      Goed nieuws ${data.name || ""}! Er ${data.matchCount === 1 ? "is" : "zijn"} ${data.matchCount} ${data.matchCount === 1 ? "organisatie" : "organisaties"} in jouw regio die je kunnen helpen.
    </p>

    <div style="background:#fefce8;border-radius:12px;padding:16px 20px;margin-bottom:24px;">
      <p style="color:#854d0e;font-size:14px;margin:0;">
        ⏳ De organisaties hebben <strong>48 uur</strong> om te reageren. Je ontvangt een mail zodra een organisatie je aanvraag accepteert.
      </p>
    </div>

    <div style="text-align:center;">
      <a href="${statusUrl}" style="display:inline-block;background:#22c55e;color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:100px;font-weight:600;font-size:16px;">
        Bekijk je matches →
      </a>
    </div>
  `);

  try {
    await resend.emails.send({
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
  helpSeekerName: string;
  gemeente: string;
  situation: string;
  helpRequestId: string;
  priority: number;
  expiresInHours: number;
}) {
  const dashboardUrl = `${APP_URL}/dashboard/aanvragen/${data.helpRequestId}`;

  const html = baseTemplate(`
    <div style="background:#fef3c7;border-radius:8px;padding:12px 16px;margin-bottom:24px;">
      <p style="color:#92400e;font-size:13px;margin:0;font-weight:600;">
        🔔 Nieuwe hulpvraag — reageer binnen ${data.expiresInHours} uur
      </p>
    </div>

    <h2 style="color:#1a3a1a;font-size:22px;margin:0 0 8px;">
      Nieuwe hulpvraag voor ${data.organisationName}
    </h2>
    <p style="color:#4b5563;font-size:16px;line-height:1.6;margin:0 0 24px;">
      Er is een nieuwe hulpvraag binnengekomen die bij jullie organisatie past.
    </p>

    <div style="background:#f9fafb;border-radius:12px;padding:20px;margin-bottom:24px;border:1px solid #e5e7eb;">
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:8px 0;color:#6b7280;font-size:14px;width:120px;">Naam:</td>
          <td style="padding:8px 0;color:#1a3a1a;font-size:14px;font-weight:600;">${data.helpSeekerName || "Anoniem"}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#6b7280;font-size:14px;">Gemeente:</td>
          <td style="padding:8px 0;color:#1a3a1a;font-size:14px;font-weight:600;">${data.gemeente}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#6b7280;font-size:14px;">Prioriteit:</td>
          <td style="padding:8px 0;color:#1a3a1a;font-size:14px;font-weight:600;">#${data.priority}</td>
        </tr>
        ${data.situation ? `
        <tr>
          <td style="padding:8px 0;color:#6b7280;font-size:14px;vertical-align:top;">Situatie:</td>
          <td style="padding:8px 0;color:#1a3a1a;font-size:14px;">${data.situation.substring(0, 200)}${data.situation.length > 200 ? "..." : ""}</td>
        </tr>
        ` : ""}
      </table>
    </div>

    <div style="text-align:center;">
      <a href="${dashboardUrl}" style="display:inline-block;background:#22c55e;color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:100px;font-weight:600;font-size:16px;">
        Bekijk & Reageer →
      </a>
    </div>

    <p style="color:#9ca3af;font-size:13px;margin:24px 0 0;text-align:center;">
      Reageer je niet binnen 48 uur, dan verloopt deze match automatisch.
    </p>
  `);

  try {
    await resend.emails.send({
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

// ──────────────── 4. Organisatie accepteert → hulpzoekende ────────────────

export async function sendAcceptedEmail(to: string, data: {
  name: string;
  organisationName: string;
  organisationEmail: string;
  organisationPhone: string | null;
  organisationGemeente: string;
  helpRequestId: string;
  note: string | null;
}) {
  const statusUrl = `${APP_URL}/status/${data.helpRequestId}`;

  const html = baseTemplate(`
    <div style="text-align:center;margin-bottom:24px;">
      <div style="display:inline-block;background:#f0fdf0;border-radius:50%;width:64px;height:64px;line-height:64px;font-size:32px;">
        ✅
      </div>
    </div>

    <h2 style="color:#1a3a1a;font-size:22px;margin:0 0 8px;text-align:center;">
      Goed nieuws, ${data.name || ""}!
    </h2>
    <p style="color:#4b5563;font-size:16px;line-height:1.6;margin:0 0 24px;text-align:center;">
      <strong>${data.organisationName}</strong> uit ${data.organisationGemeente} wil je graag helpen en heeft je aanvraag geaccepteerd.
    </p>

    ${data.note ? `
    <div style="background:#f0fdf0;border-left:4px solid #22c55e;padding:16px 20px;margin-bottom:24px;border-radius:0 8px 8px 0;">
      <p style="color:#166534;font-size:14px;margin:0 0 4px;font-weight:600;">Bericht van ${data.organisationName}:</p>
      <p style="color:#166534;font-size:14px;margin:0;font-style:italic;">"${data.note}"</p>
    </div>
    ` : ""}

    <div style="background:#f9fafb;border-radius:12px;padding:20px;margin-bottom:24px;border:1px solid #e5e7eb;">
      <p style="color:#1a3a1a;font-size:16px;margin:0 0 16px;font-weight:600;">📞 Contactgegevens</p>
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:6px 0;color:#6b7280;font-size:14px;width:100px;">Organisatie:</td>
          <td style="padding:6px 0;color:#1a3a1a;font-size:14px;font-weight:600;">${data.organisationName}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#6b7280;font-size:14px;">E-mail:</td>
          <td style="padding:6px 0;"><a href="mailto:${data.organisationEmail}" style="color:#22c55e;font-size:14px;font-weight:600;">${data.organisationEmail}</a></td>
        </tr>
        ${data.organisationPhone ? `
        <tr>
          <td style="padding:6px 0;color:#6b7280;font-size:14px;">Telefoon:</td>
          <td style="padding:6px 0;"><a href="tel:${data.organisationPhone}" style="color:#22c55e;font-size:14px;font-weight:600;">${data.organisationPhone}</a></td>
        </tr>
        ` : ""}
      </table>
    </div>

    <div style="background:#eff6ff;border-radius:12px;padding:16px 20px;margin-bottom:24px;">
      <p style="color:#1e40af;font-size:14px;margin:0;">
        💡 <strong>Tip:</strong> Neem zo snel mogelijk contact op met de organisatie. Ze verwachten je bericht!
      </p>
    </div>

    <div style="text-align:center;">
      <a href="${statusUrl}" style="display:inline-block;background:#22c55e;color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:100px;font-weight:600;font-size:16px;">
        Bekijk alle details →
      </a>
    </div>
  `);

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: `${data.organisationName} wil je helpen! — HulpRadar`,
      html,
    });
    console.log(`[Email] Acceptance sent to ${to}`);
    return { success: true };
  } catch (error) {
    console.error("[Email] Failed to send acceptance email:", error);
    return { success: false, error };
  }
}
