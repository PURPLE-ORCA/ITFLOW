import Sidebar from '@/Components/Sidebar'
import React, { Children } from 'react'

export default function  ProjectLayout({children }) {
  return (
    <>
    <div className='flex flex-row bg-gradient-to-br from-blue-900 via-black to-blue-950 h-screen'>  
        <Sidebar />
        <main className='pl-20 p-6 w-full'>{children}</main>
    </div>
    </>
  )
}