"use client"
import { cn } from "@/lib/utils"
import { sendEmail } from "@/app/actions/send-email"
import { useState } from "react"

export default function Contact() {
    const [status, setStatus] = useState<{ success?: boolean; message?: string } | null>(null)

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const result = await sendEmail(formData)
        setStatus(result)
    }

    return (
        <section className="py-20 px-4 mt-10">
            <div className="container mx-auto text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Get in Touch
                </h1>
                <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mb-10 rounded-full"></div>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                    We would love to hear from you! Whether you have questions, feedback, or just want to say hello, feel free to reach out.
                    Our team is here to assist you and ensure you have the best experience possible.
                </p>
                <form onSubmit={handleSubmit} className="mt-10 max-w-2xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            className="p-4 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:ring focus:ring-cyan-500"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            className="p-4 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:ring focus:ring-cyan-500"
                            required
                        />
                    </div>
                    <textarea
                        name="message"
                        rows={5}
                        placeholder="Your Message"
                        className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:ring focus:ring-cyan-500 w-full"
                        required
                    />
                    <button
                        type="submit"
                        className="mt-6 px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-lg hover:bg-gradient-to-l transition duration-300"
                    >
                        Send Message
                    </button>
                    {status && (
                        <p
                            className={cn(
                                "mt-4 p-4 text-center rounded",
                                status.success ? "bg-green-50 rounded-xl text-green-700" : "bg-red-50 text-red-800",
                            )}
                        >
                            {status.message}
                        </p>
                    )}
                </form>
            </div>
        </section>
    )
}
