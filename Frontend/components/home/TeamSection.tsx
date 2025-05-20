import React from 'react';
import { TeamMemberCard } from './components/TeamMemberCard';
import { teamMembersData, TeamMember } from '../../data/teamMembers';

export const TeamSection: React.FC = () => {
    return (
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
                    Meet Our Team
                </h2>
                {teamMembersData && teamMembersData.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                        {teamMembersData.map((member: TeamMember) => ( // Explicitly type 'member'
                            <TeamMemberCard key={member.id} member={member} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-600">No team members to display.</p>
                )}
            </div>
        </section>
    );
};