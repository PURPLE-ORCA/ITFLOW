import React from 'react';
import ProjectLayout from '@/Layouts/ProjectLayout';
import Tasks from '@/Components/DevelopmentTasks';

const Development = ({ project, pendingTasks, finishedTasks }) => {
  const pendingTasksArray = Array.isArray(pendingTasks)
    ? pendingTasks
    : Object.values(pendingTasks || {});

  return (
    <ProjectLayout project={project} pendingTasks={pendingTasksArray} finishedTasks={finishedTasks}>
      <div className="relative min-h-screen p-5 text-white font-poppins">

        {/* Titre et sous-titre */}
        <div className="relative z-10 text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-300 to-blue-400 bg-clip-text text-transparent mb-6 relative z-10">
            Projets de Développement
          </h1>
          <p className="text-gray-300 mt-4 text-lg mb-4">
            Suivez votre progression et jalons de développement
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

export default Development;