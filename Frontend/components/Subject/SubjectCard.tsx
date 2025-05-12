// SubjectCard.tsx
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge";
import { FaLock, FaLockOpen, FaTrash } from 'react-icons/fa';
import { Course } from '@/types/types';

interface SubjectCardProps {
  subject: Course;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function SubjectCard({ subject, onToggle, onDelete, }: SubjectCardProps) {
  return (
    <div className={`bg-gray-800/50 border rounded-xl overflow-hidden transition-all hover:shadow-lg ${subject.isOpen ? 'border-green-500/30 hover:border-green-500/50' : 'border-red-500/30 hover:border-red-500/50'
      }`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-700/50">
        <div className="flex justify-between items-start">
          <Badge className={subject.isOpen ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}>
            {subject.isOpen ? 'Open' : 'Closed'}
          </Badge>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-white mb-1">{subject.name}</h3>
        <p className="font-mono text-blue-400 text-sm mb-2">{subject.courseCode}</p>

        <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
          <span>{subject.creditHours || '0'} credits</span>
        </div>

        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-3">Prerequisites:</p>
          <div className="flex flex-wrap gap-1">
            {subject.prerequisiteCourses.length === 0 ? (
              <Badge variant="outline" className="text-xs text-gray-500">
                No prerequisites
              </Badge>
            ) : (
              subject.prerequisiteCourses.map((pre: string) => (
                <Badge key={pre} variant="outline" className="text-xs text-white">
                  {pre}
                </Badge>
              ))
            )}

          </div>
        </div>


        {/* Actions */}
        <div className="flex justify-between gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            className="gap-1 text-black cursor-pointer hover:bg-gray-700/50 hover:text-white hover:border-white "
            onClick={() => onToggle(subject.id)}

          >
            {subject.isOpen ? <FaLock size={14} /> : <FaLockOpen size={14} />}
            {subject.isOpen ? 'Close' : 'Open'}
          </Button>
          <Button
            variant="destructive"
            size="sm"
            className="gap-1 cursor-pointer hover:bg-red-700/70 hover:text-white hover:border-white"
            onClick={() => onDelete(subject.id)}
          >
            <FaTrash size={14} /> Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

