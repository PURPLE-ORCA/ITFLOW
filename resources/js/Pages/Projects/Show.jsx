import ProjectLayout from '@/Layouts/ProjectLayout';
import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import ConfirmationModal from '@/Components/ConfirmationModal'; // Import the modal component

const Show = ({ project, auth }) => {
  const isProjectManager = project.owner.id === auth.user.id;

  // State for removing a user
  const [showUserConfirmationModal, setShowUserConfirmationModal] = useState(false);
  const [userToRemove, setUserToRemove] = useState(null);

  const handleRemoveUser = (user) => {
    setUserToRemove(user);
    setShowUserConfirmationModal(true);
  };

  const confirmRemoveUser = () => {
    if (userToRemove) {
      router.delete(route('projects.removeUser', { project: project.id, user: userToRemove.id }), {
        onSuccess: () => {
          setShowUserConfirmationModal(false);
          setUserToRemove(null);
        },
      });
    }
  };

  // State for deleting a task
  const [showTaskConfirmationModal, setShowTaskConfirmationModal] = useState(false);
  const [taskToRemove, setTaskToRemove] = useState(null);

  const handleRemoveTask = (task) => {
    setTaskToRemove(task);
    setShowTaskConfirmationModal(true);
  };

  const confirmRemoveTask = () => {
    if (taskToRemove) {
      router.delete(route('tasks.destroy', { task: taskToRemove.id }), {
        onSuccess: () => {
          setShowTaskConfirmationModal(false);
          setTaskToRemove(null);
        },
      });
    }
  };

  // State for deleting a project
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);

  return (
    <ProjectLayout>
      <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-800 to-blue-700 bg-clip-text text-transparent">
        Project: {project.title}
      </h1>
      <p className="text-white/90 mb-4">{project.description}</p>

      {/* Project Details Section */}
      <div className="mb-6 p-4 bg-white/20 backdrop-blur-md rounded-xl">
        <h2 className="text-2xl font-semibold mb-2 text-yellow-200">Project Details</h2>
        {isProjectManager && (
          <>
            <Link
              href={route('projects.edit', { project: project.id })}
              className="mt-4 inline-block px-4 py-2 bg-yellow-400 text-black rounded-md hover:bg-yellow-500 transition-colors duration-300"
            >
              Edit Project
            </Link>
            <button
              onClick={() => setShowDeleteConfirmationModal(true)}
              className="ml-2 text-red-500 hover:text-red-600"
            >
              <i className="bx bxs-trash"></i>
            </button>
          </>
        )}
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

      {/* Team Members Section */}
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

      {/* Tasks Section */}
      <div className="mb-6 p-4 bg-white/20 backdrop-blur-md rounded-xl">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-semibold mb-2 text-yellow-200">Tasks</h2>
          {isProjectManager && (
            <Link
              href={route('projects.tasks.create', { project: project.id })}
              className="mt-4 inline-block px-4 py-2 bg-yellow-400 text-black rounded-md hover:bg-yellow-500 transition-colors duration-300"
            >
              Create New Task
            </Link>
          )}
        </div>
        <ul>
          {project.tasks.map((task) => (
            <li key={task.id} className="mb-4 p-3 bg-white/30 rounded-xl shadow-md">
              <p className="font-bold text-lg text-blue-900">{task.title}</p>
              <p className="text-blue-800">{task.description}</p>
              <p><strong>Status:</strong> {task.status}</p>
              <p><strong>Phase:</strong> {task.phase}</p>
              <p>
                <strong>Assigned to:</strong>{' '}
                {task.assigned_user ? (
                  <span className="text-green-400">{task.assigned_user.name}</span>
                ) : (
                  <span className="text-red-400">Unassigned</span>
                )}
              </p>
              <p><strong>Due Date:</strong> {task.due_date}</p>
              {isProjectManager && (
                <>
                  <Link
                    href={route('tasks.edit', { task: task.id })}
                    className="mt-2 inline-block px-4 py-2 bg-yellow-400 text-black rounded-md hover:bg-yellow-500 transition-colors duration-300"
                  >
                    Edit Task
                  </Link>
                  <button
                    onClick={() => handleRemoveTask(task)}
                    className="ml-2 mt-2 inline-block px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300"
                  >
                    Delete Task
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Confirmation Modal for Removing a User */}
      <ConfirmationModal
        isOpen={showUserConfirmationModal}
        onClose={() => setShowUserConfirmationModal(false)}
        onConfirm={confirmRemoveUser}
        title="Confirm Removal"
        message={`Are you sure you want to remove ${userToRemove?.name} from the project?`}
      />

      {/* Confirmation Modal for Deleting a Task */}
      <ConfirmationModal
        isOpen={showTaskConfirmationModal}
        onClose={() => setShowTaskConfirmationModal(false)}
        onConfirm={confirmRemoveTask}
        title="Confirm Deletion"
        message={`Are you sure you want to delete the task "${taskToRemove?.title}"?`}
      />

      {/* Confirmation Modal for Deleting a Project */}
      <ConfirmationModal
        isOpen={showDeleteConfirmationModal}
        onClose={() => setShowDeleteConfirmationModal(false)}
        onConfirm={() => {
          router.delete(route('projects.destroy', { project: project.id }), {
            onSuccess: () => {
              setShowDeleteConfirmationModal(false);
            },
          });
        }}
        title="Confirm Deletion"
        message={`Are you sure you want to delete the project "${project.title}"?`}
      />
    </ProjectLayout>
  );
};

export default Show;