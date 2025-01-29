import ProjectLayout from '@/Layouts/ProjectLayout';
import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import ConfirmationModal from '@/Components/ConfirmationModal'; // Import the modal component

const Show = ({ project, auth }) => {
  const isProjectManager = project.owner.id === auth.user.id;
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [userToRemove, setUserToRemove] = useState(null);

  const handleRemoveUser = (user) => {
    setUserToRemove(user);
    setShowConfirmationModal(true);
  };

  const confirmRemoveUser = () => {
    if (userToRemove) {
      router.delete(route('projects.removeUser', { project: project.id, user: userToRemove.id }), {
        onSuccess: () => {
          setShowConfirmationModal(false);
          setUserToRemove(null);
        },
      });
    }
  };

  return (
    <ProjectLayout>
      <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-800 to-blue-700 bg-clip-text text-transparent">
        Project: {project.title}
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
        <div className='flex justify-between items-center mb-2'>
          <h2 className="text-2xl font-semibold mb-2 text-yellow-200">Team Members</h2>
          {isProjectManager && (
            <Link
            href={route('projects.addUserForm', { project: project.id })}
            className="mt-4 inline-block px-4 py-2 bg-yellow-400 text-black rounded-md hover:bg-yellow-500 transition-colors duration-300"
            >
              Add Team Member
            </Link>
          )}
        </div>
        <ul>
          {project.users.map((user) => (
            <li key={user.id} className="mb-2 border-b border-white/30 pb-1 flex justify-between items-center">
              <span>
                {user.name} - <span className="text-sm text-yellow-100">{user.pivot.role}</span>
              </span>
              {isProjectManager && (
                <button
                  onClick={() => handleRemoveUser(user)}
                  className="text-red-500 hover:text-red-600"
                >
                  <i className="bx bxs-trash"></i>
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6 p-4 bg-white/20 backdrop-blur-md rounded-xl">
        <h2 className="text-2xl font-semibold mb-2 text-yellow-200">Tasks</h2>
        <ul>
          {project.tasks.map((task) => (
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

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        onConfirm={confirmRemoveUser}
        title="Confirm Removal"
        message={`Are you sure you want to remove ${userToRemove?.name} from the project?`}
      />
    </ProjectLayout>
  );
};

export default Show;