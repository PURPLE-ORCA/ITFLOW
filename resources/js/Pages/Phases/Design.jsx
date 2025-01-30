import React from 'react';
import ProjectLayout from '@/Layouts/ProjectLayout';
import Tasks from '@/Components/Tasks';

const Design = ({ project, pendingTasks, finishedTasks }) => {
  const pendingTasksArray = Array.isArray(pendingTasks)
    ? pendingTasks
    : Object.values(pendingTasks || {});


  return (
    <ProjectLayout project={project} pendingTasks={pendingTasksArray} finishedTasks={finishedTasks}>
      <h2 className='text-4xl'>Design Phase</h2>
      <Tasks />
    </ProjectLayout>
  );
};

export default Design;