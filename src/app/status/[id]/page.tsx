"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Radar,
  CheckCircle,
  Clock,
  XCircle,
  Building2,
  Mail,
  Phone,
  ExternalLink,
  Loader2,
  RefreshCw,
} from "lucide-react";

interface Match {
  id: string;
  status: "pending" | "accepted" | "rejected" | "expired";
  organisation: {
    name: string;
    email: string;
    phone: string | null;
    website: string | null;
    gemeente: string;
    estimated_wait_days: number;
    is_verified: boolean;
  };
  responded_at: string | null;
}

interface HelpRequestStatus {
  id: string;
  status: string;
  name: string;
  gemeente: string;
  created_at: string;
  matches: Match[];
}

const statusLabels: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  pending: { label: "Wacht op matches", color: "bg-yellow-500/10 text-yellow-500", icon: Clock },
  matching: { label: "Zoekt matches...", color: "bg-blue-500/10 text-blue-500", icon: Radar },
  matched: { label: "Matches gevonden", color: "bg-primary/10 text-primary", icon: CheckCircle },
  accepted: { label: "Geaccepteerd", color: "bg-green-500/10 text-green-500", icon: CheckCircle },
  in_progress: { label: "In behandeling", color: "bg-blue-500/10 text-blue-500", icon: Clock },
  completed: { label: "Afgerond", color: "bg-green-500/10 text-green-500", icon: CheckCircle },
  cancelled: { label: "Geannuleerd", color: "bg-red-500/10 text-red-500", icon: XCircle },
};

const matchStatusLabels: Record<string, { label: string; color: string }> = {
  pending: { label: "Wacht op reactie", color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" },
  accepted: { label: "Geaccepteerd", color: "bg-green-500/10 text-green-500 border-green-500/20" },
  rejected: { label: "Afgewezen", color: "bg-red-500/10 text-red-500 border-red-500/20" },
  expired: { label: "Verlopen", color: "bg-muted text-muted-foreground border-border" },
};

export default function StatusPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [status, setStatus] = useState<HelpRequestStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/help-request/${resolvedParams.id}/status`);

      if (!response.ok) {
        if (response.status === 404) {
          setError("Aanvraag niet gevonden");
        } else {
          setError("Er ging iets mis bij het ophalen van de status");
        }
        return;
      }

      const data = await response.json();
      setStatus(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching status:", err);
      setError("Er ging iets mis bij het ophalen van de status");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();

    // Poll for updates every 30 seconds
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, [resolvedParams.id]);

  const currentStatus = status ? statusLabels[status.status] || statusLabels.pending : statusLabels.pending;
  const StatusIcon = currentStatus.icon;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container max-w-screen-md mx-auto px-4">
          {loading && !status ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">Status ophalen...</p>
            </div>
          ) : error ? (
            <Card>
              <CardContent className="py-12 text-center">
                <XCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">{error}</h2>
                <p className="text-muted-foreground mb-6">
                  Controleer of je de juiste link hebt gebruikt.
                </p>
                <Link href="/">
                  <Button>Terug naar home</Button>
                </Link>
              </CardContent>
            </Card>
          ) : status ? (
            <div className="space-y-6">
              {/* Status Header */}
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl mb-2">
                        Hoi {status.name}!
                      </CardTitle>
                      <CardDescription>
                        Aanvraag voor hulp in {status.gemeente}
                      </CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={fetchStatus}
                      disabled={loading}
                    >
                      <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                      Vernieuwen
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border">
                    <div className={`p-3 rounded-full ${currentStatus.color}`}>
                      <StatusIcon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-semibold">{currentStatus.label}</p>
                      <p className="text-sm text-muted-foreground">
                        Aangemaakt op {new Date(status.created_at).toLocaleDateString("nl-NL", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Matches */}
              <div>
                <h2 className="text-lg font-semibold mb-4">
                  Gevonden organisaties ({status.matches.length})
                </h2>

                {status.matches.length === 0 ? (
                  <Card>
                    <CardContent className="py-8 text-center">
                      <Radar className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
                      <p className="text-muted-foreground">
                        We zijn nog op zoek naar organisaties in jouw regio...
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {status.matches.map((match) => {
                      const matchStatus = matchStatusLabels[match.status];
                      return (
                        <Card key={match.id} className={match.status === "accepted" ? "border-green-500/50" : ""}>
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                  <Building2 className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-semibold">{match.organisation.name}</h3>
                                    {match.organisation.is_verified && (
                                      <Badge variant="secondary" className="text-xs">
                                        <CheckCircle className="h-3 w-3 mr-1" />
                                        Geverifieerd
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-sm text-muted-foreground mb-3">
                                    {match.organisation.gemeente} • Geschatte wachttijd: {match.organisation.estimated_wait_days} dagen
                                  </p>

                                  {match.status === "accepted" && (
                                    <div className="space-y-2 text-sm">
                                      <a
                                        href={`mailto:${match.organisation.email}`}
                                        className="flex items-center gap-2 text-primary hover:underline"
                                      >
                                        <Mail className="h-4 w-4" />
                                        {match.organisation.email}
                                      </a>
                                      {match.organisation.phone && (
                                        <a
                                          href={`tel:${match.organisation.phone}`}
                                          className="flex items-center gap-2 text-primary hover:underline"
                                        >
                                          <Phone className="h-4 w-4" />
                                          {match.organisation.phone}
                                        </a>
                                      )}
                                      {match.organisation.website && (
                                        <a
                                          href={match.organisation.website}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="flex items-center gap-2 text-primary hover:underline"
                                        >
                                          <ExternalLink className="h-4 w-4" />
                                          Website bezoeken
                                        </a>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <Badge className={matchStatus.color}>
                                {matchStatus.label}
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Info Box */}
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Wat gebeurt er nu?</h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      Organisaties hebben 48 uur om te reageren op je aanvraag.
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      Je ontvangt een bericht zodra een organisatie je aanvraag accepteert.
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      Bij acceptatie krijg je de contactgegevens om direct in contact te komen.
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          ) : null}
        </div>
      </main>

      <Footer />
    </div>
  );
}
