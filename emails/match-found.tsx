import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Button,
} from "@react-email/components";
import * as React from "react";

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
  const matchWord = matchCount === 1 ? "match" : "matches";
  const orgWord = matchCount === 1 ? "organisatie" : "organisaties";
  const verbWord = matchCount === 1 ? "is" : "zijn";

  return (
    <Html>
      <Head />
      <Preview>{`${matchCount} ${matchWord} gevonden — er ${verbWord} ${orgWord} die je kunnen helpen!`}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Logo */}
          <Section style={logoSection}>
            <Heading style={logoText}>🟢 HulpRadar</Heading>
            <Text style={logoSubtext}>by Konsensi</Text>
          </Section>

          {/* Card */}
          <Section style={card}>
            {/* Emoji */}
            <Section style={emojiContainer}>
              <Text style={emojiBadge}>🎉</Text>
            </Section>

            <Heading style={h2Center}>
              We hebben {matchCount} {matchWord} gevonden!
            </Heading>
            <Text style={paragraphCenter}>
              Goed nieuws {name}! Er {verbWord} {matchCount} {orgWord} in jouw
              regio die je kunnen helpen.
            </Text>

            <Section style={warningBox}>
              <Text style={warningText}>
                ⏳ De organisaties hebben <strong>48 uur</strong> om te
                reageren. Je ontvangt een mail zodra een organisatie je aanvraag
                accepteert.
              </Text>
            </Section>

            <Section style={buttonContainer}>
              <Button style={primaryButton} href={statusUrl}>
                Bekijk je matches →
              </Button>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              © {new Date().getFullYear()} HulpRadar — Konsensi Budgetbeheer
            </Text>
            <Text style={footerText}>
              Je ontvangt deze e-mail omdat je onze hulpservice hebt gebruikt.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// ──────────────── Styles ────────────────

const main: React.CSSProperties = {
  backgroundColor: "#f4f7f4",
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

const container: React.CSSProperties = {
  maxWidth: "600px",
  margin: "0 auto",
  padding: "40px 20px",
};

const logoSection: React.CSSProperties = {
  textAlign: "center" as const,
  marginBottom: "32px",
};

const logoText: React.CSSProperties = {
  color: "#1a3a1a",
  fontSize: "24px",
  margin: "0",
};

const logoSubtext: React.CSSProperties = {
  color: "#618964",
  fontSize: "14px",
  margin: "4px 0 0",
};

const card: React.CSSProperties = {
  background: "#ffffff",
  borderRadius: "16px",
  padding: "40px 32px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
};

const emojiContainer: React.CSSProperties = {
  textAlign: "center" as const,
  marginBottom: "24px",
};

const emojiBadge: React.CSSProperties = {
  display: "inline-block",
  background: "#f0fdf0",
  borderRadius: "50%",
  width: "64px",
  height: "64px",
  lineHeight: "64px",
  fontSize: "32px",
  margin: "0",
  textAlign: "center" as const,
};

const h2Center: React.CSSProperties = {
  color: "#1a3a1a",
  fontSize: "22px",
  margin: "0 0 8px",
  textAlign: "center" as const,
};

const paragraphCenter: React.CSSProperties = {
  color: "#4b5563",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "0 0 24px",
  textAlign: "center" as const,
};

const warningBox: React.CSSProperties = {
  background: "#fefce8",
  borderRadius: "12px",
  padding: "16px 20px",
  marginBottom: "24px",
};

const warningText: React.CSSProperties = {
  color: "#854d0e",
  fontSize: "14px",
  margin: "0",
};

const buttonContainer: React.CSSProperties = {
  textAlign: "center" as const,
};

const primaryButton: React.CSSProperties = {
  backgroundColor: "#22c55e",
  color: "#ffffff",
  padding: "14px 32px",
  borderRadius: "100px",
  fontWeight: 600,
  fontSize: "16px",
  textDecoration: "none",
  display: "inline-block",
};

const footer: React.CSSProperties = {
  textAlign: "center" as const,
  marginTop: "32px",
};

const footerText: React.CSSProperties = {
  color: "#9ca3af",
  fontSize: "12px",
  margin: "0 0 4px",
};
