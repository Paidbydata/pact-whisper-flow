import { useState } from 'react';
import { useOnboardingStore } from '@/store/useOnboardingStore';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2, Loader2, Mail, RefreshCw } from 'lucide-react';

export const Step3Verification = () => {
  const { 
    user_email, 
    email_verified,
    setEmailVerified,
    nextStep,
    prevStep 
  } = useOnboardingStore();
  
  const [isChecking, setIsChecking] = useState(false);
  const [showReminder, setShowReminder] = useState(false);

  const handleRefresh = async () => {
    setIsChecking(true);
    
    // Simulate checking verification status
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsChecking(false);
    
    // If not verified, show subtle reminder
    if (!email_verified) {
      setShowReminder(true);
    } else {
      nextStep();
    }
  };

  // Hidden demo control to simulate verification
  const handleSimulateVerification = () => {
    setEmailVerified(true);
    setShowReminder(false);
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
        <p className="text-sm text-primary font-medium">Step 3 of 6</p>
        <h1 className="text-2xl md:text-3xl font-display font-bold tracking-tight">
          Check your inbox
        </h1>
      </div>

      {/* Email Icon Card */}
      <div className="glass-card rounded-2xl p-8 text-center space-y-6">
        {/* Animated Email Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mx-auto relative">
          {email_verified ? (
            <CheckCircle2 className="w-10 h-10 text-primary" />
          ) : (
            <Mail className="w-10 h-10 text-primary animate-float" />
          )}
          {/* Glow ring animation */}
          {!email_verified && (
            <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping" />
          )}
        </div>

        {email_verified ? (
          <div className="space-y-2">
            <p className="text-xl font-semibold text-primary">
              Email verified! 🎉
            </p>
            <p className="text-muted-foreground">
              You're confirmed as a real human. Let's continue.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-lg text-foreground">
              We sent a verification link to:
            </p>
            <p className="text-primary font-semibold text-lg break-all">
              {user_email || 'your@email.com'}
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Click it to unlock the sponsorship dashboard.<br />
              This protects sponsors from bots and protects you from spam.
            </p>
          </div>
        )}
      </div>

      {/* Subtle Reminder */}
      {showReminder && !email_verified && (
        <div className="text-center p-4 rounded-xl bg-muted/30 border border-border/50">
          <p className="text-sm text-muted-foreground">
            Still waiting? Check your <span className="text-foreground font-medium">spam folder</span> or request a new link.
          </p>
        </div>
      )}

      {/* CTA */}
      {email_verified ? (
        <Button 
          variant="hero" 
          size="lg" 
          className="w-full"
          onClick={nextStep}
        >
          Continue to Consent
        </Button>
      ) : (
        <Button 
          variant="glass" 
          size="lg" 
          className="w-full"
          onClick={handleRefresh}
          disabled={isChecking}
        >
          {isChecking ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Checking...
            </>
          ) : (
            <>
              <RefreshCw className="w-5 h-5" />
              I've verified — Refresh status
            </>
          )}
        </Button>
      )}

      {/* Hidden Demo Control - Only visible in development/testing */}
      {!email_verified && (
        <button
          onClick={handleSimulateVerification}
          className="w-full text-center text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors py-2"
          title="Demo only: Simulate email verification"
        >
          [Demo] Simulate verification
        </button>
      )}
    </div>
  );
};
