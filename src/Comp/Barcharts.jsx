import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/Firebase";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  ResponsiveContainer,
  LabelList,
  Tooltip,
} from "recharts";

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function BarChartComponent({ user }) {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeeklyLogs = async () => {
      try {
        setLoading(true);
        const logsRef = collection(db, `logs/${user.uid}/dailyLogs`);
        const snapshot = await getDocs(logsRef);

        const weeklyData = {};

        snapshot.forEach((doc) => {
          const weekday = doc.id;
          const completedHabits = doc.data()?.completedHabits || [];
          weeklyData[weekday] = completedHabits.length;
        });

        const formattedData = weekDays.map((day) => ({
          day,
          habits: weeklyData[day] || 0,
        }));

        setChartData(formattedData);
      } catch (err) {
        console.error("Error fetching weekly logs:", err);
        setError("Failed to load weekly habit data");
      } finally {
        setLoading(false);
      }
    };

    if (user?.uid) {
      fetchWeeklyLogs();
    }
  }, [user]);

  const renderCustomizedLabel = (props) => {
    const { x, y, width, value } = props;
    if (value === 0) return null;

    return (
      <g>
        <rect x={x} y={y - 20} width={width} height={20} fill="#6366f1" rx={4} />
        <text
          x={x + width / 2}
          y={y - 10}
          fill="#fff"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={12}
          fontWeight={500}
        >
          {value}
        </text>
      </g>
    );
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Weekly Habit Activity</CardTitle>
          <CardDescription>Loading your habit data...</CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Weekly Habit Activity</CardTitle>
          <CardDescription>{error}</CardDescription>
        </CardHeader>
        <CardContent className="text-destructive">{error}</CardContent>
      </Card>
    );
  }

  const total = chartData.reduce((sum, item) => sum + item.habits, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-bold text-xl">Weekly Habit Activity</CardTitle>
        <CardDescription>Habits completed each day this week</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          {total === 0 ? (
            <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
              No habits completed this week
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
              >
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <Tooltip
                  content={({ payload, active }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className=" p-2 border rounded shadow text-sm font-medium ">
                          {payload[0].value} completed habits
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="habits" fill="#8884d8" radius={[4, 4, 0, 0]}>
                  <LabelList dataKey="habits" content={renderCustomizedLabel} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        Total completed habits for the week
      </CardFooter>
    </Card>
  );
}

export default BarChartComponent;
