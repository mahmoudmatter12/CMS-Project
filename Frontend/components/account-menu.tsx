"use client"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { FiUser, FiSettings, FiLogOut, FiChevronDown, FiShield,FiPhone,FiBook } from "react-icons/fi"
import { MdSchool } from "react-icons/md"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import {
  SignedIn,
  SignedOut,
  SignOutButton,
} from '@clerk/nextjs'
import { TbTableDashed } from "react-icons/tb";
import Authbtns from "./home/components/authbtns"
import { useCurrentUser } from "@/lib/hooks/UseUser"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { y: -10, opacity: 0 },
  show: { y: 0, opacity: 1 },
}

const hoverScale = {
  scale: 1.05,
  transition: { type: "spring", stiffness: 400, damping: 10 },
}

const tapScale = {
  scale: 0.98,
}


export function AccountMenu() {
  // const { isLoaded, user } = useUser();
  const { user, isLoaded , clerkUser } = useCurrentUser();

  if (!isLoaded) {
    return (
      <header className="sticky top-0 z-50 border-gray-800 bg-gray-900 border-t backdrop-blur-lg shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
          {/* Logo with motion */}
          <motion.div whileHover={{ scale: 1.03 }}>
            <Link href="/" className="flex items-center space-x-2 group">
              <motion.div
                whileHover={{ rotate: 12 }}
                className="p-2 rounded-lg bg-gradient-to-br from-sky-500 to-sky-900 text-white"
              >
                <MdSchool className="text-xl" />
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text text-transparent">
                College Management System
              </span>
            </Link>
          </motion.div>
          <div className="text-white">Loading...</div>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-gray-800 bg-gray-900 border-t backdrop-blur-lg shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
          {/* Logo with motion */}
          <motion.div whileHover={{ scale: 1.03 }}>
            <Link href="/" className="flex items-center space-x-2 group">
              <motion.div
                whileHover={{ rotate: 12 }}
                className="p-2 rounded-lg bg-gradient-to-br from-sky-500 to-sky-900 text-white"
              >
                <MdSchool className="text-xl" />
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text text-transparent">
                College Management System
              </span>
            </Link>
          </motion.div>

          {/* Navigation */}
          <nav className="flex items-center space-x-4 sm:space-x-6">
            {/* Desktop Links with stagger animation */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="hidden md:flex items-center gap-6">
              <motion.div variants={itemVariants}>
                <Link
                  href="/about"
                  className="flex items-center gap-2 text-white hover:text-sky-600 font-medium transition-colors"
                >
                  <FiBook size={18} />
                  About
                </Link>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Link
                  href="/contactUs"
                  className="flex items-center gap-2 text-white hover:text-sky-600 font-medium transition-colors"
                >
                  <FiPhone size={18} />
                  Contact Us
                </Link>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Link
                  href="/collageGallary"
                  className="flex items-center gap-2 text-white hover:text-sky-600 font-medium transition-colors"
                >
                  <MdSchool size={18} />
                  Collage Gallery
                </Link>
              </motion.div>
            </motion.div>

            <SignedIn>
              {/* Account Dropdown with motion */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.div whileHover={hoverScale} whileTap={tapScale}>
                    <Button variant="ghost" className="flex items-center gap-2 px-2 hover:bg-gray-700/10 rounded-lg">
                      {/* Profile picture with motion */}
                        {user?.profilePicture ? (
                        <motion.img
                          src={user?.profilePicture}
                          alt="Profile"
                          className="w-8 h-8 rounded-full border-2 border-white shadow-sm object-cover"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        />
                        ) : <motion.div
                        whileHover={{ rotate: 12 }}
                        className="p-2 rounded-lg bg-gradient-to-br from-sky-500 to-sky-900 text-white"
                        >
                        <FiUser className="text-xl" />
                        </motion.div>}
                      <span className="hidden sm:inline text-white">
                        {user?.fullname ? user?.fullname : clerkUser?.fullName}
                      </span>
                      <motion.div animate={{ rotate: 0 }} whileHover={{ rotate: 180 }}>
                        <FiChevronDown className="text-white" />
                      </motion.div>
                    </Button>
                  </motion.div>
                </DropdownMenuTrigger>

                <AnimatePresence>
                  <DropdownMenuContent
                    className="w-56 mt-2 shadow-xl rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                    align="end"
                    asChild
                  >
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <DropdownMenuLabel className="font-normal p-4">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none text-gray-900 dark:text-white">
                            {user?.fullname ? user?.fullname : clerkUser?.fullName }
                          </p>
                          <p className="text-xs leading-none text-gray-500">
                            {user?.email ? user?.email : clerkUser?.emailAddresses[0]?.emailAddress}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />

                      <motion.div variants={containerVariants}>
                        <DropdownMenuItem className="p-0 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                          <motion.div variants={itemVariants}>
                            <Link href={`/user/${user?.id}/profile`} className="flex items-center w-full px-4 py-2">
                              <FiUser className="mr-2 text-gray-700" size={16} />
                              User Profile
                            </Link>
                          </motion.div>
                        </DropdownMenuItem>

                        <DropdownMenuItem className="p-0 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                          <motion.div variants={itemVariants}>
                            <Link href="/user/dashboard" className="flex items-center w-full px-4 py-2" >
                              <TbTableDashed className="mr-2 text-gray-700" size={16} />
                              User Dashboard
                            </Link>
                          </motion.div>
                        </DropdownMenuItem>

                        <DropdownMenuItem className="p-0 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                          <motion.div variants={itemVariants}>
                            <Link href="/user/settings" className="flex items-center w-full px-4 py-2">
                              <FiSettings className="mr-2 text-gray-700" size={16} />
                              Settings
                            </Link>
                          </motion.div>
                        </DropdownMenuItem>

                        {/* Show admin options if user has admin role */}
                        {user?.role === "Admin" && (
                          <>
                            <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
                            <DropdownMenuItem className="p-0 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                              <motion.div variants={itemVariants}>
                                <Link href="/admin/dashboard" className="flex items-center w-full px-4 py-2">
                                  <FiShield className="mr-2 text-gray-700" size={16} />
                                  Admin Dashboard
                                </Link>
                              </motion.div>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="p-0 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                              <motion.div variants={itemVariants}>
                                <Link href="/admin/profile" className="flex items-center w-full px-4 py-2">
                                  <FiUser className="mr-2 text-gray-700" size={16} />
                                  Admin Profile
                                </Link>
                              </motion.div>
                            </DropdownMenuItem>
                          </>
                        )}

                        {/* Show teacher options if user has teacher role */}
                        {user?.role === "Teacher" && (
                          <>
                            <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
                            <DropdownMenuItem className="p-0 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                              <motion.div variants={itemVariants}>
                                <Link href="/teacher/dashboard" className="flex items-center w-full px-4 py-2">
                                  <FiShield className="mr-2 text-gray-700" size={16} />
                                  Teacher Dashboard
                                </Link>
                              </motion.div>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="p-0 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                              <motion.div variants={itemVariants}>
                                <Link href="/teacher/Profile" className="flex items-center w-full px-4 py-2">
                                  <FiUser className="mr-2 text-gray-700" size={16} />
                                  Teacher Profile
                                </Link>
                              </motion.div>
                            </DropdownMenuItem>
                          </>
                        )}

                        <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
                        <DropdownMenuItem className="p-0 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                          <motion.div variants={itemVariants} whileHover={{ x: 5 }}>
                            <SignOutButton>
                              <button className="flex items-center w-full px-4 py-2 text-red-600 dark:text-red-400">
                                <FiLogOut className="mr-2" size={16} />
                                Sign Out
                              </button>
                            </SignOutButton>
                          </motion.div>
                        </DropdownMenuItem>
                      </motion.div>
                    </motion.div>
                  </DropdownMenuContent>
                </AnimatePresence>
              </DropdownMenu>
            </SignedIn>

            <SignedOut>
              <Authbtns />
            </SignedOut>
          </nav>
        </div>
      </header>
    </>
  )
}