"use client"
import { motion } from "framer-motion"
import { Mail, BookText, School } from "lucide-react"
import ButtonLink from "./reUsed/CustomLink"

export function Footer() {
  const currentYear = new Date().getFullYear()

  // Social links for the main footer
  const socialLinks = [
    {
      name: "Contact Support",
      icon: <Mail className="w-5 h-5" />,
      href: "mailto:support@college-management.edu",
    },
    {
      name: "Documentation",
      icon: <BookText className="w-5 h-5" />,
      href: "/docs",
    },
    {
      name: "Academic Resources",
      icon: <School className="w-5 h-5" />,
      href: "/resources",
    },
  ]

  return (
    <footer className="relative border-t border-gray-800 bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Branding Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-md"
          >
            <h3 className="text-2xl font-bold mb-4">
              <span className="bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text text-transparent">
                College Management System
              </span>
            </h3>
            <p className="text-gray-400 mb-6">
              Streamlining academic administration for institutions, faculty, and students with cutting-edge technology.
            </p>

            <div className="flex gap-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  whileHover={{ y: -3, scale: 1.1 }}
                  className="p-2 rounded-full bg-gray-800 text-gray-300 hover:text-white hover:bg-sky-500/20 transition-all"
                  aria-label={link.name}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-2 gap-8"
          >
            {[
              {
                title: "Navigation",
                links: [
                  { name: "Dashboard", href: "/dashboard" },
                  { name: "Courses", href: "/courses" },
                  { name: "Faculty", href: "/faculty" },
                  { name: "Calendar", href: "/calendar" },
                ],
              },
              {
                title: "Resources",
                links: [
                  { name: "Help Center", href: "/help" },
                  { name: "Academic Policy", href: "/policy" },
                  { name: "Student Handbook", href: "/handbook" },
                ],
              },
            ].map((section, index) => (
              <div key={index} className="space-y-4">
                <h4 className="text-sm font-semibold tracking-wider text-gray-300 uppercase">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <motion.li
                      key={linkIndex}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * linkIndex, duration: 0.5 }}
                    >
                      <ButtonLink
                        href={link.href}
                        type="secondary"
                        className="text-gray-400 hover:text-sky-400 text-sm"
                        underline={false}
                      >
                        {link.name}
                      </ButtonLink>
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Copyright Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-gray-500 text-sm">© {currentYear} College Management System. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}
