import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import HabitCheckbox from "./HabitCheckbox"

export default function HabitsCard({ title, habits, onToggle }) {
  return (
    <Card className="w-[300px] min-h-[200px]">
      <CardHeader>
        <CardTitle className="font-bold text-xl">{title}</CardTitle>
        <CardDescription className="font-medium text-md">
          Track your daily goals
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {habits.length > 0 ? (
          habits.map((habit) => (
            <HabitCheckbox key={habit.id} label={habit.title}id={habit.id} {...habit} onToggle={onToggle} />
          ))
        ) : (
          <p className="text-sm text-muted-foreground italic">No habits {title.substr(0,9)}</p>
        )}
      </CardContent>
    </Card>
  )
}
