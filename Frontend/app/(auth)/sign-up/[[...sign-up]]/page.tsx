import { SignUp } from '@clerk/nextjs'

export default function Page() {
    return <SignUp
        afterSignUpUrl="/onboarding"
        appearance={{
            elements: {
                formButtonPrimary: "bg-sky-600 hover:bg-sky-700",
            }
        }}
    />
}