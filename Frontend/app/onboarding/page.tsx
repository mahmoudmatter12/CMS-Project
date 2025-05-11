import OnboardingForm from '@/components/onboarding/OnboardingForm'
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs'

export default function OnboardingPage() {
  return (
    <div>
      <SignedIn>
        <OnboardingForm />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  )
}