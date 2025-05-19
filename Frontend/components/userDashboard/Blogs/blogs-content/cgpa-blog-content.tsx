"use client"

import { useState } from "react"
import { ArrowLeft, Calculator, BarChart, BookOpen } from "lucide-react"

export default function CGPAArticleContent() {
  const [activeSection, setActiveSection] = useState("overview")

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-blue-900 to-indigo-950 text-white p-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-blue-300 hover:text-blue-200 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Articles</span>
        </button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Understanding Your CGPA</h1>
          <div className="flex items-center gap-4 text-blue-300 mb-6">
            <span>Oct 1, 2023</span>
            <span>•</span>
            <span>By John Doe</span>
            <span>•</span>
            <span>10 min read</span>
          </div>
          <p className="text-xl text-blue-100">
            Learn how to calculate and interpret your CGPA to track your academic progress effectively.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-blue-800 pb-4">
          <button
            onClick={() => setActiveSection("overview")}
            className={`px-4 py-2 rounded-full transition-colors ${
              activeSection === "overview"
                ? "bg-blue-600 text-white"
                : "bg-blue-800 bg-opacity-30 text-blue-300 hover:bg-opacity-50"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveSection("calculation")}
            className={`px-4 py-2 rounded-full transition-colors ${
              activeSection === "calculation"
                ? "bg-blue-600 text-white"
                : "bg-blue-800 bg-opacity-30 text-blue-300 hover:bg-opacity-50"
            }`}
          >
            Calculation Method
          </button>
          <button
            onClick={() => setActiveSection("interpretation")}
            className={`px-4 py-2 rounded-full transition-colors ${
              activeSection === "interpretation"
                ? "bg-blue-600 text-white"
                : "bg-blue-800 bg-opacity-30 text-blue-300 hover:bg-opacity-50"
            }`}
          >
            Interpretation
          </button>
          <button
            onClick={() => setActiveSection("tips")}
            className={`px-4 py-2 rounded-full transition-colors ${
              activeSection === "tips"
                ? "bg-blue-600 text-white"
                : "bg-blue-800 bg-opacity-30 text-blue-300 hover:bg-opacity-50"
            }`}
          >
            Improvement Tips
          </button>
        </div>

        {/* Content */}
        <div className="prose prose-lg prose-invert max-w-none">
          {activeSection === "overview" && (
            <div className="animate-in fade-in duration-500">
              <div className="bg-blue-800 bg-opacity-20 p-6 rounded-xl mb-8 flex items-start gap-4">
                <BookOpen className="h-8 w-8 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-blue-300 mb-2">What is CGPA?</h3>
                  <p>
                    CGPA (Cumulative Grade Point Average) is a standard measure of academic achievement used by
                    educational institutions worldwide. It represents the average of grade points earned across all
                    courses taken during your academic program.
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-4 text-blue-200">Why CGPA Matters</h2>
              <p className="mb-4">
                Your CGPA is more than just a number. It serves as a comprehensive indicator of your academic
                performance and can impact various aspects of your educational journey:
              </p>

              <ul className="space-y-4 mb-6">
                <li className="flex gap-3">
                  <div className="bg-blue-600 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-1">
                    1
                  </div>
                  <div>
                    <strong className="text-blue-300">Academic Standing</strong> - Most institutions require a minimum
                    CGPA to maintain good academic standing and avoid probation.
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="bg-blue-600 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-1">
                    2
                  </div>
                  <div>
                    <strong className="text-blue-300">Scholarship Eligibility</strong> - Many scholarships and financial
                    aid programs have minimum CGPA requirements.
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="bg-blue-600 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-1">
                    3
                  </div>
                  <div>
                    <strong className="text-blue-300">Graduate School Applications</strong> - Graduate programs often
                    have CGPA cutoffs for admission consideration.
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="bg-blue-600 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-1">
                    4
                  </div>
                  <div>
                    <strong className="text-blue-300">Employment Opportunities</strong> - Some employers, particularly
                    for entry-level positions, consider CGPA during recruitment.
                  </div>
                </li>
              </ul>

              <p>
                Understanding how your CGPA is calculated and what it represents is the first step toward effectively
                managing your academic performance and setting realistic goals for improvement.
              </p>
            </div>
          )}

          {activeSection === "calculation" && (
            <div className="animate-in fade-in duration-500">
              <div className="bg-blue-800 bg-opacity-20 p-6 rounded-xl mb-8 flex items-start gap-4">
                <Calculator className="h-8 w-8 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-blue-300 mb-2">CGPA Calculation Formula</h3>
                  <p>
                    CGPA is calculated by dividing the total grade points earned by the total credit hours attempted.
                  </p>
                </div>
              </div>

              <div className="bg-blue-700 bg-opacity-20 p-4 rounded-lg mb-6 text-center">
                <p className="text-xl font-mono">CGPA = Total Grade Points / Total Credit Hours</p>
              </div>

              <h2 className="text-2xl font-bold mb-4 text-blue-200">Step-by-Step Calculation</h2>

              <ol className="space-y-6 mb-6">
                <li className="bg-blue-900 bg-opacity-40 p-4 rounded-lg">
                  <h3 className="font-bold text-blue-300 mb-2">Step 1: Determine Grade Points for Each Course</h3>
                  <p className="mb-3">
                    Convert your letter grades to grade points according to your scale. A common scale is:
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-blue-800 bg-opacity-50">
                          <th className="p-2 text-left">Letter Grade</th>
                          <th className="p-2 text-left">Grade Points</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t border-blue-800">
                          <td className="p-2">A or A+</td>
                          <td className="p-2">4.0</td>
                        </tr>
                        <tr className="border-t border-blue-800">
                          <td className="p-2">A-</td>
                          <td className="p-2">3.7</td>
                        </tr>
                        <tr className="border-t border-blue-800">
                          <td className="p-2">B+</td>
                          <td className="p-2">3.3</td>
                        </tr>
                        <tr className="border-t border-blue-800">
                          <td className="p-2">B</td>
                          <td className="p-2">3.0</td>
                        </tr>
                        <tr className="border-t border-blue-800">
                          <td className="p-2">B-</td>
                          <td className="p-2">2.7</td>
                        </tr>
                        <tr className="border-t border-blue-800">
                          <td className="p-2">C+</td>
                          <td className="p-2">2.3</td>
                        </tr>
                        <tr className="border-t border-blue-800">
                          <td className="p-2">C</td>
                          <td className="p-2">2.0</td>
                        </tr>
                        <tr className="border-t border-blue-800">
                          <td className="p-2">D</td>
                          <td className="p-2">1.0</td>
                        </tr>
                        <tr className="border-t border-blue-800">
                          <td className="p-2">F</td>
                          <td className="p-2">0.0</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </li>

                <li className="bg-blue-900 bg-opacity-40 p-4 rounded-lg">
                  <h3 className="font-bold text-blue-300 mb-2">Step 2: Calculate Grade Points for Each Course</h3>
                  <p className="mb-3">Multiply the grade point by the credit hours for each course:</p>
                  <div className="bg-blue-800 bg-opacity-30 p-3 rounded">
                    <p className="font-mono">Course Grade Points = Grade Point Value × Credit Hours</p>
                  </div>
                </li>

                <li className="bg-blue-900 bg-opacity-40 p-4 rounded-lg">
                  <h3 className="font-bold text-blue-300 mb-2">
                    Step 3: Calculate Total Grade Points and Credit Hours
                  </h3>
                  <p className="mb-3">Sum up all the course grade points and all the credit hours:</p>
                  <div className="bg-blue-800 bg-opacity-30 p-3 rounded mb-3">
                    <p className="font-mono">Total Grade Points = Sum of all Course Grade Points</p>
                  </div>
                  <div className="bg-blue-800 bg-opacity-30 p-3 rounded">
                    <p className="font-mono">Total Credit Hours = Sum of all Credit Hours</p>
                  </div>
                </li>

                <li className="bg-blue-900 bg-opacity-40 p-4 rounded-lg">
                  <h3 className="font-bold text-blue-300 mb-2">Step 4: Calculate CGPA</h3>
                  <p className="mb-3">Divide the total grade points by the total credit hours:</p>
                  <div className="bg-blue-800 bg-opacity-30 p-3 rounded">
                    <p className="font-mono">CGPA = Total Grade Points / Total Credit Hours</p>
                  </div>
                </li>
              </ol>

              <div className="bg-blue-700 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-bold mb-3">Example Calculation</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-blue-600">
                        <th className="p-2 text-left">Course</th>
                        <th className="p-2 text-left">Credit Hours</th>
                        <th className="p-2 text-left">Grade</th>
                        <th className="p-2 text-left">Grade Points</th>
                        <th className="p-2 text-left">Course Grade Points</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-blue-500">
                        <td className="p-2">Mathematics</td>
                        <td className="p-2">3</td>
                        <td className="p-2">A</td>
                        <td className="p-2">4.0</td>
                        <td className="p-2">12.0</td>
                      </tr>
                      <tr className="border-t border-blue-500">
                        <td className="p-2">Physics</td>
                        <td className="p-2">4</td>
                        <td className="p-2">B+</td>
                        <td className="p-2">3.3</td>
                        <td className="p-2">13.2</td>
                      </tr>
                      <tr className="border-t border-blue-500">
                        <td className="p-2">Chemistry</td>
                        <td className="p-2">3</td>
                        <td className="p-2">A-</td>
                        <td className="p-2">3.7</td>
                        <td className="p-2">11.1</td>
                      </tr>
                      <tr className="border-t border-blue-500">
                        <td className="p-2">English</td>
                        <td className="p-2">2</td>
                        <td className="p-2">B</td>
                        <td className="p-2">3.0</td>
                        <td className="p-2">6.0</td>
                      </tr>
                      <tr className="border-t border-blue-500 font-bold">
                        <td className="p-2">Total</td>
                        <td className="p-2">12</td>
                        <td className="p-2">-</td>
                        <td className="p-2">-</td>
                        <td className="p-2">42.3</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 p-3 bg-blue-600 rounded">
                  <p className="font-mono">CGPA = 42.3 / 12 = 3.525</p>
                </div>
              </div>
            </div>
          )}

          {activeSection === "interpretation" && (
            <div className="animate-in fade-in duration-500">
              <div className="bg-blue-800 bg-opacity-20 p-6 rounded-xl mb-8 flex items-start gap-4">
                <BarChart className="h-8 w-8 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-blue-300 mb-2">Interpreting Your CGPA</h3>
                  <p>
                    Understanding what your CGPA means in context can help you assess your academic standing and set
                    appropriate goals.
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-4 text-blue-200">CGPA Scale Interpretation</h2>

              <div className="space-y-4 mb-8">
                <div className="bg-gradient-to-r from-green-600 to-green-500 p-4 rounded-lg">
                  <h3 className="font-bold text-xl mb-1">3.7 - 4.0: Excellent</h3>
                  <p>
                    Represents outstanding academic achievement. Students in this range are typically eligible for
                    academic honors and competitive scholarships.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-green-500 to-green-400 p-4 rounded-lg">
                  <h3 className="font-bold text-xl mb-1">3.3 - 3.69: Very Good</h3>
                  <p>
                    Indicates strong academic performance. Students in this range are well-positioned for graduate
                    school applications and competitive internships.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-green-400 to-yellow-400 p-4 rounded-lg">
                  <h3 className="font-bold text-xl mb-1">3.0 - 3.29: Good</h3>
                  <p>
                    Represents solid academic performance. This range meets the minimum requirements for most graduate
                    programs and scholarships.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-yellow-400 to-yellow-300 p-4 rounded-lg">
                  <h3 className="font-bold text-xl mb-1">2.7 - 2.99: Satisfactory</h3>
                  <p>
                    Indicates acceptable academic performance. Students in this range may need to improve to meet
                    requirements for certain programs.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-yellow-300 to-orange-400 p-4 rounded-lg">
                  <h3 className="font-bold text-xl mb-1">2.0 - 2.69: Passing</h3>
                  <p>
                    Represents minimum passing performance. Students in this range may be at risk of academic probation
                    and should seek support.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-orange-400 to-red-500 p-4 rounded-lg">
                  <h3 className="font-bold text-xl mb-1">Below 2.0: Concern</h3>
                  <p>
                    Indicates academic difficulty. Students in this range are typically placed on academic probation and
                    need immediate intervention.
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-4 text-blue-200">Contextual Factors</h2>

              <p className="mb-4">When interpreting your CGPA, consider these important contextual factors:</p>

              <ul className="space-y-4 mb-6">
                <li className="bg-blue-900 bg-opacity-30 p-4 rounded-lg">
                  <h3 className="font-bold text-blue-300 mb-1">Institutional Standards</h3>
                  <p>
                    Different institutions may have different grading policies and standards. A 3.5 at one university
                    might represent different achievement than a 3.5 at another.
                  </p>
                </li>

                <li className="bg-blue-900 bg-opacity-30 p-4 rounded-lg">
                  <h3 className="font-bold text-blue-300 mb-1">Program Difficulty</h3>
                  <p>
                    Some academic programs are more rigorous than others. A 3.2 in Engineering might be more difficult
                    to achieve than a 3.5 in another field.
                  </p>
                </li>

                <li className="bg-blue-900 bg-opacity-30 p-4 rounded-lg">
                  <h3 className="font-bold text-blue-300 mb-1">Course Load</h3>
                  <p>
                    Maintaining a high CGPA while taking a heavy course load or challenging courses demonstrates strong
                    academic ability.
                  </p>
                </li>

                <li className="bg-blue-900 bg-opacity-30 p-4 rounded-lg">
                  <h3 className="font-bold text-blue-300 mb-1">Trend Over Time</h3>
                  <p>
                    An upward trend in your GPA over time can be viewed positively, even if your overall CGPA is not as
                    high as you would like.
                  </p>
                </li>
              </ul>
            </div>
          )}

          {activeSection === "tips" && (
            <div className="animate-in fade-in duration-500">
              <h2 className="text-2xl font-bold mb-6 text-blue-200">Strategies to Improve Your CGPA</h2>

              <div className="space-y-6 mb-8">
                <div className="bg-blue-800 bg-opacity-20 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-3 text-blue-300">1. Strategic Course Selection</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="bg-blue-600 rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-1">
                        ✓
                      </div>
                      <p>Balance difficult courses with more manageable ones each semester</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-blue-600 rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-1">
                        ✓
                      </div>
                      <p>Consider your strengths and weaknesses when selecting electives</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-blue-600 rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-1">
                        ✓
                      </div>
                      <p>Research professors and their teaching styles before enrolling</p>
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-800 bg-opacity-20 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-3 text-blue-300">2. Effective Time Management</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="bg-blue-600 rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-1">
                        ✓
                      </div>
                      <p>Create a detailed study schedule at the beginning of each semester</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-blue-600 rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-1">
                        ✓
                      </div>
                      <p>Allocate more time to challenging courses</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-blue-600 rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-1">
                        ✓
                      </div>
                      <p>Use productivity techniques like Pomodoro to maintain focus</p>
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-800 bg-opacity-20 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-3 text-blue-300">3. Utilize Academic Resources</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="bg-blue-600 rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-1">
                        ✓
                      </div>
                      <p>Attend office hours regularly to clarify concepts</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-blue-600 rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-1">
                        ✓
                      </div>
                      <p>Join study groups for collaborative learning</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-blue-600 rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-1">
                        ✓
                      </div>
                      <p>Use tutoring services for subjects you find challenging</p>
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-800 bg-opacity-20 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-3 text-blue-300">4. Develop Effective Study Habits</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="bg-blue-600 rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-1">
                        ✓
                      </div>
                      <p>Practice active learning techniques instead of passive reading</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-blue-600 rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-1">
                        ✓
                      </div>
                      <p>Review material regularly rather than cramming before exams</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-blue-600 rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-1">
                        ✓
                      </div>
                      <p>Create summary notes and practice tests for self-assessment</p>
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-800 bg-opacity-20 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-3 text-blue-300">5. Consider Grade Replacement Options</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="bg-blue-600 rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-1">
                        ✓
                      </div>
                      <p>Check if your institution allows retaking courses to replace poor grades</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-blue-600 rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-1">
                        ✓
                      </div>
                      <p>Understand the grade forgiveness or academic renewal policies</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-blue-600 rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-1">
                        ✓
                      </div>
                      <p>Prioritize retaking courses with the lowest grades for maximum impact</p>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-700 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Remember</h3>
                <p className="mb-4">
                  Improving your CGPA is a marathon, not a sprint. Consistent effort over time will yield better results
                  than short bursts of intense studying followed by burnout.
                </p>
                <p>
                  While CGPA is important,it is just one measure of academic success. Focus on developing a deep
                  understanding of your field and building practical skills alongside improving your grades.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
