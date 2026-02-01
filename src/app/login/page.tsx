"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { Header } from "@/components/layout/Header";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const supabase = createClient();

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast.success("Welkom terug!");
      router.push(redirect);
      router.refresh();
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Inloggen mislukt", {
        description: error instanceof Error ? error.message : "Controleer je gegevens",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMagicLink = async () => {
    if (!email) {
      toast.error("Vul eerst je e-mailadres in");
      return;
    }
    setIsLoading(true);

    try {
      const supabase = createClient();
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
    } catch (error) {
      console.error("Magic link error:", error);
      toast.error("Kon geen link versturen", {
        description: error instanceof Error ? error.message : "Probeer het opnieuw",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full lg:w-1/2 max-w-[480px]">
      <div className="bg-white border border-[#e0e6db] rounded-2xl p-8 lg:p-12 shadow-sm">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-forest-green tracking-tight text-[32px] font-bold leading-tight pb-3">
            Welkom terug
          </h1>
          <p className="text-[#4a5542] text-base">
            Log in op je dashboard om hulpvragen te beheren.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold ml-1">E-mailadres</label>
            <input
              className="w-full rounded-xl border-[#e0e6db] bg-white h-14 placeholder:text-[#758961] px-4 text-base focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              placeholder="naam@organisatie.nl"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-end px-1">
              <label className="text-sm font-semibold">Wachtwoord</label>
              <button
                type="button"
                onClick={handleMagicLink}
                className="text-forest-green text-xs font-bold hover:underline"
              >
                Inloggen met e-mail link
              </button>
            </div>
            <div className="relative">
              <input
                className="w-full rounded-xl border-[#e0e6db] bg-white h-14 placeholder:text-[#758961] pl-4 pr-12 text-base focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="••••••••"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#758961] hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-gradient-to-r from-primary to-[#a2f551] hover:opacity-90 text-forest-green font-extrabold text-base rounded-full shadow-lg shadow-primary/20 transition-all transform hover:-translate-y-0.5 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:transform-none"
            >
              {isLoading ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-xl">progress_activity</span>
                  Bezig...
                </>
              ) : (
                <>
                  Inloggen
                  <span className="material-symbols-outlined">arrow_forward</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Bottom Link */}
        <div className="mt-10 pt-8 border-t border-[#e0e6db] text-center">
          <p className="text-sm text-[#4a5542]">
            Nog geen account?{" "}
            <Link className="text-forest-green font-bold hover:underline ml-1" href="/aanmelden">
              Meld je organisatie aan
            </Link>
          </p>
        </div>
      </div>

      {/* Mobile only info */}
      <div className="mt-8 lg:hidden text-center">
        <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">HulpRadar voor Professionals</p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="bg-background-light min-h-screen flex flex-col">
      <Header />

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center py-12 px-6">
        <div className="max-w-[1100px] w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left: Image */}
          <div className="hidden lg:block w-1/2 relative">
            <div className="rounded-2xl overflow-hidden h-[580px] w-full relative group">
              <img
                alt="Hulpverlener in een kantooromgeving"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTNZ2A_sftrfSlpbpXplnSPObYd0UlBs2CrcGBsRF7PaqwrJOjxte21bRo9-dhbBCjW0kPKrFHymme09A5FTe_6y_NvEhSkp04HURWEKjFwjaEy4PYDS0XraikyEoSDP0GfFC3vXzazNqZJzoKDEA7M0_rliL3Gsppge76LhIG4G-KHDUUIbvBUdzUGWsr8-baKOVV8hYTaS8Zi_zNoF9Pc2VVYcID7hq6wPe-txOHEb3R9yLGyvjAqJCPa2eEvlGhvWOqrgKzYw"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
              <div className="absolute bottom-10 left-10 right-10 p-6 bg-white/90 backdrop-blur rounded-xl border border-primary/20">
                <p className="text-forest-green font-semibold text-lg italic">
                  &ldquo;Samen maken we schuldhulpverlening toegankelijker en menselijker.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Right: Login Form */}
          <Suspense
            fallback={
              <div className="w-full lg:w-1/2 max-w-[480px]">
                <div className="bg-white border border-[#e0e6db] rounded-2xl p-12 flex items-center justify-center">
                  <span className="material-symbols-outlined animate-spin text-primary text-4xl">progress_activity</span>
                </div>
              </div>
            }
          >
            <LoginForm />
          </Suspense>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-10 px-6 text-center text-[#758961] text-xs">
        <div className="flex justify-center gap-6 mb-4">
          <Link className="hover:text-primary" href="/privacy-policy">Privacybeleid</Link>
          <Link className="hover:text-primary" href="/algemene-voorwaarden">Voorwaarden</Link>
          <Link className="hover:text-primary" href="/faq">Support</Link>
        </div>
        <p>© 2025 HulpRadar. Alle rechten voorbehouden.</p>
      </footer>
    </div>
  );
}
