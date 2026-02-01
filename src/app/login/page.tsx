"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

function HulpRadarLogo({ className = "size-8" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.8261 30.5736C16.7203 29.8826 20.2244 29.4783 24 29.4783C27.7756 29.4783 31.2797 29.8826 34.1739 30.5736C36.9144 31.2278 39.9967 32.7669 41.3563 33.8352L24.8486 7.36089C24.4571 6.73303 23.5429 6.73303 23.1514 7.36089L6.64374 33.8352C8.00331 32.7669 11.0856 31.2278 13.8261 30.5736Z" fill="currentColor" />
      <path clipRule="evenodd" d="M39.998 35.764C39.9944 35.7463 39.9875 35.7155 39.9748 35.6706C39.9436 35.5601 39.8949 35.4259 39.8346 35.2825C39.8168 35.2403 39.7989 35.1993 39.7813 35.1602C38.5103 34.2887 35.9788 33.0607 33.7095 32.5189C30.9875 31.8691 27.6413 31.4783 24 31.4783C20.3587 31.4783 17.0125 31.8691 14.2905 32.5189C12.0012 33.0654 9.44505 34.3104 8.18538 35.1832C8.17384 35.2075 8.16216 35.233 8.15052 35.2592C8.09919 35.3751 8.05721 35.4886 8.02977 35.589C8.00356 35.6848 8.00039 35.7333 8.00004 35.7388C8.00004 35.739 8 35.7393 8.00004 35.7388C8.00004 35.7641 8.0104 36.0767 8.68485 36.6314C9.34546 37.1746 10.4222 37.7531 11.9291 38.2772C14.9242 39.319 19.1919 40 24 40C28.8081 40 33.0758 39.319 36.0709 38.2772C37.5778 37.7531 38.6545 37.1746 39.3151 36.6314C39.9006 36.1499 39.9857 35.8511 39.998 35.764ZM4.95178 32.7688L21.4543 6.30267C22.6288 4.4191 25.3712 4.41909 26.5457 6.30267L43.0534 32.777C43.0709 32.8052 43.0878 32.8338 43.104 32.8629L41.3563 33.8352C43.104 32.8629 43.1038 32.8626 43.104 32.8629L43.1051 32.865L43.1065 32.8675L43.1101 32.8739L43.1199 32.8918C43.1276 32.906 43.1377 32.9246 43.1497 32.9473C43.1738 32.9925 43.2062 33.0545 43.244 33.1299C43.319 33.2792 43.4196 33.489 43.5217 33.7317C43.6901 34.1321 44 34.9311 44 35.7391C44 37.4427 43.003 38.7775 41.8558 39.7209C40.6947 40.6757 39.1354 41.4464 37.385 42.0552C33.8654 43.2794 29.133 44 24 44C18.867 44 14.1346 43.2794 10.615 42.0552C8.86463 41.4464 7.30529 40.6757 6.14419 39.7209C4.99695 38.7775 3.99999 37.4427 3.99999 35.7391C3.99999 34.8725 4.29264 34.0922 4.49321 33.6393C4.60375 33.3898 4.71348 33.1804 4.79687 33.0311C4.83898 32.9556 4.87547 32.8935 4.9035 32.8471C4.91754 32.8238 4.92954 32.8043 4.93916 32.7889L4.94662 32.777L4.95178 32.7688ZM35.9868 29.004L24 9.77997L12.0131 29.004C12.4661 28.8609 12.9179 28.7342 13.3617 28.6282C16.4281 27.8961 20.0901 27.4783 24 27.4783C27.9099 27.4783 31.5719 27.8961 34.6383 28.6282C35.082 28.7342 35.5339 28.8609 35.9868 29.004Z" fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}

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
      {/* Navbar */}
      <header className="flex items-center justify-between border-b border-[#e0e6db] px-6 lg:px-20 py-4 bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2">
          <div className="text-primary">
            <HulpRadarLogo />
          </div>
          <h2 className="text-xl font-bold leading-tight tracking-tight">HulpRadar</h2>
        </Link>
        <div className="hidden md:flex flex-1 justify-end gap-8 items-center">
          <nav className="flex items-center gap-9">
            <Link className="text-sm font-medium hover:text-primary transition-colors" href="/over-ons">Over ons</Link>
            <Link className="text-sm font-medium hover:text-primary transition-colors" href="/hoe-het-werkt">Hoe het werkt</Link>
            <Link className="text-sm font-medium hover:text-primary transition-colors" href="/faq">Contact</Link>
          </nav>
          <Link
            href="/aanmelden"
            className="bg-primary hover:bg-opacity-90 text-forest-green px-6 py-2.5 rounded-full text-sm font-bold transition-all transform hover:scale-105"
          >
            Meld je aan
          </Link>
        </div>
      </header>

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
