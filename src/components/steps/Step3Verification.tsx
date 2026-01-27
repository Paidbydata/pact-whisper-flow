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
  const [checkAttempts, setCheckAttempts] = useState(0);

  const handleRefresh = async () => {
    setIsChecking(true);
    setCheckAttempts(prev => prev + 1);
    
    // Simulate checking verification status
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // For demo: verify after first attempt
    if (checkAttempts >= 0) {
      setEmailVerified(true);
    }
    
    setIsChecking(false);
  };

  const handleContinue = () => {
    if (email_verified) {
      nextStep();
    }
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
          Check your inbox.
        </h1>
      </div>

      {/* Email Icon Card */}
      <div className="glass-card rounded-2xl p-8 text-center space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mx-auto">
          {email_verified ? (
            <CheckCircle2 className="w-10 h-10 text-accent" />
          ) : (
            <Mail className="w-10 h-10 text-primary animate-pulse-slow" />
          )}
        </div>

        {email_verified ? (
          <div className="space-y-2">
            <p className="text-xl font-semibold text-accent">
              Email verified! 🎉
            </p>
            <p className="text-muted-foreground">
              You're confirmed as a real human. Let's continue.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-lg">
              We sent a verification link to:
            </p>
            <p className="text-primary font-semibold text-lg break-all">
              {user_email}
            </p>
          </div>
        )}
      </div>

      {/* Why Verify */}
      {!email_verified && (
        <div className="text-center space-y-2">
          <p className="text-muted-foreground text-sm">
            This protects sponsors from bots and you from spam.
          </p>
          <p className="text-muted-foreground text-sm">
            Can't find it? Check your spam folder.
          </p>
        </div>
      )}

      {/* CTA */}
      {email_verified ? (
        <Button 
          variant="hero" 
          size="lg" 
          className="w-full"
          onClick={handleContinue}
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

      {/* Resend Option */}
      {!email_verified && checkAttempts > 1 && (
        <button className="w-full text-center text-sm text-primary hover:underline">
          Didn't receive it? Resend verification email
        </button>
      )}
    </div>
  );
};
