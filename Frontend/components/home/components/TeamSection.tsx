import React from 'react';
import { TeamMemberCard } from './TeamMemberCard';
import { teamMembersData, TeamMember } from '../../../data/teamMembers'; // Import data and type

export const TeamSection: React.FC = () => {
    return (
        <section className="py-12 bg-gray-50 sm:py-16 lg:py-20">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                        Meet Our Expert Team
                    </h2>
                    <p className="mt-4 text-lg leading-7 text-gray-600 sm:mt-6">
                        We are a group of passionate individuals dedicated to excellence and innovation.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 mt-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:mt-16">
                    {teamMembersData.map((member: TeamMember) => (
                        <TeamMemberCard key={member.id} member={member} />
                    ))}
                </div>
            </div>
        </section>
    );
};