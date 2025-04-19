import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import app, { auth } from '@/Firebase'
import Login from './Login';
const Signup = () => {
  const navigate=useNavigate();
  function Tologin(){
    navigate('/login')
  }
  const [form,setform]=useState({email:"",password:"",confirmpassword:""})
  function formhandler(e) {
    setform((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }function Submithandler() {
    if (form.password !== form.confirmpassword) {
      toast.error("Password fields do not match");
      return;
    }
  
    createUserWithEmailAndPassword(auth, form.email, form.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User signed up:", user);
        toast.success("Signup successful!");
      })
      .catch((error) => {
        console.error("Error signing up:", error.message);
        toast.error(error.message);
      });
  }
  
  return (
    <div className="flex flex-col gap-4 w-full max-w-sm mx-auto mt-10">
      <Card>
  <CardHeader>
    <CardTitle className={"font-bold text-2xl"}>SIGN UP</CardTitle>
    <CardDescription>Make your days unregretful</CardDescription>
  </CardHeader>
  <CardContent>
<div className='flex flex-col gap-5'>
  <Input type="email" name="email" onChange={formhandler} placeholder="Email" />
      <Input type="password" name="password" onChange={formhandler} placeholder="Password" />
      <Input type="password"name="confirmpassword" onChange={formhandler} placeholder="Confirm Password" /></div>
        </CardContent>   
  <CardFooter className={"flex justify-around"}>
    
<Button type="submit" onClick={Submithandler}>Sign Up</Button> 
<Button onClick={Tologin}>Already Have an Account?</Button> 
</CardFooter>
</Card>

    </div>
  )
}

export default Signup
