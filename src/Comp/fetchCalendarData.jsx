import { collection, getDocs } from "firebase/firestore";
import { db } from "@/Firebase";

const fetchCalendarData = async (userId) => {
  const logsRef = collection(db, "logs", userId, "dailyLogs");
  const snapshot = await getDocs(logsRef);

  const data = [];

  snapshot.forEach((doc) => {
    const date = doc.id;
    const completed = doc.data().completedHabits || [];
    data.push({ date, count: completed.length });
  });

  return data;
};
export default fetchCalendarData;
