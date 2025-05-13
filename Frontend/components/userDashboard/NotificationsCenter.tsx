import React from 'react'
import {  FaRegBell } from 'react-icons/fa'
import { IoIosClose } from 'react-icons/io'

function NotificationsCenter() {
    const notifications = [
        { 
            id: 1, 
            message: 'New assignment posted for Math 101', 
            date: '2023-10-01T14:30:00',
            read: false,
            type: 'assignment'
        },
        { 
            id: 2, 
            message: 'Course registration opens tomorrow', 
            date: '2023-10-02T09:15:00',
            read: true,
            type: 'registration'
        },
        { 
            id: 3, 
            message: 'Midterm exam schedule released', 
            date: '2023-10-03T16:45:00',
            read: false,
            type: 'exam'
        },
        { 
            id: 4, 
            message: 'Feedback requested for Chemistry lab', 
            date: '2023-10-04T11:20:00',
            read: true,
            type: 'feedback'
        },
        { 
            id: 5, 
            message: 'Testing notification for new feature', 
            date: '2023-10-04T11:20:00',
            read: false,
            type: 'test'
        },
    ]

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        const now = new Date()
        const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
        
        if (diffInHours < 24) {
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        } else {
            return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
        }
    }

    const getNotificationIcon = (type: string) => {
        switch(type) {
            case 'assignment':
                return <div className="p-2 rounded-full bg-indigo-500/20 text-indigo-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
            case 'exam':
                return <div className="p-2 rounded-full bg-rose-500/20 text-rose-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                </div>
            case 'registration':
                return <div className="p-2 rounded-full bg-emerald-500/20 text-emerald-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                </div>
            default:
                return <div className="p-2 rounded-full bg-cyan-500/20 text-cyan-400">
                    <FaRegBell className="h-5 w-5" />
                </div>
        }
    }

    return (
        <div className="mb-10">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <span className="bg-indigo-500 w-2 h-6 rounded-full"></span>
                    Notifications
                </h2>
                <button className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
                    Mark all as read
                </button>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl max-h-[400px] custom-scrollbar overflow-auto border border-gray-700/50 shadow-lg">
                <ul className="divide-y divide-gray-700/50">
                    {notifications.map((notification) => (
                        <li 
                            key={notification.id} 
                            className={`p-4 hover:bg-gray-700/30 transition-colors ${!notification.read ? 'bg-gray-800/50' : ''}`}
                        >
                            <div className="flex items-start gap-3">
                                {getNotificationIcon(notification.type)}
                                <div className="flex-1 min-w-0">
                                    <p className={`text-sm font-medium truncate ${!notification.read ? 'text-white' : 'text-gray-400'}`}>
                                        {notification.message}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {formatDate(notification.date)}
                                    </p>
                                </div>
                                <button className="text-gray-500 hover:text-white p-1 transition-colors">
                                    <IoIosClose className="h-5 w-5" />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
                
                <div className="p-4 text-center border-t border-gray-700/50">
                    <button className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
                        View all notifications
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NotificationsCenter