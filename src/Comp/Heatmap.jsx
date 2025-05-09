import { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { db } from "@/Firebase";
import {
  collection,
  getDocs,
} from "firebase/firestore";
import "./heatmap-styles.css";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

const Heatmap = ({ user }) => {
  const [calendarData, setCalendarData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const loadData = async () => {
      setIsLoading(true);
      try {
        const logsRef = collection(db, "logs", user.uid, "dailyLogs");
        const snapshot = await getDocs(logsRef);

        const habitMap = new Map();

        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          const habits = data.completedHabits || [];

          habits.forEach((habit) => {
            const date = habit.completedAt;
            if (!habitMap.has(date)) habitMap.set(date, 0);
            habitMap.set(date, habitMap.get(date) + 1);
          });
        });

        const transformed = Array.from(habitMap.entries()).map(([date, count]) => ({
          date,
          count,
        }));

        setCalendarData(transformed);
      } catch (error) {
        console.error("Failed to fetch calendar data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [user]);

  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 3);
  const endDate = new Date();

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="text-xl">Habit Completion Heatmap</CardTitle>
        <CardDescription>
          Track your daily habit completion over the last 3 months
        </CardDescription>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <Skeleton className="h-[300px] w-full" />
        ) : (
          <div className="overflow-x-auto pb-2">
            <CalendarHeatmap
              startDate={startDate}
              endDate={endDate}
              values={calendarData}
              classForValue={(value) => {
                if (!value || value.count === 0) return "color-empty";
                if (value.count < 2) return "color-scale-1";
                if (value.count < 4) return "color-scale-2";
                return "color-scale-3";
              }}
              showWeekdayLabels
              weekdayLabels={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
              monthLabels={[
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ]}
              transformMonthLabels={(months) =>
                months.map((month) => ({
                  ...month,
                  y: month.y + 5,
                }))
              }
              transformWeekdayLabels={(weekdays) =>
                weekdays.map((weekday) => ({
                  ...weekday,
                  x: weekday.x + 5,
                }))
              }
              gutterSize={4}
              horizontal={true}
            />
          </div>
        )}

        <div className="flex items-center justify-center gap-4 mt-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded-sm color-scale-1" />
            <div className="w-4 h-4 rounded-sm color-scale-2" />
            <div className="w-4 h-4 rounded-sm color-scale-3" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Heatmap;