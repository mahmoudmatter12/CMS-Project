import React from 'react'
import Link from 'next/link'

function ImportantFormsSection() {
    const ImportantForms = [
        {
            head: "Subject Registration",
            description: "Register for your subjects for the upcoming semester. Make sure to check the prerequisites and availability.",
            link: "/user/form",
            StartDate: "2025-04-01",
            EndDate: "2025-04-30",
            ActionText: "Register Now",
        },
    ]

    const currentDate = new Date();
    
    return (
        <div className="mb-12 ">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="bg-indigo-500 w-2 h-6 rounded-full"></span>
                Important Forms
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                {ImportantForms.map((form, index) => {
                    const startDate = new Date(form.StartDate);
                    const endDate = new Date(form.EndDate);
                    const isOpen = currentDate >= startDate && currentDate <= endDate;
                    const isUpcoming = currentDate < startDate;
                    const status = isOpen ? "Open" : (isUpcoming ? "Upcoming" : "Closed");
                    
                    // Status colors
                    const statusColor = isOpen ? "bg-emerald-500" : (isUpcoming ? "bg-amber-500" : "bg-rose-500");
                    const cardGradient = isOpen 
                        ? "from-cyan-500 to-indigo-600" 
                        : (isUpcoming 
                            ? "from-amber-500 to-amber-600" 
                            : "from-gray-600 to-gray-700");
                    
                    // Date formatting
                    const formatDate = (date: Date) => {
                        return date.toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                        });
                    };

                    return (
                        <div
                            key={index}
                            className={`bg-gradient-to-br ${cardGradient} rounded-xl p-5 text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl border border-white/10 relative overflow-hidden`}
                        >
                            {/* Status ribbon */}
                            <div className={`absolute top-0 right-0 px-4 py-1 text-xs font-bold ${statusColor} shadow-md`}>
                                {status}
                            </div>
                            
                            {/* Shiny accent */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-white/30"></div>
                            
                            <div className="mt-4">
                                <h3 className="text-xl font-bold mb-3">{form.head}</h3>
                                <p className="text-white/80 mb-5 text-sm">{form.description}</p>
                                
                                {/* Date information */}
                                <div className="mb-5">
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-white/70">Starts:</span>
                                        <span className="font-medium">{formatDate(startDate)}</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                        <span className="text-white/70">Ends:</span>
                                        <span className="font-medium">{formatDate(endDate)}</span>
                                    </div>
                                </div>
                                
                                {/* Progress bar */}
                                <div className="mb-4">
                                    <div className="h-1 bg-white/20 rounded-full w-full">
                                        <div 
                                            className={`h-full rounded-full ${statusColor} transition-all duration-1000`}
                                            style={{
                                                width: isOpen 
                                                    ? `${Math.min(100, ((currentDate.getTime() - startDate.getTime()) / (endDate.getTime() - startDate.getTime())) * 100)}%`
                                                    : isUpcoming ? '0%' : '100%'
                                            }}
                                        ></div>
                                    </div>
                                    <div className="text-xs text-white/60 mt-1 text-right">
                                        {isOpen ? `${Math.ceil((endDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24))} days remaining` : (isUpcoming ? "Not yet started" : "Closed")}
                                    </div>
                                </div>
                                
                                {/* Action button */}
                                <Link
                                    href={isOpen ? form.link : "#"}
                                    className={`block text-center ${isOpen 
                                        ? "bg-white text-indigo-600 hover:bg-white/90 animate-pulse" 
                                        : "bg-white/10 text-white/50 cursor-not-allowed"} 
                                        px-4 py-2 rounded-lg text-sm font-semibold transition-colors
                                        
                                        `}
                                    aria-disabled={!isOpen}
                                    tabIndex={isOpen ? 0 : -1}
                                >
                                    {isOpen ? form.ActionText : (isUpcoming ? "Coming Soon" : "Form Closed")}
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default ImportantFormsSection