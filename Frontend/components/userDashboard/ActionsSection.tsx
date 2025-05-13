import React from 'react'
import { 
  FaChalkboardTeacher, 
  FaClipboardList, 
  FaBell, 
  FaUserCog, 
  FaCommentDots, 
  FaExclamationTriangle, 
  FaChartLine, 
  FaBook,
  FaSearch
} from "react-icons/fa";
import Link from "next/link";

function ActionsSection() {
    const actionCategories = [
        {
            name: "Academic",
            actions: [
                { href: '/user/dashboard/grades', title: 'My Grades', icon: FaChalkboardTeacher, color: 'text-emerald-400', description: 'Check your grades and feedback' },
                { href: '/user/dashboard/assignments', title: 'Assignments', icon: FaClipboardList, color: 'text-pink-400', description: 'View and submit assignments' },
                { href: '/user/dashboard/courses', title: 'My Courses', icon: FaBook, color: 'text-cyan-400', description: 'Manage course enrollments' },
                { href: '/user/dashboard/quiz', title: 'Quizzes', icon: FaClipboardList, color: 'text-amber-400', description: 'Take quizzes and track scores' },
            ]
        },
        {
            name: "Administrative",
            actions: [
                { href: '/user/dashboard/attendance', title: 'Attendance', icon: FaChalkboardTeacher, color: 'text-orange-400', description: 'Track attendance history' },
                { href: '/user/form', title: 'Course Registration', icon: FaBook, color: 'text-purple-400', description: 'Register for next semester' },
                { href: '/user/dashboard', title: 'Academic Overview', icon: FaChartLine, color: 'text-sky-400', description: 'View GPA and progress' },
            ]
        },
        {
            name: "Communication",
            actions: [
                { href: '/user/dashboard/notifications', title: 'Notifications', icon: FaBell, color: 'text-indigo-400', description: 'View announcements' },
                { href: '/user/dashboard/feedback', title: 'Feedback', icon: FaCommentDots, color: 'text-rose-400', description: 'Provide course feedback' },
                { href: '/user/dashboard/suggestions', title: 'Suggestions', icon: FaCommentDots, color: 'text-teal-400', description: 'Share improvement ideas' },
                { href: '/user/dashboard/complains', title: 'Complaints', icon: FaExclamationTriangle, color: 'text-red-400', description: 'Report issues or concerns' },
            ]
        },
        {
            name: "Account",
            actions: [
                { href: '/user/profile', title: 'Profile', icon: FaUserCog, color: 'text-blue-400', description: 'Manage personal information' },
            ]
        }
    ];

    return (
        <div className="mb-12">
            <div className="flex justify-between items-center mb-8 flex-col md:flex-row gap-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <span className="bg-indigo-500 w-2 h-6 rounded-full"></span>
                    Dashboard Actions
                </h2>

                <div className="relative w-full md:w-64">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search features..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                </div>
            </div>

            {actionCategories.map((category, catIndex) => (
                <div key={catIndex} className="mb-8">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <span className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></span>
                        {category.name}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {category.actions.map((action, index) => (
                            <Link
                                key={index}
                                href={action.href}
                                className="group relative p-5 rounded-xl border border-gray-700 bg-gray-800 hover:border-indigo-400 hover:bg-gray-700/50 transition-all flex flex-col hover:shadow-lg overflow-hidden"
                            >
                                {/* Gradient overlay on hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                
                                {/* Icon with animated background */}
                                <div className={`p-3 rounded-lg bg-gray-700 group-hover:bg-white/5 mb-4 w-fit transition-all ${action.color} group-hover:text-white`}>
                                    <action.icon className="text-xl" />
                                </div>
                                
                                <h3 className="font-semibold text-white mb-1 relative z-10">{action.title}</h3>
                                <p className="text-sm text-gray-400 mb-3 relative z-10">{action.description}</p>
                                
                                <span className="mt-auto text-sm font-medium text-indigo-400 group-hover:text-indigo-300 transition-colors relative z-10 flex items-center">
                                    Access
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ActionsSection