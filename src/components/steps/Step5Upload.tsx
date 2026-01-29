import { useCallback, useState } from 'react';
import { useOnboardingStore } from '@/store/useOnboardingStore';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CloudUpload, File, Loader2, Trash2 } from 'lucide-react';

export const Step5Upload = () => {
  const { 
    setUploadedFile,
    nextStep,
    prevStep 
  } = useOnboardingStore();
  
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localFile, setLocalFile] = useState<File | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && (file.type.startsWith('image/') || file.type === 'application/pdf')) {
      setLocalFile(file);
      setUploadedFile(file, file.name);
    }
  }, [setUploadedFile]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLocalFile(file);
      setUploadedFile(file, file.name);
    }
  };

  const handleRemoveFile = () => {
    setLocalFile(null);
    setUploadedFile(null, '');
  };

  const handleSubmit = async () => {
    if (!localFile) return;
    
    setIsSubmitting(true);
    
    // Simulate upload
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    nextStep();
  };

  const canSubmit = !!localFile;

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
        <p className="text-sm text-primary font-medium">Step 5 of 6</p>
        <h1 className="text-2xl md:text-3xl font-display font-bold tracking-tight">
          Active Sponsorship
        </h1>
        <p className="text-golden font-medium">
          Sponsor: UK-based Ice-Bath Brand
        </p>
      </div>

      {/* The Real Human Check */}
      <div className="glass-card rounded-xl p-4 border-l-4 border-golden">
        <p className="text-sm font-semibold text-golden mb-1">The 'Real Human' Check</p>
        <p className="text-sm text-muted-foreground">
          We only pay for the real deal. Your upload must be a valid Strava receipt from <span className="text-primary font-medium">2026</span>.
        </p>
      </div>

      {/* Upload Zone */}
      <div 
        className={`upload-zone ${isDragging ? 'upload-zone-active' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept="image/*,.pdf"
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        {localFile ? (
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10">
              <File className="w-8 h-8 text-accent" />
            </div>
            <div>
              <p className="font-medium text-foreground">{localFile.name}</p>
              <p className="text-sm text-muted-foreground">
                {(localFile.size / 1024).toFixed(1)} KB
              </p>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveFile();
              }}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Remove
            </Button>
          </div>
        ) : (
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
              <CloudUpload className="w-8 h-8 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">Drop your Strava receipt here</p>
              <p className="text-sm text-muted-foreground">
                or click to browse • Images or PDF
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Payout Note */}
      <div className="text-center space-y-2 py-2">
        <p className="text-sm text-muted-foreground">
          Once verified, you'll receive a <span className="text-primary font-medium">Tremendous</span> link to choose your payout:
        </p>
        <p className="text-sm text-foreground font-medium">
          Direct Bank Transfer • Virtual Visa • Gift Card
        </p>
      </div>

      {/* CTA */}
      <Button 
        variant="hero" 
        size="lg" 
        className="w-full"
        onClick={handleSubmit}
        disabled={!canSubmit || isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Submitting...
          </>
        ) : (
          'Submit proof for manual review'
        )}
      </Button>
    </div>
  );
};
