import { Skeleton, Card } from "@heroui/react";

export default function PostSkeleton() {
  return (
    <Card className="animate-pulse rounded-lg shadow-sm overflow-hidden bg-white dark:bg-gray-800">
      
      {/* Header Skeleton */}
      <div className="p-4 flex items-start space-x-3">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="flex-1 space-y-1">
          <Skeleton className="h-4 w-1/4 rounded" />
          <Skeleton className="h-3 w-1/6 rounded" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="px-4 pb-3 space-y-2">
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-3/4 rounded" />
      </div>

      {/* Image Skeleton */}
      <Skeleton className="w-full h-64 rounded-none" />

      {/* Stats Skeleton */}
      <div className="px-4 py-2 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
        <Skeleton className="h-4 w-1/6 rounded" />
        <Skeleton className="h-4 w-1/4 rounded" />
      </div>

      {/* Actions Skeleton */}
      <div className="px-2 py-1 flex justify-between border-t border-gray-200 dark:border-gray-700">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-8 flex-1 mx-1 rounded" />
        ))}
      </div>
    </Card>
  );
}
