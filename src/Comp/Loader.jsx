import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const Loader = () => {
    return (
        <div className="flex min-h-screen w-full">
          <div className="w-64 p-4 border-r hidden md:block">
            <Skeleton className="h-10 w-32 mb-4" />
            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-8 w-1/2 mb-2" />
            <Skeleton className="h-8 w-5/6" />
          </div>
    
          <div className="flex flex-col w-full px-6 py-8 gap-6">
            <div className="flex items-center justify-between">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
    
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} className="h-24 w-full rounded-xl" />
                ))}
            </div>
    
            <div className="grid gap-4 md:grid-cols-2">
              {Array(2)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} className="h-36 w-full rounded-xl" />
                ))}
            </div>
    
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-40" />
              </div>
              <Skeleton className="h-2 w-full rounded-full" />
              <div className="flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
          </div>
        </div>
      );
    }

export default Loader
