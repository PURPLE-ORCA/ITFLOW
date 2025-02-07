import React from 'react';
import ProjectLayout from '@/Layouts/ProjectLayout';
import Tasks from '@/Components/TestingTasks';

const Tesing = ({ project, pendingTasks, finishedTasks }) => {
  const pendingTasksArray = Array.isArray(pendingTasks)
    ? pendingTasks
    : Object.values(pendingTasks || {});


  return (
    <ProjectLayout project={project} pendingTasks={pendingTasksArray} finishedTasks={finishedTasks}>
      <div className="relative min-h-screen p-5 text-white font-poppins">

{/* Arrière-plan avec les couleurs demandées */}
<div
  className="absolute inset-0 -z-10 background-pattern"
  style={{
    background: `linear-gradient(to bottom right, #1e3a8a, #000000, #1e40af)`,
    backgroundSize: 'cover',
    backgroundBlendMode: 'overlay',
  }}
></div>

{/* Overlay en clip-path (modifié) */}
<div

  className="fixed bottom-0 right-0 w-1/3 h-full bg-gradient-to-r from-[#FDCD65] to-[#FDC03E] transition-all duration-800 ease-in-out -z-10 pointer-events-none"
  style={{ clipPath: "polygon(100% 0, 100% 0%, 100% 100%, 0 100%" }}
></div>
{/* Titre et sous-titre */}
<div className="relative z-10 text-center mb-8">
  <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-blue-300 bg-clip-text text-transparent mb-4">
  Test Management  </h1>
  <p className="text-gray-300 mt-4 text-lg mb-4">
  Track and manage your test cases efficiently
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

export default Tesing;