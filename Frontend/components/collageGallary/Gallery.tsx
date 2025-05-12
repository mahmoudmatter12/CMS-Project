"use client"
import React, { useState } from 'react';
import EventCard from './EventCard';
import GalleryHeader from './GalleryHeader';
import EventDetails from './EventDetails';
import { Event } from '../../types/types';
import { mockEvents } from '../../lib/constants';
import { Grid2X2 } from 'lucide-react';

const Gallery: React.FC = () => {
  const [events] = useState<Event[]>(mockEvents);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
  };

  return (
    <div className="min-h-screen">
      <GalleryHeader 
        isGridView={true}
        totalEvents={events.length}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-0">
        {events.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {events.map((event) => (
              <EventCard 
                key={event.id} 
                event={event} 
                onClick={() => handleEventClick(event)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Grid2X2 size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600">No events available at the moment</p>
          </div>
        )}
      </div>
      
      <EventDetails 
        event={selectedEvent}
        isOpen={isDetailsOpen}
        onClose={handleCloseDetails}
      />
    </div>
  );
};

export default Gallery;
