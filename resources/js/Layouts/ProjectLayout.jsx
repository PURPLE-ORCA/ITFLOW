import React from 'react';
import Sidebar from '@/Components/Sidebar';
import ProjectProvider from '@/contexts/ProjectContext';

export default function ProjectLayout({ children, project, pendingTasks, finishedTasks }) {
  return (
    <ProjectProvider project={project} pendingTasks={pendingTasks} finishedTasks={finishedTasks}>
      <div >
        <Sidebar />
        <main className='pl-20 p-6 w-full'>{children}</main>
      </div>
    </ProjectProvider>
  );
}