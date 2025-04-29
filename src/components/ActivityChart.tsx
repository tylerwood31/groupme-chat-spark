
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

interface ActivityChartProps {
  data: Array<{
    day: string;
    messages: number;
  }>;
}

const ActivityChart: React.FC<ActivityChartProps> = ({ data }) => {
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
    if (active && payload && payload.length && !payload[0].payload.isMax) {
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
    
    // Only show label for bars
    return (
      <g>
        <text 
          x={x + width/2} 
          y={y - 10} 
          fill={payload.isMax ? "#8B5CF6" : "#6B7280"} 
          textAnchor="middle"
          className="text-xs font-medium"
        >
          {value}
        </text>
        {payload.isMax && (
          <g transform={`translate(${x + width/2 - 9}, ${y - 35})`}>
            <Flame className="h-4.5 w-4.5 text-amber-500" />
          </g>
        )}
      </g>
    );
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          Messages Sent per Day
          {busiestDay && (
            <Badge variant="outline" className="ml-auto text-xs font-normal">
              <Trophy className="h-3 w-3 mr-1 text-amber-500" />
              Busiest day: {busiestDay}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={enhancedData}
              margin={{ top: 30, right: 10, left: 0, bottom: 5 }}
              barGap={5}
              barCategoryGap="20%"
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 12 }}
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
                maxBarSize={60}
                fillOpacity={0.9}
              >
                <LabelList dataKey="messages" content={<CustomizedLabel />} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 text-center text-sm text-muted-foreground">
          <p className="italic">
            {busiestDay} was the group's busiest day. Let's hear it for {busiestDay.includes("Fri") ? "end-of-week" : "mid-week"} chaos! 📈
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityChart;
