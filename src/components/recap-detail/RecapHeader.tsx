
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface RecapHeaderProps {
  groupName: string;
  period: string;
  date: string;
}

const RecapHeader: React.FC<RecapHeaderProps> = ({ groupName, period, date }) => {
  const navigate = useNavigate();

  return (
    <header className="mb-8">
      <Button 
        variant="ghost" 
        size="sm" 
        className="mb-6"
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </Button>
      
      <div className="flex items-center">
        <h1 className="text-3xl font-bold gradient-text">{groupName}</h1>
        <span className="ml-4 px-3 py-1 bg-groupme-primary/10 text-groupme-primary text-xs rounded-full font-medium">
          {period}
        </span>
      </div>
      <p className="text-muted-foreground mt-2">
        Generated on {date}
      </p>
    </header>
  );
};

export default RecapHeader;
