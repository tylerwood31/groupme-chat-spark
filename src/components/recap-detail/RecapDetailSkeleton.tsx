
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RecapDetailSkeleton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container max-w-4xl px-4 py-8">
      <Button 
        variant="ghost" 
        size="sm" 
        className="mb-6"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>
      
      <Skeleton className="h-8 w-3/4 mb-2" />
      <Skeleton className="h-6 w-1/2 mb-8" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {Array(3).fill(0).map((_, i) => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
      
      <Skeleton className="h-64 w-full" />
    </div>
  );
};

export default RecapDetailSkeleton;
