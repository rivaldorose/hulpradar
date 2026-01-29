import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Inbox, Users, Clock, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
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
    .select("organisation_id, organisations(*)")
    .eq("user_id", user.id)
    .single();

  const orgUser = orgUserData as {
    organisation_id: string;
    organisations: {
      id: string;
      name: string;
      current_capacity: number;
      max_capacity: number;
      estimated_wait_days: number;
    } | null;
  } | null;

  const organisation = orgUser?.organisations as {
    id: string;
    name: string;
    current_capacity: number;
    max_capacity: number;
    estimated_wait_days: number;
  } | null;

  if (!organisation) {
    return (
      <div className="p-8">
        <Card>
          <CardContent className="py-12 text-center">
            <h2 className="text-xl font-semibold mb-2">Geen organisatie gevonden</h2>
            <p className="text-muted-foreground mb-4">
              Je account is nog niet gekoppeld aan een organisatie.
            </p>
            <Link href="/aanmelden">
              <Button>Organisatie aanmelden</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Get stats
  const { count: pendingCount } = await supabase
    .from("matches")
    .select("*", { count: "exact", head: true })
    .eq("organisation_id", organisation.id)
    .eq("status", "pending");

  const { count: acceptedCount } = await supabase
    .from("matches")
    .select("*", { count: "exact", head: true })
    .eq("organisation_id", organisation.id)
    .eq("status", "accepted");

  // Get recent pending requests
  const { data: recentRequests } = await supabase
    .from("matches")
    .select(
      `
      id,
      status,
      created_at,
      expires_at,
      help_requests (
        id,
        name,
        gemeente,
        created_at
      )
    `
    )
    .eq("organisation_id", organisation.id)
    .eq("status", "pending")
    .order("created_at", { ascending: false })
    .limit(5);

  const stats = [
    {
      label: "Nieuwe aanvragen",
      value: pendingCount || 0,
      icon: Inbox,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
    {
      label: "Geaccepteerde clients",
      value: acceptedCount || 0,
      icon: Users,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      label: "Geschatte wachttijd",
      value: `${organisation.estimated_wait_days} dagen`,
      icon: Clock,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      label: "Capaciteit",
      value: `${organisation.current_capacity}/${organisation.max_capacity}`,
      icon: TrendingUp,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Welkom, {organisation.name}
        </h1>
        <p className="text-muted-foreground">
          Beheer je hulpvragen en clients vanaf dit dashboard.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Requests */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recente Aanvragen</CardTitle>
            <CardDescription>
              Nieuwe hulpvragen die wachten op je reactie
            </CardDescription>
          </div>
          <Link href="/dashboard/aanvragen">
            <Button variant="outline" size="sm">
              Alle aanvragen
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {recentRequests && recentRequests.length > 0 ? (
            <div className="space-y-4">
              {recentRequests.map((match) => {
                const request = match.help_requests as unknown as {
                  id: string;
                  name: string;
                  gemeente: string;
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
                    className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
                  >
                    <div>
                      <p className="font-medium">{request?.name || "Onbekend"}</p>
                      <p className="text-sm text-muted-foreground">
                        {request?.gemeente || "Onbekend"} •{" "}
                        {request?.created_at
                          ? new Date(request.created_at).toLocaleDateString("nl-NL")
                          : ""}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        variant={hoursLeft < 12 ? "destructive" : "secondary"}
                        className="text-xs"
                      >
                        {hoursLeft}u resterend
                      </Badge>
                      <Link href={`/dashboard/aanvragen/${request?.id}`}>
                        <Button size="sm">Bekijk</Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Inbox className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Geen nieuwe aanvragen</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
