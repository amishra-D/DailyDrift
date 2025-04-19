import { Checkbox } from "@/components/ui/checkbox"

export default function HabitCheckbox({ id, label, completed, onToggle }) {
  return (
    <div className=" flex items-center space-x-2 ">
      <Checkbox className='z-50'
        id={id}
        checked={completed}
        onCheckedChange={() => onToggle(id)}
      />
      <label
        htmlFor={id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 "
      >
        {label}
      </label>
    </div>
  )
}