"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"

interface Option {
  id: string
  label: string
}

interface MultiSelectProps {
  options: Option[]
  selectedValues: string[]
  onChange: (values: string[]) => void
  label: string
  error?: string
  isLoading?: boolean
}

export function MultiSelect({ options, selectedValues, onChange, label, error, isLoading = false }: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const containerRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const filteredOptions = options.filter((option) => option.label.toLowerCase().includes(searchTerm.toLowerCase()))

  const toggleOption = (id: string) => {
    if (selectedValues.includes(id)) {
      onChange(selectedValues.filter((value) => value !== id))
    } else {
      onChange([...selectedValues, id])
    }
  }

  const removeOption = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    onChange(selectedValues.filter((value) => value !== id))
  }

  return (
    <div className="space-y-2" ref={containerRef}>
      <Label htmlFor="multiselect" className="text-white">
        {label}
      </Label>

      <div className="relative">
        <div
          className={`p-2 border rounded-lg min-h-[50px] cursor-pointer flex flex-wrap gap-1 ${isOpen ? "border-blue-500" : "border-gray-600"} ${error ? "border-red-500" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedValues.length > 0 ? (
            selectedValues.map((id) => {
              const option = options.find((opt) => opt.id === id)
              return option ? (
                <div key={id} className="bg-gray-700 text-white px-2 py-1 rounded-md flex items-center gap-1">
                  {option.label}
                  <X size={14} className="cursor-pointer hover:text-red-400" onClick={(e) => removeOption(id, e)} />
                </div>
              ) : null
            })
          ) : (
            <span className="text-gray-400">Select options...</span>
          )}
        </div>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
            <input
              type="text"
              className="w-full p-2 border-b border-gray-700 bg-gray-800 text-white rounded-t-lg"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />

            <div className="max-h-60 overflow-y-auto">
              {isLoading ? (
                <div className="p-2 text-center text-gray-400">Loading options...</div>
              ) : filteredOptions.length === 0 ? (
                <div className="p-2 text-center text-gray-400">No options found</div>
              ) : (
                filteredOptions.map((option) => (
                  <div
                    key={option.id}
                    className={`p-2 cursor-pointer hover:bg-gray-700 flex items-center gap-2 ${
                      selectedValues.includes(option.id) ? "bg-gray-700" : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleOption(option.id)
                    }}
                  >
                    <div
                      className={`w-4 h-4 border rounded flex items-center justify-center ${
                        selectedValues.includes(option.id) ? "bg-blue-500 border-blue-500" : "border-gray-500"
                      }`}
                    >
                      {selectedValues.includes(option.id) && <Check size={12} className="text-white" />}
                    </div>
                    <span className="text-white">{option.label}</span>
                  </div>
                ))
              )}
            </div>

            <div className="p-2 border-t border-gray-700 flex justify-between">
              <Button
              variant="destructive"
              size="sm"
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={(e) => {
                e.stopPropagation()
                onChange([])
              }}
              >
              Clear All
              </Button>
              <Button
              size="sm"
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={(e) => {
                e.stopPropagation()
                setIsOpen(false)
              }}
              >
              Done
              </Button>
            </div>
          </div>
        )}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}
