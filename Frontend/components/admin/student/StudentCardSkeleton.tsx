import { Skeleton } from '@/components/ui/skeleton';

export default function StudentCardSkeleton() {
  return (
    <div className="p-6 rounded-lg shadow-md w-72 flex-shrink-0">
      {/* User Image Skeleton */}
      <div className="flex items-center justify-center mb-4">
        <Skeleton className="h-16 w-16 rounded-full" />
      </div>

      {/* User Name Skeleton */}
      <Skeleton className="h-6 w-3/4 mx-auto mb-2" />

      {/* User Email Skeleton */}
      <Skeleton className="h-4 w-5/6 mx-auto mb-2" />

      {/* Student ID Skeleton */}
      <Skeleton className="h-4 w-1/2 mx-auto mb-4" />

      {/* Actions Skeleton */}
      <div className="flex justify-center gap-4">
        <Skeleton className="h-10 w-20" />
        <Skeleton className="h-10 w-20" />
      </div>
    </div>
  );
}