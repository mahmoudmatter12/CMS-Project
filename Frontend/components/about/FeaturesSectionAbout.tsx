import React from "react";

export const FeaturesSectionAbout: React.FC = () => {
  return (
    <>
    <div className="continer mt-10">
      <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r text-blue-400 bg-clip-text  font-sans text-center">
        Why Choose Our System
      </h2>
      <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6 rounded-full" />


      <div className="grid md:grid-cols-3 gap-8 mt-8">
        {[
          {
            icon: "📊",
            title: "Student-Centric Design",
            description:
              "Built with student needs at the core for effortless navigation",
          },
          {
            icon: "📝",
            title: "Faculty Empowerment",
            description:
              "Tools that save time and enhance teaching effectiveness",
          },
          {
            icon: "💬",
            title: "Admin Efficiency",
            description:
              "Comprehensive solutions for institutional management",
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="bg-gray-950 p-8 rounded-xl border border-gray-800 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 hover:shadow-rose-500/10"
          >
            <span className="emoji text-2xl">{feature.icon}</span>
            <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
      </div>
    </>
  );
};
