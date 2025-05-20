import React from 'react';
import { TeamMember } from '../../../data/teamMembers'; // Assuming data types are in a separate file

interface TeamMemberCardProps {
    member: TeamMember;
}

export const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
    return (
        <div className="bg-white shadow-xl rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <img
                className="w-full h-56 object-cover object-center"
                src={member.imageUrl}
                alt={member.name}
            />
            <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">{member.name}</h3>
                <p className="text-indigo-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{member.bio}</p>

                <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Expertise:</h4>
                    <div className="flex flex-wrap gap-2">
                        {member.expertise.map((skill, index) => (
                            <span
                                key={index}
                                className="bg-indigo-100 text-indigo-700 text-xs font-semibold px-2.5 py-0.5 rounded-full"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex space-x-3">
                    {member.linkedin && (
                        <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-indigo-600 transition-colors"
                            aria-label={`${member.name}'s LinkedIn`}
                        >
                            {/* Basic SVG for LinkedIn - replace with a proper icon library if available */}
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                        </a>
                    )}
                    {member.twitter && (
                        <a
                            href={member.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-sky-500 transition-colors"
                            aria-label={`${member.name}'s Twitter`}
                        >
                            {/* Basic SVG for Twitter */}
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                            </svg>
                        </a>
                    )}
                    {member.github && (
                        <a
                            href={member.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-gray-900 transition-colors"
                            aria-label={`${member.name}'s GitHub`}
                        >
                            {/* Basic SVG for GitHub */}
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                            </svg>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};