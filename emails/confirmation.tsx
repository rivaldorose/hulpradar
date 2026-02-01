import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Button,
} from "@react-email/components";
import * as React from "react";

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
    <Html>
      <Head />
      <Preview>Je hulpvraag is ontvangen — we zoeken de beste match voor je</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Logo */}
          <Section style={logoSection}>
            <Heading style={logoText}>🟢 HulpRadar</Heading>
            <Text style={logoSubtext}>by Konsensi</Text>
          </Section>

          {/* Card */}
          <Section style={card}>
            <Heading style={h2}>Hoi {name} 👋</Heading>
            <Text style={paragraph}>
              We hebben je hulpvraag ontvangen! Onze radar scant nu organisaties
              in jouw regio om de beste match te vinden.
            </Text>

            <Section style={infoBox}>
              <Text style={infoTitle}>⏱ Wat kun je verwachten?</Text>
              <Text style={infoItem}>• We zoeken de beste hulporganisaties voor jou</Text>
              <Text style={infoItem}>• Organisaties hebben 48 uur om te reageren</Text>
              <Text style={infoItem}>• Je ontvangt een e-mail zodra er een match is</Text>
            </Section>

            <Section style={buttonContainer}>
              <Button style={primaryButton} href={statusUrl}>
                Bekijk je status →
              </Button>
            </Section>

            <Text style={mutedText}>Of kopieer deze link: {statusUrl}</Text>
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

const h2: React.CSSProperties = {
  color: "#1a3a1a",
  fontSize: "22px",
  margin: "0 0 8px",
};

const paragraph: React.CSSProperties = {
  color: "#4b5563",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "0 0 24px",
};

const infoBox: React.CSSProperties = {
  background: "#f0fdf0",
  borderRadius: "12px",
  padding: "20px",
  marginBottom: "24px",
};

const infoTitle: React.CSSProperties = {
  color: "#166534",
  fontSize: "14px",
  margin: "0 0 12px",
  fontWeight: 600,
};

const infoItem: React.CSSProperties = {
  color: "#166534",
  fontSize: "14px",
  margin: "0 0 4px",
  lineHeight: "1.8",
};

const buttonContainer: React.CSSProperties = {
  textAlign: "center" as const,
  marginBottom: "24px",
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

const mutedText: React.CSSProperties = {
  color: "#9ca3af",
  fontSize: "13px",
  margin: "0",
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
