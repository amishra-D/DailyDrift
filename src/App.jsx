import React, { useEffect, useState } from 'react'
import { Button } from './components/ui/button'
import Login from './Comp/Login'
import { ThemeProvider } from './components/theme-provider'
import { ModeToggle } from './components/mode-toggle'
import Signup from './Comp/Signup'
import { Toaster } from 'sonner';
import { Routes, Route} from 'react-router-dom';
import Homep from './Comp/Homep'
import Dashboard from './Comp/Dashboard'
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/Firebase"
import Analytics from './Comp/Analytics'
import Settings from './Comp/Settings'


const App = () => {

  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })

    return () => unsubscribe()
  }, [])

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Toaster position="top-right" />
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full">
      
    <div className="fixed bottom-4 left-4 z-1">
          <ModeToggle />
        </div>
        <Routes>
   <Route path="/" element={<Homep user={user}  />} />
  <Route path="/login" element={<Login setUser={setUser} />} />
  <Route path="/signup" element={<Signup />} />
<Route path="/dashboard" element={<Dashboard user={user} />} />
<Route path="/analytics" element={<Analytics user={user} />} />
<Route path="/settings" element={<Settings user={user} />} />
</Routes>
   </div>
   
</ThemeProvider>  )
}

export default App
