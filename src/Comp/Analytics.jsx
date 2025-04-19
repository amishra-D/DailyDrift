import React from 'react'
import Mysideb from './Mysideb'
import Header from './Header'
import "react-calendar-heatmap/dist/styles.css";
import Heatmap from './Heatmap';
import Barcharts from './Barcharts';
const Analytics = ({user}) => {
  return (
    <div className="flex min-h-screen w-full">
      <Mysideb user={user}></Mysideb>
      <div className="flex flex-col w-full px-6 py-8 gap-6">
    <Header type={"Analytics"}></Header>
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Heatmap user={user}></Heatmap>
      <Barcharts user={user} />
      </div>
    </div>
    </div>
  )
}

export default Analytics
