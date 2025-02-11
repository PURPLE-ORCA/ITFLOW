import React from 'react';
import ProjectLayout from '@/Layouts/ProjectLayout';
import Tasks from '@/Components/Tasks';

const Analysis = ({ project, pendingTasks, finishedTasks }) => {
  const pendingTasksArray = Array.isArray(pendingTasks)
    ? pendingTasks
    : Object.values(pendingTasks || {});


  return (
    <ProjectLayout project={project} pendingTasks={pendingTasksArray} finishedTasks={finishedTasks}>
    <div className="font-poppins  min-h-screen text-white p-5 h-auto w-auto relative">
      {/* Overlay en clip-path */}
      <div
          className="fixed bottom-0 right-0 w-full h-full bg-gradient-to-r from-[#FDCD65] to-[#FDC03E] transition-all duration-800 ease-in-out -z-10 pointer-events-none"
          style={{ clipPath: "polygon(2% 0, 52% 28%, 99% 0)" }}
        ></div>

{/* Titre et sous-titre */}
<div className="relative z-10 text-center mb-8">
  <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-blue-300 bg-clip-text text-transparent mb-4">
  Task Management
  </h1>
  <p className="text-gray-300 mt-4 text-lg mb-4">
  Track and organize your project tasks efficiently
  </p>
  <div className="w-28 h-1 bg-gradient-to-r from-yellow-400 to-blue-400 mx-auto rounded-full"></div>
</div>

{/* Section des tâches */}
<div className="relative z-10">
  <Tasks />
</div>

</div>
    </ProjectLayout>
  );
};

export default Analysis;