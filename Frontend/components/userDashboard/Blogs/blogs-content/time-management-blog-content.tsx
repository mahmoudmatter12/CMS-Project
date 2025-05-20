"use client"

import { useState } from "react"
import { ArrowLeft, Clock, Calendar, CheckSquare, AlertTriangle } from "lucide-react"

export default function TimeManagementArticleContent() {
  const [activeSection, setActiveSection] = useState("overview")

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-blue-800 to-purple-800 text-white p-6">
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
          <h1 className="text-4xl font-bold mb-4">Time Management Tips for Students</h1>
          <div className="flex items-center gap-4 text-blue-300 mb-6">
            <span>Oct 3, 2023</span>
            <span>•</span>
            <span>By Alice Johnson</span>
            <span>•</span>
            <span>15 min read</span>
          </div>
          <p className="text-xl text-blue-100">
            Master the art of time management with these strategies designed specifically for students.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-blue-700 pb-4">
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
            onClick={() => setActiveSection("planning")}
            className={`px-4 py-2 rounded-full transition-colors ${
              activeSection === "planning"
                ? "bg-blue-600 text-white"
                : "bg-blue-800 bg-opacity-30 text-blue-300 hover:bg-opacity-50"
            }`}
          >
            Planning Methods
          </button>
          <button
            onClick={() => setActiveSection("productivity")}
            className={`px-4 py-2 rounded-full transition-colors ${
              activeSection === "productivity"
                ? "bg-blue-600 text-white"
                : "bg-blue-800 bg-opacity-30 text-blue-300 hover:bg-opacity-50"
            }`}
          >
            Productivity Techniques
          </button>
          <button
            onClick={() => setActiveSection("challenges")}
            className={`px-4 py-2 rounded-full transition-colors ${
              activeSection === "challenges"
                ? "bg-blue-600 text-white"
                : "bg-blue-800 bg-opacity-30 text-blue-300 hover:bg-opacity-50"
            }`}
          >
            Common Challenges
          </button>
        </div>

        {/* Content */}
        <div className="prose prose-lg prose-invert max-w-none">
          {activeSection === "overview" && (
            <div className="animate-in fade-in duration-500">
              <div className="bg-blue-800 bg-opacity-20 p-6 rounded-xl mb-8 flex items-start gap-4">
                <Clock className="h-8 w-8 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-blue-300 mb-2">Why Time Management Matters for Students</h3>
                  <p>
                    Effective time management is perhaps the most crucial skill for academic success. It allows you to
                    balance coursework, extracurricular activities, social life, and personal well-being without
                    becoming overwhelmed.
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-4 text-blue-200">The Impact of Good Time Management</h2>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-blue-800 bg-opacity-30 p-5 rounded-lg">
                  <h3 className="font-bold text-blue-300 mb-2">Reduced Stress</h3>
                  <p>
                    When you plan effectively, you eliminate the anxiety of approaching deadlines and the pressure of
                    last-minute cramming. This leads to better mental health and academic performance.
                  </p>
                </div>

                <div className="bg-blue-800 bg-opacity-30 p-5 rounded-lg">
                  <h3 className="font-bold text-blue-300 mb-2">Improved Quality of Work</h3>
                  <p>
                    With proper time allocation, you can dedicate appropriate attention to each task, resulting in
                    higher quality assignments and better retention of material.
                  </p>
                </div>

                <div className="bg-blue-800 bg-opacity-30 p-5 rounded-lg">
                  <h3 className="font-bold text-blue-300 mb-2">Better Work-Life Balance</h3>
                  <p>
                    Good time management ensures you have time not just for academics, but also for social activities,
                    exercise, hobbies, and rest—all essential components of a healthy student life.
                  </p>
                </div>

                <div className="bg-blue-800 bg-opacity-30 p-5 rounded-lg">
                  <h3 className="font-bold text-blue-300 mb-2">Increased Productivity</h3>
                  <p>
                    By organizing your time effectively, you can accomplish more in less time, leaving room for
                    additional opportunities or simply more downtime.
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-4 text-blue-200">The Cost of Poor Time Management</h2>

              <div className="bg-red-900 bg-opacity-30 p-6 rounded-lg mb-8">
                <h3 className="font-bold text-red-300 mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Warning Signs of Poor Time Management
                </h3>

                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="bg-red-700 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-1">
                      1
                    </div>
                    <div>
                      <strong className="text-red-300">Chronic Procrastination</strong> - Consistently putting off tasks
                      until the last minute
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <div className="bg-red-700 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-1">
                      2
                    </div>
                    <div>
                      <strong className="text-red-300">Missed Deadlines</strong> - Regularly failing to complete
                      assignments on time
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <div className="bg-red-700 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-1">
                      3
                    </div>
                    <div>
                      <strong className="text-red-300">All-Nighters</strong> - Frequently staying up all night to
                      complete work
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <div className="bg-red-700 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-1">
                      4
                    </div>
                    <div>
                      <strong className="text-red-300">Constant Overwhelm</strong> - Feeling perpetually behind and
                      unable to catch up
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <div className="bg-red-700 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-1">
                      5
                    </div>
                    <div>
                      <strong className="text-red-300">Poor Academic Performance</strong> - Grades suffering despite
                      understanding the material
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-700 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">The Good News</h3>
                <p className="mb-4">
                  Time management is a skill that can be learned and improved with practice. In the following sections,
                  we will explore practical strategies and techniques that you can implement immediately to transform your
                  approach to managing your academic workload.
                </p>
                <p>
                  Whether you are struggling with procrastination, feeling overwhelmed by multiple deadlines, or simply
                  looking to optimize your productivity, these evidence-based methods will help you take control of your
                  time and achieve your academic goals.
                </p>
              </div>
            </div>
          )}

          {activeSection === "planning" && (
            <div className="animate-in fade-in duration-500">
              <h2 className="text-2xl font-bold mb-6 text-blue-200">Effective Planning Methods for Students</h2>

              <div className="space-y-8 mb-8">
                <div className="bg-blue-800 bg-opacity-20 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-3 text-blue-300 flex items-center gap-2">
                    <Calendar className="h-6 w-6" />
                    Semester Planning
                  </h3>

                  <p className="mb-4">
                    Start each semester with a big-picture view of your commitments and deadlines. This high-level
                    planning helps you anticipate busy periods and prepare accordingly.
                  </p>

                  <div className="bg-blue-900 bg-opacity-40 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold mb-2 text-blue-200">How to Create a Semester Plan:</h4>

                    <ol className="list-decimal list-inside space-y-3">
                      <li>
                        <strong>Gather all syllabi</strong> - Mark all major assignments, projects, and exam dates on a
                        single calendar
                      </li>
                      <li>
                        <strong>Identify high-intensity periods</strong> - Look for weeks with multiple deadlines or
                        exams
                      </li>
                      <li>
                        <strong>Break down large projects</strong> - Create milestones for major assignments with their
                        own deadlines
                      </li>
                      <li>
                        <strong>Schedule regular review periods</strong> - Plan weekly review sessions for each course
                      </li>
                      <li>
                        <strong>Include personal commitments</strong> - Add family events, travel plans, and other
                        non-academic obligations
                      </li>
                    </ol>
                  </div>

                  <div className="bg-blue-700 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Pro Tip:</h4>
                    <p>
                      Color-code your semester calendar by course or by activity type (exams, assignments, personal
                      events) to quickly visualize your commitments at a glance.
                    </p>
                  </div>
                </div>

                <div className="bg-blue-800 bg-opacity-20 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-3 text-blue-300 flex items-center gap-2">
                    <Calendar className="h-6 w-6" />
                    Weekly Planning
                  </h3>

                  <p className="mb-4">
                    Weekly planning bridges the gap between your semester overview and daily tasks. It helps you stay on
                    track with your long-term goals while managing immediate responsibilities.
                  </p>

                  <div className="bg-blue-900 bg-opacity-40 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold mb-2 text-blue-200">Weekly Planning Process:</h4>

                    <ol className="list-decimal list-inside space-y-3">
                      <li>
                        <strong>Schedule a weekly planning session</strong> - Set aside 30 minutes each Sunday evening
                        to plan your week
                      </li>
                      <li>
                        <strong>Review your semester calendar</strong> - Check upcoming deadlines and adjust your weekly
                        priorities accordingly
                      </li>
                      <li>
                        <strong>Block fixed commitments</strong> - Add classes, work shifts, and other non-negotiable
                        activities
                      </li>
                      <li>
                        <strong>Allocate study blocks</strong> - Schedule specific times for studying each subject
                      </li>
                      <li>
                        <strong>Include self-care</strong> - Schedule exercise, social time, and relaxation
                      </li>
                      <li>
                        <strong>Create a to-do list</strong> - List specific tasks to complete during each study block
                      </li>
                    </ol>
                  </div>

                  <div className="bg-blue-900 bg-opacity-40 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold mb-2 text-blue-200">Time Blocking Technique:</h4>
                    <p className="mb-3">
                      Time blocking involves assigning specific time periods to particular tasks or activities. This
                      method helps prevent multitasking and ensures you dedicate focused attention to each subject.
                    </p>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-blue-800 bg-opacity-50">
                            <th className="p-2 text-left">Time</th>
                            <th className="p-2 text-left">Monday</th>
                            <th className="p-2 text-left">Tuesday</th>
                            <th className="p-2 text-left">Wednesday</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-t border-blue-800">
                            <td className="p-2">8-10 AM</td>
                            <td className="p-2 bg-green-900 bg-opacity-30">Math Study</td>
                            <td className="p-2 bg-purple-900 bg-opacity-30">Literature Reading</td>
                            <td className="p-2 bg-green-900 bg-opacity-30">Math Study</td>
                          </tr>
                          <tr className="border-t border-blue-800">
                            <td className="p-2">10-12 PM</td>
                            <td className="p-2 bg-blue-900 bg-opacity-30">Classes</td>
                            <td className="p-2 bg-blue-900 bg-opacity-30">Classes</td>
                            <td className="p-2 bg-blue-900 bg-opacity-30">Classes</td>
                          </tr>
                          <tr className="border-t border-blue-800">
                            <td className="p-2">1-3 PM</td>
                            <td className="p-2 bg-yellow-900 bg-opacity-30">History Research</td>
                            <td className="p-2 bg-blue-900 bg-opacity-30">Classes</td>
                            <td className="p-2 bg-yellow-900 bg-opacity-30">History Essay</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-800 bg-opacity-20 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-3 text-blue-300 flex items-center gap-2">
                    <CheckSquare className="h-6 w-6" />
                    Daily Planning and Task Management
                  </h3>

                  <p className="mb-4">
                    Daily planning helps you stay focused on immediate priorities and make consistent progress toward
                    your goals.
                  </p>

                  <div className="bg-blue-900 bg-opacity-40 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold mb-2 text-blue-200">Effective Daily Planning Techniques:</h4>

                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold text-blue-300">1. The 1-3-5 Rule</h5>
                        <p>Plan to accomplish:</p>
                        <ul className="list-disc list-inside ml-4 mt-1">
                          <li>1 big task</li>
                          <li>3 medium tasks</li>
                          <li>5 small tasks</li>
                        </ul>
                        <p className="mt-1">This creates a balanced, achievable daily plan.</p>
                      </div>

                      <div>
                        <h5 className="font-semibold text-blue-300">2. MIT (Most Important Tasks)</h5>
                        <p>
                          Identify 2-3 most important tasks that must be completed today. Focus on these before
                          anything else.
                        </p>
                      </div>

                      <div>
                        <h5 className="font-semibold text-blue-300">3. Time Boxing</h5>
                        <p>
                          Assign specific time limits to tasks. This creates urgency and helps prevent perfectionism
                          from causing tasks to expand unnecessarily.
                        </p>
                      </div>

                      <div>
                        <h5 className="font-semibold text-blue-300">4. The Two-Minute Rule</h5>
                        <p>
                          If a task takes less than two minutes to complete, do it immediately rather than scheduling it
                          for later.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-900 bg-opacity-40 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold mb-2 text-blue-200">Daily Planning Template:</h4>

                    <div className="space-y-3">
                      <div>
                        <h5 className="font-semibold text-blue-300">Morning Routine (5-10 minutes)</h5>
                        <ul className="list-disc list-inside ml-4">
                          <li>Review today is schedule and to-do list</li>
                          <li>Identify your MIT (Most Important Tasks)</li>
                          <li>Check for any new emails or messages that require adjustments to your plan</li>
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-semibold text-blue-300">Throughout the Day</h5>
                        <ul className="list-disc list-inside ml-4">
                          <li>Check off completed tasks</li>
                          <li>Adjust priorities as needed</li>
                          <li>Use transition times between activities to review your plan</li>
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-semibold text-blue-300">Evening Wrap-Up (5-10 minutes)</h5>
                        <ul className="list-disc list-inside ml-4">
                          <li>Review what you accomplished</li>
                          <li>Move unfinished tasks to tomorrow</li>
                          <li>Create a preliminary plan for tomorrow</li>
                          <li>Reflect on what worked and what did not</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-700 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Pro Tip:</h4>
                    <p>
                      Prepare your daily plan the night before rather than in the morning. This allows you to start your
                      day with clear direction and eliminates decision fatigue first thing in the morning.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "productivity" && (
            <div className="animate-in fade-in duration-500">
              <h2 className="text-2xl font-bold mb-6 text-blue-200">Productivity Techniques for Students</h2>

              <p className="mb-6">
                Beyond planning, specific productivity techniques can help you make the most of your study time and
                maintain focus throughout the day.
              </p>

              <div className="space-y-8 mb-8">
                <div className="bg-blue-800 bg-opacity-20 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-3 text-blue-300">The Pomodoro Technique</h3>

                  <p className="mb-4">
                    This time management method uses a timer to break work into intervals, traditionally 25 minutes in
                    length, separated by short breaks.
                  </p>

                  <div className="bg-blue-900 bg-opacity-40 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold mb-2 text-blue-200">How to Use the Pomodoro Technique:</h4>

                    <ol className="list-decimal list-inside space-y-2">
                      <li>Choose a task to work on</li>
                      <li>Set a timer for 25 minutes</li>
                      <li>Work on the task with complete focus until the timer rings</li>
                      <li>Take a 5-minute break</li>
                      <li>After four pomodoros, take a longer break (15-30 minutes)</li>
                    </ol>
                  </div>

                  <div className="bg-blue-900 bg-opacity-40 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 text-blue-200">Why It Works:</h4>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Creates a sense of urgency that helps overcome procrastination</li>
                      <li>Breaks large tasks into manageable chunks</li>
                      <li>Regular breaks prevent mental fatigue and maintain productivity</li>
                      <li>The structure helps train your brain to focus for short periods</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-800 bg-opacity-20 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-3 text-blue-300">The Eisenhower Matrix</h3>

                  <p className="mb-4">
                    This prioritization framework helps you decide on and prioritize tasks by urgency and importance.
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-green-800 bg-opacity-40 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 text-green-300">1. Urgent & Important</h4>
                      <p className="text-sm">DO IMMEDIATELY</p>
                      <ul className="list-disc list-inside mt-2 text-sm">
                        <li>Assignments due soon</li>
                        <li>Exam preparation</li>
                        <li>Group project meetings</li>
                      </ul>
                    </div>

                    <div className="bg-blue-800 bg-opacity-40 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 text-blue-300">2. Important, Not Urgent</h4>
                      <p className="text-sm">SCHEDULE</p>
                      <ul className="list-disc list-inside mt-2 text-sm">
                        <li>Long-term projects</li>
                        <li>Regular study sessions</li>
                        <li>Career planning</li>
                      </ul>
                    </div>

                    <div className="bg-orange-800 bg-opacity-40 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 text-orange-300">3. Urgent, Not Important</h4>
                      <p className="text-sm">DELEGATE OR MINIMIZE</p>
                      <ul className="list-disc list-inside mt-2 text-sm">
                        <li>Some emails/messages</li>
                        <li>Certain meetings</li>
                        <li>Some administrative tasks</li>
                      </ul>
                    </div>

                    <div className="bg-red-800 bg-opacity-40 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 text-red-300">4. Not Urgent & Not Important</h4>
                      <p className="text-sm">ELIMINATE</p>
                      <ul className="list-disc list-inside mt-2 text-sm">
                        <li>Excessive social media</li>
                        <li>Mindless browsing</li>
                        <li>Low-value activities</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-blue-900 bg-opacity-40 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 text-blue-200">How to Use the Matrix:</h4>
                    <ol className="list-decimal list-inside space-y-2">
                      <li>List all your tasks and assignments</li>
                      <li>Categorize each item into one of the four quadrants</li>
                      <li>Focus first on Quadrant 1 (Urgent & Important)</li>
                      <li>Schedule time for Quadrant 2 (Important, Not Urgent)</li>
                      <li>Minimize time spent on Quadrant 3 (Urgent, Not Important)</li>
                      <li>Avoid Quadrant 4 activities (Not Urgent & Not Important)</li>
                    </ol>
                  </div>
                </div>

                <div className="bg-blue-800 bg-opacity-20 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-3 text-blue-300">The 2-Minute Rule</h3>

                  <p className="mb-4">
                    This simple productivity hack, popularized by David Allen in his book Getting Things Done, can
                    help reduce procrastination and keep small tasks from piling up.
                  </p>

                  <div className="bg-blue-900 bg-opacity-40 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold mb-2 text-blue-200">The Rule:</h4>
                    <p className="text-lg font-medium">
                      If a task will take less than two minutes to complete, do it immediately rather than scheduling it
                      for later.
                    </p>
                  </div>

                  <div className="bg-blue-900 bg-opacity-40 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold mb-2 text-blue-200">Examples of 2-Minute Tasks:</h4>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Responding to a simple email</li>
                      <li>Adding an assignment to your calendar</li>
                      <li>Filing a document</li>
                      <li>Making a quick phone call</li>
                      <li>Sending a text to schedule a study group</li>
                    </ul>
                  </div>

                  <div className="bg-blue-900 bg-opacity-40 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 text-blue-200">Why It Works:</h4>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Prevents small tasks from accumulating and becoming overwhelming</li>
                      <li>Reduces the mental load of keeping track of minor tasks</li>
                      <li>Creates momentum and a sense of accomplishment</li>
                      <li>Frees up mental space for more important work</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-800 bg-opacity-20 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-3 text-blue-300">Time Tracking and Analysis</h3>

                  <p className="mb-4">
                    Understanding how you currently spend your time is the first step to improving your time management.
                    Time tracking helps identify patterns, inefficiencies, and opportunities for improvement.
                  </p>

                  <div className="bg-blue-900 bg-opacity-40 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold mb-2 text-blue-200">How to Track Your Time:</h4>

                    <ol className="list-decimal list-inside space-y-3">
                      <li>
                        <strong>Choose a tracking method</strong> - Use a time tracking app, a spreadsheet, or a simple
                        notebook
                      </li>
                      <li>
                        <strong>Record your activities</strong> - Note what you are doing in 30-minute or 1-hour blocks
                        throughout the day
                      </li>
                      <li>
                        <strong>Be honest and detailed</strong> - Include everything from study time to social media
                        breaks
                      </li>
                      <li>
                        <strong>Track for at least one week</strong> - This provides enough data to identify patterns
                      </li>
                      <li>
                        <strong>Analyze your data</strong> - Look for time wasters, productivity patterns, and areas for
                        improvement
                      </li>
                    </ol>
                  </div>

                  <div className="bg-blue-900 bg-opacity-40 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold mb-2 text-blue-200">Questions to Ask During Analysis:</h4>

                    <ul className="list-disc list-inside space-y-2">
                      <li>When am I most productive during the day?</li>
                      <li>What activities consume more time than they should?</li>
                      <li>Where am I wasting time without realizing it?</li>
                      <li>Am I allocating enough time to high-priority tasks?</li>
                      <li>Is there a balance between study time and personal time?</li>
                    </ul>
                  </div>

                  <div className="bg-blue-700 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Pro Tip:</h4>
                    <p>
                      After tracking your time for a week, identify your top three time wasters and create a specific
                      plan to address each one. Even small adjustments can lead to significant productivity gains over a
                      semester.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "challenges" && (
            <div className="animate-in fade-in duration-500">
              <h2 className="text-2xl font-bold mb-6 text-blue-200">Overcoming Common Time Management Challenges</h2>

              <p className="mb-6">
                Even with the best techniques and intentions, students often face specific challenges that can derail
                their time management efforts. Here is how to address the most common obstacles.
              </p>

              <div className="space-y-8 mb-8">
                <div className="bg-blue-800 bg-opacity-20 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-3 text-blue-300">Procrastination</h3>

                  <div className="bg-blue-900 bg-opacity-40 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold mb-2 text-blue-200">Why We Procrastinate:</h4>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Fear of failure or perfectionism</li>
                      <li>Task aversion (finding the task unpleasant)</li>
                      <li>Poor energy management</li>
                      <li>Lack of clear goals or priorities</li>
                      <li>Immediate gratification bias</li>
                    </ul>
                  </div>

                  <div className="bg-blue-900 bg-opacity-40 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 text-blue-200">Strategies to Overcome Procrastination:</h4>

                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold text-blue-300">1. The 5-Minute Rule</h5>
                        <p>
                          Commit to working on a task for just 5 minutes. Once you start, the activation energy is
                          overcome, and you will likely continue working.
                        </p>
                      </div>

                      <div>
                        <h5 className="font-semibold text-blue-300">2. Break It Down</h5>
                        <p>
                          Divide large tasks into smaller, more manageable steps. Focus on completing just one small
                          step at a time.
                        </p>
                      </div>

                      <div>
                        <h5 className="font-semibold text-blue-300">3. Use Implementation Intentions</h5>
                        <p>
                          Create specific plans in the format: When situation X arises, I will perform response Y. For
                          example: When I finish lunch, I will work on my essay for 30 minutes.
                        </p>
                      </div>

                      <div>
                        <h5 className="font-semibold text-blue-300">4. Eliminate Distractions</h5>
                        <p>
                          Use website blockers, put your phone in another room, or work in a distraction-free
                          environment like a library.
                        </p>
                      </div>

                      <div>
                        <h5 className="font-semibold text-blue-300">5. Use Accountability</h5>
                        <p>
                          Share your goals with a friend, join a study group, or use apps that track your progress and
                          hold you accountable.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-800 bg-opacity-20 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-3 text-blue-300">Multitasking and Distractions</h3>

                  <div className="bg-blue-900 bg-opacity-40 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold mb-2 text-blue-200">The Myth of Multitasking:</h4>
                    <p className="mb-3">
                      Research consistently shows that what we call multitasking is actually task-switching, which:
                    </p>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Reduces productivity by up to 40%</li>
                      <li>Increases errors and reduces work quality</li>
                      <li>Depletes mental energy faster</li>
                      <li>Can reduce IQ performance by 15 points temporarily (similar to missing a night is sleep)</li>
                    </ul>
                  </div>

                  <div className="bg-blue-900 bg-opacity-40 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 text-blue-200">Strategies for Single-Tasking:</h4>

                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold text-blue-300">1. Time Blocking</h5>
                        <p>
                          Dedicate specific time blocks to single tasks and resist the urge to switch between
                          activities.
                        </p>
                      </div>

                      <div>
                        <h5 className="font-semibold text-blue-300">2. Digital Minimalism</h5>
                        <p>
                          Close unnecessary tabs and applications. Use tools like Focus Mode or full-screen
                          applications.
                        </p>
                      </div>

                      <div>
                        <h5 className="font-semibold text-blue-300">3. The Two-Device Rule</h5>
                        <p>
                          Use one device for productive work and another for communication. For example, use your laptop
                          for writing papers and your phone for messaging.
                        </p>
                      </div>

                      <div>
                        <h5 className="font-semibold text-blue-300">4. Batch Similar Tasks</h5>
                        <p>
                          Group similar activities together (like answering emails, making phone calls) to reduce
                          context switching.
                        </p>
                      </div>

                      <div>
                        <h5 className="font-semibold text-blue-300">5. Use the Pomodoro Technique</h5>
                        <p>
                          The structured focus and break periods help maintain single-task focus for optimal periods.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-800 bg-opacity-20 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-3 text-blue-300">Balancing Multiple Commitments</h3>

                  <p className="mb-4">
                    Students often juggle academics with work, extracurricular activities, social life, and personal
                    responsibilities. Finding balance is essential for sustainable success.
                  </p>

                  <div className="bg-blue-900 bg-opacity-40 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold mb-2 text-blue-200">Strategies for Balance:</h4>

                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold text-blue-300">1. Learn to Say No</h5>
                        <p>
                          Be selective about which commitments you take on. Every yes to one activity is a no to
                          something else.
                        </p>
                      </div>

                      <div>
                        <h5 className="font-semibold text-blue-300">2. Use the 80/20 Rule</h5>
                        <p>
                          Identify the 20% of your efforts that produce 80% of your results, and prioritize those
                          activities.
                        </p>
                      </div>

                      <div>
                        <h5 className="font-semibold text-blue-300">3. Schedule Buffer Time</h5>
                        <p>
                          Do not pack your schedule to 100% capacity. Leave buffer time between activities and free days
                          for catching up.
                        </p>
                      </div>

                      <div>
                        <h5 className="font-semibold text-blue-300">4. Combine Activities When Possible</h5>
                        <p>
                          Look for ways to meet multiple needs simultaneously, like studying with friends (social +
                          academic) or listening to lecture recordings while exercising.
                        </p>
                      </div>

                      <div>
                        <h5 className="font-semibold text-blue-300">5. Regularly Reassess Priorities</h5>
                        <p>
                          As the semester progresses, be willing to adjust your commitments based on changing demands
                          and priorities.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-700 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Remember:</h4>
                    <p>
                      Balance does not mean giving equal time to everything. It means allocating appropriate time to each
                      area of your life based on your values and goals. Sometimes academics will need to take priority;
                      other times, self-care or relationships will be more important.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-700 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Final Thoughts</h3>
                <p className="mb-4">
                  Time management is not about squeezing more activities into your day—it is about making intentional
                  choices about how you spend your limited time. The goal is to align your daily actions with your
                  long-term academic and personal goals.
                </p>
                <p>
                  Remember that becoming an effective time manager is a process. Start with one or two techniques that
                  resonate with you, implement them consistently, and gradually add more strategies as these become
                  habits. With practice, you will develop a personalized time management system that works for your unique
                  needs and circumstances.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
