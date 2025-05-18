export function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "This system has transformed how we manage our academic processes. The time saved on administrative tasks alone has been invaluable.",
      author: "Dr. Sarah Johnson",
      role: "Dean of Students, Pacific University",
    },
    {
      quote:
        "The analytics capabilities have given us insights we never had before. We're now able to identify and support at-risk students much earlier.",
      author: "Prof. Michael Chen",
      role: "Department Chair, Westlake College",
    },
    {
      quote:
        "Implementation was smooth and the support team has been exceptional. Our faculty adapted quickly and student feedback has been overwhelmingly positive.",
      author: "Amanda Rodriguez",
      role: "IT Director, Riverdale Community College",
    },
  ]

  return (
    <section className="py-16 bg-gray-800/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4  bg-gradient-to-r text-blue-400 bg-clip-text ">
            What Our Clients Say
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6 rounded-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gradient-to-b from-white/5 to-transparent p-6 rounded-xl border border-gray-800 hover:border-blue-500/30 transition-all"
            >
              <div className="mb-4 text-purple-500"> </div>
              <p className="text-gray-300 italic mb-6">{testimonial.quote}</p>
              <div className="mt-auto">
                <p className="font-medium">{testimonial.author}</p>
                <p className="text-blue-500 text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

