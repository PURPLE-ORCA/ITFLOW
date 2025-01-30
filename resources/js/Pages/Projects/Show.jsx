import ProjectLayout from '@/Layouts/ProjectLayout';
import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import ConfirmationModal from '@/Components/ConfirmationModal';
import { UserCircleIcon, CalendarIcon, DocumentTextIcon, TrashIcon, PencilSquareIcon, PlusCircleIcon } from '@heroicons/react/24/outline';

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
  // Date formatting function
  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);

  return (
    <ProjectLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Project Header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-blue-600 bg-clip-text text-transparent">
            {project.title}
          </h1>
          <p className="text-gray-200 text-lg leading-relaxed">{project.description}</p>
        </div>

        {/* Project Metadata */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-yellow-300 flex items-center">
                <DocumentTextIcon className="w-6 h-6 mr-2" />
                Project Details
              </h2>
              {isProjectManager && (
                <div className="flex space-x-2">
                  <Link
                    href={route('projects.edit', { project: project.id })}
                    className="p-2 bg-yellow-400/90 hover:bg-yellow-500 rounded-lg transition-colors"
                  >
                    <PencilSquareIcon className="w-5 h-5 text-gray-900" />
                  </Link>
                  <button
                    onClick={() => setShowDeleteConfirmationModal(true)}
                    className="p-2 bg-red-500/90 hover:bg-red-600 rounded-lg transition-colors"
                  >
                    <TrashIcon className="w-5 h-5 text-white" />
                  </button>
                </div>
              )}
            </div>
            <div className="space-y-3 text-gray-200">
              <div className="flex items-center space-x-2">
                <UserCircleIcon className="w-5 h-5 text-yellow-400" />
                <span><strong>Owner:</strong> {project.owner.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-5 h-5 text-center">📋</span>
                <span><strong>Type:</strong> {project.type}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CalendarIcon className="w-5 h-5 text-yellow-400" />
                <span><strong>Deadline:</strong> {project.deadline ? formatDate(project.deadline) : 'No deadline'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-5 h-5 text-center">📌</span>
                <span>
                  <strong>Status:</strong> 
                  <span className="ml-2 px-3 py-1 text-sm bg-white/20 rounded-full">{project.status}</span>
                </span>
              </div>
            </div>
          </div>

          {/* File Attachment */}
          {project.file_path && (
            <div className="p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20">
              <h2 className="text-xl font-semibold text-yellow-300 mb-4 flex items-center">
                <DocumentTextIcon className="w-6 h-6 mr-2" />
                Project Specification
              </h2>
              <a
                href={route('project.file', { project: project.id })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600/90 hover:bg-blue-700 rounded-lg transition-colors text-white"
              >
                <span className="mr-2">📄</span>
                View PDF Document
              </a>
            </div>
          )}
        </div>

        {/* Team Members Section */}
        <div className="p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-yellow-300 flex items-center">
              <UserCircleIcon className="w-6 h-6 mr-2" />
              Team Members ({project.users.length})
            </h2>
            {isProjectManager && (
              <Link
                href={route('projects.addUserForm', { project: project.id })}
                className="flex items-center px-4 py-2 bg-yellow-400/90 hover:bg-yellow-500 rounded-lg transition-colors text-gray-900"
              >
                <PlusCircleIcon className="w-5 h-5 mr-2" />
                Add Member
              </Link>
            )}
          </div>
          <ul className="space-y-3">
            {project.users.map((user) => (
              <li 
                key={user.id}
                className="group p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors flex items-center justify-between"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-200 font-medium">{user.name}</span>
                    <span className="px-2 py-1 text-xs font-medium bg-yellow-400/20 text-yellow-300 rounded-full">
                      {user.pivot.role}
                    </span>
                  </div>
                  <div className="text-sm text-gray-400 flex items-center space-x-2">
                    <span>🆔 {user.email}</span>
                  </div>
                </div>
                {isProjectManager && (
                  <button
                    onClick={() => handleRemoveUser(user)}
                    className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-red-400 hover:text-red-300"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Tasks Section */}
        <div className="p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-yellow-300 flex items-center">
              📋 Tasks ({project.tasks.length})
            </h2>
            {isProjectManager && (
              <Link
                href={route('projects.tasks.create', { project: project.id })}
                className="flex items-center px-4 py-2 bg-yellow-400/90 hover:bg-yellow-500 rounded-lg transition-colors text-gray-900"
              >
                <PlusCircleIcon className="w-5 h-5 mr-2" />
                New Task
              </Link>
            )}
          </div>
          <ul className="space-y-4">
            {project.tasks.map((task) => (
              <li 
                key={task.id}
                className="p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-gray-200">{task.title}</h3>
                    {task.description && (
                      <p className="text-gray-400 text-sm">{task.description}</p>
                    )}
                    <div className="flex flex-wrap gap-3 text-sm">
                      <div className="flex items-center space-x-1 bg-blue-500/20 px-2 py-1 rounded-full">
                        <span>📌</span>
                        <span className="text-blue-300">{task.status}</span>
                      </div>
                      <div className="flex items-center space-x-1 bg-purple-500/20 px-2 py-1 rounded-full">
                        <span>📂</span>
                        <span className="text-purple-300">{task.phase}</span>
                      </div>
                      <div className="flex items-center space-x-1 bg-green-500/20 px-2 py-1 rounded-full">
                        <UserCircleIcon className="w-4 h-4 text-green-300" />
                        <span className="text-green-300">
                          {task.assigned_user?.name || 'Unassigned'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 bg-yellow-500/20 px-2 py-1 rounded-full">
                        <CalendarIcon className="w-4 h-4 text-yellow-300" />
                        <span className="text-yellow-300">
                          {task.due_date ? formatDate(task.due_date) : 'No deadline'}
                        </span>
                      </div>
                    </div>
                  </div>
                  {isProjectManager && (
                    <div className="flex space-x-2">
                      <Link
                        href={route('tasks.edit', { task: task.id })}
                        className="p-2 hover:bg-yellow-500/20 rounded-lg transition-colors text-yellow-400"
                      >
                        <PencilSquareIcon className="w-5 h-5" />
                      </Link>
                      <button
                        onClick={() => handleRemoveTask(task)}
                        className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-red-400"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
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
      </div>
    </ProjectLayout>
  );
};

export default Show;