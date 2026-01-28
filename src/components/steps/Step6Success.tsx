import { useState } from 'react';
import { useOnboardingStore } from '@/store/useOnboardingStore';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle2, Clock, ExternalLink, Share2, Snowflake, Star, Users } from 'lucide-react';
import monkIceBath from '@/assets/monk-ice-bath.jpg';

export const Step6Success = () => {
  const { 
    user_name,
    rating, 
    feedback,
    setRating,
    setFeedback,
    submission_status,
    resetOnboarding
  } = useOnboardingStore();

  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleShare = async () => {
    const shareText = `I just joined the Paid by Data Alpha – a pilot where my subscription data actually gets me paid. 

They're sponsoring my Strava subscription (£8.99) through a UK ice-bath brand. Only 100 spots available.

Check it out: https://paidbydata.com/alpha`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Paid by Data Alpha',
          text: shareText,
        });
      } catch (err) {
        // User cancelled or error
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareText);
    }
  };

  const handleFeedbackSubmit = () => {
    setFeedbackSubmitted(true);
  };

  const firstName = user_name.split(' ')[0] || 'Architect';

  return (
    <div className="space-y-8 py-8">
      {/* Success Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/10 mb-2">
          <CheckCircle2 className="w-10 h-10 text-accent" />
        </div>
        
        <h1 className="text-2xl md:text-3xl font-display font-bold tracking-tight">
          Evidence submitted.
        </h1>
        
        <p className="text-lg text-muted-foreground">
          Nice one, {firstName}. You're officially an architect.
        </p>
      </div>

      {/* Sponsor Reveal Card */}
      <div className="glass-card rounded-2xl overflow-hidden glow-effect">
        {/* Ice Bath Image */}
        <div className="relative w-full aspect-[16/10] md:aspect-[16/8]">
          <img 
            src={monkIceBath} 
            alt="Monk Ice Bath - Premium cold therapy equipment"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
        </div>

        {/* Card Content */}
        <div className="p-6 space-y-4 -mt-12 relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-primary/20 backdrop-blur-sm border border-primary/30">
              <Snowflake className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Your Sponsor</p>
              <p className="text-xl font-display font-bold text-gradient-golden">Monk</p>
            </div>
          </div>
          
          <div className="h-px bg-border/50" />
          
          <div className="space-y-2">
            <p className="text-sm font-medium text-primary">Why Monk?</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Monk supports people who train consistently. Strava is used by athletes who track effort and recovery—the exact people Monk builds ice baths for. They are a UK-based cold therapy brand focused on recovery and resilience.
            </p>
          </div>
        </div>
      </div>

      {/* Status Card */}
      <div className="glass-card rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-golden" />
            <span className="font-medium">Status</span>
          </div>
          <span className="text-golden font-semibold">Pending Manual Review</span>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Our team is reviewing your proof. Upon approval, your reward link arrives via email from Tremendous.
        </p>
      </div>

      {/* Divider */}
      <div className="h-px bg-border/30" />

      {/* Feedback Section */}
      {!feedbackSubmitted ? (
        <div className="space-y-4">
          <h2 className="text-lg font-display font-semibold">
            What do you think of Paid by Data?
          </h2>
          
          {/* Star Rating */}
          <div className="star-rating justify-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="p-1"
              >
                <Star 
                  className={`w-8 h-8 transition-colors ${
                    star <= rating 
                      ? 'fill-golden text-golden' 
                      : 'text-muted-foreground hover:text-golden/50'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Feedback Text */}
          <Textarea
            placeholder="Be honest. We're architects building this together..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="glass-input min-h-[100px] resize-none"
          />

          <Button 
            variant="glass" 
            className="w-full"
            onClick={handleFeedbackSubmit}
            disabled={rating === 0}
          >
            Submit Feedback
          </Button>
        </div>
      ) : (
        <div className="text-center py-4">
          <p className="text-accent font-medium">Thanks for your feedback! 🙏</p>
        </div>
      )}

      {/* Divider */}
      <div className="h-px bg-border/30" />

      {/* Referral Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Users className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-display font-semibold">
            Nominate a fellow architect.
          </h2>
        </div>
        
        <p className="text-sm text-muted-foreground">
          We're building this for people who actually move. Since slots are strictly limited to 100, we'd rather give them to people you know. Give a friend priority access to Pilot 0.2.
        </p>

        <Button 
          variant="hero" 
          size="lg" 
          className="w-full"
          onClick={handleShare}
        >
          <Share2 className="w-5 h-5" />
          Nominate a Friend
        </Button>

        <Button 
          variant="muted" 
          className="w-full"
          onClick={resetOnboarding}
        >
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
};
