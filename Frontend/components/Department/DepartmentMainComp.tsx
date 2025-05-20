"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FiSearch, FiRefreshCw, FiGrid, FiList, FiDownload, FiPlus } from "react-icons/fi"
import { FaBuilding, FaUserTie, FaTrash, FaEdit } from "react-icons/fa"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import NewDepartmentForm from "./new-department-form"

interface Department {
  id: string
  name: string
  hddName: string
  hddid: string
}

interface PaginatedResponse<T> {
  data: T[]
  totalCount: number
  pageNumber: number
  totalPages: number
  pageSize: number
}

export default function DepartmentMainComp() {
  const [departments, setDepartments] = useState<Department[]>([])
  const [filteredDepartments, setFilteredDepartments] = useState<Department[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards")
  const [refreshing, setRefreshing] = useState(false)
  const [pageNumber] = useState(1)
  const [pageSize] = useState(10)

  const fetchDepartments = async () => {
    setLoading(true)
    setRefreshing(true)
    try {
      const res = await fetch(`http://localhost:5168/api/Department/all?pageNumber=${pageNumber}&pageSize=${pageSize}`)
      const data: PaginatedResponse<Department> = await res.json()
      if (Array.isArray(data.data)) {
        setDepartments(data.data)
        setFilteredDepartments(data.data)
      } else {
        console.error("Unexpected response format:", data)
        toast.error("Failed to load departments")
      }
    } catch (error) {
      console.error("Error fetching departments:", error)
      toast.error("Failed to load departments")
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this department?")
    if (!confirmDelete) return

    try {
      const response = await fetch(`http://localhost:5168/api/Department/${id}`, { method: "DELETE" })
      if (response.ok) {
        toast.success("Department deleted successfully")
        setDepartments((prev) => prev.filter((department) => department.id !== id))
      } else {
        const error = await response.json()
        throw new Error(error.message)
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete department")
    }
  }

  useEffect(() => {
    fetchDepartments()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const filtered = departments.filter(
        (department) =>
          department.name?.toLowerCase().includes(query) || department.hddName?.toLowerCase().includes(query),
      )
      setFilteredDepartments(filtered)
    } else {
      setFilteredDepartments(departments)
    }
  }, [departments, searchQuery])

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-gradient-to-r from-indigo-900/30 to-purple-900/30 p-6 rounded-xl border border-indigo-800/30 backdrop-blur-sm">
        <div className="flex items-start gap-4">
          <div className="bg-indigo-500/20 p-4 rounded-xl">
            <FaBuilding className="text-indigo-400 text-3xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white ">Department Management</h1>
            <p className="text-gray-400 mt-1">Manage academic departments and assign heads of departments.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={fetchDepartments}
                  variant="outline"
                  size="sm"
                  disabled={refreshing}
                  className="gap-2 bg-transparent  hover:text-indigo-400 border-indigo-700/20 hover:bg-indigo-700/20 cursor-pointer"
                >
                  <FiRefreshCw className={`${refreshing ? "animate-spin" : ""}`} />
                  Refresh
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Refresh department list</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 bg-transparent  hover:text-indigo-400 border-indigo-700/20 hover:bg-indigo-700/20 cursor-pointer">
                  <FiDownload />
                  Export
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Export departments as CSV</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <NewDepartmentForm onSuccess={fetchDepartments} />
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <Card className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-gray-700 overflow-hidden">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Departments</p>
                <p className="text-3xl font-bold text-white mt-1">{departments.length}</p>
              </div>
              <div className="bg-indigo-500/20 p-3 rounded-full">
                <FaBuilding className="text-indigo-400 text-xl" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-gray-700 overflow-hidden">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Departments with HoD</p>
                <p className="text-3xl font-bold text-green-400 mt-1">
                  {departments.filter((dept) => dept.hddid && dept.hddName).length}
                </p>
              </div>
              <div className="bg-green-500/20 p-3 rounded-full">
                <FaUserTie className="text-green-400 text-xl" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-gray-700 overflow-hidden">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Departments without HoD</p>
                <p className="text-3xl font-bold text-amber-400 mt-1">
                  {departments.filter((dept) => !dept.hddid || !dept.hddName).length}
                </p>
              </div>
              <div className="bg-amber-500/20 p-3 rounded-full">
                <FaUserTie className="text-amber-400 text-xl" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Controls */}
      <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Search by department name or HoD..."
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border-gray-700 text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-gray-800 border border-gray-700 rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setViewMode("cards")}
                  className={`rounded-md ${viewMode === "cards" ? "bg-indigo-700/30 text-indigo-300" : ""} cursor-pointer`}
                  title="Card View"
                >
                  <FiGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setViewMode("table")}
                  className={`rounded-md ${viewMode === "table" ? "bg-indigo-700/30 text-indigo-300" : ""} cursor-pointer`}
                  title="Table View"
                >
                  <FiList className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Area */}
      <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm overflow-hidden">
        <AnimatePresence mode="wait">
          {viewMode === "cards" ? (
            <motion.div
              key="cards"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="h-[600px] overflow-y-auto"
            >
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                  {[...Array(6)].map((_, i) => (
                    <DepartmentCardSkeleton key={i} />
                  ))}
                </div>
              ) : filteredDepartments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                  {filteredDepartments.map((department, index) => (
                    <motion.div
                      key={department.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <DepartmentCard department={department} onDelete={handleDelete} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="py-16 text-center flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gray-800/50 p-6 rounded-full inline-block mb-4"
                  >
                    <FaBuilding className="text-gray-400 text-3xl" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-white mb-2">No departments found</h3>
                  <p className="text-gray-400 max-w-md mx-auto pb-4">
                    {searchQuery ? "Try adjusting your search criteria" : "No departments are currently registered"}
                  </p>
                  <NewDepartmentForm onSuccess={fetchDepartments} />
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="table"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-auto"
              style={{ maxHeight: "600px" }}
            >
              <div className="p-6 min-w-[800px]">
                <div className="rounded-lg border border-gray-700 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-gray-400">
                      <thead className="text-xs text-gray-300 uppercase bg-gray-800/50 sticky top-0">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            Department ID
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Department Name
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Head of Department
                          </th>
                          <th scope="col" className="px-6 py-3">
                            HoD ID
                          </th>
                          <th scope="col" className="px-6 py-3 text-right">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading ? (
                          [...Array(5)].map((_, i) => (
                            <tr key={i} className="border-b border-gray-700/50 animate-pulse">
                              <td className="px-6 py-4">
                                <div className="h-4 bg-gray-700 rounded w-32"></div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="h-4 bg-gray-700 rounded w-32"></div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="h-4 bg-gray-700 rounded w-32"></div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="h-4 bg-gray-700 rounded w-32"></div>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <div className="h-4 bg-gray-700 rounded w-20 ml-auto"></div>
                              </td>
                            </tr>
                          ))
                        ) : filteredDepartments.length > 0 ? (
                          filteredDepartments.map((department, index) => (
                            <motion.tr
                              key={`department-${department.id}`}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2, delay: index * 0.03 }}
                              className="border-b border-gray-700/50 hover:bg-gray-800/30"
                            >
                              <td className="px-6 py-4 font-mono text-xs text-gray-400">{department.id}</td>
                              <td className="px-6 py-4 font-medium text-white">{department.name}</td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                  <div className="h-6 w-6 rounded-full bg-indigo-500/20 flex items-center justify-center">
                                    <FaUserTie className="text-indigo-400 text-xs" />
                                  </div>
                                  <span>{department.hddName || "Not assigned"}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 font-mono text-xs text-gray-400">
                                {department.hddid || "Not assigned"}
                              </td>
                              <td className="px-6 py-4 text-right">
                                <div className="flex justify-end gap-2">
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          className="text-gray-400 hover:text-blue-400 hover:bg-blue-500/10"
                                        >
                                          <FaEdit size={14} />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Edit department</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>

                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          onClick={() => handleDelete(department.id)}
                                          className="text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                                        >
                                          <FaTrash size={14} />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Delete department</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </div>
                              </td>
                            </motion.tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={5} className="px-6 py-16 text-center">
                              <div className="flex flex-col items-center">
                                <div className="bg-gray-800/50 p-6 rounded-full inline-block mb-4">
                                  <FaBuilding className="text-gray-400 text-3xl" />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">No departments found</h3>
                                <p className="text-gray-400 max-w-md mx-auto mb-4">
                                  {searchQuery
                                    ? "Try adjusting your search criteria"
                                    : "No departments are currently registered"}
                                </p>
                                <NewDepartmentForm onSuccess={fetchDepartments} />
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>


      {/* Floating Action Button for Mobile */}
      <div className="fixed bottom-6 right-6 md:hidden">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <NewDepartmentForm onSuccess={fetchDepartments}>
            <Button size="lg" className="rounded-full w-14 h-14 bg-indigo-600 hover:bg-indigo-700 shadow-lg">
              <FiPlus size={24} />
            </Button>
          </NewDepartmentForm>
        </motion.div>
      </div>
    </div>
  )
}

// Department Card Component
function DepartmentCard({ department, onDelete }: { department: Department; onDelete: (id: string) => void }) {
  return (
    <Card className="bg-gray-800/50 border-gray-700 overflow-hidden h-full">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-semibold text-lg text-white">{department.name}</h3>
          <div className="flex gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10"
                  >
                    <FaEdit size={14} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit department</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDelete(department.id)}
                    className="h-8 w-8 p-0 text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                  >
                    <FaTrash size={14} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete department</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-700">
          <div className="h-12 w-12 rounded-full bg-indigo-500/20 flex items-center justify-center border-2 border-indigo-500/30">
            <FaUserTie className="text-indigo-400 text-xl" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Head of Department</p>
            <p className="font-medium text-white">{department.hddName || "Not assigned"}</p>
          </div>
        </div>

        <div className="bg-gray-700/50 rounded-lg p-4">
          <p className="text-xs text-gray-400 mb-1">Department ID</p>
          <p className="font-mono text-sm text-white break-all">{department.id}</p>
        </div>

        {department.hddid && (
          <div className="bg-gray-700/50 rounded-lg p-4 mt-3">
            <p className="text-xs text-gray-400 mb-1">HoD ID</p>
            <p className="font-mono text-sm text-white break-all">{department.hddid}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Skeleton for department card
function DepartmentCardSkeleton() {
  return (
    <Card className="bg-gray-800/50 border-gray-700 overflow-hidden h-full">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="h-5 bg-gray-700 rounded w-40 animate-pulse"></div>
          <div className="flex gap-1">
            <div className="h-8 w-8 bg-gray-700 rounded animate-pulse"></div>
            <div className="h-8 w-8 bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-700">
          <div className="h-12 w-12 bg-gray-700 rounded-full animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-700 rounded w-24 animate-pulse"></div>
            <div className="h-4 bg-gray-700 rounded w-32 animate-pulse"></div>
          </div>
        </div>

        <div className="bg-gray-700/50 rounded-lg p-4">
          <div className="h-3 bg-gray-700 rounded w-24 animate-pulse mb-2"></div>
          <div className="h-4 bg-gray-700 rounded w-full animate-pulse"></div>
        </div>

        <div className="bg-gray-700/50 rounded-lg p-4 mt-3">
          <div className="h-3 bg-gray-700 rounded w-24 animate-pulse mb-2"></div>
          <div className="h-4 bg-gray-700 rounded w-full animate-pulse"></div>
        </div>
      </CardContent>
    </Card>
  )
}
