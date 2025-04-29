
import React from "react";
import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";
import { toast } from "sonner";

const ShareButtons: React.FC = () => {
  const handleShareRecap = () => {
    toast.success("Recap shared to GroupMe!");
  };
  
  const handleSaveRecap = () => {
    toast.success("Recap saved to your profile!");
  };
  
  return (
    <section className="mb-10 flex flex-col md:flex-row gap-4">
      <Button 
        className="flex-1 bg-groupme-primary hover:bg-groupme-primary/90"
        onClick={handleShareRecap}
      >
        <Share className="h-4 w-4 mr-2" />
        Share Recap to GroupMe
      </Button>
      
      <Button 
        variant="outline" 
        className="flex-1 border-groupme-primary/30 text-groupme-primary hover:bg-groupme-primary/5"
        onClick={handleSaveRecap}
      >
        Save My Weekly Recap
      </Button>
    </section>
  );
};

export default ShareButtons;
