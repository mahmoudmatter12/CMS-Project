import React from "react";

export const MissionSection: React.FC = () => {
  return (
    <div className="w-full bg-gradient-to-r from-blue-900/40 to-cyan-900/40 rounded-2xl p-8 md:p-12 border border-gray-800 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-12 items-center">
        {/* Left Column - Decorative Element */}
        <div className="relative w-full md:w-1/3 flex justify-center">
          <div className="h-104 w-64 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-xl absolute -z-10" />
          <div className="border-2 border-gray-700 rounded-2xl p-8 backdrop-blur-sm bg-white/5 h-full w-full">
            <h3 className="text-2xl font-bold mb-4 text-center text-blue-400">
              Our Mission
            </h3>
            <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6 rounded-full" />
          </div>
        </div>

        {/* Right Column - Content */}
        <div className="w-full pt-10 md:w-2/3">
          <p className="text-lg leading-relaxed text-white">
            Our mission is to transform academic management by providing
            intuitive, integrated solutions that connect students, faculty,
            and administrators. We are dedicated to supporting higher
            education institutions in achieving excellence in education,
            research, and community service at both national and regional
            levels across all academic disciplines.
          </p>

          {/* Stats/Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-12">
            {[
              { value: "100+", label: "Institutions" },
              { value: "24/7", label: "Support" },
              { value: "99.9%", label: "Uptime" },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white/5 p-4 rounded-lg border border-gray-800 hover:border-blue-400/30 transition-colors"
              >
                <p className="text-2xl font-bold text-blue-400">{stat.value}</p>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
