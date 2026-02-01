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
} from "@react-email/components";
import * as React from "react";

/**
 * Email 5: "Organisatie Gaat Helpen" → Hulpzoekende
 * Reassuring notification: an organisation accepted and will contact them.
 * Uses hero image + match badge + reassurance cards.
 */
interface AcceptedSeekerEmailProps {
  name?: string;
  organisationName?: string;
  helpRequestId?: string;
  appUrl?: string;
}

export default function AcceptedSeekerEmail({
  name = "Alex",
  organisationName = "Schuldhulp Amsterdam",
  helpRequestId = "abc-123-def",
  appUrl = "https://hulpradar.konsensi-budgetbeheer.nl",
}: AcceptedSeekerEmailProps) {
  const statusUrl = `${appUrl}/status/${helpRequestId}`;

  return (
    <Html lang="nl">
      <Head>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');`}</style>
      </Head>
      <Preview>{`Goed nieuws! ${organisationName} gaat contact met je opnemen`}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <table cellPadding="0" cellSpacing="0" style={{ width: "100%" }}>
              <tr>
                <td>
                  <Img
                    src={`${appUrl}/logo-hulpradar.png`}
                    alt="HulpRadar"
                    width="140"
                    height="auto"
                    style={{ display: "block" }}
                  />
                </td>
                <td style={{ textAlign: "right" as const, verticalAlign: "middle" as const }}>
                  <span style={activeBadge}>
                    <span style={activeDot}>●</span> Active
                  </span>
                </td>
              </tr>
            </table>
          </Section>

          {/* Hero Image */}
          <Section style={heroSection}>
            <Img
              src={`${appUrl}/budget-overzicht.jpg`}
              alt="HulpRadar — Er is een match gevonden"
              width="600"
              style={{ display: "block", width: "100%", borderRadius: "0" }}
            />
          </Section>

          {/* Content */}
          <Section style={content}>
            {/* Match badge */}
            <div style={badgeCenter}>
              <span style={matchBadge}>Match Gevonden</span>
            </div>

            <Heading style={h1}>Goed nieuws, {name}!</Heading>
            <Text style={paragraph}>
              Een hulporganisatie heeft je aanvraag geaccepteerd en gaat binnenkort
              contact met je opnemen.
            </Text>

            {/* Organisation card */}
            <Section style={orgCard}>
              <Text style={orgCardLabel}>Organisatie</Text>
              <Text style={orgCardName}>{organisationName}</Text>
              <Text style={orgCardNote}>
                Zij nemen zo snel mogelijk contact met je op via de contactgegevens
                die je hebt opgegeven.
              </Text>
            </Section>

            {/* Reassurance cards */}
            <table cellPadding="0" cellSpacing="0" style={{ width: "100%", marginBottom: "28px" }}>
              <tr>
                <td style={reassuranceCard}>
                  <Text style={reassuranceIcon}>⏰</Text>
                  <Text style={reassuranceTitle}>Binnen 48 uur</Text>
                  <Text style={reassuranceDesc}>
                    De organisatie neemt binnen 48 uur contact met je op
                  </Text>
                </td>
                <td style={{ width: "12px" }} />
                <td style={reassuranceCard}>
                  <Text style={reassuranceIcon}>💬</Text>
                  <Text style={reassuranceTitle}>Rustig afwachten</Text>
                  <Text style={reassuranceDesc}>
                    Je hoeft zelf niets te doen, zij bellen of mailen jou
                  </Text>
                </td>
              </tr>
            </table>

            {/* CTA */}
            <Section style={ctaSection}>
              <Button style={primaryButton} href={statusUrl}>
                Bekijk je status
              </Button>
            </Section>

            <Text style={mutedCenter}>
              Houd je telefoon en e-mail in de gaten — ze nemen snel contact op.
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Img
              src={`${appUrl}/logo-hulpradar.png`}
              alt="HulpRadar"
              width="100"
              height="auto"
              style={{ display: "block", margin: "0 auto 16px" }}
            />
            <Text style={footerNote}>
              Je ontvangt deze e-mail omdat je een hulpvraag hebt ingediend via HulpRadar.
            </Text>
            <Section style={footerLinks}>
              <Link href={appUrl} style={footerLink}>HulpRadar.nl</Link>
              <Text style={footerDot}> · </Text>
              <Link href={`${appUrl}/privacy-policy`} style={footerLink}>Privacy Policy</Link>
            </Section>
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

const header: React.CSSProperties = {
  padding: "20px 32px",
  borderBottom: "1px solid #f2f4f0",
};

const activeBadge: React.CSSProperties = {
  display: "inline-block",
  backgroundColor: "rgba(140, 232, 48, 0.15)",
  color: "#4a7c10",
  fontSize: "12px",
  fontWeight: 700,
  padding: "6px 14px",
  borderRadius: "9999px",
  letterSpacing: "0.02em",
};

const activeDot: React.CSSProperties = {
  color: "#8ce830",
  marginRight: "4px",
  fontSize: "10px",
};

const heroSection: React.CSSProperties = {
  padding: "0",
};

const content: React.CSSProperties = {
  padding: "32px 32px 28px",
};

const badgeCenter: React.CSSProperties = {
  textAlign: "center" as const,
  marginBottom: "16px",
};

const matchBadge: React.CSSProperties = {
  display: "inline-block",
  backgroundColor: "rgba(140, 232, 48, 0.15)",
  color: "#4a7c10",
  fontSize: "13px",
  fontWeight: 700,
  padding: "8px 20px",
  borderRadius: "9999px",
  letterSpacing: "0.02em",
};

const h1: React.CSSProperties = {
  color: "#192111",
  fontSize: "28px",
  fontWeight: 800,
  lineHeight: "1.3",
  textAlign: "center" as const,
  margin: "0 0 12px",
  letterSpacing: "-0.02em",
};

const paragraph: React.CSSProperties = {
  color: "rgba(25, 33, 17, 0.7)",
  fontSize: "16px",
  fontWeight: 400,
  lineHeight: "1.6",
  margin: "0 0 24px",
  textAlign: "center" as const,
};

const orgCard: React.CSSProperties = {
  backgroundColor: "rgba(140, 232, 48, 0.08)",
  border: "1px solid rgba(140, 232, 48, 0.2)",
  borderRadius: "12px",
  padding: "24px",
  marginBottom: "20px",
  textAlign: "center" as const,
};

const orgCardLabel: React.CSSProperties = {
  color: "rgba(25, 33, 17, 0.45)",
  fontSize: "11px",
  fontWeight: 700,
  textTransform: "uppercase" as const,
  letterSpacing: "0.06em",
  margin: "0 0 6px",
};

const orgCardName: React.CSSProperties = {
  color: "#192111",
  fontSize: "22px",
  fontWeight: 800,
  margin: "0 0 10px",
};

const orgCardNote: React.CSSProperties = {
  color: "rgba(25, 33, 17, 0.55)",
  fontSize: "14px",
  lineHeight: "1.5",
  margin: "0",
};

const reassuranceCard: React.CSSProperties = {
  backgroundColor: "#f7f8f6",
  border: "1px solid #e2e4e0",
  borderRadius: "12px",
  padding: "20px 16px",
  textAlign: "center" as const,
  verticalAlign: "top" as const,
  width: "50%",
};

const reassuranceIcon: React.CSSProperties = {
  fontSize: "24px",
  margin: "0 0 8px",
};

const reassuranceTitle: React.CSSProperties = {
  color: "#192111",
  fontSize: "14px",
  fontWeight: 700,
  margin: "0 0 6px",
};

const reassuranceDesc: React.CSSProperties = {
  color: "rgba(25, 33, 17, 0.55)",
  fontSize: "12px",
  lineHeight: "1.5",
  margin: "0",
};

const ctaSection: React.CSSProperties = {
  textAlign: "center" as const,
  marginBottom: "12px",
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

const mutedCenter: React.CSSProperties = {
  color: "rgba(25, 33, 17, 0.4)",
  fontSize: "13px",
  textAlign: "center" as const,
  margin: "0",
  lineHeight: "1.5",
};

const footer: React.CSSProperties = {
  backgroundColor: "#f7f8f6",
  borderTop: "1px solid #e8eae5",
  padding: "32px",
  textAlign: "center" as const,
};

const footerNote: React.CSSProperties = {
  color: "rgba(25, 33, 17, 0.45)",
  fontSize: "12px",
  margin: "0 0 12px",
  textAlign: "center" as const,
};

const footerLinks: React.CSSProperties = {
  textAlign: "center" as const,
  marginBottom: "12px",
};

const footerLink: React.CSSProperties = {
  color: "rgba(25, 33, 17, 0.4)",
  fontSize: "12px",
  fontWeight: 600,
  textDecoration: "none",
};

const footerDot: React.CSSProperties = {
  color: "rgba(25, 33, 17, 0.3)",
  fontSize: "12px",
  display: "inline",
  margin: "0",
};

const footerCopy: React.CSSProperties = {
  color: "rgba(25, 33, 17, 0.3)",
  fontSize: "11px",
  margin: "0",
  textAlign: "center" as const,
};
