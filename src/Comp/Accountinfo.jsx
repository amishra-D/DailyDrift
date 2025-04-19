import React, { useState } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
const Accountinfo = ({user}) => {
    const[name,setname]=useState(user?.email || "")
    function usename(e){
      setname(e.value)
    }
  return (
<Card className='flex gap-10 w-[100%]'>
<CardHeader>
        <CardTitle className="font-bold text-xl">Account Information</CardTitle>
        <CardDescription className="font-medium text-md">
Manage your personal details
</CardDescription>
      </CardHeader>
      <CardContent className="flex gap-4 w-[50%]">
      <Input className='z-50'type="text" onChange={usename} value={name} placeholder="Username"></Input>
      <Button>Save</Button>
      </CardContent>
    </Card>
)
}

export default Accountinfo
