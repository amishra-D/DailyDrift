import React, { useState } from 'react'
import Header from './Header'
import Mysideb from './Mysideb'
import Accountinfo from './Accountinfo'
import Preferences from './Preferences'
import Notifications from './Notifications'
import { Button } from '@/components/ui/button'
import { signOut, getAuth } from 'firebase/auth'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter
} from '@/components/ui/drawer'

const Settings = ({ user }) => {
  const navigate = useNavigate()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  function logout() {
    const auth = getAuth()
    signOut(auth)
      .then(() => {
        toast.success('Log out successful')
        navigate('/')
      })
      .catch((error) => {
        toast.error(error.message || 'Logout failed')
      })
  }

  async function deleteAccount() {
    const auth = getAuth()
    try {
      await auth.currentUser.delete()
      toast.success('Account deleted successfully')
      navigate('/')
    } catch (error) {
      toast.error(error.message || 'Error deleting account')
      logout()
    }
  }

  return (
    <div className='w-full min-h-screen flex'>
      <Mysideb user={user} />
      <div className="flex flex-col w-full px-6 py-8 gap-6">
        <Header type={"Settings"} />
        <Accountinfo user={user} />
        <Notifications user={user} />
        <Preferences />

        <div className='flex gap-6'>
          <Button onClick={logout}>Log Out</Button>

          {/* Delete Account Button with Confirmation Drawer */}
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger asChild>
              <Button variant="destructive">Delete Account</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Delete Account</DrawerTitle>
                <DrawerDescription>
                  Are you sure you want to delete your account? This action cannot be undone.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <Button variant="destructive" onClick={deleteAccount}>
                  Yes, Delete
                </Button>
                <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>
                  Cancel
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  )
}

export default Settings
