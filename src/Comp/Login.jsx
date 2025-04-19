import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/Firebase';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const Login = ({setUser}) => {
  const navigate=useNavigate()
  const [form, setForm] = useState({ email: '', password: '' });
  function formHandler(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function loginHandler() {
    if (!form.email || !form.password) {
      toast.error('Please fill in both fields');
      return;
    }

    signInWithEmailAndPassword(auth, form.email, form.password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(userCredential.user);
        toast.success('Login successful!');
        console.log('Logged in user:', userCredential.user);
        navigate('/dashboard')
      })
      .catch((error) => {
        toast.error(error.message);
        console.error('Login error:', error.message);
      });
  }

  return (
    <div className="flex flex-col gap-4 w-full max-w-sm mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle className="font-bold text-2xl">LOGIN</CardTitle>
          <CardDescription className="text-md">Make Your Habits easier with Habitiy</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-5">
            <Input
              type="email"
              name="email"
              placeholder="Email"
              onChange={formHandler}
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              onChange={formHandler}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-around">
          <Button onClick={loginHandler}>Log In</Button>
        </CardFooter>
      </Card>
    </div>
  );
};
export default Login;
