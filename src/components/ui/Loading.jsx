import React from "react";
import Card from "@/components/atoms/Card";
import { cn } from "@/utils/cn";

const Loading = ({ type = "default", className }) => {
  if (type === "table") {
    return (
      <div className={cn("space-y-4", className)}>
        {Array.from({ length: 5 }).map((_, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-secondary-200 rounded-full animate-shimmer" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-secondary-200 rounded animate-shimmer w-1/4" />
                <div className="h-3 bg-secondary-200 rounded animate-shimmer w-1/2" />
                <div className="h-3 bg-secondary-200 rounded animate-shimmer w-1/3" />
              </div>
              <div className="space-y-2">
                <div className="h-8 w-16 bg-secondary-200 rounded animate-shimmer" />
                <div className="h-8 w-16 bg-secondary-200 rounded animate-shimmer" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (type === "grid") {
    return (
      <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-200 rounded-full mx-auto mb-4 animate-shimmer" />
              <div className="h-4 bg-secondary-200 rounded animate-shimmer mb-2" />
              <div className="h-3 bg-secondary-200 rounded animate-shimmer w-2/3 mx-auto mb-4" />
              <div className="space-y-2">
                <div className="h-3 bg-secondary-200 rounded animate-shimmer" />
                <div className="h-3 bg-secondary-200 rounded animate-shimmer" />
                <div className="h-3 bg-secondary-200 rounded animate-shimmer w-3/4" />
              </div>
              <div className="flex space-x-2 mt-4">
                <div className="h-8 bg-secondary-200 rounded flex-1 animate-shimmer" />
                <div className="h-8 bg-secondary-200 rounded flex-1 animate-shimmer" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (type === "stats") {
    return (
      <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", className)}>
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="h-3 bg-secondary-200 rounded animate-shimmer w-2/3 mb-2" />
                <div className="h-8 bg-secondary-200 rounded animate-shimmer w-1/2 mb-2" />
                <div className="h-3 bg-secondary-200 rounded animate-shimmer w-1/3" />
              </div>
              <div className="w-12 h-12 bg-secondary-200 rounded-lg animate-shimmer" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("flex items-center justify-center p-8", className)}>
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-secondary-600">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;