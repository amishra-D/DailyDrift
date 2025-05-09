import React, { useState } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { useTheme } from "@/components/theme-provider"
import { Switch } from "@/components/ui/switch"
const Preferences = () => {
    const {setTheme}=useTheme()
    const[dark,setdark]=useState(false)
    function changemode(){
dark?setTheme("dark"):setTheme("light")
setdark(!dark)
    }
  return (
<Card className='flex gap-10 w-[100%]'>
<CardHeader>
        <CardTitle className="font-bold text-xl">Preferences</CardTitle>
        <CardDescription className="font-medium text-md">
Customize your preferences</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 md:w-[50%] w-full">
      <div className='flex justify-between'>
      <p className='font-semibold'>Dark Mode</p>
      <Switch className='z-50' checked={dark} onCheckedChange={changemode}/>
      </div>
      <div className='flex justify-between'>
      <p className='font-semibold'>Use 24-hour Clock</p>
      <Switch className='z-50'/>
      </div>
      </CardContent>
    </Card>
)
}

export default Preferences
