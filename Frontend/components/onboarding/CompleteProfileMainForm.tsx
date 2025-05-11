'use client'
import { useState } from 'react'
import React from 'react'
import { Button } from '../ui/button'
import { OnboardingModal } from './OnboardingForm'

function CompleteProfileMainForm() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <Button
                onClick={() => setIsOpen(true)}
                className="bg-gradient-to-r from-indigo-600 to-cyan-500"
            >
                Complete Onboarding
            </Button>

            <OnboardingModal open={isOpen} onOpenChange={setIsOpen} />
        </>
    )
}

export default CompleteProfileMainForm