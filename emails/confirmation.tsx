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
 * Email 1: Bevestiging Hulpvraag → Hulpzoekende
 * Confirmation that their help request was received, with hero image and radar scanning animation.
 */
interface ConfirmationEmailProps {
  name?: string;
  helpRequestId?: string;
  appUrl?: string;
}

export default function ConfirmationEmail({
  name = "Alex",
  helpRequestId = "abc-123-def",
  appUrl = "https://hulpradar.konsensi-budgetbeheer.nl",
}: ConfirmationEmailProps) {
  const statusUrl = `${appUrl}/status/${helpRequestId}`;

  return (
    <Html lang="nl">
      <Head>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');`}</style>
      </Head>
      <Preview>Je hulpvraag is ontvangen — we zoeken de beste match voor je</Preview>
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
              src={`${appUrl}/hero-illustratie.jpg`}
              alt="HulpRadar — Je hulpvraag is ontvangen"
              width="600"
              style={{ display: "block", width: "100%", borderRadius: "0" }}
            />
          </Section>

          {/* Content */}
          <Section style={content}>
            <Heading style={h1}>Hoi {name}!</Heading>
            <Text style={paragraph}>
              Super dat je de stap hebt gezet! We hebben je hulpvraag ontvangen en
              onze radar scant nu organisaties in jouw regio.
            </Text>

            {/* Radar Progress */}
            <Section style={radarCard}>
              <Text style={radarTitle}>🔍 Radar scant...</Text>
              <div style={progressBarOuter}>
                <div style={progressBarInner} />
              </div>
              <Text style={radarSubtext}>We zoeken de beste matches voor jou</Text>
            </Section>

            {/* Steps */}
            <Section style={stepsSection}>
              <table cellPadding="0" cellSpacing="0" style={{ width: "100%" }}>
                <tr>
                  <td style={stepNumber}>1</td>
                  <td style={stepText}><strong>Aanvraag ontvangen</strong> — Je gegevens zijn veilig opgeslagen</td>
                </tr>
              </table>
              <table cellPadding="0" cellSpacing="0" style={{ width: "100%", marginTop: "12px" }}>
                <tr>
                  <td style={stepNumber}>2</td>
                  <td style={stepText}><strong>Matching loopt</strong> — We koppelen je aan de beste organisaties</td>
                </tr>
              </table>
              <table cellPadding="0" cellSpacing="0" style={{ width: "100%", marginTop: "12px" }}>
                <tr>
                  <td style={stepNumberInactive}>3</td>
                  <td style={stepTextInactive}><strong>Resultaten</strong> — Je ontvangt bericht zodra er matches zijn</td>
                </tr>
              </table>
            </Section>

            {/* CTA */}
            <Section style={ctaSection}>
              <Button style={primaryButton} href={statusUrl}>
                Bekijk je status
              </Button>
            </Section>

            <Text style={mutedCenter}>
              Je ontvangt automatisch een e-mail zodra er matches zijn gevonden.
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
  padding: "40px 32px 32px",
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

const radarCard: React.CSSProperties = {
  backgroundColor: "#f7f8f6",
  border: "1px solid #e2e4e0",
  borderRadius: "12px",
  padding: "24px",
  marginBottom: "24px",
  textAlign: "center" as const,
};

const radarTitle: React.CSSProperties = {
  color: "#192111",
  fontSize: "16px",
  fontWeight: 700,
  margin: "0 0 16px",
};

const progressBarOuter: React.CSSProperties = {
  backgroundColor: "#e8eae5",
  borderRadius: "9999px",
  height: "8px",
  width: "100%",
  marginBottom: "12px",
};

const progressBarInner: React.CSSProperties = {
  backgroundColor: "#8ce830",
  borderRadius: "9999px",
  height: "8px",
  width: "65%",
};

const radarSubtext: React.CSSProperties = {
  color: "rgba(25, 33, 17, 0.5)",
  fontSize: "13px",
  fontWeight: 500,
  margin: "0",
};

const stepsSection: React.CSSProperties = {
  marginBottom: "32px",
};

const stepNumber: React.CSSProperties = {
  width: "32px",
  height: "32px",
  backgroundColor: "#8ce830",
  color: "#192111",
  borderRadius: "9999px",
  textAlign: "center" as const,
  verticalAlign: "top" as const,
  fontSize: "14px",
  fontWeight: 800,
  lineHeight: "32px",
};

const stepText: React.CSSProperties = {
  color: "#192111",
  fontSize: "14px",
  lineHeight: "1.5",
  paddingLeft: "12px",
  verticalAlign: "middle" as const,
};

const stepNumberInactive: React.CSSProperties = {
  ...stepNumber,
  backgroundColor: "#e8eae5",
  color: "rgba(25, 33, 17, 0.4)",
};

const stepTextInactive: React.CSSProperties = {
  ...stepText,
  color: "rgba(25, 33, 17, 0.4)",
};

const ctaSection: React.CSSProperties = {
  textAlign: "center" as const,
  marginBottom: "16px",
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
  color: "rgba(25, 33, 17, 0.45)",
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
