import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function logHabitCompletion(userId, habitId) {
  const today = new Date().toISOString().split("T")[0];
  const logRef = doc(db, "logs", userId, today);

  const logSnap = await getDoc(logRef);

  if (logSnap.exists()) {
    await updateDoc(logRef, {
      completedHabits: arrayUnion(habitId),
    });
  } else {
    await setDoc(logRef, {
      completedHabits: [habitId],
    });
  }
}
