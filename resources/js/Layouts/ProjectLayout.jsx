import React from 'react';
import Sidebar from '@/Components/Sidebar';
import ProjectProvider from '@/contexts/ProjectContext';

export default function ProjectLayout({ children, project, pendingTasks, finishedTasks }) {
  return (
    <ProjectProvider project={project} pendingTasks={pendingTasks} finishedTasks={finishedTasks}>
      <div className='flex flex-row bg-gradient-to-br from-blue-900 via-black to-blue-950 h-screen'>  
        <Sidebar />
        <main className='pl-20 p-6 w-full'>{children}</main>
      </div>
    </ProjectProvider>
  );
}