"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FaLock, FaLockOpen, FaTrash, FaGraduationCap, FaUser, FaEnvelope } from "react-icons/fa"
import { FiBook, FiClock } from "react-icons/fi"
import type { Course } from "@/types/types"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "../ui/separator"
import { getAvatarInitials } from "@/lib/utils"

interface SubjectCardProps {
  subject: Course
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export default function SubjectCard({ subject, onToggle, onDelete }: SubjectCardProps) {

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`bg-gray-800/80 backdrop-blur-sm border rounded-xl overflow-hidden transition-all hover:shadow-xl ${subject.isOpen ? "border-green-500/30 hover:border-green-500/70" : "border-red-500/30 hover:border-red-500/70"
        }`}
    >
      {/* Status Indicator */}
      <div className="relative h-1.5 w-full">
        <div
          className={`absolute inset-0 ${subject.isOpen
            ? "bg-gradient-to-r from-green-500 to-emerald-400"
            : "bg-gradient-to-r from-red-500 to-rose-400"
            }`}
        />
      </div>

      {/* Header */}
      <div className="p-4 border-b border-gray-700/50 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <FiBook className="text-blue-400" size={18} />
          <p className="font-mono text-blue-400 text-sm font-bold">{subject.courseCode}</p>
        </div>
        <Badge
          className={`${subject.isOpen
            ? "bg-green-500/20 text-green-400 border-green-500/30"
            : "bg-red-500/20 text-red-400 border-red-500/30"
            }`}
        >
          {subject.isOpen ? "Open" : "Closed"}
        </Badge>
      </div>

      {/* Body */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">{subject.name}</h3>

        <div className="flex items-center gap-2 text-sm text-gray-300 mb-4">
          <FaGraduationCap size={14} className="text-purple-400" />
          <span>{subject.creditHours || "0"} credits</span>
          <span className="mx-1">•</span>
          <FiClock size={14} className="text-yellow-400" />
          <span>Semester {subject.semester}</span>
        </div>

        {/* Department */}
        <div className="mb-4">
          <Badge variant="outline" className="text-xs text-gray-300 border-gray-600">
            {subject.depName}
          </Badge>
        </div>

        {/* Seperator */}
        <Separator className="my-4" />

        {/* Instructor Info */}
        <div className="bg-gray-900/50 rounded-lg p-3 mb-4 border border-gray-700/50">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-gray-700">
              {/* Placeholder image for instructor avatar */}
              {subject.instructorImg ? (
                <AvatarImage
                  src={subject.instructorImg}
                  alt={subject.instructorName}
                />
              ) : (
                <AvatarImage
                  src={`/placeholder.svg?height=40&width=40&text=${getAvatarInitials(subject.instructorName)}`}
                  alt={subject.instructorName}
                />
              )}
              <AvatarFallback className="bg-purple-900/50 text-white">
                {getAvatarInitials(subject.instructorName)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <FaUser size={12} className="text-purple-400" />
                <p className="text-sm font-medium text-white">{subject.instructorName}</p>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <FaEnvelope size={12} className="text-blue-400" />
                <p className="text-xs text-gray-400">{subject.instructorEmail}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Prerequisites */}
        <div className="mb-4">
          <p className="text-xs text-gray-400 mb-2 flex items-center gap-1">
            <span className="inline-block h-1 w-1 rounded-full bg-blue-500"></span> Prerequisites:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {(subject.prerequisiteCourseNames ?? []).length === 0 ? (
              <Badge variant="outline" className="text-xs text-gray-500 border-gray-700">
                No prerequisites
              </Badge>
            ) : (
              subject.prerequisiteCourseNames.map((pre: string) => (
                <Badge
                  key={pre}
                  variant="outline"
                  className="text-xs text-white bg-gray-700/50 border-gray-600 hover:bg-gray-700"
                >
                  {pre}
                </Badge>
              ))
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between gap-2 mt-5">
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="sm"
              className={`gap-1.5 cursor-pointer transition-colors ${subject.isOpen
                ? "text-green-400 hover:bg-red-900/20 hover:text-red-400 hover:border-red-500/50"
                : "text-red-400 hover:bg-green-900/20 hover:text-green-400 hover:border-green-500/50"
                }`}
              onClick={() => onToggle(subject.id)}
            >
              {subject.isOpen ? <FaLock size={14} /> : <FaLockOpen size={14} />}
              {subject.isOpen ? "Close" : "Open"}
            </Button>
          </motion.div>

          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 cursor-pointer text-red-400 border-red-500/30 hover:bg-red-900/20 hover:border-red-500/50"
              onClick={() => onDelete(subject.id)}
            >
              <FaTrash size={14} /> Delete
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
