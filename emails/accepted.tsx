import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Button,
  Hr,
  Row,
  Column,
} from "@react-email/components";
import * as React from "react";

/**
 * Email 4: Contactgegevens Hulpzoekende → Organisatie
 * Organisation receives the help seeker's contact details after accepting.
 * Professional B2B design with verified data card.
 */
interface AcceptedOrgEmailProps {
  organisationName?: string;
  helpSeekerName?: string;
  helpSeekerEmail?: string;
  helpSeekerPhone?: string | null;
  gemeente?: string;
  situation?: string | null;
  helpRequestId?: string;
  appUrl?: string;
}

export default function AcceptedOrgEmail({
  organisationName = "Schuldhulp Amsterdam",
  helpSeekerName = "Alex de Vries",
  helpSeekerEmail = "alex@voorbeeld.nl",
  helpSeekerPhone = "06-12345678",
  gemeente = "Amsterdam",
  situation = "Ik heb moeite met het betalen van mijn rekeningen en weet niet waar ik moet beginnen.",
  helpRequestId = "abc-123-def",
  appUrl = "https://hulpradar.konsensi-budgetbeheer.nl",
}: AcceptedOrgEmailProps) {
  return (
    <Html lang="nl">
      <Head>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');`}</style>
      </Head>
      <Preview>{`Hulpvraag geaccepteerd — contactgegevens van ${helpSeekerName}`}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Green accent bar */}
          <div style={accentBar} />

          {/* Header */}
          <Section style={header}>
            <Img
              src={`${appUrl}/logo-hulpradar.png`}
              alt="HulpRadar"
              width="140"
              height="auto"
              style={{ display: "block" }}
            />
          </Section>

          {/* Content */}
          <Section style={content}>
            {/* Icon */}
            <div style={iconBadge}>
              <Text style={iconText}>✅</Text>
            </div>

            <Heading style={h1}>Contactgegevens Beschikbaar</Heading>
            <Text style={paragraph}>
              Beste <strong>{organisationName}</strong>, bedankt voor het accepteren
              van deze hulpvraag. Hieronder vindt u de beveiligde contactgegevens.
            </Text>

            {/* Verified contact card */}
            <Section style={contactCard}>
              <table cellPadding="0" cellSpacing="0" style={{ width: "100%", marginBottom: "16px" }}>
                <tr>
                  <td>
                    <Text style={contactCardTitle}>Beveiligde Gegevens</Text>
                  </td>
                  <td style={{ textAlign: "right" as const }}>
                    <span style={verifiedBadge}>✓ Geverifieerd</span>
                  </td>
                </tr>
              </table>

              <Hr style={cardDivider} />

              {/* Name */}
              <Row style={detailRow}>
                <Column style={detailLabel}>Naam</Column>
                <Column style={detailValue}>{helpSeekerName}</Column>
              </Row>
              <Hr style={cardDividerLight} />

              {/* Email */}
              <Row style={detailRow}>
                <Column style={detailLabel}>E-mail</Column>
                <Column style={detailValue}>
                  <Link href={`mailto:${helpSeekerEmail}`} style={linkGreen}>
                    {helpSeekerEmail}
                  </Link>
                </Column>
              </Row>
              <Hr style={cardDividerLight} />

              {/* Phone */}
              {helpSeekerPhone && (
                <>
                  <Row style={detailRow}>
                    <Column style={detailLabel}>Telefoon</Column>
                    <Column style={detailValue}>
                      <Link href={`tel:${helpSeekerPhone}`} style={linkGreen}>
                        {helpSeekerPhone}
                      </Link>
                    </Column>
                  </Row>
                  <Hr style={cardDividerLight} />
                </>
              )}

              {/* Region */}
              <Row style={detailRow}>
                <Column style={detailLabel}>Regio</Column>
                <Column style={detailValue}>{gemeente}</Column>
              </Row>
            </Section>

            {/* Situation / description */}
            {situation && (
              <Section style={situationCard}>
                <Text style={situationTitle}>Omschrijving hulpvraag</Text>
                <Text style={situationText}>{situation}</Text>
              </Section>
            )}

            {/* CTA */}
            <Section style={ctaSection}>
              <Button style={primaryButton} href={`mailto:${helpSeekerEmail}`}>
                Neem direct contact op
              </Button>
              {helpSeekerPhone && (
                <Text style={ctaSub}>
                  of bel: <Link href={`tel:${helpSeekerPhone}`} style={linkGreenSmall}>{helpSeekerPhone}</Link>
                </Text>
              )}
            </Section>

            {/* Important note */}
            <Section style={importantNote}>
              <Text style={importantNoteText}>
                <strong>Belangrijk:</strong> De hulpzoekende is op de hoogte gesteld dat uw
                organisatie contact gaat opnemen. Neem bij voorkeur binnen 24 uur contact op.
              </Text>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Section style={privacyBox}>
              <Text style={privacyText}>
                <strong>Privacy:</strong> Deze contactgegevens zijn uitsluitend bestemd voor het
                verlenen van hulp. Gebruik voor andere doeleinden is niet toegestaan.
              </Text>
            </Section>

            <table cellPadding="0" cellSpacing="0" style={{ width: "100%" }}>
              <tr>
                <td style={{ verticalAlign: "top" as const, width: "50%" }}>
                  <Img
                    src={`${appUrl}/logo-hulpradar.png`}
                    alt="HulpRadar"
                    width="110"
                    height="auto"
                    style={{ display: "block", marginBottom: "8px" }}
                  />
                  <Text style={footerDesc}>
                    Verbindt hulpzoekenden met de juiste organisaties
                  </Text>
                </td>
                <td style={{ verticalAlign: "top" as const, textAlign: "right" as const }}>
                  <Text style={footerLinkTitle}>Links</Text>
                  <Link href={`${appUrl}/dashboard`} style={footerLinkItem}>Dashboard</Link>
                  <br />
                  <Link href={appUrl} style={footerLinkItem}>HulpRadar.nl</Link>
                  <br />
                  <Link href={`${appUrl}/privacy-policy`} style={footerLinkItem}>Privacy Policy</Link>
                </td>
              </tr>
            </table>
            <Hr style={footerDivider} />
            <Text style={footerCopy}>
              © {new Date().getFullYear()} Konsensi Budgetbeheer · Alle rechten voorbehouden
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// ──────────────── Styles ────────────────

const main: React.CSSProperties = {
  backgroundColor: "#f7f8f6",
  fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

const container: React.CSSProperties = {
  maxWidth: "600px",
  margin: "0 auto",
  backgroundColor: "#ffffff",
  borderRadius: "16px",
  overflow: "hidden",
  border: "1px solid #e2e4e0",
};

const accentBar: React.CSSProperties = {
  height: "4px",
  backgroundColor: "#8ce830",
};

const header: React.CSSProperties = {
  padding: "24px 32px",
  borderBottom: "1px solid #f2f4f0",
};

const content: React.CSSProperties = {
  padding: "40px 32px 32px",
};

const iconBadge: React.CSSProperties = {
  textAlign: "center" as const,
  marginBottom: "20px",
};

const iconText: React.CSSProperties = {
  display: "inline-block",
  backgroundColor: "rgba(140, 232, 48, 0.15)",
  borderRadius: "9999px",
  width: "56px",
  height: "56px",
  lineHeight: "56px",
  fontSize: "28px",
  margin: "0",
  textAlign: "center" as const,
};

const h1: React.CSSProperties = {
  color: "#192111",
  fontSize: "26px",
  fontWeight: 800,
  lineHeight: "1.3",
  textAlign: "center" as const,
  margin: "0 0 12px",
  letterSpacing: "-0.02em",
};

const paragraph: React.CSSProperties = {
  color: "rgba(25, 33, 17, 0.7)",
  fontSize: "15px",
  fontWeight: 400,
  lineHeight: "1.6",
  margin: "0 0 24px",
  textAlign: "center" as const,
};

const contactCard: React.CSSProperties = {
  backgroundColor: "#fafbf8",
  border: "1px solid #e2e4e0",
  borderRadius: "12px",
  padding: "20px 24px",
  margin: "0 0 20px",
};

const contactCardTitle: React.CSSProperties = {
  color: "#192111",
  fontSize: "14px",
  fontWeight: 700,
  margin: "0",
  textTransform: "uppercase" as const,
  letterSpacing: "0.04em",
};

const verifiedBadge: React.CSSProperties = {
  display: "inline-block",
  backgroundColor: "rgba(140, 232, 48, 0.15)",
  color: "#4a7c10",
  fontSize: "11px",
  fontWeight: 700,
  padding: "4px 12px",
  borderRadius: "9999px",
};

const cardDivider: React.CSSProperties = {
  borderColor: "#e2e4e0",
  margin: "14px 0",
};

const cardDividerLight: React.CSSProperties = {
  borderColor: "#f0f1ee",
  margin: "0",
};

const detailRow: React.CSSProperties = {
  padding: "12px 0",
};

const detailLabel: React.CSSProperties = {
  color: "rgba(25, 33, 17, 0.45)",
  fontSize: "13px",
  fontWeight: 500,
  width: "100px",
  verticalAlign: "middle" as const,
};

const detailValue: React.CSSProperties = {
  color: "#192111",
  fontSize: "14px",
  fontWeight: 600,
  verticalAlign: "middle" as const,
};

const linkGreen: React.CSSProperties = {
  color: "#4a7c10",
  fontSize: "14px",
  fontWeight: 600,
  textDecoration: "none",
};

const linkGreenSmall: React.CSSProperties = {
  color: "#4a7c10",
  fontWeight: 600,
  textDecoration: "none",
};

const situationCard: React.CSSProperties = {
  backgroundColor: "rgba(140, 232, 48, 0.06)",
  border: "1px solid rgba(140, 232, 48, 0.15)",
  borderRadius: "12px",
  padding: "20px 24px",
  marginBottom: "24px",
};

const situationTitle: React.CSSProperties = {
  color: "#192111",
  fontSize: "12px",
  fontWeight: 700,
  margin: "0 0 8px",
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
};

const situationText: React.CSSProperties = {
  color: "rgba(25, 33, 17, 0.7)",
  fontSize: "14px",
  lineHeight: "1.6",
  margin: "0",
};

const ctaSection: React.CSSProperties = {
  textAlign: "center" as const,
  margin: "0 0 24px",
};

const primaryButton: React.CSSProperties = {
  backgroundColor: "#8ce830",
  color: "#192111",
  padding: "16px 48px",
  borderRadius: "9999px",
  fontWeight: 800,
  fontSize: "16px",
  textDecoration: "none",
  display: "inline-block",
  letterSpacing: "0.01em",
};

const ctaSub: React.CSSProperties = {
  color: "rgba(25, 33, 17, 0.5)",
  fontSize: "14px",
  margin: "12px 0 0",
};

const importantNote: React.CSSProperties = {
  backgroundColor: "#fffbeb",
  border: "1px solid #fde68a",
  borderRadius: "10px",
  padding: "14px 18px",
};

const importantNoteText: React.CSSProperties = {
  color: "#92400e",
  fontSize: "13px",
  lineHeight: "1.5",
  margin: "0",
};

const footer: React.CSSProperties = {
  backgroundColor: "#192111",
  padding: "32px",
};

const privacyBox: React.CSSProperties = {
  backgroundColor: "rgba(255, 255, 255, 0.08)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "8px",
  padding: "14px 16px",
  marginBottom: "24px",
};

const privacyText: React.CSSProperties = {
  color: "rgba(255, 255, 255, 0.6)",
  fontSize: "12px",
  lineHeight: "1.5",
  margin: "0",
};

const footerDesc: React.CSSProperties = {
  color: "rgba(255, 255, 255, 0.5)",
  fontSize: "12px",
  margin: "0",
  lineHeight: "1.5",
};

const footerLinkTitle: React.CSSProperties = {
  color: "rgba(255, 255, 255, 0.7)",
  fontSize: "12px",
  fontWeight: 700,
  margin: "0 0 8px",
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
};

const footerLinkItem: React.CSSProperties = {
  color: "rgba(255, 255, 255, 0.5)",
  fontSize: "12px",
  textDecoration: "none",
  lineHeight: "2",
};

const footerDivider: React.CSSProperties = {
  borderColor: "rgba(255, 255, 255, 0.1)",
  margin: "20px 0 16px",
};

const footerCopy: React.CSSProperties = {
  color: "rgba(255, 255, 255, 0.3)",
  fontSize: "11px",
  margin: "0",
  textAlign: "center" as const,
};
