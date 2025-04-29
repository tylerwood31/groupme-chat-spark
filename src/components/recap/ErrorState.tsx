
import React from "react";
import { Button } from "@/components/ui/button";

const ErrorState: React.FC = () => {
  return (
    <div className="container max-w-4xl px-4 py-12">
      <h1 className="text-2xl font-bold mb-4">Recap not found</h1>
      <p className="text-muted-foreground">We couldn't find a recap for this group.</p>
      <Button className="mt-4" onClick={() => window.history.back()}>
        Go Back
      </Button>
    </div>
  );
};

export default ErrorState;
