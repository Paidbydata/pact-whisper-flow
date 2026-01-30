import { useOnboardingStore } from '@/store/useOnboardingStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Shield, Sparkles, Users } from 'lucide-react';
import { useState } from 'react';

export const Step1AlphaEntry = () => {
  const { slots_filled, slots_remaining, nextStep, waitlist_email, setWaitlistEmail } = useOnboardingStore();
  const [showWaitlist, setShowWaitlist] = useState(false);
  
  const isFull = slots_remaining <= 0;
  const totalSlots = slots_filled + slots_remaining;

  if (isFull || showWaitlist) {
    return (
      <div className="space-y-8 py-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted/50 mb-4">
            <Users className="w-8 h-8 text-muted-foreground" />
          </div>
          
          <h1 className="text-3xl font-display font-bold tracking-tight">
            The first 100 users have checked in.
          </h1>
          
          <p className="text-muted-foreground text-lg leading-relaxed">
            We're at capacity for Pilot 0.1. We want to prove the model works perfectly before we scale. Join the waitlist for Pilot 0.2.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 space-y-4">
          <Input
            type="email"
            placeholder="your@email.com"
            value={waitlist_email}
            onChange={(e) => setWaitlistEmail(e.target.value)}
            className="glass-input h-12 text-base"
          />
          
          <Button 
            variant="hero" 
            size="lg" 
            className="w-full"
            disabled={!waitlist_email.includes('@')}
          >
            Notify me when Pilot 0.2 opens
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 animate-float">
          <Sparkles className="w-8 h-8 text-primary" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight leading-tight">
          Let's prove your data has{' '}
          <span className="text-gradient-primary">market value</span>.
        </h1>
        
        <p className="text-muted-foreground text-lg leading-relaxed">
          Welcome to the Paid by Data Alpha.
        </p>
        
        <p className="text-muted-foreground text-base leading-relaxed">
          We're testing a simple idea: brands should pay you directly for access to your verified Strava subscription payment — with your explicit consent.
        </p>
        
        <p className="text-muted-foreground text-base leading-relaxed">
          For this pilot, participation is simple and limited.
        </p>
        
        <p className="text-muted-foreground text-sm leading-relaxed italic">
          We only analyse verified subscription or transaction data. Nothing else.
        </p>
      </div>

      {/* Value Proposition Card */}
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-golden/10">
            <Shield className="w-5 h-5 text-golden" />
          </div>
          <div>
            <p className="font-medium text-foreground">🔒 Current Sponsorship</p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              A UK-based ice-bath company is sponsoring <span className="text-golden font-semibold">one month of Strava (£8.99)</span> in exchange for a one-time consent to share your Strava payment and basic contact details (name + email).
            </p>
          </div>
        </div>
        
        <div className="h-px bg-border/50" />
        
        <p className="text-sm text-muted-foreground leading-relaxed">
          Once verified, your Strava month is paid out within 7 days via <span className="font-medium text-foreground">Tremendous</span>, our trusted payout partner.
        </p>
      </div>

      {/* Capacity Badge */}
      <div className="flex justify-center">
        <div className="capacity-badge">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-golden opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-golden"></span>
          </span>
          Capacity: {slots_filled} / {totalSlots} Slots Filled
        </div>
      </div>

      {/* CTA */}
      <Button 
        variant="hero" 
        size="xl" 
        className="w-full"
        onClick={nextStep}
      >
        Start the Pilot
      </Button>

      {/* Trust Footer */}
      <p className="text-center text-xs text-muted-foreground">
        No credit card required • Manual verification • Real £8.99 value
      </p>
    </div>
  );
};
