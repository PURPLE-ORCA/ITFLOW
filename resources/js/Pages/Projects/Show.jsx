import ProjectLayout from '@/Layouts/ProjectLayout';
import React from 'react';

const Show = ({ project, phases }) => {
  return (
    <ProjectLayout >
      <div className="pl-20 p-6 bg-gradient-to-br from-blue-900 to-yellow-700 shadow-lg rounded-2xl text-white">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-300 to-blue-200 bg-clip-text text-transparent">
          {project.title}
        </h1>
        <p className="text-white/90 mb-4">{project.description}</p>

        <div className="mb-6 p-4 bg-white/20 backdrop-blur-md rounded-xl">
          <h2 className="text-2xl font-semibold mb-2 text-yellow-200">Project Details</h2>
          <p><strong>Owner:</strong> {project.owner.name}</p>
          <p><strong>Type:</strong> {project.type}</p>
          <p><strong>Deadline:</strong> {project.deadline}</p>
          <p><strong>Status:</strong> {project.status}</p>
          {project.file_path && (
      <div className="mb-6 p-4 bg-white/20 backdrop-blur-md rounded-xl">
          <h2 className="text-2xl font-semibold mb-2 text-yellow-200">Project Specification</h2>
          <a
              href={route('project.file', { project: project.id })}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline"
          >
              View PDF
          </a>
      </div>
  )}
        </div>

        <div className="mb-6 p-4 bg-white/20 backdrop-blur-md rounded-xl">
          <h2 className="text-2xl font-semibold mb-2 text-yellow-200">Team Members</h2>
          <ul>
            {project.users.map(user => (
              <li key={user.id} className="mb-2 border-b border-white/30 pb-1">
                {user.name} - <span className="text-sm text-yellow-100">{user.pivot.role}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6 p-4 bg-white/20 backdrop-blur-md rounded-xl">
          <h2 className="text-2xl font-semibold mb-2 text-yellow-200">Tasks</h2>
          <ul>
            {project.tasks.map(task => (
              <li key={task.id} className="mb-4 p-3 bg-white/30 rounded-xl shadow-md">
                <p className="font-bold text-lg text-blue-900">{task.title}</p>
                <p className="text-blue-800">{task.description}</p>
                <p><strong>Status:</strong> {task.status}</p>
                <p><strong>Phase:</strong> {task.phase}</p>
                <p><strong>Assigned to:</strong> {task.assigned_to}</p>
                <p><strong>Due Date:</strong> {task.due_date}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 bg-white/20 backdrop-blur-md rounded-xl">
          <h2 className="text-2xl font-semibold mb-2 text-yellow-200">Phases</h2>
          <ul>
            {phases.map((phase, index) => (
              <li key={index} className="mb-2 text-blue-900 font-medium">
                {phase}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ProjectLayout>
  );
};

export default Show;
