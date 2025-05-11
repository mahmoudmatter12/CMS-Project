export function StatisticsSection() {
  const stats = [
    { value: "500+", label: "Educational Institutions" },
    { value: "50,000+", label: "Active Students" },
    { value: "10,000+", label: "Faculty Members" },
    { value: "99.9%", label: "Uptime Guarantee" },
  ]

  return (
    <section className="py-20 bg-gray-800/30">
      <div className="container mx-auto px-4">
        <h2 className="sr-only">Our Impact in Numbers</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="p-6">
              <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                {stat.value}
              </p>
              <p className="text-gray-400 text-sm md:text-base">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
