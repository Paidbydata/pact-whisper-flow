import { useState } from 'react';
import { useOnboardingStore } from '@/store/useOnboardingStore';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, ChevronDown, ChevronUp, Eye, FileText, Shield, Wallet } from 'lucide-react';

interface ConsentToggleProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  id: string;
}

const ConsentToggle = ({ icon, title, description, checked, onCheckedChange, id }: ConsentToggleProps) => (
  <div className={`consent-toggle ${checked ? 'consent-toggle-active' : ''}`}>
    <div className="flex-shrink-0 mt-1">
      {icon}
    </div>
    <label htmlFor={id} className="flex-1 min-w-0 cursor-pointer">
      <p className="font-medium text-foreground text-sm">{title}</p>
      <p className="text-muted-foreground text-sm mt-1">{description}</p>
    </label>
    <Switch 
      id={id}
      checked={checked} 
      onCheckedChange={onCheckedChange}
      className="flex-shrink-0"
    />
  </div>
);

export const Step4Consent = () => {
  const { 
    consent_review,
    consent_sponsor,
    consent_tremendous,
    consent_data_rights,
    setConsentReview,
    setConsentSponsor,
    setConsentTremendous,
    setConsentDataRights,
    allConsentsGiven,
    nextStep,
    prevStep 
  } = useOnboardingStore();
  
  const [showDataSheet, setShowDataSheet] = useState(false);

  const allConsented = allConsentsGiven();

  return (
    <div className="space-y-6 py-8">
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
        <p className="text-sm text-primary font-medium">Step 4 of 6</p>
        <h1 className="text-2xl md:text-3xl font-display font-bold tracking-tight">
          Alpha Consent Guardrails
        </h1>
        <p className="text-muted-foreground">
          To proceed, we need explicit consent. No consent → no sponsorship. It's that simple.
        </p>
      </div>

      {/* Consent Toggles */}
      <div className="space-y-3">
        <ConsentToggle
          id="consent-review"
          icon={<Eye className="w-5 h-5 text-primary" />}
          title="Manual Review"
          description="I allow the PBD team to manually review my uploaded invoice to verify my Strava subscription."
          checked={consent_review}
          onCheckedChange={setConsentReview}
        />

        <ConsentToggle
          id="consent-sponsor"
          icon={<Shield className="w-5 h-5 text-primary" />}
          title="Sponsor Access"
          description="I agree to share my verified status, name, and email with the sponsoring UK ice-bath brand so they can fulfill the sponsorship and send offers."
          checked={consent_sponsor}
          onCheckedChange={setConsentSponsor}
        />

        <ConsentToggle
          id="consent-tremendous"
          icon={<Wallet className="w-5 h-5 text-primary" />}
          title="Payout Partner"
          description="I agree to share my details with Tremendous, our payout partner, to facilitate my £8.99 reward via Bank Transfer, Visa, or Gift Card."
          checked={consent_tremendous}
          onCheckedChange={setConsentTremendous}
        />

        <ConsentToggle
          id="consent-data-rights"
          icon={<FileText className="w-5 h-5 text-primary" />}
          title="Data Rights"
          description="I accept that in this Alpha, data deletion is processed manually via email within 30 days."
          checked={consent_data_rights}
          onCheckedChange={setConsentDataRights}
        />
      </div>

      {/* Privacy Summary Link */}
      <div className="glass-card rounded-xl p-4">
        <button 
          onClick={() => setShowDataSheet(!showDataSheet)}
          className="w-full flex items-center justify-between text-left"
        >
          <div>
            <p className="text-sm text-muted-foreground">
              We believe in <span className="text-primary font-medium">Transparency-by-Design</span>.
            </p>
            <p className="text-sm text-primary hover:underline mt-1">
              Read our Radically Honest Privacy Summary
            </p>
          </div>
          {showDataSheet ? (
            <ChevronUp className="w-5 h-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          )}
        </button>

        {showDataSheet && (
          <div className="mt-4 pt-4 border-t border-border/50 space-y-6 animate-fade-in">
            {/* TL;DR */}
            <div className="space-y-2">
              <h3 className="font-semibold text-golden text-sm">THE TL;DR (The Human Version)</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><span className="text-foreground font-medium">What we take:</span> Your name, email, and a verified image of your Strava receipt.</li>
                <li><span className="text-foreground font-medium">What we do with it:</span> We look at it to make sure you're a real person paying for Strava. Then we tell Monk (our sponsor) that you're a verified athlete.</li>
                <li><span className="text-foreground font-medium">What we never do:</span> We don't track your GPS routes, we don't look at your bank balance (please mask it!), and we never sell your data to random brokers.</li>
              </ul>
            </div>

            {/* Legal */}
            <div className="space-y-2">
              <h3 className="font-semibold text-golden text-sm">THE LEGAL MECHANICS (The GDPR Version)</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><span className="text-foreground font-medium">Lawful Basis:</span> We process your data based on Explicit Consent. You are choosing to enter this contract.</li>
                <li><span className="text-foreground font-medium">Data Minimization:</span> We only collect the bare minimum. Once verified, your raw invoice is scheduled for deletion.</li>
                <li><span className="text-foreground font-medium">Third Parties:</span> Monk (Sponsor) and Tremendous (Payout) only.</li>
                <li><span className="text-foreground font-medium">Your Rights:</span> You are the boss. Email roy.morrison@paidbydata.com to access or delete your data within 30 days.</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* CTA */}
      <Button 
        variant="hero" 
        size="lg" 
        className="w-full"
        onClick={nextStep}
        disabled={!allConsented}
      >
        {allConsented ? 'Unlock Sponsorship' : `Enable all ${4 - [consent_review, consent_sponsor, consent_tremendous, consent_data_rights].filter(Boolean).length} remaining consents`}
      </Button>
    </div>
  );
};
