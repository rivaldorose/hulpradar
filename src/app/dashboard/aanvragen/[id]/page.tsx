"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  User,
  MapPin,
  Mail,
  Phone,
  Clock,
  CheckCircle,
  XCircle,
  FileText,
  Loader2,
} from "lucide-react";
import Link from "next/link";

interface HelpRequest {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  gemeente: string;
  postcode: string;
  situation: string | null;
  contact_preference: string;
  status: string;
  created_at: string;
}

interface Match {
  id: string;
  status: string;
  priority: number;
  expires_at: string;
  responded_at: string | null;
  response_note: string | null;
  organisation_id: string;
}

const statusConfig: Record<string, { label: string; color: string }> = {
  pending: { label: "Wacht op reactie", color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20" },
  matched: { label: "Gematcht", color: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
  accepted: { label: "Geaccepteerd", color: "bg-green-500/10 text-green-600 border-green-500/20" },
  rejected: { label: "Afgewezen", color: "bg-red-500/10 text-red-600 border-red-500/20" },
  expired: { label: "Verlopen", color: "bg-gray-500/10 text-gray-600 border-gray-500/20" },
  matching: { label: "Zoekt matches", color: "bg-purple-500/10 text-purple-600 border-purple-500/20" },
};

export default function AanvraagDetailPage() {
  const params = useParams();
  const router = useRouter();
  const helpRequestId = params.id as string;

  const [helpRequest, setHelpRequest] = useState<HelpRequest | null>(null);
  const [match, setMatch] = useState<Match | null>(null);
  const [organisationId, setOrganisationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchData();
  }, [helpRequestId]);

  async function fetchData() {
    try {
      // First get status data (public endpoint)
      const statusRes = await fetch(`/api/help-request/${helpRequestId}/status`);
      if (!statusRes.ok) throw new Error("Aanvraag niet gevonden");
      const statusData = await statusRes.json();

      setHelpRequest({
        id: statusData.id,
        name: statusData.name,
        email: null, // hidden from status endpoint
        phone: null,
        gemeente: statusData.gemeente,
        postcode: "",
        situation: null,
        contact_preference: "email",
        status: statusData.status,
        created_at: statusData.created_at,
      });

      // Get the organisation match details from dashboard API
      const dashRes = await fetch(`/api/dashboard/aanvragen/${helpRequestId}`);
      if (dashRes.ok) {
        const dashData = await dashRes.json();
        if (dashData.helpRequest) {
          setHelpRequest(dashData.helpRequest);
        }
        if (dashData.match) {
          setMatch(dashData.match);
          setOrganisationId(dashData.match.organisation_id);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Er ging iets mis");
    } finally {
      setLoading(false);
    }
  }

  async function handleAccept() {
    if (!organisationId) return;
    setActionLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/dashboard/requests/${helpRequestId}/accept`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          organisation_id: organisationId,
          note: note || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setSuccess("Aanvraag geaccepteerd! De hulpzoekende ontvangt een e-mail met jouw contactgegevens.");
      // Refresh data
      fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Er ging iets mis");
    } finally {
      setActionLoading(false);
    }
  }

  async function handleReject() {
    if (!organisationId) return;
    setActionLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/dashboard/requests/${helpRequestId}/reject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          organisation_id: organisationId,
          reason: note || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setSuccess("Aanvraag afgewezen.");
      fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Er ging iets mis");
    } finally {
      setActionLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!helpRequest) {
    return (
      <div className="p-8">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Aanvraag niet gevonden.</p>
            <Link href="/dashboard/aanvragen">
              <Button variant="outline" className="mt-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Terug naar overzicht
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const matchStatus = match?.status || helpRequest.status;
  const config = statusConfig[matchStatus] || statusConfig.pending;
  const isPending = match?.status === "pending";
  const isAccepted = match?.status === "accepted";

  const hoursLeft = match?.expires_at
    ? Math.max(0, Math.round((new Date(match.expires_at).getTime() - Date.now()) / (1000 * 60 * 60)))
    : 0;

  return (
    <div className="p-8 max-w-4xl">
      {/* Back Button */}
      <Link
        href="/dashboard/aanvragen"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Terug naar aanvragen
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Hulpvraag van {helpRequest.name}</h1>
          <p className="text-muted-foreground">
            Aangevraagd op{" "}
            {new Date(helpRequest.created_at).toLocaleDateString("nl-NL", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        <Badge className={config.color}>{config.label}</Badge>
      </div>

      {/* Success Message */}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-xl mb-6 flex items-start gap-3">
          <CheckCircle className="h-5 w-5 mt-0.5 shrink-0" />
          <p>{success}</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-xl mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Person Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Gegevens hulpzoekende
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Naam</p>
                    <p className="font-medium">{helpRequest.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Locatie</p>
                    <p className="font-medium">
                      {helpRequest.gemeente}
                      {helpRequest.postcode ? ` (${helpRequest.postcode})` : ""}
                    </p>
                  </div>
                </div>
                {(isAccepted || isPending) && helpRequest.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">E-mail</p>
                      <p className="font-medium">{helpRequest.email}</p>
                    </div>
                  </div>
                )}
                {(isAccepted || isPending) && helpRequest.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Telefoon</p>
                      <p className="font-medium">{helpRequest.phone}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Situation */}
          {helpRequest.situation && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Situatiebeschrijving
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
                  {helpRequest.situation}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Action Area */}
          {isPending && (
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle>Reageer op deze aanvraag</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Bericht aan de hulpzoekende (optioneel)
                  </label>
                  <Textarea
                    placeholder="Bijv. 'We kunnen je volgende week al helpen...' of een reden voor afwijzing."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={handleAccept}
                    disabled={actionLoading}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    {actionLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <CheckCircle className="h-4 w-4 mr-2" />
                    )}
                    Accepteren
                  </Button>
                  <Button
                    onClick={handleReject}
                    disabled={actionLoading}
                    variant="outline"
                    className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
                  >
                    {actionLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <XCircle className="h-4 w-4 mr-2" />
                    )}
                    Afwijzen
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Accepted state */}
          {isAccepted && (
            <Card className="border-green-500/20 bg-green-50/50">
              <CardContent className="py-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-green-800 mb-1">
                      Je hebt deze aanvraag geaccepteerd
                    </h3>
                    <p className="text-green-700 text-sm">
                      De hulpzoekende heeft een e-mail ontvangen met jouw contactgegevens.
                      Neem zo snel mogelijk contact op.
                    </p>
                    {match?.response_note && (
                      <p className="text-green-700 text-sm mt-2 italic">
                        &quot;{match.response_note}&quot;
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Time Remaining */}
          {isPending && (
            <Card className={hoursLeft < 12 ? "border-red-200" : "border-yellow-200"}>
              <CardContent className="py-6">
                <div className="flex items-center gap-3">
                  <Clock className={`h-5 w-5 ${hoursLeft < 12 ? "text-red-500" : "text-yellow-500"}`} />
                  <div>
                    <p className="font-semibold text-lg">{hoursLeft}u resterend</p>
                    <p className="text-muted-foreground text-sm">
                      om te reageren
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Match Info */}
          {match && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Match details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Prioriteit</span>
                  <span className="font-medium">#{match.priority}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <Badge className={config.color} variant="outline">
                    {config.label}
                  </Badge>
                </div>
                {match.responded_at && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Gereageerd</span>
                    <span className="font-medium">
                      {new Date(match.responded_at).toLocaleDateString("nl-NL")}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Quick Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Hulpvraag info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Voorkeur contact</span>
                <span className="font-medium capitalize">{helpRequest.contact_preference}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Aangemaakt</span>
                <span className="font-medium">
                  {new Date(helpRequest.created_at).toLocaleDateString("nl-NL")}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
