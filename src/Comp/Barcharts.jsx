import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/Firebase"; // Your Firebase configuration
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, Tooltip, ResponsiveContainer } from "recharts";

function BarChartComponent({ user }) {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trendPercentage, setTrendPercentage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const logsRef = collection(db, "logs");
        const q = query(logsRef, where("userId", "==", user?.uid)); // Use user.uid

        const snapshot = await getDocs(q);
        const monthlyData = {};
        let totalHabits = 0;
        let previousMonthHabits = 0;

        snapshot.forEach((doc) => {
          const timestamp = doc.data().date;
          const date = timestamp.toDate(); // Convert Firestore timestamp to Date object
          const monthKey = date.toLocaleString("default", { month: "long" });
          const year = date.getFullYear();

          if (year === 2024) {  // Filter for current year
            if (!monthlyData[monthKey]) monthlyData[monthKey] = 0;

            const completedHabits = doc.data()?.completedHabits || []; // Get completed habits
            monthlyData[monthKey] += completedHabits.length; // Add completed habits count to the month
            totalHabits += completedHabits.length;

            // For trend calculation (comparing this month to the previous month)
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth();
            if (date.getMonth() === currentMonth - 1) {
              previousMonthHabits += completedHabits.length;
            }
          }
        });

        // Calculate trend percentage
        const currentMonthHabits = monthlyData[new Date().toLocaleString("default", { month: "long" })] || 0;
        const trend = previousMonthHabits > 0 
          ? ((currentMonthHabits - previousMonthHabits) / previousMonthHabits * 100).toFixed(1)
          : 0;
        setTrendPercentage(trend);

        // Generate data for all months, even if no data exists
        const months = ["January", "February", "March", "April", "May", "June", 
                        "July", "August", "September", "October", "November", "December"];
        const currentYear = new Date().getFullYear();
        const currentMonthIndex = new Date().getMonth();
        
        // Only show months up to current month
        const monthsToShow = months.slice(0, currentMonthIndex + 1);
        
        const sortedData = monthsToShow.map((month) => ({
          month,
          habits: monthlyData[month] || 0,
        }));

        setChartData(sortedData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load habit data");
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchData();
  }, [user]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Monthly Habit Activity</CardTitle>
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
          <CardTitle>Monthly Habit Activity</CardTitle>
          <CardDescription>{error}</CardDescription>
        </CardHeader>
        <CardContent className="text-destructive">
          {error}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Habit Activity</CardTitle>
        <CardDescription>
          {chartData.length > 0 
            ? `${chartData[0].month} - ${chartData[chartData.length - 1].month} ${new Date().getFullYear()}`
            : "No data available"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <Tooltip formatter={(value) => [`${value} habits`, "Completed"]} labelFormatter={(label) => `Month: ${label}`} />
              <Bar dataKey="habits" fill="#8884d8" radius={[4, 4, 0, 0]}>
                <LabelList dataKey="habits" position="top" formatter={(value) => value > 0 ? value : ''} fill="#000" fontSize={12} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {trendPercentage !== 0 && (
          <div className="flex gap-2 font-medium leading-none">
            {trendPercentage > 0 ? (
              <>
                Trending up by {trendPercentage}% this month <TrendingUp className="h-4 w-4 text-green-500" />
              </>
            ) : (
              <>
                Trending down by {Math.abs(trendPercentage)}% this month <TrendingUp className="h-4 w-4 text-red-500 transform rotate-180" />
              </>
            )}
          </div>
        )}
        <div className="leading-none text-muted-foreground">
          Showing total completed habits for {chartData.length} months
        </div>
      </CardFooter>
    </Card>
  );
}

export default BarChartComponent;
