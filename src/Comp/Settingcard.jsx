import React, { useState } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
const Settingcard = ({user,title,description,opt1,opt2}) => {
    const[name,setname]=useState(user?.email || "")
    function usename(e){
      setname(e.value)
    }
  return (
<Card className='flex gap-10 w-[100%]'>
<CardHeader>
        <CardTitle className="font-bold text-xl">{title}</CardTitle>
        <CardDescription className="font-medium text-md">
{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 w-[50%]">
      <div className='flex justify-between'>
      <p className='font-semibold'>{opt1}</p>
      <Switch/>
      </div>
      <div className='flex justify-between'>
      <p className='font-semibold'>{opt2}</p>
      <Switch/>
      </div>
      </CardContent>
    </Card>
)
}

export default Settingcard
