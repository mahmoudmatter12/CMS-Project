// SubjectCardSkeleton.tsx
export function SubjectCardSkeleton() {
  return (
    <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl overflow-hidden animate-pulse">
      <div className="p-4 border-b border-gray-700/50">
        <div className="h-6 w-20 rounded-full bg-gray-700"></div>
      </div>
      <div className="p-5">
        <div className="h-6 w-3/4 rounded bg-gray-700 mb-3"></div>
        <div className="h-4 w-1/2 rounded bg-gray-700 mb-4"></div>
        <div className="h-4 w-full rounded bg-gray-700 mb-2"></div>
        <div className="h-4 w-2/3 rounded bg-gray-700 mb-6"></div>
        <div className="flex justify-between gap-2">
          <div className="h-8 w-24 rounded bg-gray-700"></div>
          <div className="h-8 w-24 rounded bg-gray-700"></div>
        </div>
      </div>
    </div>
  );
}