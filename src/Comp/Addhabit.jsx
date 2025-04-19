import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/Firebase";

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const AddHabit = ({ open, setOpen, user }) => {
  const [title, setTitle] = useState("");
  const [frequency, setFrequency] = useState([]);

  const toggleDay = (day) => {
    setFrequency((prev) =>
      prev.includes(day)
        ? prev.filter((d) => d !== day)
        : [...prev, day]
    );
  };

  const handleAddHabit = async () => {
    if (!title || frequency.length === 0) {
      alert("Please enter a title and select at least one day.");
      return;
    }

    try {
      await addDoc(collection(db, "habits", user.uid, "userHabits"), {
        title,
        frequency,
        createdAt: serverTimestamp(),
      });
      setTitle("");
      setFrequency([]);
      setOpen(false);
    } catch (error) {
      console.error("Error adding habit:", error);
      alert("Failed to add habit.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a New Habit</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Habit Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="flex flex-wrap gap-2">
            {weekdays.map((day) => (
              <label key={day} className="flex items-center gap-2">
                <Checkbox
                  checked={frequency.includes(day)}
                  onCheckedChange={() => toggleDay(day)}
                />
                <span>{day}</span>
              </label>
            ))}
          </div>
        </div>

        <DialogFooter className="pt-4">
          <Button onClick={handleAddHabit}>Submit</Button>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddHabit;
