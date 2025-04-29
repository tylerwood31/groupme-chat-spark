
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const RecapDetailError: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container max-w-4xl px-4 py-8 text-center">
      <h1 className="text-2xl font-bold mb-4">Recap not found</h1>
      <p className="text-muted-foreground mb-6">The requested recap could not be loaded.</p>
      <Button onClick={() => navigate("/")}>Return Home</Button>
    </div>
  );
};

export default RecapDetailError;
