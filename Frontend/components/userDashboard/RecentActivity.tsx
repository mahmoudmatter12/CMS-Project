import React from 'react'
import { 
  FaFileUpload, 
  FaCheckCircle, 
  FaUserFriends, 
  FaCommentAlt,
  FaBook,
  FaClipboardCheck,
  FaUserEdit,
  FaFileAlt,
  FaGraduationCap,
  FaCertificate,
  FaExclamationCircle,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaLock
} from 'react-icons/fa'
import { formatDistanceToNow } from 'date-fns'

function RecentActivity() {
    const activityTypes = {
        // Academic Activities
        assignment_submit: {
            label: "Assignment Submitted",
            icon: <FaFileUpload className="text-indigo-400" />,
            color: "indigo"
        },
        quiz_complete: {
            label: "Quiz Completed",
            icon: <FaClipboardCheck className="text-emerald-400" />,
            color: "emerald"
        },
        course_enroll: {
            label: "Course Enrollment",
            icon: <FaBook className="text-purple-400" />,
            color: "purple"
        },
        module_complete: {
            label: "Module Completed",
            icon: <FaCheckCircle className="text-green-400" />,
            color: "green"
        },
        grade_received: {
            label: "Grade Received",
            icon: <FaGraduationCap className="text-amber-400" />,
            color: "amber"
        },
        certificate_earned: {
            label: "Certificate Earned",
            icon: <FaCertificate className="text-blue-400" />,
            color: "blue"
        },

        // Administrative Activities
        payment_made: {
            label: "Payment Made",
            icon: <FaMoneyBillWave className="text-teal-400" />,
            color: "teal"
        },
        deadline_reminder: {
            label: "Deadline Reminder",
            icon: <FaCalendarAlt className="text-orange-400" />,
            color: "orange"
        },
        policy_update: {
            label: "Policy Updated",
            icon: <FaFileAlt className="text-gray-400" />,
            color: "gray"
        },
        warning_received: {
            label: "Warning Received",
            icon: <FaExclamationCircle className="text-red-400" />,
            color: "red"
        },

        // Communication Activities
        announcement: {
            label: "Announcement",
            icon: <FaCommentAlt className="text-cyan-400" />,
            color: "cyan"
        },
        group_join: {
            label: "Group Joined",
            icon: <FaUserFriends className="text-pink-400" />,
            color: "pink"
        },
        message_received: {
            label: "Message Received",
            icon: <FaCommentAlt className="text-sky-400" />,
            color: "sky"
        },

        // Account Activities
        profile_update: {
            label: "Profile Updated",
            icon: <FaUserEdit className="text-violet-400" />,
            color: "violet"
        },
        password_change: {
            label: "Password Changed",
            icon: <FaLock className="text-yellow-400" />,
            color: "yellow"
        }
    };

    const recentActivities = [
        { 
            id: 1, 
            type: 'assignment_submit',
            course: 'Math 101',
            title: 'Assignment 1 submitted',
            details: 'Linear Algebra Problems',
            date: new Date('2023-10-01T14:30:00'),
            meta: {
                assignment_id: 'ASG-2023-001',
                points: 20
            }
        },
        { 
            id: 2, 
            type: 'quiz_complete',
            course: 'Chemistry 101',
            title: 'Quiz 2 completed',
            details: 'Organic Chemistry Basics',
            date: new Date('2023-10-02T09:15:00'),
            meta: {
                score: 18,
                max_score: 20,
                percentage: 90
            }
        },
        { 
            id: 3, 
            type: 'group_join',
            course: 'Physics 101',
            title: 'Joined study group',
            details: 'Quantum Mechanics Discussion',
            date: new Date('2023-10-03T16:45:00'),
            meta: {
                group_name: 'QM Study Group',
                members: 12
            }
        },
        { 
            id: 4, 
            type: 'grade_received',
            course: 'Computer Science 201',
            title: 'Received project grade',
            details: 'Data Structures Project',
            date: new Date('2023-10-04T11:20:00'),
            meta: {
                grade: 'A',
                feedback: 'Excellent work!'
            }
        },
        { 
            id: 5, 
            type: 'course_enroll',
            course: 'History 202',
            title: 'Enrolled in new course',
            details: 'World History: 20th Century',
            date: new Date('2023-10-05T08:00:00'),
            meta: {
                semester: 'Fall 2023',
                credits: 3
            }
        },
        { 
            id: 6, 
            type: 'payment_made',
            course: '',
            title: 'Tuition payment processed',
            details: 'Fall semester tuition',
            date: new Date('2023-10-06T13:10:00'),
            meta: {
                amount: 1250.00,
                method: 'Credit Card'
            }
        }
    ];

    const getActivityBadge = (type: string) => {
        const activity = activityTypes[type as keyof typeof activityTypes] || activityTypes['assignment_submit'];
        return (
            <span className={`bg-${activity.color}-500/20 text-${activity.color}-400 px-2 py-1 rounded-full text-xs`}>
                {activity.label}
            </span>
        );
    };

    const renderActivityMeta = (activity: typeof recentActivities[0]) => {
        switch(activity.type) {
            case 'quiz_complete':
                return (
                    <div className="mt-2">
                        <div className="flex justify-between text-xs mb-1">
                            <span>Score: {activity.meta.score}/{activity.meta.max_score}</span>
                            <span>{activity.meta.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-1.5">
                            <div 
                                className="bg-emerald-500 h-1.5 rounded-full" 
                                style={{ width: `${activity.meta.percentage}%` }}
                            ></div>
                        </div>
                    </div>
                );
            case 'grade_received':
                return (
                    <div className="mt-2 text-xs">
                        Grade: <span className="font-bold text-amber-400">{activity.meta.grade}</span>
                        {activity.meta.feedback && (
                            <div className="mt-1 text-gray-400">&quot;{activity.meta.feedback}&quot;</div>
                        )}
                    </div>
                );
            case 'payment_made':
                return (
                    <div className="mt-2 text-xs">
                        Amount: <span className="font-bold text-teal-400">${(activity.meta.amount ?? 0).toFixed(2)}</span>
                        <div className="mt-1 text-gray-400">Method: {activity.meta.method}</div>
                    </div>
                );
            case 'course_enroll':
                return (
                    <div className="mt-2 text-xs">
                        <span className="text-gray-400">{activity.meta.semester} • {activity.meta.credits} credits</span>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="mb-10">
            <div className="flex items-center justify-between mb-6 flex-col md:flex-row">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <span className="bg-indigo-500 w-2 h-6 rounded-full"></span>
                    Recent Activity
                </h2>
                <div className="flex gap-3">
                    <select className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg px-3 py-1 focus:ring-indigo-500 focus:border-indigo-500">
                        <option value="all">All Activities</option>
                        <option value="academic">Academic</option>
                        <option value="administrative">Administrative</option>
                        <option value="communication">Communication</option>
                        <option value="account">Account</option>
                    </select>
                    <button className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
                        View All
                    </button>
                </div>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl max-h-[400px] custom-scrollbar overflow-auto border border-gray-700/50 shadow-lg">
                <ul className="divide-y divide-gray-700/50">
                    {recentActivities.map((activity) => {
                        const activityType = activityTypes[activity.type as keyof typeof activityTypes] || activityTypes['assignment_submit'];
                        return (
                            <li 
                                key={activity.id} 
                                className="p-4 hover:bg-gray-700/30 transition-colors group"
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`p-3 rounded-lg bg-gray-700/50 group-hover:bg-${activityType.color}-500/20 transition-colors`}>
                                        {activityType.icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            {getActivityBadge(activity.type)}
                                            {activity.course && (
                                                <span className="text-xs text-gray-500">
                                                    {activity.course}
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="text-sm font-semibold text-white">
                                            {activity.title}
                                        </h3>
                                        <p className="text-xs text-gray-400 mt-1">
                                            {activity.details}
                                        </p>
                                        {renderActivityMeta(activity)}
                                    </div>
                                    <div className="text-xs text-gray-500 whitespace-nowrap">
                                        {formatDistanceToNow(activity.date, { addSuffix: true })}
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
                
                <div className="p-4 text-center border-t border-gray-700/50">
                    <button className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
                        Load More Activity
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RecentActivity