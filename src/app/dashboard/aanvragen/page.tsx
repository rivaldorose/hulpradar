import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Inbox, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import Link from "next/link";

const statusConfig = {
  pending: {
    label: "Wacht op reactie",
    color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    icon: Clock,
  },
  accepted: {
    label: "Geaccepteerd",
    color: "bg-green-500/10 text-green-500 border-green-500/20",
    icon: CheckCircle,
  },
  rejected: {
    label: "Afgewezen",
    color: "bg-red-500/10 text-red-500 border-red-500/20",
    icon: XCircle,
  },
  expired: {
    label: "Verlopen",
    color: "bg-muted text-muted-foreground border-border",
    icon: AlertCircle,
  },
};

export default async function AanvragenPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  // Get user's organisation
  const { data: orgUserData } = await supabase
    .from("organisation_users")
    .select("organisation_id")
    .eq("user_id", user.id)
    .single();

  const orgUser = orgUserData as { organisation_id: string } | null;

  if (!orgUser) {
    return (
      <div className="p-8">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              Je bent niet gekoppeld aan een organisatie.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Get all matches for this organisation
  const { data: matches } = await supabase
    .from("matches")
    .select(
      `
      id,
      status,
      priority,
      created_at,
      expires_at,
      responded_at,
      help_requests (
        id,
        name,
        email,
        phone,
        gemeente,
        postcode,
        contact_preference,
        created_at
      )
    `
    )
    .eq("organisation_id", orgUser.organisation_id)
    .order("created_at", { ascending: false });

  // Group by status
  const grouped = {
    pending: matches?.filter((m) => m.status === "pending") || [],
    accepted: matches?.filter((m) => m.status === "accepted") || [],
    rejected: matches?.filter((m) => m.status === "rejected") || [],
    expired: matches?.filter((m) => m.status === "expired") || [],
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Aanvragen</h1>
        <p className="text-muted-foreground">
          Beheer alle hulpvragen die aan jouw organisatie zijn gekoppeld.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {Object.entries(grouped).map(([status, items]) => {
          const config = statusConfig[status as keyof typeof statusConfig];
          const Icon = config.icon;

          return (
            <Card key={status}>
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`p-2 rounded-lg ${config.color.split(" ")[0]}`}>
                  <Icon className={`h-5 w-5 ${config.color.split(" ")[1]}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{items.length}</p>
                  <p className="text-sm text-muted-foreground">{config.label}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Pending Requests */}
      {grouped.pending.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-500" />
              <CardTitle>Wachtend op reactie</CardTitle>
            </div>
            <CardDescription>
              Reageer binnen 48 uur om de hulpzoekende te helpen
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {grouped.pending.map((match) => {
                const request = match.help_requests as unknown as {
                  id: string;
                  name: string;
                  email: string | null;
                  phone: string | null;
                  gemeente: string;
                  postcode: string;
                  contact_preference: string;
                  created_at: string;
                };

                const expiresAt = new Date(match.expires_at);
                const now = new Date();
                const hoursLeft = Math.max(
                  0,
                  Math.round((expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60))
                );

                return (
                  <div
                    key={match.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <p className="font-semibold">{request?.name || "Onbekend"}</p>
                        <Badge variant="outline" className="text-xs">
                          {request?.gemeente}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Aangevraagd op{" "}
                        {request?.created_at
                          ? new Date(request.created_at).toLocaleDateString("nl-NL", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })
                          : "Onbekend"}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge
                        variant={hoursLeft < 12 ? "destructive" : "secondary"}
                      >
                        {hoursLeft}u resterend
                      </Badge>
                      <Link href={`/dashboard/aanvragen/${request?.id}`}>
                        <Button>Bekijk & Reageer</Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Accepted Requests */}
      {grouped.accepted.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <CardTitle>Geaccepteerd</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {grouped.accepted.map((match) => {
                const request = match.help_requests as unknown as {
                  id: string;
                  name: string;
                  gemeente: string;
                  created_at: string;
                };

                return (
                  <div
                    key={match.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-green-500/20 bg-green-500/5"
                  >
                    <div>
                      <p className="font-semibold">{request?.name || "Onbekend"}</p>
                      <p className="text-sm text-muted-foreground">
                        {request?.gemeente} • Geaccepteerd op{" "}
                        {match.responded_at
                          ? new Date(match.responded_at).toLocaleDateString("nl-NL")
                          : ""}
                      </p>
                    </div>
                    <Link href={`/dashboard/aanvragen/${request?.id}`}>
                      <Button variant="outline" size="sm">Bekijk</Button>
                    </Link>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {matches?.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Inbox className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-semibold mb-2">Geen aanvragen</h3>
            <p className="text-muted-foreground">
              Wanneer hulpzoekers in jouw regio een aanvraag doen, verschijnen ze hier.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
