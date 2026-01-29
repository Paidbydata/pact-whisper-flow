import { useState } from "react";
import { useOnboardingStore } from "@/store/useOnboardingStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle, ArrowLeft, Loader2, Mail, User } from "lucide-react";

export const Step2LeadCapture = () => {
  const { user_name, user_email, setUserName, setUserEmail, nextStep, prevStep } = useOnboardingStore();

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const validateForm = () => {
    const newErrors: { name?: string; email?: string } = {};

    if (!user_name.trim()) {
      newErrors.name = "Please enter your full name";
    } else if (user_name.trim().split(" ").length < 2) {
      newErrors.name = "Please enter your full name (first and last)";
    }

    if (!user_email.trim()) {
      newErrors.email = "Please enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user_email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate sending verification email
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsLoading(false);
    nextStep();
  };

  return (
    <div className="space-y-8 py-8">
      {/* Back Button */}
      <button
        onClick={prevStep}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Header */}
      <div className="space-y-2">
        <p className="text-sm text-primary font-medium">Step 2 of 6</p>
        <h1 className="text-2xl md:text-3xl font-display font-bold tracking-tight">The Value Exchange</h1>
        <p className="text-muted-foreground">Tell us who you are, and we'll verify you're a real human. That's it.</p>
      </div>

      {/* Form */}
      <div className="space-y-5">
        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="full-name" className="text-sm font-medium">
            Full Name
          </Label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              id="full-name"
              type="text"
              placeholder="Enter your full name"
              value={user_name}
              onChange={(e) => setUserName(e.target.value)}
              className="pl-12 h-12 glass-input"
            />
          </div>
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name}</p>
          )}
        </div>

        {/* Primary Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Primary Email Address
          </Label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="Enter your primary email"
              value={user_email}
              onChange={(e) => setUserEmail(e.target.value)}
              className="pl-12 h-12 glass-input"
            />
          </div>
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email}</p>
          )}
        </div>
      </div>

      {/* High-Emphasis Warning Callout */}
      <div className="glass-card rounded-xl p-4 border-l-4 border-golden">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-golden flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">
              Paid by Data works because brands pay to reach real people.
            </p>
            <p className="text-sm text-muted-foreground">
              Using a burner or fake email will fail verification.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <Button variant="hero" size="lg" className="w-full" onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Sending verification link…
          </>
        ) : (
          "Verify Email & Continue"
        )}
      </Button>
    </div>
  );
};
