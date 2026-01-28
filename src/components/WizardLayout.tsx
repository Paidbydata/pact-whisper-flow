import { ReactNode } from 'react';
import { useOnboardingStore } from '@/store/useOnboardingStore';
import logo from '@/assets/pbd-logo.jpg';

interface WizardLayoutProps {
  children: ReactNode;
}

const TOTAL_STEPS = 6;

export const WizardLayout = ({ children }: WizardLayoutProps) => {
  const { currentStep } = useOnboardingStore();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/30">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-3">
            <img 
              src={logo} 
              alt="Paid by Data" 
              className="h-10 w-auto"
            />
          </div>
          <div className="alpha-badge">
            ALPHA v0.1
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="w-full bg-muted/30 h-1">
        <div 
          className="h-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
        />
      </div>

      {/* Step Indicators */}
      <div className="container px-4 py-4">
        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: TOTAL_STEPS }).map((_, index) => {
            const stepNum = index + 1;
            let className = 'step-indicator ';
            
            if (stepNum === currentStep) {
              className += 'step-indicator-active';
            } else if (stepNum < currentStep) {
              className += 'step-indicator-complete';
            } else {
              className += 'step-indicator-pending';
            }
            
            return <div key={stepNum} className={className} />;
          })}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 container px-4 pb-8">
        <div className="max-w-lg mx-auto animate-fade-in">
          {children}
        </div>
      </main>

      {/* Ambient Glow Effect - Golden Hour */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, hsl(43 75% 52% / 0.1) 0%, transparent 50%)'
        }}
      />
    </div>
  );
};
