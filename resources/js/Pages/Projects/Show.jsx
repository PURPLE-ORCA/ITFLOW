import ProjectLayout from '@/Layouts/ProjectLayout';
import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import ConfirmationModal from '@/Components/ConfirmationModal';
import { UserCircleIcon, CalendarIcon, DocumentTextIcon, TrashIcon, PencilSquareIcon, PlusCircleIcon } from '@heroicons/react/24/outline';

const Show = ({ project, auth }) => {
  const isProjectManager = project.owner.id === auth.user.id;
  const [showUserConfirmationModal, setShowUserConfirmationModal] = useState(false);
  const [userToRemove, setUserToRemove] = useState(null);
  const [showTaskConfirmationModal, setShowTaskConfirmationModal] = useState(false);
  const [taskToRemove, setTaskToRemove] = useState(null);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);

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

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <ProjectLayout>
      <div className=" ">
         {/* Background overlay */}
            <div
                className="fixed bottom-0 right-0 w-1/2 h-full bg-gradient-to-r from-[#FDC03E] to-[#FDCD65] transition-all duration-800 ease-in-out -z-10"
                style={{clipPath: 'polygon(52% 0, 100% 0, 100% 100%, 0% 100%)'}}
            ></div>
        {/* Top Banner */}
        <div className=" text-white">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center">
              <h1 className="text-4xl font-bold">{project.title}</h1>
              {isProjectManager && (
                <div className="flex gap-2">
                  <Link
                    href={route('projects.edit', { project: project.id })}
                    className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                  >
                    <PencilSquareIcon className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => setShowDeleteConfirmationModal(true)}
                    className="p-2 bg-red-500/80 hover:bg-red-500 rounded-lg transition-colors"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
            <p className="mt-2 text-white/80">{project.description}</p>
          </div>
        </div>

        {/* Project Info Bar */}
        <div className="bg-gray-800 border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <UserCircleIcon className="w-5 h-5 text-violet-400" />
                <span className="text-gray-400">Owner:</span>
                <span className="text-white">{project.owner.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <DocumentTextIcon className="w-5 h-5 text-violet-400" />
                <span className="text-gray-400">Type:</span>
                <span className="text-white">{project.type}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-violet-400" />
                <span className="text-gray-400">Deadline:</span>
                <span className="text-white">
                  {project.deadline ? formatDate(project.deadline) : 'No deadline'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-violet-400" />
                <span className="text-gray-400">Status:</span>
                <span className="text-white">{project.status}</span>
              </div>
              {project.file_path && (
                <a
                  href={route('project.file', { project: project.id })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1 bg-violet-600 hover:bg-violet-700 rounded-full transition-colors ml-auto"
                >
                  <DocumentTextIcon className="w-4 h-4" />
                  <span>View Docs</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Team Members Column */}
            <div className="lg:w-1/3 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">Team Members</h2>
                {isProjectManager && (
                  <Link
                    href={route('projects.addUserForm', { project: project.id })}
                    className="p-2 bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors"
                  >
                    <PlusCircleIcon className="w-5 h-5" />
                  </Link>
                )}
              </div>

              <div className="bg-gray-800 rounded-xl">
                <div className="max-h-[600px] overflow-y-auto p-4 space-y-3">
                  {project.users.map((user) => (
                    <div
                      key={user.id}
                      className="group bg-gray-700/50 hover:bg-gray-700 rounded-lg p-4 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-white font-medium">{user.name}</div>
                          <div className="text-sm text-violet-300">{user.pivot.role}</div>
                          <div className="text-xs text-gray-400 mt-1">{user.email}</div>
                        </div>
                        {isProjectManager && (
                          <button
                            onClick={() => handleRemoveUser(user)}
                            className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-500/20 rounded-lg text-red-400 transition-opacity"
                          >
                            <TrashIcon className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tasks Column */}
            <div className="lg:w-2/3 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">Project Tasks</h2>
                {isProjectManager && (
                  <Link
                    href={route('projects.tasks.create', { project: project.id })}
                    className="p-2 bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors"
                  >
                    <PlusCircleIcon className="w-5 h-5" />
                  </Link>
                )}
              </div>

              <div className="bg-gray-800 rounded-xl">
                <div className="max-h-[600px] overflow-y-auto p-4 space-y-3">
                  {project.tasks.map((task) => (
                    <div
                      key={task.id}
                      className="group bg-gray-700/50 hover:bg-gray-700 rounded-lg p-4 transition-all"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-lg font-medium text-white">{task.title}</h3>
                          {task.description && (
                            <p className="text-gray-400 text-sm mt-1">{task.description}</p>
                          )}
                        </div>
                        {isProjectManager && (
                          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Link
                              href={route('tasks.edit', { task: task.id })}
                              className="p-2 hover:bg-violet-500/20 rounded-lg text-violet-400"
                            >
                              <PencilSquareIcon className="w-5 h-5" />
                            </Link>
                            <button
                              onClick={() => handleRemoveTask(task)}
                              className="p-2 hover:bg-red-500/20 rounded-lg text-red-400"
                            >
                              <TrashIcon className="w-5 h-5" />
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <span className="px-3 py-1 bg-violet-500/20 text-violet-300 rounded-full text-sm">
                          {task.status}
                        </span>
                        <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm">
                          {task.phase}
                        </span>
                        <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                          {task.assigned_user?.name || 'Unassigned'}
                        </span>
                        <span className="px-3 py-1 bg-violet-500/20 text-violet-300 rounded-full text-sm">
                          {task.due_date ? formatDate(task.due_date) : 'No deadline'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modals */}
        <ConfirmationModal
          isOpen={showUserConfirmationModal}
          onClose={() => setShowUserConfirmationModal(false)}
          onConfirm={confirmRemoveUser}
          title="Confirm Removal"
          message={`Are you sure you want to remove ${userToRemove?.name} from the project?`}
        />

        <ConfirmationModal
          isOpen={showTaskConfirmationModal}
          onClose={() => setShowTaskConfirmationModal(false)}
          onConfirm={confirmRemoveTask}
          title="Confirm Deletion"
          message={`Are you sure you want to delete the task "${taskToRemove?.title}"?`}
        />

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