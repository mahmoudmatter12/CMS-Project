import { Button } from '@/components/ui/button'
import { SignInButton, SignUpButton } from '@clerk/nextjs'
import React from 'react'

function Authbtns() {
    return (
        <>
            <div className="flex gap-4 justify-center flex-wrap">
                <SignInButton mode="modal">
                    <Button variant="outline" className="
        relative
        overflow-hidden
        bg-transparent
        text-sky-400
        border-sky-400/30
        hover:text-white
        hover:border-sky-400/0
        hover:bg-gradient-to-r
        hover:from-sky-500/80
        hover:to-cyan-500/80
        transition-all
        duration-300
        group
      ">
                        <span className="relative z-10">Sign In</span>
                        <span className="
          absolute
          inset-0
          bg-gradient-to-r
          from-sky-500
          to-cyan-500
          opacity-0
          group-hover:opacity-100
          transition-opacity
          duration-300
        "></span>
                    </Button>
                </SignInButton>

                <SignUpButton mode="modal">
                    <Button className="
        relative
        overflow-hidden
        bg-gradient-to-r
        from-sky-500
        to-cyan-500
        text-white
        hover:from-sky-600
        hover:to-cyan-600
        shadow-lg
        hover:shadow-sky-500/30
        transition-all
        duration-300
        group
      ">
                        <span className="relative z-10">Sign Up</span>
                        <span className="
          absolute
          inset-0
          bg-gradient-to-r
          from-sky-400
          to-cyan-400
          opacity-0
          group-hover:opacity-100
          transition-opacity
          duration-300
        "></span>
                    </Button>
                </SignUpButton>
            </div>
        </>
    )
}

export default Authbtns