
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const SermonLoadingSkeleton = () => {
  return (
    <div className="bg-white rounded-lg border shadow-sm p-6">
      <div className="flex justify-between items-start mb-6">
        <div className="w-full">
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-9 w-20" />
          <Skeleton className="h-9 w-20" />
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <Skeleton className="h-6 w-1/4 mb-3" />
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        
        {/* Simulate 3 points */}
        {[1, 2, 3].map((point) => (
          <div key={point}>
            <Skeleton className="h-6 w-1/3 mb-3" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-4/5 mb-1" />
            <Skeleton className="h-3 w-2/5 mt-2" />
          </div>
        ))}
        
        <div>
          <Skeleton className="h-6 w-1/5 mb-3" />
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-4/5" />
        </div>
        
        <div>
          <Skeleton className="h-6 w-2/5 mb-3" />
          <ul className="space-y-2">
            {[1, 2, 3].map((item) => (
              <li key={item} className="flex items-center">
                <Skeleton className="h-3 w-3 mr-2" />
                <Skeleton className="h-4 w-full" />
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t flex items-center justify-center">
        <Skeleton className="h-5 w-40" />
      </div>
    </div>
  );
};

export default SermonLoadingSkeleton;
