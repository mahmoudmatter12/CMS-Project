import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function EnrollmentCardSkeleton() {
    return (
      <Card className="bg-gray-800/50 border-gray-700 h-full">
        <CardContent className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <Skeleton className="h-5 w-20 ml-auto" />
          </div>
  
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-6 w-1/2 mb-6" />
  
          <div className="mt-auto pt-4">
            <div className="flex justify-between items-center">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-28" />
            </div>
            <Skeleton className="h-9 w-full mt-4" />
          </div>
        </CardContent>
      </Card>
    )
  }