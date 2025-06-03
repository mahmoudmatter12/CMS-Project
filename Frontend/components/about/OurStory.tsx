import Image from "next/image"

export function OurStory() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r text-blue-400 bg-clip-text ">
              Our Story
            </h2>
            <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 mb-8 rounded-full" />

            <div className="space-y-6 text-gray-300">
              <p>
                Founded in 2023, our College Management System began with a simple vision: to eliminate the
                administrative burden that distracts educational institutions from their core mission of teaching and
                learning.
              </p>

              <p>
                What started as a small project to help local community colleges streamline their enrollment processes
                has grown into a comprehensive platform serving hundreds of institutions worldwide.
              </p>

              <p>
                Our team of educators, administrators, and technologists brings firsthand experience with the challenges
                facing modern educational institutions. We have lived through the frustrations of outdated systems and
                manual processes, which is why we are passionate about creating solutions that truly work for educators.
              </p>

              <p>
                Today, we are proud to offer a platform that not only simplifies administrative tasks but also provides
                valuable insights that help institutions improve student outcomes and operational efficiency.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-pink-500/10 rounded-2xl" />
            <div className="relative rounded-2xl overflow-hidden border border-gray-800">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Our journey"
                width={800}
                height={600}
                className="w-full h-auto"
              />
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="bg-white/5 p-4 rounded-lg border border-gray-800 text-center">
                <p className="text-3xl font-bold text-cyan-400 mb-1">2023</p>
                <p className="text-sm text-gray-400">Founded</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg border border-gray-800 text-center">
                <p className="text-3xl font-bold text-cyan-400 mb-1">20+</p>
                <p className="text-sm text-gray-400">Institutions</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg border border-gray-800 text-center">
                <p className="text-3xl font-bold text-cyan-400 mb-1">10+</p>
                <p className="text-sm text-gray-400">Countries</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}