import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/Firebase";

export default function useHabits(user) {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setHabits([]);
      setLoading(false);
      return;
    }

    const fetch = async () => {
      try {
        const snap = await getDocs(collection(db, "habits", user.uid, "userHabits"));
        const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setHabits(docs);
      } catch (error) {
        console.error("Error fetching habits:", error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [user]);

  return { habits, loading };
}
