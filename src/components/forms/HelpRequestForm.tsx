"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Mail, Phone, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

// Dutch gemeentes list (simplified - in production this would be more comprehensive)
const GEMEENTES = [
  "Amsterdam", "Rotterdam", "Den Haag", "Utrecht", "Eindhoven",
  "Groningen", "Tilburg", "Almere", "Breda", "Nijmegen",
  "Apeldoorn", "Haarlem", "Arnhem", "Zaanstad", "Amersfoort",
  "Haarlemmermeer", "'s-Hertogenbosch", "Zoetermeer", "Zwolle", "Maastricht",
  "Dordrecht", "Leiden", "Ede", "Alphen aan den Rijn", "Westland",
  // Add more as needed
].sort();

type ContactPreference = "email" | "sms" | "app";

interface FormData {
  name: string;
  email: string;
  phone: string;
  postcode: string;
  gemeente: string;
  contact_preference: ContactPreference;
}

interface HelpRequestFormProps {
  source?: "website" | "konsensi_app" | "white_label";
  sourceOrganisationId?: string;
  konsensiUserId?: string;
  prefilled?: Partial<FormData>;
}

export function HelpRequestForm({
  source = "website",
  sourceOrganisationId,
  konsensiUserId,
  prefilled,
}: HelpRequestFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: prefilled?.name || "",
    email: prefilled?.email || "",
    phone: prefilled?.phone || "",
    postcode: prefilled?.postcode || "",
    gemeente: prefilled?.gemeente || "",
    contact_preference: prefilled?.contact_preference || "email",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Vul je naam in";
    }

    if (!formData.postcode.trim()) {
      newErrors.postcode = "Vul je postcode in";
    } else if (!/^\d{4}\s?[A-Za-z]{2}$/.test(formData.postcode.trim())) {
      newErrors.postcode = "Ongeldige postcode (bijv. 1234 AB)";
    }

    if (!formData.gemeente.trim()) {
      newErrors.gemeente = "Selecteer je gemeente";
    }

    // Validate contact method based on preference
    if (formData.contact_preference === "email") {
      if (!formData.email.trim()) {
        newErrors.email = "Vul je e-mailadres in";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Ongeldig e-mailadres";
      }
    } else if (formData.contact_preference === "sms") {
      if (!formData.phone.trim()) {
        newErrors.phone = "Vul je telefoonnummer in";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/help-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          postcode: formData.postcode.toUpperCase().replace(/\s/g, ""),
          source,
          source_organisation_id: sourceOrganisationId,
          konsensi_user_id: konsensiUserId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Er ging iets mis");
      }

      toast.success("Aanvraag verzonden!", {
        description: `We hebben ${data.matches_count} organisaties gevonden.`,
      });

      // Redirect to status page
      router.push(`/status/${data.help_request_id}`);
    } catch (error) {
      console.error("Error submitting help request:", error);
      toast.error("Er ging iets mis", {
        description: error instanceof Error ? error.message : "Probeer het opnieuw",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const contactOptions = [
    { value: "email" as const, label: "E-mail", icon: Mail, disabled: false },
    { value: "sms" as const, label: "SMS", icon: Phone, disabled: false },
    { value: "app" as const, label: "Konsensi App", icon: Smartphone, disabled: !konsensiUserId },
  ];

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Zoek Hulp</CardTitle>
        <CardDescription>
          Vul je gegevens in en we koppelen je aan schuldhulporganisaties in jouw regio.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Naam *</Label>
            <Input
              id="name"
              type="text"
              placeholder="Je naam"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>

          {/* Postcode */}
          <div className="space-y-2">
            <Label htmlFor="postcode">Postcode *</Label>
            <Input
              id="postcode"
              type="text"
              placeholder="1234 AB"
              value={formData.postcode}
              onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
              className={errors.postcode ? "border-destructive" : ""}
              maxLength={7}
            />
            {errors.postcode && (
              <p className="text-sm text-destructive">{errors.postcode}</p>
            )}
          </div>

          {/* Gemeente */}
          <div className="space-y-2">
            <Label htmlFor="gemeente">Gemeente *</Label>
            <select
              id="gemeente"
              value={formData.gemeente}
              onChange={(e) => setFormData({ ...formData, gemeente: e.target.value })}
              className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                errors.gemeente ? "border-destructive" : "border-input"
              }`}
            >
              <option value="">Selecteer je gemeente</option>
              {GEMEENTES.map((gemeente) => (
                <option key={gemeente} value={gemeente}>
                  {gemeente}
                </option>
              ))}
            </select>
            {errors.gemeente && (
              <p className="text-sm text-destructive">{errors.gemeente}</p>
            )}
          </div>

          {/* Contact Preference */}
          <div className="space-y-3">
            <Label>Hoe wil je bereikt worden? *</Label>
            <div className="grid grid-cols-3 gap-2">
              {contactOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.value}
                    type="button"
                    disabled={option.disabled}
                    onClick={() =>
                      setFormData({ ...formData, contact_preference: option.value as ContactPreference })
                    }
                    className={`flex flex-col items-center gap-2 p-4 rounded-lg border transition-all ${
                      formData.contact_preference === option.value
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/50"
                    } ${option.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-sm font-medium">{option.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Email (shown when email preference) */}
          {formData.contact_preference === "email" && (
            <div className="space-y-2 animate-fade-in-up">
              <Label htmlFor="email">E-mailadres *</Label>
              <Input
                id="email"
                type="email"
                placeholder="je@email.nl"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>
          )}

          {/* Phone (shown when sms preference) */}
          {formData.contact_preference === "sms" && (
            <div className="space-y-2 animate-fade-in-up">
              <Label htmlFor="phone">Telefoonnummer *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="06-12345678"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={errors.phone ? "border-destructive" : ""}
              />
              {errors.phone && (
                <p className="text-sm text-destructive">{errors.phone}</p>
              )}
            </div>
          )}

          {/* Submit */}
          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Bezig met zoeken...
              </>
            ) : (
              "Zoek Hulp"
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Je gegevens worden vertrouwelijk behandeld en alleen gedeeld met organisaties die je kunnen helpen.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
