import React from "react";

export const TeamSection: React.FC = () => {
  return (
    <div className="py-16 px-4">
      <h2 className="text-3xl font-bold bg-gradient-to-r text-blue-400 bg-clip-text  text-center mb-8">
        Our Board of Directors
      </h2>
      <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-10 rounded-full" />

      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {[
          { name: "Mahmoud Mohamed", role: "Chairman of the Boardr" },
          { name: "Tarek Ahmed", role: "Vice Chairman of the Board" },
          { name: "Ahmed Fathy", role: "Rector" },
          { name: "Hussin Ahmed", role: "Vice Dean" },
          { name: "Omar Alsayed", role: "Vice Dean" },
        ].map((member, index) => (
          <div
            key={index}
            className="bg-gray-950 p-6 rounded-lg shadow-md text-center hover:-translate-y-2 hover:shadow-xl transition-all duration-300 hover:shadow-blue-500/10"
          >
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-900 flex items-center justify-center text-2xl font-bold text-gray-600">
              {member.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <h3 className="font-medium text-lg">{member.name}</h3>
            <p className="text-blue-400">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
