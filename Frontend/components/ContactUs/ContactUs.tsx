"use client"
import { cn } from "@/lib/utils"
import { sendEmail } from "@/app/actions/send-email"
import { useState } from "react"
import { motion } from "framer-motion"
import { TextGenerateEffect } from "../ui/AceternityUi/text-generate-effect"
import { AnimatedTooltip } from "../ui/AceternityUi/animated-tooltip"

const teamMembers = [
    {
        id: 1,
        name: "Sarah Johnson",
        designation: "Support Lead",
        image: "/team/sarah.jpg"
    },
    {
        id: 2,
        name: "Michael Chen",
        designation: "Tech Specialist",
        image: "/team/michael.jpg"
    },
    {
        id: 3,
        name: "Emma Rodriguez",
        designation: "Customer Success",
        image: "/team/emma.jpg"
    },
    {
        id: 4,
        name: "David Kim",
        designation: "Product Manager",
        image: "/team/david.jpg"
    }
]

const words = "Need Help? Contact Us Today!";

export default function Contact() {
    const [status, setStatus] = useState<{ success?: boolean; message?: string } | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsSubmitting(true)
        const formData = new FormData(event.currentTarget)
        const result = await sendEmail(formData)
        setStatus(result)
        setIsSubmitting(false)

        // Reset form on success
        if (result?.success) {
            event.currentTarget.reset()
        }
    }

    return (
        <section className="relative min-h-screen w-full overflow-hidden  flex flex-col items-center justify-center px-4 py-20">
            {/* Team Section */}

            <br />
            <br />
            <br />
            <div className="container relative z-20 mx-auto text-center">
                {/* Animated Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-12"
                >
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 ">
                        <TextGenerateEffect words={words} className="text-center " />
                    </h1>
                    <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mb-10 rounded-full"></div>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                >
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
                        We would love to hear from you! Whether you have questions, feedback, or just want to say hello,
                        our team is here to assist you.
                    </p>

                    <form onSubmit={handleSubmit} className="mt-10 max-w-2xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    className="p-4 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 w-full text-gray-200 placeholder-gray-500 transition-all duration-300"
                                    required
                                />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                    className="p-4 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 w-full text-gray-200 placeholder-gray-500 transition-all duration-300"
                                    required
                                />
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="mt-6"
                        >
                            <textarea
                                name="message"
                                rows={5}
                                placeholder="Your Message"
                                className="p-4 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 w-full text-gray-200 placeholder-gray-500 transition-all duration-300"
                                required
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="mt-8"
                        >
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={cn(
                                    "px-8 py-4 rounded-xl font-medium text-white relative overflow-hidden",
                                    "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700",
                                    "shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40",
                                    "transition-all duration-500",
                                    "group"
                                )}
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {isSubmitting ? (
                                        <>
                                            <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Send Message
                                            <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                            </svg>
                                        </>
                                    )}
                                </span>
                                <span className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                            </button>
                        </motion.div>

                        {status && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="mt-6"
                            >
                                <div
                                    className={cn(
                                        "p-4 text-center rounded-xl backdrop-blur-sm",
                                        status.success
                                            ? "bg-green-900/20 border border-green-800/50 text-green-300"
                                            : "bg-red-900/20 border border-red-800/50 text-red-300"
                                    )}
                                >
                                    {status.message}
                                </div>
                            </motion.div>
                        )}
                    </form>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-20 pt-16 relative z-20"
                >
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-cyan-300">Our Support Team</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto mb-8">
                        Meet the dedicated team ready to assist you with any questions or concerns.
                    </p>

                    <div className="flex justify-center">
                        <AnimatedTooltip items={teamMembers} />
                    </div>

                </motion.div>
                
            </div>
            
        </section>
    )
}