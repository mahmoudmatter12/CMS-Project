import { CheckCircle } from "lucide-react"

export function HowItWorksSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            How It Works
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6 rounded-full" />
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-500/50 to-pink-500/50 rounded-full" />

          {/* Steps */}
          <div className="space-y-24 relative">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0 text-right">
                <h3 className="text-2xl font-bold mb-4 text-purple-400">1. Implementation</h3>
                <p className="text-gray-300">
                  Our team works with you to customize the system to your institutions specific needs and migrate
                  existing data.
                </p>
              </div>
              <div className="z-10 w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center">
                <span className="text-white font-bold">1</span>
              </div>
              <div className="md:w-1/2 md:pl-12">
                <div className="bg-white/5 p-6 rounded-xl border border-gray-800">
                  <CheckCircle className="w-8 h-8 text-purple-400 mb-4" />
                  <p className="text-gray-400">
                    Typical implementation takes just 2-4 weeks with minimal disruption to your operations.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0 text-right order-1 md:order-1">
                <div className="bg-white/5 p-6 rounded-xl border border-gray-800">
                  <CheckCircle className="w-8 h-8 text-purple-400 mb-4" />
                  <p className="text-gray-400">
                    Comprehensive training ensures all users are comfortable with the system before full deployment.
                  </p>
                </div>
              </div>
              <div className="z-10 w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center order-2 md:order-2">
                <span className="text-white font-bold">2</span>
              </div>
              <div className="md:w-1/2 md:pl-12 order-3 md:order-3">
                <h3 className="text-2xl font-bold mb-4 text-purple-400">2. Training & Onboarding</h3>
                <p className="text-gray-300">
                  We provide comprehensive training for administrators, faculty, and students to ensure smooth adoption.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0 text-right">
                <h3 className="text-2xl font-bold mb-4 text-purple-400">3. Ongoing Support</h3>
                <p className="text-gray-300">
                  Our dedicated support team is available 24/7 to assist with any questions or issues that arise.
                </p>
              </div>
              <div className="z-10 w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center">
                <span className="text-white font-bold">3</span>
              </div>
              <div className="md:w-1/2 md:pl-12">
                <div className="bg-white/5 p-6 rounded-xl border border-gray-800">
                  <CheckCircle className="w-8 h-8 text-purple-400 mb-4" />
                  <p className="text-gray-400">
                    Regular updates and new features are automatically deployed, keeping your system cutting-edge.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
