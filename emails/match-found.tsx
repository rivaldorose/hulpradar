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
 * Email 2: Matches Gevonden → Hulpzoekende
 * Celebration email: we found X organisations that can help.
 */
interface MatchFoundEmailProps {
  name?: string;
  helpRequestId?: string;
  matchCount?: number;
  appUrl?: string;
}

export default function MatchFoundEmail({
  name = "Alex",
  helpRequestId = "abc-123-def",
  matchCount = 3,
  appUrl = "https://hulpradar.konsensi-budgetbeheer.nl",
}: MatchFoundEmailProps) {
  const statusUrl = `${appUrl}/status/${helpRequestId}`;
  const matchWord = matchCount === 1 ? "Match" : "Matches";
  const orgWord = matchCount === 1 ? "organisatie" : "organisaties";

  return (
    <Html lang="nl">
      <Head>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');`}</style>
      </Head>
      <Preview>{`${matchCount} ${matchWord.toLowerCase()} gevonden — ${orgWord} willen je helpen!`}</Preview>
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

          {/* Content */}
          <Section style={content}>
            {/* Celebration icon */}
            <div style={iconBadge}>
              <Text style={iconText}>🎉</Text>
            </div>

            <Heading style={h1}>{matchCount} {matchWord} Gevonden!</Heading>
            <Text style={paragraph}>
              Geweldig nieuws, {name}! We hebben {matchCount} {orgWord} gevonden
              die bij jouw situatie passen en je kunnen helpen.
            </Text>

            {/* Match count card */}
            <Section style={matchCard}>
              <Text style={matchCountText}>{matchCount}</Text>
              <Text style={matchLabel}>{orgWord} klaar om te helpen</Text>
            </Section>

            {/* Timer info */}
            <Section style={timerCard}>
              <table cellPadding="0" cellSpacing="0" style={{ width: "100%" }}>
                <tr>
                  <td style={{ width: "40px", verticalAlign: "top" as const }}>
                    <Text style={timerIcon}>⏰</Text>
                  </td>
                  <td>
                    <Text style={timerTitle}>48 uur reactietijd</Text>
                    <Text style={timerDesc}>
                      De organisaties hebben 48 uur om je aanvraag te bekijken en te accepteren.
                      Je ontvangt direct bericht zodra er een reactie is.
                    </Text>
                  </td>
                </tr>
              </table>
            </Section>

            {/* What happens next */}
            <Section style={nextStepsSection}>
              <Text style={nextStepsTitle}>Wat gebeurt er nu?</Text>
              <table cellPadding="0" cellSpacing="0" style={{ width: "100%" }}>
                <tr>
                  <td style={checkIcon}>✓</td>
                  <td style={nextStepText}>Organisaties bekijken je aanvraag</td>
                </tr>
              </table>
              <table cellPadding="0" cellSpacing="0" style={{ width: "100%", marginTop: "8px" }}>
                <tr>
                  <td style={checkIcon}>✓</td>
                  <td style={nextStepText}>Bij acceptatie delen we je contactgegevens</td>
                </tr>
              </table>
              <table cellPadding="0" cellSpacing="0" style={{ width: "100%", marginTop: "8px" }}>
                <tr>
                  <td style={checkIcon}>✓</td>
                  <td style={nextStepText}>De organisatie neemt contact met je op</td>
                </tr>
              </table>
            </Section>

            {/* CTA */}
            <Section style={ctaSection}>
              <Button style={primaryButton} href={statusUrl}>
                Bekijk je matches
              </Button>
            </Section>
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
  width: "64px",
  height: "64px",
  lineHeight: "64px",
  fontSize: "32px",
  margin: "0",
  textAlign: "center" as const,
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

const matchCard: React.CSSProperties = {
  backgroundColor: "rgba(140, 232, 48, 0.1)",
  border: "2px solid rgba(140, 232, 48, 0.3)",
  borderRadius: "16px",
  padding: "28px",
  marginBottom: "20px",
  textAlign: "center" as const,
};

const matchCountText: React.CSSProperties = {
  color: "#192111",
  fontSize: "48px",
  fontWeight: 800,
  margin: "0",
  lineHeight: "1",
};

const matchLabel: React.CSSProperties = {
  color: "rgba(25, 33, 17, 0.6)",
  fontSize: "14px",
  fontWeight: 600,
  margin: "8px 0 0",
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
};

const timerCard: React.CSSProperties = {
  backgroundColor: "#fffbeb",
  border: "1px solid #fde68a",
  borderRadius: "12px",
  padding: "16px 20px",
  marginBottom: "24px",
};

const timerIcon: React.CSSProperties = {
  fontSize: "20px",
  margin: "0",
  lineHeight: "1.4",
};

const timerTitle: React.CSSProperties = {
  color: "#92400e",
  fontSize: "14px",
  fontWeight: 700,
  margin: "0 0 4px",
};

const timerDesc: React.CSSProperties = {
  color: "#a16207",
  fontSize: "13px",
  lineHeight: "1.5",
  margin: "0",
};

const nextStepsSection: React.CSSProperties = {
  backgroundColor: "#f7f8f6",
  border: "1px solid #e2e4e0",
  borderRadius: "12px",
  padding: "20px 24px",
  marginBottom: "28px",
};

const nextStepsTitle: React.CSSProperties = {
  color: "#192111",
  fontSize: "14px",
  fontWeight: 700,
  margin: "0 0 14px",
};

const checkIcon: React.CSSProperties = {
  color: "#8ce830",
  fontSize: "16px",
  fontWeight: 800,
  width: "24px",
  verticalAlign: "top" as const,
};

const nextStepText: React.CSSProperties = {
  color: "#192111",
  fontSize: "14px",
  lineHeight: "1.5",
  verticalAlign: "top" as const,
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
