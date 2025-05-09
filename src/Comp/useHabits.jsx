import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/Firebase";

export default function useHabits(user) {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) {
      setHabits([]);
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(
      collection(db, "habits", user.uid, "userHabits"),
      (snapshot) => {
        const docs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        setHabits(docs);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching habits:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  return { habits, loading };
}
