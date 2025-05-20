import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function QuizCardSkeleton() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-5 w-16" />
        </div>
        <Skeleton className="h-4 w-full mt-2" />
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center">
              <Skeleton className="h-4 w-4 mr-2" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <div className="w-full flex justify-between items-center">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-9 w-24" />
        </div>
      </CardFooter>
    </Card>
  )
}
