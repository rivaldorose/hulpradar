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
 * Email 3: Nieuwe Hulpvraag (B2B) → Organisatie
 * Professional notification: anonymous help request matched to this organisation.
 * Privacy-first: no PII, only category + region + deadline.
 */
interface NewRequestOrganisationEmailProps {
  organisationName?: string;
  gemeente?: string;
  categorie?: string;
  helpRequestId?: string;
  expiresInHours?: number;
  appUrl?: string;
}

export default function NewRequestOrganisationEmail({
  organisationName = "Schuldhulp Amsterdam",
  gemeente = "Amsterdam",
  categorie = "Schuldhulpverlening",
  helpRequestId = "abc-123-def",
  expiresInHours = 48,
  appUrl = "https://hulpradar.konsensi-budgetbeheer.nl",
}: NewRequestOrganisationEmailProps) {
  const dashboardUrl = `${appUrl}/dashboard/aanvragen/${helpRequestId}`;

  return (
    <Html lang="nl">
      <Head>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');`}</style>
      </Head>
      <Preview>{`Nieuwe hulpvraag uit ${gemeente} — reageer binnen ${expiresInHours} uur`}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Green accent top bar */}
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
            <Text style={badge}>{categorie}</Text>
            <Heading style={h1}>Nieuwe Hulpvraag</Heading>

            <Section style={messageBody}>
              <Text style={paragraph}>
                Beste <strong>{organisationName}</strong>,
              </Text>
              <Text style={paragraph}>
                Er is een nieuwe hulpvraag binnengekomen via HulpRadar die op basis van
                locatie en specialisatie aan uw organisatie is gekoppeld.
              </Text>
            </Section>

            {/* Details card */}
            <Section style={detailCard}>
              <Row style={detailRow}>
                <Column style={detailLabel}>Regio</Column>
                <Column style={detailValue}>{gemeente}</Column>
              </Row>
              <Hr style={detailDivider} />
              <Row style={detailRow}>
                <Column style={detailLabel}>Categorie</Column>
                <Column style={detailValue}>{categorie}</Column>
              </Row>
              <Hr style={detailDivider} />
              <Row style={detailRow}>
                <Column style={detailLabel}>Reactietermijn</Column>
                <Column style={detailValueUrgent}>{expiresInHours} uur</Column>
              </Row>
              <Hr style={detailDivider} />
              <Row style={detailRow}>
                <Column style={detailLabel}>Status</Column>
                <Column style={detailValue}>
                  <span style={statusBadge}>Wacht op reactie</span>
                </Column>
              </Row>
            </Section>

            {/* CTA */}
            <Section style={ctaSection}>
              <Button style={primaryButton} href={dashboardUrl}>
                Bekijk aanvraag
              </Button>
            </Section>

            {/* Security note */}
            <Section style={securityNote}>
              <table cellPadding="0" cellSpacing="0" style={{ width: "100%" }}>
                <tr>
                  <td style={{ width: "24px", verticalAlign: "top" as const }}>
                    <Text style={lockIcon}>🔒</Text>
                  </td>
                  <td>
                    <Text style={securityText}>
                      Persoonsgegevens worden pas gedeeld na acceptatie van de hulpvraag
                      via het beveiligde dashboard.
                    </Text>
                  </td>
                </tr>
              </table>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
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
                  <Link href={`${appUrl}/dashboard`} style={footerLink}>Dashboard</Link>
                  <br />
                  <Link href={appUrl} style={footerLink}>HulpRadar.nl</Link>
                  <br />
                  <Link href={`${appUrl}/privacy-policy`} style={footerLink}>Privacy Policy</Link>
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

const badge: React.CSSProperties = {
  display: "inline-block",
  backgroundColor: "rgba(140, 232, 48, 0.15)",
  color: "#4a7c10",
  fontSize: "12px",
  fontWeight: 700,
  padding: "6px 16px",
  borderRadius: "9999px",
  margin: "0 0 16px",
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
};

const h1: React.CSSProperties = {
  color: "#192111",
  fontSize: "28px",
  fontWeight: 800,
  lineHeight: "1.3",
  margin: "0 0 20px",
  letterSpacing: "-0.02em",
};

const messageBody: React.CSSProperties = {};

const paragraph: React.CSSProperties = {
  color: "rgba(25, 33, 17, 0.7)",
  fontSize: "15px",
  fontWeight: 400,
  lineHeight: "1.6",
  margin: "0 0 14px",
};

const detailCard: React.CSSProperties = {
  backgroundColor: "#f7f8f6",
  border: "1px solid #e2e4e0",
  borderRadius: "12px",
  padding: "8px 24px",
  margin: "24px 0",
};

const detailRow: React.CSSProperties = {
  padding: "14px 0",
};

const detailLabel: React.CSSProperties = {
  color: "rgba(25, 33, 17, 0.5)",
  fontSize: "14px",
  fontWeight: 500,
  width: "140px",
  verticalAlign: "middle" as const,
};

const detailValue: React.CSSProperties = {
  color: "#192111",
  fontSize: "14px",
  fontWeight: 600,
  verticalAlign: "middle" as const,
};

const detailValueUrgent: React.CSSProperties = {
  color: "#b45309",
  fontSize: "14px",
  fontWeight: 700,
  verticalAlign: "middle" as const,
};

const detailDivider: React.CSSProperties = {
  borderColor: "#e8eae5",
  margin: "0",
};

const statusBadge: React.CSSProperties = {
  display: "inline-block",
  backgroundColor: "rgba(234, 179, 8, 0.15)",
  color: "#a16207",
  fontSize: "12px",
  fontWeight: 700,
  padding: "4px 12px",
  borderRadius: "9999px",
};

const ctaSection: React.CSSProperties = {
  textAlign: "center" as const,
  margin: "8px 0 24px",
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

const securityNote: React.CSSProperties = {
  backgroundColor: "rgba(140, 232, 48, 0.06)",
  border: "1px solid rgba(140, 232, 48, 0.15)",
  borderRadius: "10px",
  padding: "14px 18px",
};

const lockIcon: React.CSSProperties = {
  fontSize: "16px",
  margin: "0",
  lineHeight: "1.5",
};

const securityText: React.CSSProperties = {
  color: "rgba(25, 33, 17, 0.6)",
  fontSize: "13px",
  lineHeight: "1.5",
  margin: "0",
};

const footer: React.CSSProperties = {
  backgroundColor: "#192111",
  padding: "32px",
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

const footerLink: React.CSSProperties = {
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
