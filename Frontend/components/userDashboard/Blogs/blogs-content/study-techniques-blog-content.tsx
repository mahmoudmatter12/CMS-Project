"use client"

import { useState } from "react"
import { ArrowLeft, BookOpen, Brain, Clock, Lightbulb, Target } from "lucide-react"

export default function StudyTechniquesArticleContent() {
  const [activeSection, setActiveSection] = useState("overview")

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-indigo-900 to-purple-900 text-white p-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-indigo-300 hover:text-indigo-200 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Articles</span>
        </button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Effective Study Techniques</h1>
          <div className="flex items-center gap-4 text-indigo-300 mb-6">
            <span>Oct 2, 2023</span>
            <span>•</span>
            <span>By Jane Smith</span>
            <span>•</span>
            <span>12 min read</span>
          </div>
          <p className="text-xl text-indigo-100">
            Explore proven study methods to enhance your learning and improve academic performance.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-indigo-800 pb-4">
          <button
            onClick={() => setActiveSection("overview")}
            className={`px-4 py-2 rounded-full transition-colors ${
              activeSection === "overview"
                ? "bg-indigo-600 text-white"
                : "bg-indigo-800 bg-opacity-30 text-indigo-300 hover:bg-opacity-50"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveSection("techniques")}
            className={`px-4 py-2 rounded-full transition-colors ${
              activeSection === "techniques"
                ? "bg-indigo-600 text-white"
                : "bg-indigo-800 bg-opacity-30 text-indigo-300 hover:bg-opacity-50"
            }`}
          >
            Study Techniques
          </button>
          <button
            onClick={() => setActiveSection("environment")}
            className={`px-4 py-2 rounded-full transition-colors ${
              activeSection === "environment"
                ? "bg-indigo-600 text-white"
                : "bg-indigo-800 bg-opacity-30 text-indigo-300 hover:bg-opacity-50"
            }`}
          >
            Study Environment
          </button>
          <button
            onClick={() => setActiveSection("planning")}
            className={`px-4 py-2 rounded-full transition-colors ${
              activeSection === "planning"
                ? "bg-indigo-600 text-white"
                : "bg-indigo-800 bg-opacity-30 text-indigo-300 hover:bg-opacity-50"
            }`}
          >
            Study Planning
          </button>
        </div>

        {/* Content */}
        <div className="prose prose-lg prose-invert max-w-none">
          {activeSection === "overview" && (
            <div className="animate-in fade-in duration-500">
              <div className="bg-indigo-800 bg-opacity-20 p-6 rounded-xl mb-8 flex items-start gap-4">
                <BookOpen className="h-8 w-8 text-indigo-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-indigo-300 mb-2">Why Study Techniques Matter</h3>
                  <p>
                    Effective study techniques can dramatically improve your learning efficiency, retention, and
                    academic performance. The right approach can help you learn more in less time.
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-4 text-indigo-200">The Science of Learning</h2>
              <p className="mb-4">
                Modern cognitive science has revealed much about how our brains process and retain information.
                Effective study techniques are based on these scientific principles:
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-indigo-800 bg-opacity-30 p-5 rounded-lg">
                  <h3 className="font-bold text-indigo-300 mb-2 flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    Active Recall
                  </h3>
                  <p>
                    Actively retrieving information from memory strengthens neural pathways and improves long-term
                    retention compared to passive re-reading.
                  </p>
                </div>

                <div className="bg-indigo-800 bg-opacity-30 p-5 rounded-lg">
                  <h3 className="font-bold text-indigo-300 mb-2 flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Spaced Repetition
                  </h3>
                  <p>
                    Reviewing material at increasing intervals over time leads to stronger memory formation than
                    cramming all at once.
                  </p>
                </div>

                <div className="bg-indigo-800 bg-opacity-30 p-5 rounded-lg">
                  <h3 className="font-bold text-indigo-300 mb-2 flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Focused Attention
                  </h3>
                  <p>
                    Deep concentration without distractions allows for better processing and encoding of information in
                    long-term memory.
                  </p>
                </div>

                <div className="bg-indigo-800 bg-opacity-30 p-5 rounded-lg">
                  <h3 className="font-bold text-indigo-300 mb-2 flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    Elaborative Processing
                  </h3>
                  <p>
                    Connecting new information to existing knowledge creates stronger neural networks and improves
                    understanding and recall.
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-4 text-indigo-200">Common Study Challenges</h2>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="bg-indigo-600 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-1">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-indigo-300">Procrastination</h3>
                    <p>
                      Delaying study sessions until the last minute, leading to stress and reduced learning quality.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-indigo-600 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-1">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-indigo-300">Distractions</h3>
                    <p>Digital notifications, environmental noise, and multitasking that prevent deep focus.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-indigo-600 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-1">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-indigo-300">Ineffective Methods</h3>
                    <p>Relying on passive techniques like re-reading that feel productive but yield poor results.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-indigo-600 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-1">
                    4
                  </div>
                  <div>
                    <h3 className="font-bold text-indigo-300">Information Overload</h3>
                    <p>Attempting to learn too much at once without proper organization or breaks.</p>
                  </div>
                </div>
              </div>

              <p className="bg-indigo-700 p-4 rounded-lg">
                In the following sections, we will explore specific techniques, environmental factors, and planning
                strategies that can help you overcome these challenges and transform your study habits.
              </p>
            </div>
          )}

          {activeSection === "techniques" && (
            <div className="animate-in fade-in duration-500">
              <h2 className="text-2xl font-bold mb-6 text-indigo-200">Evidence-Based Study Techniques</h2>

              <div className="space-y-8 mb-8">
                <div className="bg-indigo-800 bg-opacity-20 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-3 text-indigo-300">1. The Pomodoro Technique</h3>
                  <p className="mb-4">
                    This time management method uses a timer to break work into intervals, traditionally 25 minutes in
                    length, separated by short breaks.
                  </p>
                  <div className="bg-indigo-900 bg-opacity-50 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold mb-2 text-indigo-200">How to implement:</h4>
                    <ol className="list-decimal list-inside space-y-2">
                      <li>Set a timer for 25 minutes and focus completely on one task</li>
                      <li>When the timer rings, take a 5-minute break</li>
                      <li>After four pomodoros, take a longer 15-30 minute break</li>
                      <li>Repeat the cycle</li>
                    </ol>
                  </div>
                  <div className="bg-indigo-900 bg-opacity-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 text-indigo-200">Why it works:</h4>
                    <p>
                      The technique leverages focused work periods that match attention spans while providing regular
                      breaks to prevent mental fatigue. The timer creates a sense of urgency that helps combat
                      procrastination.
                    </p>
                  </div>
                </div>

                <div className="bg-indigo-800 bg-opacity-20 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-3 text-indigo-300">2. Spaced Repetition</h3>
                  <p className="mb-4">
                    This technique involves reviewing material at systematically spaced intervals to improve long-term
                    retention.
                  </p>
                  <div className="bg-indigo-900 bg-opacity-50 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold mb-2 text-indigo-200">How to implement:</h4>
                    <ol className="list-decimal list-inside space-y-2">
                      <li>Review new material within 24 hours of first learning it</li>
                      <li>Review again after 3 days</li>
                      <li>Review again after 1 week</li>
                      <li>Review again after 2 weeks</li>
                      <li>Final review after 1 month</li>
                    </ol>
                  </div>
                  <div className="bg-indigo-900 bg-opacity-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 text-indigo-200">Why it works:</h4>
                    <p>
                      Spaced repetition works with your brain forgetting curve. By reviewing material just as you are
                      about to forget it, you strengthen the neural pathways and improve long-term retention.
                    </p>
                  </div>
                </div>

                <div className="bg-indigo-800 bg-opacity-20 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-3 text-indigo-300">3. Active Recall</h3>
                  <p className="mb-4">
                    This technique involves actively stimulating memory during the learning process by testing yourself.
                  </p>
                  <div className="bg-indigo-900 bg-opacity-50 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold mb-2 text-indigo-200">How to implement:</h4>
                    <ul className="list-disc list-inside space-y-2">
                      <li>After reading a section, close the book and write down everything you remember</li>
                      <li>Create flashcards with questions on one side and answers on the other</li>
                      <li>Explain concepts out loud as if teaching someone else</li>
                      <li>Create practice tests for yourself based on the material</li>
                    </ul>
                  </div>
                  <div className="bg-indigo-900 bg-opacity-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 text-indigo-200">Why it works:</h4>
                    <p>
                      Retrieving information from memory strengthens the neural pathways associated with that
                      information, making it easier to recall in the future. It also helps identify knowledge gaps.
                    </p>
                  </div>
                </div>

                <div className="bg-indigo-800 bg-opacity-20 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-3 text-indigo-300">4. The Feynman Technique</h3>
                  <p className="mb-4">
                    Named after physicist Richard Feynman, this technique involves explaining concepts in simple terms
                    to deepen understanding.
                  </p>
                  <div className="bg-indigo-900 bg-opacity-50 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold mb-2 text-indigo-200">How to implement:</h4>
                    <ol className="list-decimal list-inside space-y-2">
                      <li>Choose a concept and write it at the top of a page</li>
                      <li>Explain the concept in simple language as if teaching a child</li>
                      <li>Identify gaps in your explanation and review the source material</li>
                      <li>Simplify technical language and create analogies</li>
                    </ol>
                  </div>
                  <div className="bg-indigo-900 bg-opacity-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 text-indigo-200">Why it works:</h4>
                    <p>
                      The process of simplifying complex ideas forces you to truly understand the material rather than
                      memorize it. Teaching requires a deeper level of processing than passive learning.
                    </p>
                  </div>
                </div>

                <div className="bg-indigo-800 bg-opacity-20 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-3 text-indigo-300">5. Mind Mapping</h3>
                  <p className="mb-4">
                    A visual technique that helps organize information and show relationships between concepts.
                  </p>
                  <div className="bg-indigo-900 bg-opacity-50 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold mb-2 text-indigo-200">How to implement:</h4>
                    <ol className="list-decimal list-inside space-y-2">
                      <li>Write the main topic in the center of a blank page</li>
                      <li>Draw branches from the center for major subtopics</li>
                      <li>Add smaller branches for related details</li>
                      <li>Use colors, images, and symbols to enhance memory</li>
                    </ol>
                  </div>
                  <div className="bg-indigo-900 bg-opacity-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 text-indigo-200">Why it works:</h4>
                    <p>
                      Mind mapping mimics the way our brains naturally organize information through association. The
                      visual nature engages more parts of the brain, improving recall and understanding.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "environment" && (
            <div className="animate-in fade-in duration-500">
              <h2 className="text-2xl font-bold mb-6 text-indigo-200">Optimizing Your Study Environment</h2>

              <p className="mb-6">
                Your physical environment significantly impacts your ability to focus and learn effectively. Creating
                the right study space can enhance concentration, reduce distractions, and improve productivity.
              </p>

              <div className="space-y-8 mb-8">
                <div className="bg-indigo-800 bg-opacity-20 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-3 text-indigo-300">Physical Space Design</h3>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-indigo-900 bg-opacity-40 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 text-indigo-200">Dedicated Study Area</h4>
                      <p>
                        Designate a specific area solely for studying. This helps your brain associate the space with
                        focused work and triggers a productive mindset when you enter it.
                      </p>
                    </div>

                    <div className="bg-indigo-900 bg-opacity-40 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 text-indigo-200">Ergonomic Setup</h4>
                      <p>
                        Ensure your chair, desk, and computer are positioned to maintain good posture. Physical
                        discomfort can be a major distraction during study sessions.
                      </p>
                    </div>

                    <div className="bg-indigo-900 bg-opacity-40 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 text-indigo-200">Lighting</h4>
                      <p>
                        Use natural light when possible, supplemented by good quality artificial lighting. Poor lighting
                        causes eye strain and fatigue, reducing study effectiveness.
                      </p>
                    </div>

                    <div className="bg-indigo-900 bg-opacity-40 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 text-indigo-200">Temperature</h4>
                      <p>
                        Maintain a slightly cool temperature (around 68-72°F or 20-22°C). Studies show this range is
                        optimal for concentration and alertness.
                      </p>
                    </div>
                  </div>

                  <div className="bg-indigo-700 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Pro Tip:</h4>
                    <p>
                      Consider having multiple study locations to prevent boredom and maintain engagement. Research
                      shows that varying your study environment can improve retention by creating multiple contextual
                      cues for memory.
                    </p>
                  </div>
                </div>

                <div className="bg-indigo-800 bg-opacity-20 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-3 text-indigo-300">Managing Distractions</h3>

                  <div className="space-y-4 mb-4">
                    <div className="bg-indigo-900 bg-opacity-40 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 text-indigo-200">Digital Distractions</h4>
                      <ul className="list-disc list-inside space-y-2">
                        <li>
                          Use website blockers like Freedom or Cold Turkey to restrict access to distracting websites
                        </li>
                        <li>
                          Put your phone in Do Not Disturb mode or use apps like Forest that gamify staying focused
                        </li>
                        <li>Disable notifications on all devices during study sessions</li>
                        <li>Consider using a separate user account on your computer dedicated to studying</li>
                      </ul>
                    </div>

                    <div className="bg-indigo-900 bg-opacity-40 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 text-indigo-200">Environmental Distractions</h4>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Use noise-cancelling headphones in noisy environments</li>
                        <li>Play ambient background sounds or white noise to mask disruptive sounds</li>
                        <li>Communicate boundaries to roommates or family members during study time</li>
                        <li>Keep your study area clean and organized to minimize visual distractions</li>
                      </ul>
                    </div>

                    <div className="bg-indigo-900 bg-opacity-40 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 text-indigo-200">Internal Distractions</h4>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Keep a distraction pad nearby to jot down intrusive thoughts or to-dos that pop up</li>
                        <li>Practice mindfulness techniques to bring your attention back when it wanders</li>
                        <li>Address basic needs before studying (hunger, thirst, restroom breaks)</li>
                        <li>Schedule worry time outside of study sessions to deal with anxious thoughts</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-indigo-800 bg-opacity-20 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-3 text-indigo-300">Study Materials and Organization</h3>

                  <div className="space-y-4 mb-4">
                    <div className="bg-indigo-900 bg-opacity-40 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 text-indigo-200">Essential Supplies</h4>
                      <p className="mb-2">Keep these items readily available in your study area:</p>
                      <ul className="list-disc list-inside grid md:grid-cols-2 gap-2">
                        <li>Quality notebooks and paper</li>
                        <li>Pens, pencils, highlighters</li>
                        <li>Sticky notes and page markers</li>
                        <li>Calculator (if needed)</li>
                        <li>Textbooks and reference materials</li>
                        <li>Water bottle</li>
                        <li>Chargers for electronic devices</li>
                        <li>Headphones</li>
                      </ul>
                    </div>

                    <div className="bg-indigo-900 bg-opacity-40 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 text-indigo-200">Digital Organization</h4>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Create a logical folder structure for digital notes and resources</li>
                        <li>Use consistent file naming conventions</li>
                        <li>Back up important documents to cloud storage</li>
                        <li>
                          Consider using note-taking apps like Notion, Evernote, or OneNote that sync across devices
                        </li>
                      </ul>
                    </div>

                    <div className="bg-indigo-900 bg-opacity-40 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 text-indigo-200">Physical Organization</h4>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Use binders or folders with dividers for different subjects</li>
                        <li>Implement a color-coding system for different courses or topics</li>
                        <li>Keep frequently used items within reach</li>
                        <li>Clear your desk of unrelated materials before each study session</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-indigo-700 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Remember:</h4>
                    <p>
                      The goal of organization is to reduce friction in your study process. Every minute spent searching
                      for materials or files is a minute not spent learning. A well-organized study environment allows
                      you to focus your mental energy on the content rather than managing logistics.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "planning" && (
            <div className="animate-in fade-in duration-500">
              <h2 className="text-2xl font-bold mb-6 text-indigo-200">Strategic Study Planning</h2>

              <p className="mb-6">
                Effective study planning helps you allocate your time efficiently, maintain consistency, and reduce
                stress. A well-designed study plan ensures comprehensive coverage of material while preventing burnout.
              </p>

              <div className="space-y-8 mb-8">
                <div className="bg-indigo-800 bg-opacity-20 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-3 text-indigo-300">Creating a Term-Level Plan</h3>

                  <div className="bg-indigo-900 bg-opacity-40 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold mb-2 text-indigo-200">Steps to Create a Term Plan:</h4>
                    <ol className="list-decimal list-inside space-y-3">
                      <li>
                        <strong>Gather course syllabi</strong> - Collect all assignment due dates, exam dates, and
                        reading schedules
                      </li>
                      <li>
                        <strong>Create a master calendar</strong> - Input all important dates from all courses into one
                        calendar
                      </li>
                      <li>
                        <strong>Identify high-workload periods</strong> - Look for weeks with multiple assignments or
                        exams
                      </li>
                      <li>
                        <strong>Plan backward from deadlines</strong> - Schedule study sessions and work time for major
                        assignments
                      </li>
                      <li>
                        <strong>Allocate more time to challenging subjects</strong> - Be realistic about which courses
                        will require more effort
                      </li>
                    </ol>
                  </div>

                  <div className="bg-indigo-700 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Pro Tip:</h4>
                    <p>
                      Schedule buffer time before major deadlines to account for unexpected events or difficulties. This
                      prevents last-minute cramming and reduces stress.
                    </p>
                  </div>
                </div>

                <div className="bg-indigo-800 bg-opacity-20 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-3 text-indigo-300">Weekly Planning</h3>

                  <div className="bg-indigo-900 bg-opacity-40 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold mb-2 text-indigo-200">Creating an Effective Weekly Schedule:</h4>

                    <ol className="list-decimal list-inside space-y-3">
                      <li>
                        <strong>Block fixed commitments first</strong> - Classes, work, extracurriculars, and personal
                        obligations
                      </li>
                      <li>
                        <strong>Identify your peak productivity hours</strong> - Schedule challenging study tasks during
                        these times
                      </li>
                      <li>
                        <strong>Create subject-specific blocks</strong> - Dedicate specific times to each course
                      </li>
                      <li>
                        <strong>Include review sessions</strong> - Schedule regular review of previous material
                      </li>
                      <li>
                        <strong>Plan breaks and downtime</strong> - Include leisure activities and rest periods
                      </li>
                    </ol>
                  </div>

                  <div className="bg-indigo-900 bg-opacity-40 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold mb-2 text-indigo-200">Sample Weekly Template:</h4>

                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-indigo-800 bg-opacity-50">
                            <th className="p-2 text-left">Time</th>
                            <th className="p-2 text-left">Monday</th>
                            <th className="p-2 text-left">Tuesday</th>
                            <th className="p-2 text-left">Wednesday</th>
                            <th className="p-2 text-left">Thursday</th>
                            <th className="p-2 text-left">Friday</th>
                            <th className="p-2 text-left">Weekend</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-t border-indigo-800">
                            <td className="p-2">7-9 AM</td>
                            <td className="p-2">Math Study</td>
                            <td className="p-2">Science Reading</td>
                            <td className="p-2">Math Study</td>
                            <td className="p-2">Science Reading</td>
                            <td className="p-2">Review</td>
                            <td className="p-2">Free Time</td>
                          </tr>
                          <tr className="border-t border-indigo-800">
                            <td className="p-2">9-12 PM</td>
                            <td className="p-2">Classes</td>
                            <td className="p-2">Classes</td>
                            <td className="p-2">Classes</td>
                            <td className="p-2">Classes</td>
                            <td className="p-2">Classes</td>
                            <td className="p-2">Major Projects</td>
                          </tr>
                          <tr className="border-t border-indigo-800">
                            <td className="p-2">1-3 PM</td>
                            <td className="p-2">History Study</td>
                            <td className="p-2">Classes</td>
                            <td className="p-2">History Study</td>
                            <td className="p-2">Classes</td>
                            <td className="p-2">Group Study</td>
                            <td className="p-2">Review</td>
                          </tr>
                          <tr className="border-t border-indigo-800">
                            <td className="p-2">3-5 PM</td>
                            <td className="p-2">Exercise</td>
                            <td className="p-2">Language Study</td>
                            <td className="p-2">Exercise</td>
                            <td className="p-2">Language Study</td>
                            <td className="p-2">Exercise</td>
                            <td className="p-2">Free Time</td>
                          </tr>
                          <tr className="border-t border-indigo-800">
                            <td className="p-2">7-9 PM</td>
                            <td className="p-2">Reading</td>
                            <td className="p-2">Problem Sets</td>
                            <td className="p-2">Essay Writing</td>
                            <td className="p-2">Problem Sets</td>
                            <td className="p-2">Free Time</td>
                            <td className="p-2">Prepare for Week</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="bg-indigo-700 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Remember:</h4>
                    <p>
                      Your weekly schedule should be realistic and include flexibility. Trying to study for 12 hours a
                      day is unsustainable. Quality of study time is more important than quantity.
                    </p>
                  </div>
                </div>

                <div className="bg-indigo-800 bg-opacity-20 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-3 text-indigo-300">Daily Study Sessions</h3>

                  <div className="bg-indigo-900 bg-opacity-40 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold mb-2 text-indigo-200">Structuring Effective Study Sessions:</h4>

                    <ol className="list-decimal list-inside space-y-3">
                      <li>
                        <strong>Set clear objectives</strong> - Define exactly what you want to accomplish in each
                        session
                      </li>
                      <li>
                        <strong>Use the right technique for the task</strong> - Match your study method to the type of
                        material
                      </li>
                      <li>
                        <strong>Start with the most challenging material</strong> - Tackle difficult topics when your
                        mind is fresh
                      </li>
                      <li>
                        <strong>Take strategic breaks</strong> - Use the Pomodoro technique or similar time-blocking
                        methods
                      </li>
                      <li>
                        <strong>End with a review</strong> - Summarize what you have learned at the end of each session
                      </li>
                    </ol>
                  </div>

                  <div className="bg-indigo-900 bg-opacity-40 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold mb-2 text-indigo-200">Sample Study Session Structure:</h4>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="bg-indigo-600 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0">
                          1
                        </div>
                        <div>
                          <strong>5 min:</strong> Review previous material and set session goals
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="bg-indigo-600 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0">
                          2
                        </div>
                        <div>
                          <strong>25 min:</strong> Focused study on new material
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="bg-indigo-600 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0">
                          3
                        </div>
                        <div>
                          <strong>5 min:</strong> Break
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="bg-indigo-600 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0">
                          4
                        </div>
                        <div>
                          <strong>25 min:</strong> Practice problems or active recall
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="bg-indigo-600 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0">
                          5
                        </div>
                        <div>
                          <strong>5 min:</strong> Break
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="bg-indigo-600 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0">
                          6
                        </div>
                        <div>
                          <strong>15 min:</strong> Summarize and create study notes
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="bg-indigo-600 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0">
                          7
                        </div>
                        <div>
                          <strong>5 min:</strong> Plan next study session
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-indigo-700 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Pro Tip:</h4>
                    <p>
                      Track your study sessions to identify patterns in your productivity. Note when you feel most
                      focused and what distractions most commonly interrupt your flow. Use this data to continuously
                      refine your study approach.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-700 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Final Thoughts</h3>
                <p className="mb-4">
                  Effective study planning is highly personal. What works for one student may not work for another.
                  Experiment with different approaches and be willing to adjust your plans based on what you learn about
                  your own study habits and preferences.
                </p>
                <p>
                  Remember that consistency is more important than perfection. A realistic plan that you can follow is
                  better than an ideal plan that you abandon after a week. Start with small changes and gradually build
                  more effective study habits over time.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
