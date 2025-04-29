
import React from "react";

const LoadingState: React.FC = () => {
  return (
    <div className="container max-w-4xl px-4 py-12 flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="h-12 w-12 border-4 border-t-transparent border-groupme-primary rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading this week's chaos...</p>
      </div>
    </div>
  );
};

export default LoadingState;
