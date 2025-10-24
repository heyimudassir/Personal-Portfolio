import React from "react";

// Yeh aapki social media post jaisa hi dikhega, lekin gray boxes ke sath
export default function LogbookSkeleton() {
  return (
    <div className="p-6 bg-white/80 backdrop-blur rounded-[30px] shadow-material border border-primary/10">
      
      {/* Header (Avatar + Name) */}
      <div className="flex items-center gap-3 mb-4">
        {/* Avatar skeleton */}
        <div className="w-12 h-12 rounded-full bg-gray-300 animate-pulse"></div>
        <div>
          {/* Name skeleton */}
          <div className="h-5 w-32 bg-gray-300 rounded animate-pulse mb-1"></div>
          {/* Date skeleton */}
          <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Content (Title + Text) */}
      <div className="space-y-3">
        {/* Title skeleton */}
        <div className="h-6 w-3/4 bg-gray-300 rounded animate-pulse"></div>
        {/* Text line 1 */}
        <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
        {/* Text line 2 */}
        <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
        {/* Text line 3 */}
        <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  );
}