'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FiSearch, FiFilter, FiEdit2, FiTrash2, FiEye } from 'react-icons/fi';
import { FaGraduationCap, FaIdCard } from 'react-icons/fa';
import StudentCard from './StudentCard';
import StudentCardSkeleton from './StudentCardSkeleton';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { User } from '@/types/types';

export default function StudentsTable() {
  const router = useRouter();
  const [students, setStudents] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('table');

  const filteredStudents = students.filter(student => {
    const searchLower = searchQuery.toLowerCase();
    return (
      student.fullname?.toLowerCase().includes(searchLower) ||
      student.email?.toLowerCase().includes(searchLower) ||
      student.studentCollageId?.toLowerCase().includes(searchLower)
    );
  });

  const handleDelete = async (clerkId: string) => {
    if (!confirm('Are you sure you want to delete this student?')) return;

    try {
      const response = await fetch(`/api//admin/${clerkId}/delete`, { method: 'DELETE' });
      if (response.status === 400) {
        const error = await response.json();
        throw new Error(error.message);
      }
      if (response.ok) {
        setStudents(prev => prev.filter(student => student.clerkId !== clerkId));
        toast.success('Student deleted successfully');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to delete student');
    }
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch('/api/user/all');
        const data = await res.json();
        setStudents(data);
      } catch (error) {
        console.error(error);
        toast.error('Failed to load students');
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  


  return (
    <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-700/50 shadow-lg overflow-hidden ">
      {/* Table Header with Controls */}
      <div className="p-6 border-b border-gray-700/50">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="bg-indigo-500 w-2 h-6 rounded-full"></span>
              Student Management
            </h2>
            <p className="text-gray-400 mt-1">
              {students.length} {students.length === 1 ? 'student' : 'students'} registered
            </p>
          </div>

          <div className="flex items-center gap-3">

            <div className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2">
              <button
                onClick={() => setViewMode('cards')}
                className={`p-2 rounded ${viewMode === 'cards' ? 'bg-gray-700' : ''}`}
                title="Card View"
              >
                🗂️
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded ${viewMode === 'table' ? 'bg-gray-700' : ''}`}
                title="Table View"
              >
                📊
              </button>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search students..."
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <FiFilter className="text-gray-400 " />
            <label htmlFor="programFilter" className="sr-only">Filter by Program</label>
            <select
              id="programFilter"
              className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">All Programs</option>
              <option value="cs">Computer Science</option>
              <option value="eng">Engineering</option>
              <option value="bus">Business</option>
            </select>
          </div>
        </div>
      </div>
      {/* Loading Skeleton */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <StudentCardSkeleton key={index} />
          ))}
        </div>
      )}
      {/* Content Area */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6 overflow-y-auto custom-scrollbar">
          {filteredStudents.length > 0 ? (
            filteredStudents.map(student => (
              <StudentCard
                key={student.id}
                student={student}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <div className="bg-gray-800/50 p-6 rounded-full inline-block mb-4">
                <FaGraduationCap className="text-gray-400 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No students found</h3>
              <p className="text-gray-400 max-w-md mx-auto">
                {searchQuery ? 'Try adjusting your search query' : 'No students are currently registered'}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto p-6  custom-scrollbar">
          <table className="w-full text-left text-gray-400">
            <thead className="text-xs text-gray-300 uppercase bg-gray-800/50">
              <tr>
                <th scope="col" className="px-6 py-3">Student</th>
                <th scope="col" className="px-6 py-3">ID</th>
                <th scope="col" className="px-6 py-3">Program</th>
                <th scope="col" className="px-6 py-3">Level</th>
                <th scope="col" className="px-6 py-3">Role</th>
                <th scope="col" className="px-6 py-3">CGPA</th>
                <th scope="col" className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map(student => (
                  <tr key={student.id} className="border-b border-gray-700/50 hover:bg-gray-800/30">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                          {student.profilePicture ? (
                            <Image src={student.profilePicture} alt={`${student.fullname}`} width={40} height={40} className="h-full w-full object-cover" />
                          ) : (
                            <span className="text-sm">
                              {student.fullname[0]}
                            </span>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-white">
                            {student.fullname}
                          </div>
                          <div className="text-xs">{student.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <FaIdCard className="text-gray-500" />
                        {student.studentCollageId || '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4">{student.depName || '-'}</td>
                    <td className="px-6 py-4">{student.level || '-'}</td>
                    <td className="px-6 py-4">{student.role || '-'}</td>
                    <td className="px-6 py-4">
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${student.cgpa && student.cgpa >= 3.5 ? 'bg-green-500/20 text-green-400' :
                        student.cgpa && student.cgpa >= 2.5 ? 'bg-amber-500/20 text-amber-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                        {student.cgpa || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => router.push(`/admin/students/${student.id}`)}
                          className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                          title="View"
                        >
                          <FiEye />
                        </button>
                        <button
                          onClick={() => router.push(`/admin/students/${student.id}/edit`)}
                          className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          onClick={() => student.id && handleDelete(student.clerkId)}
                          className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="bg-gray-800/50 p-6 rounded-full inline-block mb-4">
                      <FaGraduationCap className="text-gray-400 text-3xl" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">No students found</h3>
                    <p className="text-gray-400 max-w-md mx-auto">
                      {searchQuery ? 'Try adjusting your search query' : 'No students are currently registered'}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}