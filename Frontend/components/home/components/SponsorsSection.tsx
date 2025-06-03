"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { sponsors } from '@/lib/constants';

const SponsorsSection = () => {
  const [hoveredSponsor, setHoveredSponsor] = useState<string | null>(null);
  const duplicatedSponsors = [...sponsors, ...sponsors, ...sponsors];

  return (
    <section className="py-16 bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Our Trusted Partners
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We&apos;re proud to partner with leading organizations that support education and innovation
          </p>
        </motion.div>

        {/* Single Moving Line */}
        <div>
          <motion.div
            className="flex gap-16 items-center"
            animate={{
              x: [0, -100 * sponsors.length * 1.8],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
            style={{
              width: `${duplicatedSponsors.length * 220}px`,
            }}
          >
            {duplicatedSponsors.map((sponsor, index) => (
              <div
                key={`${sponsor.id}-${index}`}
                className="w-48 h-32 relative flex-shrink-0 bg-indigo-200/20 dark:bg-gray-800 rounded-full shadow-lg
                          flex items-center justify-center p-6 cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-xl"
                onMouseEnter={() => setHoveredSponsor(`${sponsor.id}-${index}`)}
                onMouseLeave={() => setHoveredSponsor(null)}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={sponsor.logo}
                    alt={`${sponsor.name} logo`}
                    fill
                    className="object-contain rounded-full"
                    sizes="200px"
                  />
                </div>

                {/* Sponsor Name Tooltip */}
                {hoveredSponsor === `${sponsor.id}-${index}` && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute -top-12 left-1/2 transform -translate-x-1/2 
                              bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 
                              px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap
                              shadow-lg z-10"
                  >
                    {sponsor.name}
                    {/* Arrow pointing down */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 
                                    border-l-4 border-r-4 border-t-4 border-transparent 
                                    border-t-gray-900 dark:border-t-gray-100"></div>
                  </motion.div>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;