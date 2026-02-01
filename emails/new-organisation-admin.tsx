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
  Hr,
  Row,
  Column,
} from "@react-email/components";
import * as React from "react";

/**
 * Email 6: Admin Notificatie — Nieuwe Organisatie Aanmelding
 * Sent to admin (rivaldo.mac-andrew@konsensi-budgetbeheer.nl)
 * when a new organisation signs up via HulpRadar.
 */
interface NewOrganisationAdminEmailProps {
  organisatienaam?: string;
  contactNaam?: string;
  email?: string;
  telefoon?: string;
  specialisaties?: string[];
  gemeenten?: string;
  kvkNummer?: string;
  website?: string;
  appUrl?: string;
}

export default function NewOrganisationAdminEmail({
  organisatienaam = "Stichting Zorg & Welzijn",
  contactNaam = "Jan Janssen",
  email = "contact@organisatie.nl",
  telefoon = "06 12345678",
  specialisaties = ["Schuldhulpverlening", "Budgetcoaching"],
  gemeenten = "Amsterdam, Rotterdam",
  kvkNummer = "12345678",
  website = "https://www.organisatie.nl",
  appUrl = "https://hulpradar.konsensi-budgetbeheer.nl",
}: NewOrganisationAdminEmailProps) {
  return (
    <Html lang="nl">
      <Head>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');`}</style>
      </Head>
      <Preview>{`Nieuwe organisatie aanmelding: ${organisatienaam}`}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Orange accent top bar (admin = orange) */}
          <div style={accentBar} />

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
                  <span style={adminBadge}>ADMIN</span>
                </td>
              </tr>
            </table>
          </Section>

          {/* Content */}
          <Section style={content}>
            <Text style={badge}>Nieuwe Aanmelding</Text>
            <Heading style={h1}>Organisatie Registratie</Heading>

            <Text style={paragraph}>
              Er is een nieuwe organisatie aangemeld via HulpRadar. Hieronder vind je de details van de aanmelding.
            </Text>

            {/* Organisation Details Card */}
            <Section style={detailCard}>
              <Text style={cardTitle}>Organisatiegegevens</Text>
              <Row style={detailRow}>
                <Column style={detailLabel}>Naam organisatie</Column>
                <Column style={detailValue}>{organisatienaam}</Column>
              </Row>
              <Hr style={detailDivider} />
              <Row style={detailRow}>
                <Column style={detailLabel}>KVK-nummer</Column>
                <Column style={detailValue}>{kvkNummer || "—"}</Column>
              </Row>
              <Hr style={detailDivider} />
              <Row style={detailRow}>
                <Column style={detailLabel}>Website</Column>
                <Column style={detailValue}>{website || "—"}</Column>
              </Row>
              <Hr style={detailDivider} />
              <Row style={detailRow}>
                <Column style={detailLabel}>Type hulpverlening</Column>
                <Column style={detailValue}>
                  {specialisaties.join(", ")}
                </Column>
              </Row>
              <Hr style={detailDivider} />
              <Row style={detailRow}>
                <Column style={detailLabel}>Werkgebied</Column>
                <Column style={detailValue}>{gemeenten || "—"}</Column>
              </Row>
            </Section>

            {/* Contact Details Card */}
            <Section style={detailCard}>
              <Text style={cardTitle}>Contactpersoon</Text>
              <Row style={detailRow}>
                <Column style={detailLabel}>Naam</Column>
                <Column style={detailValue}>{contactNaam}</Column>
              </Row>
              <Hr style={detailDivider} />
              <Row style={detailRow}>
                <Column style={detailLabel}>E-mail</Column>
                <Column style={detailValue}>
                  <Link href={`mailto:${email}`} style={linkStyle}>{email}</Link>
                </Column>
              </Row>
              <Hr style={detailDivider} />
              <Row style={detailRow}>
                <Column style={detailLabel}>Telefoon</Column>
                <Column style={detailValue}>
                  {telefoon ? (
                    <Link href={`tel:${telefoon}`} style={linkStyle}>{telefoon}</Link>
                  ) : "—"}
                </Column>
              </Row>
            </Section>

            {/* Action note */}
            <Section style={actionNote}>
              <table cellPadding="0" cellSpacing="0" style={{ width: "100%" }}>
                <tr>
                  <td style={{ width: "24px", verticalAlign: "top" as const }}>
                    <Text style={noteIcon}>⚡</Text>
                  </td>
                  <td>
                    <Text style={noteText}>
                      <strong>Actie vereist:</strong> Verifieer deze organisatie en activeer het account in het admin dashboard.
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
                    Admin notificatie — Niet doorsturen
                  </Text>
                </td>
                <td style={{ verticalAlign: "top" as const, textAlign: "right" as const }}>
                  <Text style={footerLinkTitle}>Links</Text>
                  <Link href={`${appUrl}/dashboard`} style={footerLink}>Dashboard</Link>
                  <br />
                  <Link href={appUrl} style={footerLink}>HulpRadar.nl</Link>
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
  background: "linear-gradient(90deg, #f59e0b, #8ce830)",
};

const header: React.CSSProperties = {
  padding: "24px 32px",
  borderBottom: "1px solid #f2f4f0",
};

const adminBadge: React.CSSProperties = {
  display: "inline-block",
  backgroundColor: "rgba(245, 158, 11, 0.15)",
  color: "#b45309",
  fontSize: "11px",
  fontWeight: 800,
  padding: "4px 12px",
  borderRadius: "9999px",
  letterSpacing: "0.08em",
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

const cardTitle: React.CSSProperties = {
  color: "#192111",
  fontSize: "13px",
  fontWeight: 700,
  textTransform: "uppercase" as const,
  letterSpacing: "0.06em",
  margin: "12px 0 4px",
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

const detailDivider: React.CSSProperties = {
  borderColor: "#e8eae5",
  margin: "0",
};

const linkStyle: React.CSSProperties = {
  color: "#4a7c10",
  textDecoration: "none",
  fontWeight: 600,
};

const actionNote: React.CSSProperties = {
  backgroundColor: "rgba(245, 158, 11, 0.08)",
  border: "1px solid rgba(245, 158, 11, 0.2)",
  borderRadius: "10px",
  padding: "14px 18px",
  margin: "8px 0 0",
};

const noteIcon: React.CSSProperties = {
  fontSize: "16px",
  margin: "0",
  lineHeight: "1.5",
};

const noteText: React.CSSProperties = {
  color: "rgba(25, 33, 17, 0.7)",
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
