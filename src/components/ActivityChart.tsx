
import React, { useMemo } from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine,
  LabelList
} from "recharts";
import { Flame, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";

interface ActivityChartProps {
  data: Array<{
    day: string;
    messages: number;
  }>;
}

const ActivityChart: React.FC<ActivityChartProps> = ({ data }) => {
  const isMobile = useIsMobile();
  
  const enhancedData = useMemo(() => {
    // Find max value for highlighting
    let maxValue = 0;
    let maxDay = "";
    
    data.forEach(item => {
      if (item.messages > maxValue) {
        maxValue = item.messages;
        maxDay = item.day;
      }
    });
    
    // Return enhanced data with color information
    return data.map(item => ({
      ...item,
      fill: item.day === maxDay ? "#9b87f5" : "#D3E4FD",  // Highlight busiest day
      isMax: item.day === maxDay,
      maxDay,
    }));
  }, [data]);
  
  // Find the busiest day for caption
  const busiestDay = useMemo(() => {
    const maxItem = data.reduce((max, item) => 
      item.messages > max.messages ? item : max, data[0]);
    return maxItem?.day || 'Friday';
  }, [data]);
  
  // Custom tooltip that hides when hovering over the max day
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length && payload[0]?.payload && !payload[0].payload.isMax) {
      return (
        <div className="bg-white p-2 border rounded-md shadow-sm text-xs">
          <p className="font-medium">{`${payload[0].payload.day}: ${payload[0].value} messages`}</p>
        </div>
      );
    }
    return null;
  };
  
  const CustomizedLabel = (props: any) => {
    const { x, y, width, value, payload } = props;
    
    // Safety check to ensure payload exists and has the necessary properties
    if (!payload) {
      return null;
    }
    
    // Only show label for bars
    return (
      <g>
        <text 
          x={x + width/2} 
          y={isMobile ? y - 6 : y - 10} 
          fill={payload.isMax ? "#8B5CF6" : "#6B7280"} 
          textAnchor="middle"
          className={isMobile ? "text-[10px] font-medium" : "text-xs font-medium"}
        >
          {value}
        </text>
        {payload.isMax && (
          <g transform={`translate(${x + width/2 - 9}, ${isMobile ? y - 25 : y - 35})`}>
            <Flame className={isMobile ? "h-4 w-4 text-amber-500" : "h-4.5 w-4.5 text-amber-500"} />
          </g>
        )}
      </g>
    );
  };

  return (
    <Card className="overflow-visible">
      <CardHeader className="pb-2">
        <CardTitle className={`${isMobile ? "text-base" : "text-lg"} font-medium flex items-center ${isMobile ? "flex-col" : "justify-between"} ${isMobile ? "items-start" : ""}`}>
          Messages Sent per Day
          {busiestDay && (
            <Badge variant="outline" className="text-xs font-normal flex items-center gap-1 bg-white">
              <Trophy className="h-3 w-3 text-amber-500" />
              Busiest day: {busiestDay}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`${isMobile ? "h-48 -mx-2" : "h-60"}`}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={enhancedData}
              margin={{ 
                top: isMobile ? 25 : 30, 
                right: isMobile ? 5 : 15, 
                left: isMobile ? -10 : 0, 
                bottom: isMobile ? 0 : 5 
              }}
              barGap={isMobile ? 3 : 5}
              barCategoryGap={isMobile ? "10%" : "20%"}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: isMobile ? 10 : 12 }}
                dy={isMobile ? 5 : 0}
              />
              <YAxis 
                hide 
                domain={[0, 'dataMax + 20']}
              />
              <Tooltip 
                cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} 
                content={<CustomTooltip />}
              />
              <Bar 
                dataKey="messages" 
                fill="#D3E4FD" 
                radius={[4, 4, 0, 0]} 
                maxBarSize={isMobile ? 32 : 60}
                fillOpacity={0.9}
              >
                <LabelList dataKey="messages" content={<CustomizedLabel />} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 text-center text-sm text-muted-foreground italic">
          {busiestDay} was the group's busiest day. Let's hear it for {busiestDay.includes("Fri") ? "end-of-week" : "mid-week"} chaos! 📈
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityChart;
