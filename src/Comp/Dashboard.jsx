import Mysideb from "./Mysideb";
import StatCard from "@/Comp/StatCard";
import HabitsCard from "@/Comp/HabitsCard";
import Allhabits from "./Allhabits";
import Loader from "./Loader";
import Header from "./Header";

import { Flame, Trophy, Check } from "lucide-react";
import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  collection,
  getDocs,
} from "firebase/firestore";
import { Progress } from "@/components/ui/progress";
import useHabits from "./useHabits";
import { db } from "@/Firebase";
import { format, subDays } from "date-fns";

export default function Dashboard({ user }) {
  const { habits, loading } = useHabits(user);
  const [completedIds, setCompletedIds] = useState([]);
  const [streak, setStreak] = useState(0);

  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const todayFormatted = format(new Date(), "yyyy-MM-dd");
  const logRef = user ? doc(db, "logs", user.uid, "dailyLogs", today) : null;

  useEffect(() => {
    const fetchLogs = async () => {
      if (!logRef) return;
      const snap = await getDoc(logRef);
      if (snap.exists()) {
        const habitsData = snap.data().completedHabits || [];
        const ids = habitsData.map((h) => h.id);
        setCompletedIds(ids);
      }
    };
    fetchLogs();
  }, [logRef]);

  const toggleHabit = async (id) => {
    if (!logRef || completedIds.includes(id)) return;

    const newEntry = {
      id,
      completedAt: todayFormatted,
    };

    const snap = await getDoc(logRef);
    if (snap.exists()) {
      await updateDoc(logRef, {
        completedHabits: arrayUnion(newEntry),
      });
    } else {
      await setDoc(logRef, {
        completedHabits: [newEntry],
      });
    }

    setCompletedIds((prev) => [...prev, id]);
  };

  const updateStreak = async () => {
    const logsCollection = collection(db, "logs", user.uid, "dailyLogs");
    const snapshot = await getDocs(logsCollection);

    const allDates = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const entries = data.completedHabits || [];

      if (entries.length > 0) {
        const first = entries[0];
        if (first.completedAt) {
          allDates.push(first.completedAt);
        }
      }
    });

    const uniqueDates = [...new Set(allDates)].sort((a, b) => new Date(b) - new Date(a));
    let streakCount = 0;

    for (let i = 0; i < uniqueDates.length; i++) {
      const expectedDate = format(subDays(new Date(), i), "yyyy-MM-dd");
      if (uniqueDates.includes(expectedDate)) {
        streakCount += 1;
      } else {
        break;
      }
    }

    const streakRef = doc(db, "users", user.uid, "meta", "streak");
    await setDoc(streakRef, {
      currentStreak: streakCount,
    });

    setStreak(streakCount);
  };

  useEffect(() => {
    const fetchStreak = async () => {
      const streakRef = doc(db, "users", user.uid, "meta", "streak");
      const snap = await getDoc(streakRef);
      if (snap.exists()) {
        setStreak(snap.data().currentStreak || 0);
      }
    };
    fetchStreak();
  }, [user]);

  const todaysHabits = habits.filter((habit) =>
    habit.frequency?.includes(today)
  );
  const completed = todaysHabits.filter((h) => completedIds.includes(h.id));
  const incomplete = todaysHabits.filter((h) => !completedIds.includes(h.id));

  useEffect(() => {
    if (todaysHabits.length > 0 && completed.length === todaysHabits.length) {
      updateStreak();
    }
  }, [completed, todaysHabits]);

  const completionRate = todaysHabits.length
    ? (completed.length / todaysHabits.length) * 100
    : 0;

  const getEncouragement = (value) => {
    if (value === 0) return "Let's get started 🚀";
    if (value < 30) return "You're warming up 🔥";
    if (value < 60) return "Nice progress 💪";
    if (value < 90) return "Keep it up 🌟";
    return "Amazing work! 🎯";
  };

  const getProgressColor = (value) => {
    if (value < 30) return "bg-red-500";
    if (value < 60) return "bg-yellow-500";
    if (value < 90) return "bg-blue-500";
    return "bg-green-500";
  };

  const barColor = getProgressColor(completionRate);

  if (!user || loading) return <Loader />;

  return (
    <div className="flex min-h-screen w-full">
      <Mysideb user={user} />

      <div className="flex flex-col w-full px-6 py-8 gap-6">
        <Header type={"Dashboard"} />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Habits Completed" value={completed.length} icon={Trophy} />
          <StatCard title="Current Streak" value={`${streak} days`} icon={Flame} />
          <StatCard title="Completion Rate" value={`${completionRate.toFixed(0)}%`} icon={Check} />
          <Allhabits habits={habits} user={user} />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <HabitsCard
            title="Incomplete Habits"
            habits={incomplete}
            onToggle={toggleHabit}
            variant="destructive"
          />
          <HabitsCard
            title="Completed Habits"
            habits={completed}
            onToggle={toggleHabit}
            variant="success"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-sm text-muted-foreground">
              {getEncouragement(completionRate)}
            </span>
          </div>
          <Progress value={completionRate} className={`h-2 ${barColor}`} />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>
              {completed.length} of {todaysHabits.length} tasks
            </span>
            <span>{completionRate.toFixed(0)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
