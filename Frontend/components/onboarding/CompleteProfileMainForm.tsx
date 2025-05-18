'use client'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { OnboardingModal } from './OnboardingForm'
import { motion, AnimatePresence } from 'framer-motion'

function CompleteProfileMainForm() {
  const [isOpen, setIsOpen] = useState(false)
  const [pulseAnimation, setPulseAnimation] = useState(false)

  // Create a pulsing effect every few seconds to draw attention
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseAnimation(true)
      setTimeout(() => setPulseAnimation(false), 1000)
    }, 3000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <AnimatePresence>
        <div className="relative flex flex-col items-center">
          {/* Attention text above button */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-3 text-amber-300 font-semibold flex items-center"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 mr-2 animate-pulse text-amber-300" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
              />
            </svg>
            Action Required: Complete Your Profile
          </motion.div>
          
          {/* Glowing button */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ 
              scale: pulseAnimation ? 1.05 : 1, 
              opacity: 1,
            }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 15 
            }}
            className="relative"
          >
            {/* Outer glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500 blur-lg opacity-70 animate-pulse-slow"></div>
            
            {/* Inner glow ring */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500 opacity-50"></div>
            
            <Button
              onClick={() => setIsOpen(true)}
              className="relative bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-700 hover:to-cyan-600 text-white font-bold py-6 px-8 rounded-full shadow-xl transition-all duration-300 hover:shadow-indigo-500/50 hover:scale-105 z-10"
            >
              Complete Onboarding
              <svg 
                className="w-5 h-5 ml-2 inline-block" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 5l7 7-7 7" 
                />
              </svg>
            </Button>
          </motion.div>
          
          {/* Hint text below button */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-sm text-gray-400 max-w-xs text-center"
          >
            You must complete your profile to access all features and navigate to other pages
          </motion.p>
        </div>
      </AnimatePresence>

      <OnboardingModal open={isOpen} onOpenChange={setIsOpen} />
    </>
  )
}

export default CompleteProfileMainForm
