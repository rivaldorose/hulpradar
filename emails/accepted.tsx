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
 * Email 4: Acceptatie → Organisatie
 * De organisatie krijgt de contactgegevens van de hulpzoekende.
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
  const dashboardUrl = `${appUrl}/dashboard/aanvragen/${helpRequestId}`;

  return (
    <Html lang="nl">
      <Head>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');`}</style>
      </Head>
      <Preview>{`Hulpvraag geaccepteerd — contactgegevens van ${helpSeekerName}`}</Preview>
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
              <Text style={iconText}>✅</Text>
            </div>

            <Heading style={h1}>Hulpvraag Geaccepteerd</Heading>

            <Section style={messageBody}>
              <Text style={paragraph}>
                Beste <strong>{organisationName}</strong>,
              </Text>
              <Text style={paragraph}>
                Bedankt dat u deze hulpvraag heeft geaccepteerd. Hieronder vindt u
                de contactgegevens van de hulpzoekende. Wij verzoeken u zo snel
                mogelijk contact op te nemen.
              </Text>
            </Section>

            {/* Contact Details Card */}
            <Section style={contactCard}>
              <Text style={contactCardTitle}>Contactgegevens hulpzoekende</Text>
              <Hr style={cardDivider} />

              <Row style={detailRow}>
                <Column style={detailLabel}>Naam</Column>
                <Column style={detailValue}>{helpSeekerName}</Column>
              </Row>
              <Hr style={cardDividerLight} />

              <Row style={detailRow}>
                <Column style={detailLabel}>E-mail</Column>
                <Column style={detailValue}>
                  <Link href={`mailto:${helpSeekerEmail}`} style={linkGreen}>
                    {helpSeekerEmail}
                  </Link>
                </Column>
              </Row>
              <Hr style={cardDividerLight} />

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

              <Row style={detailRow}>
                <Column style={detailLabel}>Regio</Column>
                <Column style={detailValue}>{gemeente}</Column>
              </Row>
            </Section>

            {/* Situation */}
            {situation && (
              <Section style={situationCard}>
                <Text style={situationTitle}>Omschrijving hulpvraag</Text>
                <Text style={situationText}>{situation}</Text>
              </Section>
            )}

            {/* CTA */}
            <Section style={ctaSection}>
              <Button style={primaryButton} href={`mailto:${helpSeekerEmail}`}>
                Neem contact op
              </Button>
              <Text style={ctaSub}>
                of bel direct: <Link href={`tel:${helpSeekerPhone}`} style={linkGreenSmall}>{helpSeekerPhone}</Link>
              </Text>
            </Section>

            {/* Info note */}
            <Section style={infoNote}>
              <Text style={infoNoteText}>
                <strong>Belangrijk:</strong> De hulpzoekende is op de hoogte
                gesteld dat uw organisatie contact gaat opnemen. Neem bij voorkeur
                binnen 24 uur contact op.
              </Text>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Section style={privacyBox}>
              <Text style={privacyText}>
                <strong>Privacy-melding:</strong> Deze contactgegevens zijn
                uitsluitend bestemd voor het verlenen van hulp aan deze
                hulpzoekende. Gebruik van gegevens voor andere doeleinden is niet
                toegestaan.
              </Text>
            </Section>

            <Text style={footerNote}>
              U ontvangt deze e-mail omdat uw organisatie een hulpvraag heeft
              geaccepteerd via het HulpRadar platform.
            </Text>

            <Section style={footerLinks}>
              <Link href={appUrl} style={footerLink}>HulpRadar.nl</Link>
              <Text style={footerDot}> • </Text>
              <Link href={`${appUrl}/dashboard`} style={footerLink}>Dashboard</Link>
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
};

const contactCard: React.CSSProperties = {
  backgroundColor: "#f7f8f6",
  border: "1px solid #e2e4e0",
  borderRadius: "12px",
  padding: "20px 24px",
  margin: "24px 0",
};

const contactCardTitle: React.CSSProperties = {
  color: "#141811",
  fontSize: "14px",
  fontWeight: 700,
  margin: "0 0 4px",
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
};

const cardDivider: React.CSSProperties = {
  borderColor: "#e2e4e0",
  margin: "12px 0",
};

const cardDividerLight: React.CSSProperties = {
  borderColor: "#f2f4f0",
  margin: "0",
};

const detailRow: React.CSSProperties = {
  padding: "10px 0",
};

const detailLabel: React.CSSProperties = {
  color: "rgba(20, 24, 17, 0.5)",
  fontSize: "14px",
  fontWeight: 500,
  width: "120px",
  verticalAlign: "middle" as const,
};

const detailValue: React.CSSProperties = {
  color: "#141811",
  fontSize: "14px",
  fontWeight: 600,
  verticalAlign: "middle" as const,
};

const linkGreen: React.CSSProperties = {
  color: "#16a34a",
  fontSize: "14px",
  fontWeight: 600,
  textDecoration: "none",
};

const linkGreenSmall: React.CSSProperties = {
  color: "#16a34a",
  fontWeight: 600,
  textDecoration: "none",
};

const situationCard: React.CSSProperties = {
  backgroundColor: "rgba(128, 236, 19, 0.06)",
  border: "1px solid rgba(128, 236, 19, 0.15)",
  borderRadius: "12px",
  padding: "20px 24px",
  marginBottom: "24px",
};

const situationTitle: React.CSSProperties = {
  color: "#141811",
  fontSize: "13px",
  fontWeight: 700,
  margin: "0 0 8px",
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
};

const situationText: React.CSSProperties = {
  color: "#141811",
  fontSize: "14px",
  lineHeight: "1.6",
  margin: "0",
};

const ctaSection: React.CSSProperties = {
  textAlign: "center" as const,
  padding: "8px 0 24px",
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

const ctaSub: React.CSSProperties = {
  color: "rgba(20, 24, 17, 0.5)",
  fontSize: "14px",
  margin: "12px 0 0",
};

const infoNote: React.CSSProperties = {
  backgroundColor: "rgba(128, 236, 19, 0.08)",
  border: "1px solid rgba(128, 236, 19, 0.2)",
  borderRadius: "8px",
  padding: "16px",
};

const infoNoteText: React.CSSProperties = {
  color: "#141811",
  fontSize: "13px",
  lineHeight: "1.5",
  margin: "0",
};

const footer: React.CSSProperties = {
  backgroundColor: "rgba(247, 248, 246, 0.5)",
  borderTop: "1px solid #f2f4f0",
  padding: "32px",
};

const privacyBox: React.CSSProperties = {
  backgroundColor: "rgba(255,255,255,0.5)",
  border: "1px solid #e2e4e0",
  borderRadius: "8px",
  padding: "16px",
  marginBottom: "24px",
};

const privacyText: React.CSSProperties = {
  color: "rgba(20, 24, 17, 0.6)",
  fontSize: "12px",
  lineHeight: "1.5",
  margin: "0",
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
