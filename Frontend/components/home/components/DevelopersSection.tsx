"use client"

import { motion } from "framer-motion"
import { fadeIn, staggerContainer, textVariant, scaleVariant } from "@/utils/motion"
import { Developers } from "@/lib/constants"
import Image from "next/image"
import { Github, Linkedin } from "lucide-react"

export function DevelopersSection() {
  return (
    <motion.section
      variants={fadeIn("up", "tween", 0.3, 1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="py-16"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          variants={textVariant(0.3)}
          className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent"
        >
          Meet Our Development Team
        </motion.h2>
        <motion.div
          variants={textVariant(0.4)}
          className="h-1 w-16 bg-gradient-to-r from-rose-500 to-pink-500 mx-auto mb-6 rounded-full"
        />
        <motion.p variants={textVariant(0.5)} className="text-lg text-gray-400 max-w-3xl mx-auto text-center mb-12">
          The talented professionals building the future of education technology
        </motion.p>

        <motion.div variants={staggerContainer(0.1)} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {Developers.map((developer, index) => (
            <motion.div
              key={index}
              variants={scaleVariant(0.3 + index * 0.1)}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-b from-white/5 to-transparent p-5 rounded-xl border border-gray-800 hover:border-pink-500/30 transition-all text-center"
            >
              {developer.imgUrl ? (
                <Image
                  src={developer.imgUrl || "/placeholder.svg"}
                  alt={developer.name}
                  width={100}
                  height={100}
                  className="w-20 h-20 mx-auto mb-3 rounded-full object-cover border-2 border-gray-700"
                />
              ) : (
                <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gray-900 flex items-center justify-center text-xl font-bold text-gray-600 border-2 border-gray-700">
                  {developer.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
              )}
              <h3 className="font-medium text-base mb-1">{developer.name}</h3>
              <p className="text-pink-400 text-xs mb-3">{developer.role}</p>
              <div className="flex justify-center gap-3">
                <a
                  href={developer.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-pink-400 transition-colors"
                  title={`GitHub profile of ${developer.name}`}
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={developer.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-pink-400 transition-colors"
                  title={`LinkedIn profile of ${developer.name}`}
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
