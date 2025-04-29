
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

interface TextRecapProps {
  textRecap: string;
}

const TextRecap: React.FC<TextRecapProps> = ({ textRecap }) => {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <MessageSquare className="h-5 w-5 mr-2 text-groupme-primary" />
        Newsletter Recap
      </h2>
      
      <Card className="bg-gradient-to-r from-blue-50/80 to-purple-50/80 border-blue-200/50 dark:from-blue-950/50 dark:to-purple-900/50 dark:border-blue-800/30">
        <CardContent className="pt-6">
          <div className="prose dark:prose-invert max-w-full">
            {textRecap.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-700 dark:text-gray-200 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default TextRecap;
