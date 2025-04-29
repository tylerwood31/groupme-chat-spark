
import React from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, HelpCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";

const ErrorState: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container max-w-4xl mx-auto px-4 py-16 flex flex-col items-center">
      <div className="mb-8 text-center">
        <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="h-12 w-12 text-groupme-accent" />
        </div>
        <h1 className="text-3xl font-bold mb-3 gradient-text">Recap Not Found</h1>
        <p className="text-muted-foreground text-lg max-w-md mx-auto mb-8">
          We couldn't find the recap you're looking for. It might have been removed or never existed.
        </p>
      </div>
      
      <div className="w-full max-w-md mb-8">
        <Alert className="mb-4 border-groupme-accent/30 bg-groupme-accent/10">
          <AlertTitle className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4" />
            What you can try
          </AlertTitle>
          <AlertDescription className="mt-2">
            <ul className="list-disc pl-5 space-y-1">
              <li>Check if the URL is correct</li>
              <li>Return to your groups page and select a recap</li>
              <li>Try refreshing the page</li>
            </ul>
          </AlertDescription>
        </Alert>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={() => navigate("/")} className="min-w-[150px]">
          Return Home
        </Button>
        <Button 
          variant="outline" 
          onClick={() => window.location.reload()} 
          className="flex items-center gap-2 min-w-[150px]"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh Page
        </Button>
      </div>
    </div>
  );
};

export default ErrorState;
