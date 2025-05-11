interface Feature {
  title: string
  desc: string
  icon: string
}

const features: Feature[] = [
  {
    title: "Student Portal",
    desc: "View enrollments, grades, and schedules in one place.",
    icon: "🎓",
  },
  {
    title: "Teacher Dashboard",
    desc: "Manage courses, assignments, and student progress.",
    icon: "👨‍🏫",
  },
  {
    title: "Admin Tools",
    desc: "Oversee faculty, departments, and system settings.",
    icon: "⚙️",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Powerful Features</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-lg shadow-cyan-600/50 transition border border-gray-700 hover:border-cyan-500/30 hover:-translate-y-2 duration-300"
            >
              <span className="text-4xl mb-4 block">{feature.icon}</span>
              <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
