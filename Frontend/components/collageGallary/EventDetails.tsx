'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import {
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  MapPin,
  Users
} from 'lucide-react'
import { Event } from '../../types/types'

interface EventDetailsProps {
  event: Event | null
  isOpen: boolean
  onClose: () => void
}

const EventDetails: React.FC<EventDetailsProps> = ({
  event,
  isOpen,
  onClose
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!event) return null

  const handlePrevImage = () => {
    setCurrentImageIndex(prev =>
      prev > 0 ? prev - 1 : event.images.length - 1
    )
  }

  const handleNextImage = () => {
    setCurrentImageIndex(prev =>
      prev < event.images.length - 1 ? prev + 1 : 0
    )
  }

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index)
  }

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/70 flex justify-center pt-24 pb-4 px-4 overflow-y-auto transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      onClick={e => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        className={`bg-white rounded-xl w-full max-w-2xl max-h-[calc(100vh-6rem)] overflow-hidden transition-transform duration-300 ${isOpen ? 'scale-100' : 'scale-95'
          }`}
      >
        <div className="relative h-[30vh]">
          <Image
            src={event.images[currentImageIndex]}
            alt={`${event.title} - image ${currentImageIndex + 1}`}
            fill
            className="object-cover"
            priority
          />

          {event.images.length > 1 && (
            <>
              <button
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-colors"
                onClick={e => {
                  e.stopPropagation()
                  handlePrevImage()
                }}
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-colors"
                onClick={e => {
                  e.stopPropagation()
                  handleNextImage()
                }}
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          <button
            className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-colors"
            onClick={onClose}
            aria-label="Close details"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto h-[calc(100vh-30vh-6rem)]">
          <span className="text-sm font-medium bg-blue-600 text-white px-2 py-1 rounded-full mb-2 inline-block">
            {event.category}
          </span>
          <h2 className="text-2xl font-serif font-bold mb-4 text-gray-900">
            {event.title}
          </h2>

          <div className="flex flex-wrap gap-y-3 gap-x-6 mb-4 text-gray-700">
            <div className="flex items-center">
              <Calendar size={18} className="mr-2 text-indigo-700" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center">
              <MapPin size={18} className="mr-2 text-indigo-700" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center">
              <Users size={18} className="mr-2 text-indigo-700" />
              <span>{event.attendees} attendees</span>
            </div>
          </div>

          <p className="text-gray-700 mb-6 leading-relaxed">
            {event.description}
          </p>

          {event.images.length > 1 && (
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-3 text-gray-900">
                Event Gallery
              </h3>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {event.images.map((image, index) => (
                  <button
                    key={index}
                    className={`relative flex-shrink-0 w-20 h-20 rounded-md overflow-hidden focus:outline-none ${currentImageIndex === index
                        ? 'ring-2 ring-indigo-600'
                        : ''
                      }`}
                    onClick={() => handleThumbnailClick(index)}
                    title={`Thumbnail ${index + 1}`}
                  >
                    <Image
                      src={image}
                      alt={`${event.title} thumbnail ${index + 1}`}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EventDetails
