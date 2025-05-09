import React, { useState, useEffect } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import useHabits from "./useHabits";
import { Button } from '@/components/ui/button';

const Notifications = ({user}) => {
  Button
  const [habitReminders, setHabitReminders] = useState(() => {
    return localStorage.getItem("habitReminders") === "true";
  });
  const [dailySummary, setDailySummary] = useState(() => {
    return localStorage.getItem("dailySummary") === "true";
  });

  const { habits, loading } = useHabits(user);

  const handleHabitReminderToggle = async (checked) => {
    setHabitReminders(checked);
    localStorage.setItem("habitReminders", checked);

    if (checked) {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        new Notification("Habit Reminder Enabled", {
          body: "You will now receive habit reminders!",
        });
      } else {
        alert("Please allow notifications to enable habit reminders.");
      }
    }
  };

  const handleDailySummaryToggle = async (checked) => {
    setDailySummary(checked);
    localStorage.setItem("dailySummary", checked);

    if (checked) {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        new Notification("Daily Summary Enabled", {
          body: "You'll get a summary of today's habits!",
        });
      } else {
        alert("Please allow notifications to enable daily summaries.");
      }
    }
  };

  useEffect(() => {
    const checkAndNotify = async () => {
      if (!habitReminders || loading) return;

      const permission = await Notification.requestPermission();
      if (permission !== "granted") return;

      const now = new Date();
      const targetHour = 13; // 1 PM
      const targetMinute = 50;

      if (
        now.getHours() === targetHour &&
        now.getMinutes() === targetMinute
      ) {
        const incompleteHabits = habits.filter((habit) => {
          // You can add frequency/date checks here as needed
          return true; // assuming all are for today
        });

        if (incompleteHabits.length > 0) {
          new Notification("Incomplete Habits", {
            body: `You still have ${incompleteHabits.length} habit(s) to complete today.`,
          });
        }
      }
    };

    const interval = setInterval(checkAndNotify, 60000); // check every 1 minute
    return () => clearInterval(interval);
  }, [habitReminders, habits, loading]);

  return (
    <Card className='flex gap-10 w-[100%]'>
      <CardHeader>
        <CardTitle className="font-bold text-xl">Notifications</CardTitle>
        <CardDescription className="font-medium text-md">
          Reminders and Updates
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 md:w-[50%] w-full">
        <div className='flex justify-between'>
          <p className='font-semibold'>Enable habit reminders</p>
          <Switch className='z-50' checked={habitReminders} onCheckedChange={handleHabitReminderToggle} />
        </div>
        <div className='flex justify-between'>
          <p className='font-semibold'>Daily Summary Notifications</p>
          <Switch className='z-50' checked={dailySummary} onCheckedChange={handleDailySummaryToggle} />
        </div>
      </CardContent>
    </Card>

  );
};

export default Notifications;
