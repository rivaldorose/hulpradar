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
 * Email 5: Acceptatie-notificatie → Hulpzoekende
 * Simpele melding: "Een organisatie gaat contact met je opnemen."
 * Geen contactgegevens van de organisatie — zij bellen/mailen zelf.
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
              <Text style={iconText}>🎉</Text>
            </div>

            <Heading style={h1}>Goed nieuws, {name}!</Heading>

            <Section style={messageBody}>
              <Text style={paragraph}>
                Een hulporganisatie heeft je aanvraag geaccepteerd en gaat
                binnenkort contact met je opnemen.
              </Text>
            </Section>

            {/* Organisation card */}
            <Section style={orgCard}>
              <Text style={orgCardLabel}>Organisatie</Text>
              <Text style={orgCardName}>{organisationName}</Text>
              <Text style={orgCardNote}>
                Zij nemen zo snel mogelijk contact met je op via de
                contactgegevens die je hebt opgegeven.
              </Text>
            </Section>

            {/* What to expect */}
            <Section style={expectCard}>
              <Text style={expectTitle}>Wat kun je verwachten?</Text>
              <Text style={expectItem}>✓ De organisatie belt of mailt je binnenkort</Text>
              <Text style={expectItem}>✓ Houd je telefoon en inbox in de gaten</Text>
              <Text style={expectItem}>✓ Neem gerust contact op als je vragen hebt</Text>
            </Section>

            {/* CTA */}
            <Section style={ctaSection}>
              <Button style={primaryButton} href={statusUrl}>
                Bekijk je status
              </Button>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerNote}>
              U ontvangt deze e-mail omdat u een hulpvraag heeft ingediend via
              het HulpRadar platform.
            </Text>

            <Section style={footerLinks}>
              <Link href={appUrl} style={footerLink}>HulpRadar.nl</Link>
              <Text style={footerDot}> • </Text>
              <Link href={`${appUrl}/privacy-policy`} style={footerLink}>Privacy Policy</Link>
            </Section>
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
  borderBottom: "1px solid #f2f4f0",
  padding: "24px 32px",
};

const content: React.CSSProperties = {
  padding: "40px 32px 48px",
};

const iconBadge: React.CSSProperties = {
  textAlign: "center" as const,
  marginBottom: "24px",
};

const iconText: React.CSSProperties = {
  display: "inline-block",
  backgroundColor: "rgba(128, 236, 19, 0.2)",
  borderRadius: "9999px",
  width: "56px",
  height: "56px",
  lineHeight: "56px",
  fontSize: "28px",
  margin: "0",
  textAlign: "center" as const,
};

const h1: React.CSSProperties = {
  color: "#141811",
  fontSize: "28px",
  fontWeight: 700,
  lineHeight: "1.3",
  textAlign: "center" as const,
  margin: "0 0 16px",
  letterSpacing: "-0.01em",
};

const messageBody: React.CSSProperties = {
  paddingTop: "16px",
};

const paragraph: React.CSSProperties = {
  color: "#141811",
  fontSize: "16px",
  fontWeight: 400,
  lineHeight: "1.6",
  margin: "0 0 16px",
  textAlign: "center" as const,
};

const orgCard: React.CSSProperties = {
  backgroundColor: "rgba(128, 236, 19, 0.08)",
  border: "1px solid rgba(128, 236, 19, 0.2)",
  borderRadius: "12px",
  padding: "24px",
  margin: "24px 0",
  textAlign: "center" as const,
};

const orgCardLabel: React.CSSProperties = {
  color: "rgba(20, 24, 17, 0.5)",
  fontSize: "12px",
  fontWeight: 600,
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
  margin: "0 0 4px",
};

const orgCardName: React.CSSProperties = {
  color: "#141811",
  fontSize: "22px",
  fontWeight: 700,
  margin: "0 0 12px",
};

const orgCardNote: React.CSSProperties = {
  color: "rgba(20, 24, 17, 0.6)",
  fontSize: "14px",
  lineHeight: "1.5",
  margin: "0",
};

const expectCard: React.CSSProperties = {
  backgroundColor: "#f7f8f6",
  border: "1px solid #e2e4e0",
  borderRadius: "12px",
  padding: "20px 24px",
  marginBottom: "24px",
};

const expectTitle: React.CSSProperties = {
  color: "#141811",
  fontSize: "14px",
  fontWeight: 700,
  margin: "0 0 12px",
};

const expectItem: React.CSSProperties = {
  color: "#141811",
  fontSize: "14px",
  fontWeight: 400,
  margin: "0 0 6px",
  lineHeight: "1.6",
};

const ctaSection: React.CSSProperties = {
  textAlign: "center" as const,
  padding: "8px 0",
};

const primaryButton: React.CSSProperties = {
  backgroundColor: "#80ec13",
  color: "#141811",
  padding: "16px 40px",
  borderRadius: "9999px",
  fontWeight: 700,
  fontSize: "18px",
  textDecoration: "none",
  display: "inline-block",
  letterSpacing: "0.01em",
};

const footer: React.CSSProperties = {
  backgroundColor: "rgba(247, 248, 246, 0.5)",
  borderTop: "1px solid #f2f4f0",
  padding: "32px",
};

const footerNote: React.CSSProperties = {
  color: "rgba(20, 24, 17, 0.5)",
  fontSize: "12px",
  textAlign: "center" as const,
  margin: "0 0 12px",
};

const footerLinks: React.CSSProperties = {
  textAlign: "center" as const,
};

const footerLink: React.CSSProperties = {
  color: "rgba(20, 24, 17, 0.4)",
  fontSize: "12px",
  fontWeight: 600,
  textDecoration: "none",
};

const footerDot: React.CSSProperties = {
  color: "rgba(20, 24, 17, 0.4)",
  fontSize: "12px",
  display: "inline",
  margin: "0",
};
