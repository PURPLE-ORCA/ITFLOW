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
    {/* Background overlay */}
    <div
      id="back"
      className="fixed bottom-0 right-0 w-1/3 h-full bg-gradient-to-r from-[#FDCD65] to-[#FDC03E] transition-all duration-[800ms] ease-in-out -z-10"
      style={{ clipPath: "circle(50% at 91% 0)" }}
    ></div>

{/* Titre et sous-titre */}
<div className="relative z-10 text-center mb-8">
  <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-blue-300 bg-clip-text text-transparent mb-4">
  Design Tasks Management
  </h1>
  <p className="text-gray-300 mt-4 text-lg mb-4">
  Track and manage your design projects efficiently
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