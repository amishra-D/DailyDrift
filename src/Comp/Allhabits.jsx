import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { deleteDoc, doc } from "firebase/firestore";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { toast } from 'sonner';
import { Trash2 } from "lucide-react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/Firebase";
import { Checkbox } from "@/components/ui/checkbox";

const Allhabits = ({ habits, user }) => {
 const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [frequency, setFrequency] = useState([]);

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this habit?")) {
      try {
        const habitRef = doc(db, "habits", user.uid, "userHabits", id);
        await deleteDoc(habitRef);
        toast.success("Habit Deleted");
      } catch (error) {
        console.error("Error deleting habit:", error);
        toast.error("Failed to delete habit.");
      }
    }
  };
  const handleAddHabit = async () => {
    if (title && frequency.length && user?.uid) {
      try {
        await addDoc(collection(db, "habits", user.uid, "userHabits"), {
          title,
          frequency,
          createdAt: new Date(),
        });
        setOpen(false);
        setTitle("");
        setFrequency([]);
      } catch (error) {
        console.error("Error adding habit:", error);
      }
    } else {
      alert("Please fill in the title and select at least one day.");
    }
  };

  return (
    <Card className="w-[300px] min-h-[200px] flex flex-col justify-between">
      <CardHeader>
        <CardTitle className="font-bold text-xl">All Habits</CardTitle>
        <CardDescription>Track your daily goals</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        {habits.length > 0 ? (
          habits.map((habit) => (
            <div
              key={habit.id}
              className="flex justify-between items-center px-2 py-1 border rounded-md"
            >
              <span className="truncate">{habit.title}</span>
              <Button className='z-50' onClick={() => handleDelete(habit.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No habits yet.</p>
        )}
      </CardContent>

      <CardFooter className="flex justify-center">
        <Button className="z-50" onClick={() => setOpen(true)}>
          Add New
        </Button>
      </CardFooter>

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

            <div className="flex flex-col gap-2">
              <label className="font-medium">Select Frequency (Days)</label>
              {daysOfWeek.map((day) => (
                <div key={day} className="flex items-center space-x-2">
                  <Checkbox
                    id={day}
                    checked={frequency.includes(day)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFrequency((prev) => [...prev, day]);
                      } else {
                        setFrequency((prev) => prev.filter((d) => d !== day));
                      }
                    }}
                  />
                  <label htmlFor={day} className="text-sm font-medium">
                    {day}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddHabit}>Submit</Button>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default Allhabits;
