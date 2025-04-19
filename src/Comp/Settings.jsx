import React from 'react'
import Header from './Header'
import Mysideb from './Mysideb'
import Accountinfo from './Accountinfo'
import Settingcard from './Settingcard'

const Settings = ({user}) => {
  return (
    <div className='w-full min-h-screen flex'>
      <Mysideb user={user}></Mysideb>
      <div className="flex flex-col w-full px-6 py-8 gap-6">
      <Header type={"Settings"}></Header>
      <Accountinfo user={user}></Accountinfo>
      <Settingcard user={user} title={"Notifications"} description={"Reminders and Updates"} opt1={"Enable habit reminders"} opt2={"Daily Summary Habits"}></Settingcard>
      <Settingcard user={user} title={"Preferences"} description={"Customize your Preferences"} opt1={"Dark Mode"} opt2={"Use 24-hour clock"}></Settingcard>
      </div>
    </div>
  )
}

export default Settings
