import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface OnboardingState {
  // Current step (1-6)
  currentStep: number;
  
  // User data
  user_name: string;
  user_email: string;
  email_verified: boolean;
  
  // Consent flags
  consent_review: boolean;
  consent_sponsor: boolean;
  consent_tremendous: boolean;
  consent_data_rights: boolean;
  
  // Privacy
  privacy_masking_confirmed: boolean;
  
  // Capacity
  slots_remaining: number;
  slots_filled: number;
  
  // Upload state
  uploaded_file: File | null;
  uploaded_file_name: string;
  
  // Feedback
  rating: number;
  feedback: string;
  
  // Submission state
  submission_status: 'pending' | 'submitted' | 'approved' | 'rejected';
  
  // Waitlist
  waitlist_email: string;
  
  // Actions
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setUserName: (name: string) => void;
  setUserEmail: (email: string) => void;
  setEmailVerified: (verified: boolean) => void;
  setConsentReview: (consent: boolean) => void;
  setConsentSponsor: (consent: boolean) => void;
  setConsentTremendous: (consent: boolean) => void;
  setConsentDataRights: (consent: boolean) => void;
  setPrivacyMaskingConfirmed: (confirmed: boolean) => void;
  setUploadedFile: (file: File | null, name: string) => void;
  setRating: (rating: number) => void;
  setFeedback: (feedback: string) => void;
  setSubmissionStatus: (status: 'pending' | 'submitted' | 'approved' | 'rejected') => void;
  setWaitlistEmail: (email: string) => void;
  resetOnboarding: () => void;
  allConsentsGiven: () => boolean;
}

const initialState = {
  currentStep: 1,
  user_name: '',
  user_email: '',
  email_verified: false,
  consent_review: false,
  consent_sponsor: false,
  consent_tremendous: false,
  consent_data_rights: false,
  privacy_masking_confirmed: false,
  slots_remaining: 58,
  slots_filled: 42,
  uploaded_file: null,
  uploaded_file_name: '',
  rating: 0,
  feedback: '',
  submission_status: 'pending' as const,
  waitlist_email: '',
};

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      setStep: (step) => set({ currentStep: step }),
      
      nextStep: () => set((state) => ({ 
        currentStep: Math.min(state.currentStep + 1, 6) 
      })),
      
      prevStep: () => set((state) => ({ 
        currentStep: Math.max(state.currentStep - 1, 1) 
      })),
      
      setUserName: (name) => set({ user_name: name }),
      
      setUserEmail: (email) => set({ user_email: email }),
      
      setEmailVerified: (verified) => set({ email_verified: verified }),
      
      setConsentReview: (consent) => set({ consent_review: consent }),
      
      setConsentSponsor: (consent) => set({ consent_sponsor: consent }),
      
      setConsentTremendous: (consent) => set({ consent_tremendous: consent }),
      
      setConsentDataRights: (consent) => set({ consent_data_rights: consent }),
      
      setPrivacyMaskingConfirmed: (confirmed) => set({ privacy_masking_confirmed: confirmed }),
      
      setUploadedFile: (file, name) => set({ 
        uploaded_file: file, 
        uploaded_file_name: name 
      }),
      
      setRating: (rating) => set({ rating }),
      
      setFeedback: (feedback) => set({ feedback }),
      
      setSubmissionStatus: (status) => set({ submission_status: status }),
      
      setWaitlistEmail: (email) => set({ waitlist_email: email }),
      
      resetOnboarding: () => set(initialState),
      
      allConsentsGiven: () => {
        const state = get();
        return (
          state.consent_review &&
          state.consent_sponsor &&
          state.consent_tremendous &&
          state.consent_data_rights
        );
      },
    }),
    {
      name: 'pbd-onboarding',
      partialize: (state) => ({
        currentStep: state.currentStep,
        user_name: state.user_name,
        user_email: state.user_email,
        email_verified: state.email_verified,
        consent_review: state.consent_review,
        consent_sponsor: state.consent_sponsor,
        consent_tremendous: state.consent_tremendous,
        consent_data_rights: state.consent_data_rights,
        privacy_masking_confirmed: state.privacy_masking_confirmed,
        slots_filled: state.slots_filled,
        slots_remaining: state.slots_remaining,
        uploaded_file_name: state.uploaded_file_name,
        rating: state.rating,
        feedback: state.feedback,
        submission_status: state.submission_status,
      }),
    }
  )
);
