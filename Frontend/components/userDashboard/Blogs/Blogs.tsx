import React from 'react'
import Link from 'next/link'

function Blogs() {
    const TrendBlogsLinks = [
        {
            title: "Understanding Your CGPA",
            description: "Learn how to calculate and interpret your CGPA.",
            link: "./blogs-content/cgpa-blog-content.tsx",
            date: "2023-10-01",
            author: "John Doe",
        },
        {
            title: "Effective Study Techniques",
            description: "Explore proven study methods to enhance your learning.",
            link: "./study-techniques-blog-content.tsx",
            date: "2023-10-02",
            author: "Jane Smith"
        },
        {
            title: "Time Management Tips for Students",
            description: "Master the art of time management with these strategies.",
            link: "./time-management-blog-content.tsx",
            date: "2023-10-03",
            author: "Alice Johnson"
        }
    ]

    return (
        <div className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="bg-indigo-500 w-2 h-6 rounded-full"></span>
                Trending Blogs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {TrendBlogsLinks.map((blog, index) => (
                    <div
                        key={index}
                        className="bg-gradient-to-br from-indigo-500 to-sky-600 rounded-xl p-5 text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl border border-white/10 relative overflow-hidden group"
                    >
                        {/* Decorative elements */}
                        <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-white/10"></div>
                        <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/5"></div>
                        
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                                    <p className="text-white/80 text-sm mb-3">{blog.description}</p>
                                </div>
                            </div>
                            
                            {/* Meta information */}
                            <div className="flex items-center justify-between text-xs text-white/60 mb-5">
                                <span>{new Date(blog.date).toLocaleDateString('en-US', { 
                                    year: 'numeric', 
                                    month: 'short', 
                                    day: 'numeric' 
                                })}</span>
                                <span>By {blog.author}</span>
                            </div>
                            
                            <Link
                                href={blog.link}
                                className="inline-flex items-center justify-center w-full py-2 px-4 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-all group-hover:bg-white/30"
                            >
                                Read Article
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

export default Blogs