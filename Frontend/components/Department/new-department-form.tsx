"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useForm, type SubmitHandler, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { FiPlus, FiEdit2, FiSearch } from "react-icons/fi"
import { FaBuilding } from "react-icons/fa"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { UserRole } from "@/types/types"

// Define the schema for department creation
const createDepartmentSchema = z.object({
  name: z.string().min(2, "Department name must be at least 2 characters"),
  hddid: z.string().uuid("Please select a valid Head of Department"),
})

type DepartmentFormValues = z.infer<typeof createDepartmentSchema>

interface User {
  id: string
  email: string
  fullname: string
  departmentId: string
  depName: string
  profilePicture: string
  clerkId: string
  studentCollageId: string
  isBoarded: boolean
  role: UserRole
  cgpa: number
  level: string
}

interface NewDepartmentFormProps {
  defaultValues?: Partial<DepartmentFormValues>
  isEdit?: boolean
  onSuccess?: () => void
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
}

export default function NewDepartmentForm({
  defaultValues,
  isEdit = false,
  onSuccess,
  onOpenChange,
  children,
}: NewDepartmentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loadingUsers, setLoadingUsers] = useState(true)

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors, isDirty },
  } = useForm<DepartmentFormValues>({
    resolver: zodResolver(createDepartmentSchema),
    defaultValues: {
      name: "",
      hddid: "",
      ...defaultValues,
    },
  })

  const selectedHodId = watch("hddid")

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) reset()
    onOpenChange?.(open)
  }

  // Fetch users on mount
  useEffect(() => {
    const fetchUsers = async () => {
      setLoadingUsers(true)
      try {
        const response = await fetch("http://localhost:5168/api/Admin/users")
        if (!response.ok) {
          throw new Error("Failed to fetch users")
        }
        const data = await response.json()
        // Filter users to only include admins and teachers
        const eligibleUsers = data.filter(
          (user: User) => user.role === UserRole.Admin || user.role === UserRole.Teacher,
        )
        setUsers(eligibleUsers)
        setFilteredUsers(eligibleUsers)
      } catch (error) {
        console.error("Failed to fetch users:", error)
        toast.error("Failed to load users. Please try again.")
      } finally {
        setLoadingUsers(false)
      }
    }

    if (isOpen) {
      fetchUsers()
    }
  }, [isOpen])

  // Filter users based on search query
  useEffect(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const filtered = users.filter(
        (user) =>
          user.fullname?.toLowerCase().includes(query) ||
          user.email?.toLowerCase().includes(query) ||
          user.depName?.toLowerCase().includes(query),
      )
      setFilteredUsers(filtered)
    } else {
      setFilteredUsers(users)
    }
  }, [users, searchQuery])

  const handleFormSubmit: SubmitHandler<DepartmentFormValues> = async (data) => {
    setIsSubmitting(true)
    try {
      const departmentObject = {
        name: data.name,
        hddid: data.hddid,
      }

      const response = await fetch("http://localhost:5168/api/Department/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(departmentObject),
      })

      if (!response.ok) {
        const error = await response.json()
        toast.error(error.error || "An error occurred")
        return
      }

      toast.success(`Department ${isEdit ? "updated" : "created"} successfully!`)
      handleOpenChange(false)
      onSuccess?.()
      reset()
    } catch (error) {
      console.error(error)
      toast.error(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Get the selected user for display
  const selectedUser = users.find((user) => user.id === selectedHodId)

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {children || (
          <Button className="flex items-center gap-2 cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white">
            {isEdit ? (
              <>
                <FiEdit2 size={16} /> Edit Department
              </>
            ) : (
              <>
                <FiPlus size={16} /> Add Department
              </>
            )}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl bg-gray-900/80 backdrop-blur-sm border-gray-700 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-white">
            <FaBuilding size={20} />
            {isEdit ? "Edit Department" : "Create New Department"}
          </DialogTitle>
          <DialogDescription>
            {isEdit ? "Update the department details below." : "Fill out the form to add a new department."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Department Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">
              Department Name <span className="text-rose-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder="Computer Science"
              {...register("name")}
              className={`bg-gray-800 border-gray-700 text-white ${errors.name ? "border-rose-500" : ""}`}
            />
            {errors.name && <p className="text-sm text-rose-500">{errors.name.message}</p>}
          </div>

          {/* Head of Department Selection */}
          <div className="space-y-2">
            <Label className="text-white">
              Head of Department <span className="text-rose-500">*</span>
            </Label>

            {/* Search input for users */}
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Search by name or email..."
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border-gray-700 text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Selected user display */}
            {selectedUser && (
              <div className="mb-4 p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border-2 border-indigo-500/30">
                    <AvatarImage src={selectedUser.profilePicture || "/placeholder.svg"} alt={selectedUser.fullname} />
                    <AvatarFallback className="bg-indigo-500/20 text-indigo-400">
                      {selectedUser.fullname
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-white">{selectedUser.fullname}</h4>
                    <p className="text-sm text-gray-400">{selectedUser.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge
                        className={
                          selectedUser.role === UserRole.Admin
                            ? "bg-purple-500/20 text-purple-400"
                            : "bg-blue-500/20 text-blue-400"
                        }
                      >
                        {selectedUser.role}
                      </Badge>
                      {selectedUser.depName && (
                        <Badge className="bg-gray-700/50 text-gray-300">{selectedUser.depName}</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* User selection list */}
            <Controller
              name="hddid"
              control={control}
              render={({ field }) => (
                <div className="border border-gray-700 rounded-lg overflow-hidden">
                  <ScrollArea className="h-[300px]">
                    {loadingUsers ? (
                      <div className="p-4 text-center text-gray-400">Loading users...</div>
                    ) : filteredUsers.length === 0 ? (
                      <div className="p-4 text-center text-gray-400">No eligible users found</div>
                    ) : (
                      <div className="space-y-1 p-1">
                        {filteredUsers.map((user) => (
                          <div
                            key={user.id}
                            className={`flex items-center gap-3 p-3 rounded-md cursor-pointer transition-colors ${
                              field.value === user.id
                                ? "bg-indigo-500/20 border border-indigo-500/30"
                                : "hover:bg-gray-800/70 border border-transparent"
                            }`}
                            onClick={() => field.onChange(user.id)}
                          >
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={user.profilePicture || "/placeholder.svg"} alt={user.fullname} />
                              <AvatarFallback className="bg-gray-700 text-gray-300">
                                {user.fullname
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-white truncate">{user.fullname}</p>
                              <p className="text-sm text-gray-400 truncate">{user.email}</p>
                            </div>
                            <Badge
                              className={
                                user.role === UserRole.Admin
                                  ? "bg-purple-500/20 text-purple-400"
                                  : "bg-blue-500/20 text-blue-400"
                              }
                            >
                              {user.role}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    )}
                  </ScrollArea>
                </div>
              )}
            />
            {errors.hddid && <p className="text-sm text-rose-500 mt-2">{errors.hddid.message}</p>}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              onClick={() => handleOpenChange(false)}
              variant="outline"
              className="bg-red-600 hover:bg-red-700 text-white border border-red-600"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || (!isEdit && !isDirty)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin mr-2">↻</span> Processing...
                </>
              ) : isEdit ? (
                "Update Department"
              ) : (
                "Create Department"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
