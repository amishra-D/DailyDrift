import { BarChart3 } from 'lucide-react'
import React from 'react'

const Header = ({type}) => {
  return (
    <div className="flex items-center justify-between">
    <h1 className="text-3xl font-bold tracking-tight">{type}</h1>
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <BarChart3 className="h-4 w-4" />
      <span>Last updated: {new Date().toLocaleDateString()}</span>
    </div>
  </div>
  )
}

export default Header
