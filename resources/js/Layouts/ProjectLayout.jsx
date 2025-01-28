import Sidebar from '@/Components/Sidebar'
import React, { Children } from 'react'

export default function  ProjectLayout({children}) {
  return (
    <>
    <div className='flex flex-row '>  
        <Sidebar />
        <main className='w-full'>{children}</main>
    </div>
    </>
  )
}