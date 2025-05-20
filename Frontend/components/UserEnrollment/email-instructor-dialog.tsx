"use client"

import type React from "react"

import { useState } from "react"
import { FiMail, FiSend, FiX, FiAlertCircle } from "react-icons/fi"
import { toast } from "sonner"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

// Define the form schema with Zod
const emailFormSchema = z.object({
  subject: z
    .string()
    .min(5, { message: "Subject must be at least 5 characters" })
    .max(100, { message: "Subject cannot exceed 100 characters" }),
  message: z
    .string()
    .min(20, { message: "Message must be at least 20 characters" })
    .max(2000, { message: "Message cannot exceed 2000 characters" }),
})

type EmailFormValues = z.infer<typeof emailFormSchema>

interface EmailInstructorDialogProps {
  instructorName: string
  instructorEmail: string
  studentName: string
  studentEmail: string
  courseName: string
  children?: React.ReactNode
}

export function EmailInstructorDialog({
  instructorName,
  instructorEmail,
  studentName,
  studentEmail,
  courseName,
  children,
}: EmailInstructorDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSending, setIsSending] = useState(false)

  // Initialize the form
  const form = useForm<EmailFormValues>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      subject: `Question about ${courseName}`,
      message: "",
    },
  })

  // Handle form submission
  const onSubmit = async () => {
    setIsSending(true)

    try {
      // This is a placeholder for the actual API call
      // Replace with your actual email sending endpoint
      // const response = await fetch("/api/send-email", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     to: instructorEmail,
      //     from: studentEmail,
      //     subject: data.subject,
      //     message: data.message,
      //     senderName: studentName,
      //     recipientName: instructorName,
      //   }),
      // });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // if (!response.ok) {
      //   throw new Error("Failed to send email");
      // }

      toast.success("Email sent successfully", {
        description: `Your message has been sent to ${instructorName}`,
      })

      // Close the dialog and reset the form
      setIsOpen(false)
      form.reset({
        subject: `Question about ${courseName}`,
        message: "",
      })
    } catch (error) {
      console.error("Error sending email:", error)
      toast.error("Failed to send email", {
        description: "Please try again later or contact support",
      })
    } finally {
      setIsSending(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button
            variant="outline"
            size="sm"
            className="gap-2 border-indigo-700 hover:bg-indigo-700/20 text-indigo-300"
          >
            <FiMail className="h-4 w-4" />
            Contact Instructor
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] bg-gray-900/80 backdrop-blur-sm border-gray-700">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-white">
            <FiMail className="h-5 w-5 text-indigo-400" />
            Contact Instructor
          </DialogTitle>
          <DialogDescription>
            Send an email to {instructorName} regarding {courseName}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-gray-800/50 p-3 rounded-md border border-gray-700/50">
                <div className="grid grid-cols-[auto_1fr] gap-2 items-center mb-2">
                  <span className="text-gray-400 text-sm">From:</span>
                  <span className="text-white">
                    {studentName} &lt;{studentEmail}&gt;
                  </span>
                </div>
                <div className="grid grid-cols-[auto_1fr] gap-2 items-center">
                  <span className="text-gray-400 text-sm">To:</span>
                  <span className="text-white">
                    {instructorName} &lt;{instructorEmail}&gt;
                  </span>
                </div>
              </div>

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Subject</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter email subject"
                        className="bg-gray-800/50 border-gray-700 focus-visible:ring-indigo-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write your message here..."
                        className="bg-gray-800/50 border-gray-700 focus-visible:ring-indigo-500 min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-gray-400 flex items-center gap-1">
                      <FiAlertCircle className="h-3 w-3" />
                      Be clear and concise in your message
                    </FormDescription>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="gap-2 sm:gap-0 mt-4 pt-2 border-t border-gray-700/50">
              <Button
                type="button"
                variant="outline"
                className="border-gray-700"
                onClick={() => setIsOpen(false)}
                disabled={isSending}
              >
                <FiX className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700" disabled={isSending}>
                {isSending ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <FiSend className="mr-2 h-4 w-4" />
                    Send Email
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
