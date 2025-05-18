import React from 'react';
import Image from 'next/image';
import { Calendar, Users, MapPin } from 'lucide-react';
import { Event } from '../../types/types';

interface EventCardProps {
  event: Event;
  onClick: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  return (
    <div 
      className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer bg-white"
      onClick={onClick}
    >
        <Image 
          src={event.coverImage} 
          alt={event.title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <span className="text-xs font-medium bg-blue-500 text-white px-2 py-1 rounded-full">
            {event.category}
          </span>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2">{event.title}</h3>
        
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <Calendar size={16} className="mr-1 flex-shrink-0" />
          <span>{event.date}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <MapPin size={16} className="mr-1 flex-shrink-0" />
          <span className="truncate">{event.location}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <Users size={16} className="mr-1 flex-shrink-0" />
          <span>{event.attendees} attendees</span>
        </div>
      </div>
      
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-800 rounded-xl pointer-events-none transition-colors duration-300"></div>
    </div>
  );
};

export default EventCard;