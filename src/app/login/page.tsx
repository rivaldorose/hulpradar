"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Radar, Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "magic-link">("login");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const supabase = createClient();

      if (mode === "magic-link") {
        const { error } = await supabase.auth.signInWithOtp({
          email,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback?redirect=${redirect}`,
          },
        });

        if (error) throw error;

        toast.success("Check je e-mail!", {
          description: "We hebben je een inloglink gestuurd.",
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        toast.success("Welkom terug!");
        router.push(redirect);
        router.refresh();
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Inloggen mislukt", {
        description: error instanceof Error ? error.message : "Controleer je gegevens",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-background">
      <Link href="/" className="flex items-center gap-2 mb-8">
        <Radar className="h-8 w-8 text-primary" />
        <span className="font-bold text-xl">HulpRadar</span>
      </Link>

      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Organisatie Login</CardTitle>
          <CardDescription>
            Log in om je hulpvragen te beheren
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mailadres</Label>
              <Input
                id="email"
                type="email"
                placeholder="je@organisatie.nl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {mode === "login" && (
              <div className="space-y-2">
                <Label htmlFor="password">Wachtwoord</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Bezig...
                </>
              ) : mode === "magic-link" ? (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Stuur inloglink
                </>
              ) : (
                "Inloggen"
              )}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  of
                </span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => setMode(mode === "login" ? "magic-link" : "login")}
            >
              {mode === "login" ? "Inloggen met e-mail link" : "Inloggen met wachtwoord"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>
              Nog geen account?{" "}
              <Link href="/aanmelden" className="text-primary hover:underline">
                Meld je organisatie aan
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>

      <p className="mt-8 text-sm text-muted-foreground">
        <Link href="/" className="hover:underline">
          Terug naar HulpRadar
        </Link>
      </p>
    </div>
  );
}
