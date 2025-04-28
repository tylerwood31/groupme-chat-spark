
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts";

const Stats: React.FC = () => {
  // Mock data for demonstration
  const weeklyActivityData = [
    { name: "Mon", messages: 45, likes: 12 },
    { name: "Tue", messages: 58, likes: 20 },
    { name: "Wed", messages: 75, likes: 32 },
    { name: "Thu", messages: 62, likes: 25 },
    { name: "Fri", messages: 98, likes: 42 },
    { name: "Sat", messages: 120, likes: 58 },
    { name: "Sun", messages: 85, likes: 38 }
  ];

  const groupActivityData = [
    { name: "College Friends", activity: 95 },
    { name: "Work Team", activity: 65 },
    { name: "Family Chat", activity: 48 },
    { name: "Vacation Planning", activity: 30 }
  ];

  const hourlyActivityData = [
    { hour: "12am", count: 5 },
    { hour: "1am", count: 2 },
    { hour: "2am", count: 0 },
    { hour: "3am", count: 0 },
    { hour: "4am", count: 0 },
    { hour: "5am", count: 0 },
    { hour: "6am", count: 3 },
    { hour: "7am", count: 10 },
    { hour: "8am", count: 18 },
    { hour: "9am", count: 25 },
    { hour: "10am", count: 30 },
    { hour: "11am", count: 28 },
    { hour: "12pm", count: 45 },
    { hour: "1pm", count: 35 },
    { hour: "2pm", count: 28 },
    { hour: "3pm", count: 32 },
    { hour: "4pm", count: 38 },
    { hour: "5pm", count: 42 },
    { hour: "6pm", count: 58 },
    { hour: "7pm", count: 68 },
    { hour: "8pm", count: 72 },
    { hour: "9pm", count: 60 },
    { hour: "10pm", count: 42 },
    { hour: "11pm", count: 20 }
  ];

  return (
    <div className="container max-w-4xl px-4 py-8 animate-fade-in">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Analytics</h1>
        <p className="text-muted-foreground">Track your GroupMe activity over time</p>
      </header>
      
      <div className="space-y-8">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-6">Weekly Activity</h2>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={weeklyActivityData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="messages" name="Messages" fill="#00AFF0" />
                  <Bar dataKey="likes" name="Likes" fill="#6C5CE7" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-6">Group Activity</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={groupActivityData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip />
                    <Bar dataKey="activity" name="Activity Score" fill="#00AFF0" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-6">Active Hours</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={hourlyActivityData}
                    margin={{ top: 5, right: 30, left: 0, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="hour" angle={-45} textAnchor="end" height={50} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" name="Message Count" fill="#6C5CE7" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Stats;
