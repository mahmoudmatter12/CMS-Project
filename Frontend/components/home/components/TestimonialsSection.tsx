"use client"

import { motion } from "framer-motion"
import { fadeIn, staggerContainer, textVariant } from "@/utils/motion"

export function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "This system has transformed how we manage our academic processes. The time saved on administrative tasks alone has been invaluable.",
      author: "Dr. Sarah Johnson",
      role: "Dean of Students, Pacific University",
    },
    {
      quote:
        "The analytics capabilities have given us insights we never had before. We're now able to identify and support at-risk students much earlier.",
      author: "Prof. Michael Chen",
      role: "Department Chair, Westlake College",
    },
    {
      quote:
        "Implementation was smooth and the support team has been exceptional. Our faculty adapted quickly and student feedback has been overwhelmingly positive.",
      author: "Amanda Rodriguez",
      role: "IT Director, Riverdale Community College",
    },
  ]

  return (
    <motion.section
      variants={staggerContainer()}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="py-16 bg-gray-800/30"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          variants={textVariant(0.3)}
          className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent"
        >
          What Our Clients Say
        </motion.h2>

        <motion.div variants={staggerContainer(0.1)} className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={fadeIn("up", "spring", 0.3 + index * 0.1, 0.75)}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-b from-white/5 to-transparent p-6 rounded-xl border border-gray-800 hover:border-amber-500/30 transition-all"
            >
              <div className="mb-4 text-amber-400"> </div>
              <p className="text-gray-300 italic mb-6">{testimonial.quote}</p>
              <div className="mt-auto">
                <p className="font-medium">{testimonial.author}</p>
                <p className="text-amber-400 text-sm">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
