import React from 'react';

interface GalleryHeaderProps {
  isGridView: boolean;
  totalEvents: number;
}

const GalleryHeader: React.FC<GalleryHeaderProps> = ({ totalEvents }) => {
  return (
    <div className="w-full text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 md:py-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-center">
            Collage Memories
          </h1>
          <p className="text-xl text-center text-indigo-200 mb-8 max-w-3xl mx-auto">
            Explore {totalEvents}+ moments from our vibrant college events
          </p>
        </div>
      </div>
    </div>
  );
};

export default GalleryHeader;
