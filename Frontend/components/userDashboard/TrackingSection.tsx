import React from 'react'
import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';
// import * as Icons from 'react-icons/fa';

async function TrackingSection() {
    const { userId } = await auth();
    const user = await fetch(
        `http://localhost:5168/api/Auth/${userId}`,
        { cache: "force-cache" }
    );
    const userData = await user.json();

    if (!userData.id) {
        return (
            <div className="bg-rose-100 border-l-4 border-rose-500 text-rose-700 p-4 mb-8 rounded">
                <p className="font-medium">Error in Tracking Section</p>
                <p>Student ID not found</p>
            </div>
        );
    }

    const enrolledRes = await fetch(
        `http://localhost:5168/api/Admin/enrollments/user/${userData.id}`,
        { cache: "no-store" }
    );
    const data = await enrolledRes.json();
    const totalEnrolledSubjects = data.length;
    const quizzesRes = await fetch(
        `http://localhost:5168/api/Quiz/active`,
        { cache: "no-store" }
    );
    const quizzesData = await quizzesRes.json();
    const totalQuizzes = quizzesData.length;



    const stats = [
        // {
        //     title: "Submissions",
        //     value: totalSubmissions || 0,
        //     description: totalSubmissions ? "Assignments submitted" : "No submissions yet",
        //     link: "/user/submission",
        //     gradient: "from-green-400 to-emerald-500",
        //     icon: (
        //         <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        //         </svg>
        //     )
        // },
        {
            title: "Enrolled Subjects",
            value: totalEnrolledSubjects || 0,
            description: totalEnrolledSubjects ? "Current enrollments" : "Not enrolled yet",
            link: `/user/dashboard/enrollments/${userData.id}`,
            gradient: "from-cyan-400 to-sky-500",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            )
        },
        {
            title: "Assignments",
            value: 0,
            description: "No assignments available",
            link: "/user/assignments",
            gradient: "from-purple-400 to-violet-500",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18m-7 5h7" />
                </svg>
            )
        },
        {
            title: "Quizzes",
            value: totalQuizzes || 0,
            description: totalQuizzes ? "Available quizzes" : "No quizzes available",
            link: "/user/dashboard/quizzes",
            gradient: "from-pink-400 to-rose-500",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m-8-8h16" />
                </svg>
            )
        }

    ];

    return (
        <div className="mb-10">
            <h2 className="text-2xl font-bold text-white  mb-6 flex items-center gap-3">
                <span className="bg-indigo-500 w-2 h-6 rounded-full"></span>
                Academic Overview
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className={`bg-gradient-to-br ${stat.gradient} rounded-xl p-6 text-white shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] relative overflow-hidden group`}
                    >
                        {/* Decorative elements */}
                        <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-white/10"></div>
                        <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/5"></div>

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-sm font-medium text-white/80">{stat.title}</p>
                                    <h3 className="text-3xl font-bold mt-1">{stat.value}</h3>
                                </div>
                                <div className="p-2 bg-white/20 rounded-lg">
                                    {stat.icon}
                                </div>
                            </div>

                            <p className="text-white/90 mb-6 text-sm">{stat.description}</p>

                            <Link
                                href={stat.link}
                                className="inline-flex items-center justify-center w-full py-2 px-4 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-all group-hover:bg-white/30"
                            >
                                View Details
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TrackingSection