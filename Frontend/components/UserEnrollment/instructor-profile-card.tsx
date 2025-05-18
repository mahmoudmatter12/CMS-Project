"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FiMail, FiUser, FiAward, FiMessageCircle } from "react-icons/fi"
import { FaChalkboardTeacher } from "react-icons/fa"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { getAvatarInitials } from "@/lib/utils"
import { EmailInstructorDialog } from "@/components/UserEnrollment/email-instructor-dialog"

interface InstructorProfileCardProps {
  instructorName?: string
  instructorEmail?: string
  instructorImg?: string
  courseName?: string
  studentName?: string
  studentEmail?: string
}

export function InstructorProfileCard({
  instructorName = "Not assigned",
  instructorEmail,
  instructorImg,
  courseName,
  studentName,
  studentEmail,
}: InstructorProfileCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-gray-400 mb-1 flex items-center gap-2">
        <FaChalkboardTeacher className="text-indigo-400" />
        Instructor Information
      </h3>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        <Card
          className={`bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-gray-700/50 backdrop-blur-sm overflow-hidden transition-all duration-300 ${
            isExpanded ? "shadow-lg shadow-indigo-500/10" : ""
          }`}
        >
          {/* Decorative top bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600" />

          <div className="p-5">
            <div className="flex flex-col md:flex-row gap-5">
              {/* Instructor Avatar Section */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative flex-shrink-0"
              >
                <div
                  className={`relative rounded-xl overflow-hidden border-2 ${
                    isExpanded ? "border-indigo-500" : "border-gray-700"
                  } transition-all duration-300 group`}
                >
                  <div className="w-24 h-24 md:w-28 md:h-28 relative">
                    <Avatar className="w-full h-full">
                      {instructorImg ? (
                        <AvatarImage
                          src={instructorImg || "/placeholder.svg"}
                          alt={instructorName}
                          className="object-cover"
                        />
                      ) : (
                        <AvatarImage
                          src={`/placeholder.svg?height=112&width=112&text=${getAvatarInitials(instructorName)}`}
                          alt={instructorName}
                          className="object-cover"
                        />
                      )}
                      <AvatarFallback className="bg-gradient-to-br from-indigo-900 to-purple-900 text-white text-xl">
                        {getAvatarInitials(instructorName)}
                      </AvatarFallback>
                    </Avatar>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-2">
                      <span className="text-xs text-white font-medium">Instructor</span>
                    </div>
                  </div>

                  {/* Status indicator */}
                  <div className="absolute -bottom-1 -right-1 bg-green-500 h-4 w-4 rounded-full border-2 border-gray-800" />
                </div>

                {/* Badge */}
                <Badge
                  className="absolute -top-2 -right-2 bg-indigo-600 text-white border-0 shadow-lg shadow-indigo-900/20"
                  variant="secondary"
                >
                  <FiAward className="mr-1" size={12} />
                  Instructor
                </Badge>
              </motion.div>

              {/* Instructor Details */}
              <div className="flex-1 space-y-3">
                <div>
                  <h4 className="text-xl font-bold text-white flex items-center gap-2">
                    {instructorName}
                    {instructorEmail && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30">
                          <FiUser className="mr-1" size={10} />
                          Verified
                        </Badge>
                      </motion.div>
                    )}
                  </h4>

                  {instructorEmail && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="flex items-center gap-2 text-gray-400 mt-1"
                    >
                      <FiMail className="text-indigo-400" size={14} />
                      <span className="text-sm">{instructorEmail}</span>
                    </motion.div>
                  )}
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-2 space-y-3">
                        <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
                          <div className="flex items-center gap-2 text-sm text-gray-300 mb-1">
                            <FiMessageCircle className="text-indigo-400" size={14} />
                            <span className="font-medium">About</span>
                          </div>
                          <p className="text-sm text-gray-400">
                            Experienced instructor specializing in {courseName}. Contact for course-related inquiries.
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="bg-gray-800/50 text-gray-300 border-gray-700">
                            {courseName}
                          </Badge>
                          <Badge variant="outline" className="bg-indigo-900/30 text-indigo-300 border-indigo-700/50">
                            Expert
                          </Badge>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Actions */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {instructorEmail && instructorName && studentName && studentEmail && courseName && (
                    <EmailInstructorDialog
                      instructorName={instructorName}
                      instructorEmail={instructorEmail}
                      studentName={studentName}
                      studentEmail={studentEmail}
                      courseName={courseName}
                    />
                  )}

                  <motion.div whileTap={{ scale: 0.97 }}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-700 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300"
                      onClick={() => setIsExpanded(!isExpanded)}
                    >
                      {isExpanded ? "Show Less" : "Show More"}
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
