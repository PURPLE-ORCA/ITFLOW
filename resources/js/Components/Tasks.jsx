import React, { useContext, useState } from 'react';
import { ProjectContext } from '@/contexts/ProjectContext';
import { CheckCircleIcon, ClockIcon, UserCircleIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { Link, usePage } from '@inertiajs/react';

const Tasks = () => {
  const { pendingTasks = [], finishedTasks = [] } = useContext(ProjectContext);
  const { user } = usePage().props.auth;
  const [activeTab, setActiveTab] = useState('pending');

  const formatDueDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatCompletionDate = (dateString) => {
    const options = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="font-poppins  min-h-screen text-white p-5 h-auto w-auto relative">
    {/* Background overlay */}
    <div
      id="back"
      className="fixed bottom-0 right-0 w-1/3 h-full bg-gradient-to-r from-[#FDCD65] to-[#FDC03E] transition-all duration-[800ms] ease-in-out -z-10"
      style={{ clipPath: "circle(50% at 91% 0)" }}
    ></div>
    <div className="container mx-auto p-6">
      <div className="max-w-7xl mx-auto pt-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#FFD700] to-white bg-clip-text text-transparent">
            Task Management
          </h2>
          <p className="text-gray-300 mt-4 text-lg">
            Track and organize your project tasks efficiently
          </p>
        </div>
      </div>

      <div className="flex space-x-4 mb-12 justify-center">
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-6 py-3 rounded-full transition-all ${
              activeTab === 'pending'
                ? 'bg-yellow-500 text-white shadow-lg'
                : 'bg-white text-blue-800 hover:bg-blue-100'
            }`}
          >
            Pending Tasks
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-6 py-3 rounded-full transition-all ${
              activeTab === 'completed'
                ? 'bg-yellow-500 text-white shadow-lg'
                : 'bg-white text-blue-800 hover:bg-blue-100'
            }`}
          >
            Completed Tasks
          </button>
        </div>

      {activeTab === 'pending' && (
        <div className="tab-content pl-11 pr-11">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ">

            {pendingTasks.length > 0 ? (
              pendingTasks.map((task) => (
                <div
                  key={task.id}
                  className="p-6 bg-white/5 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden border-l-4 border-yellow-500 transition-all duration-300 hover:transform hover:-translate-y-1"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <h3 className="font-semibold text-base">{task.title}</h3>
                  </div>
                  <div className="space-y-2 py-3">
                    <div className="flex items-center text-gray-300">
                      <UserCircleIcon className="w-4 h-4 mr-3 text-yellow-500" />
                      <span>{task.assigned_user?.name || 'Unassigned'}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <CalendarIcon className="w-4 h-4 mr-3 text-cyan-300" />
                      <span>{task.due_date ? formatDueDate(task.due_date) : 'No deadline'}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <ClockIcon className="w-4 h-4 mr-3 text-cyan-600" />
                      <span>{task.created_at ? formatCompletionDate(task.created_at) : 'No creation date'}</span>
                    </div>
                    <div className="progress-bar w-full h-2 bg-gray-700 rounded-full mt-4">
                      <div className="w-3/4 h-full bg-gradient-to-r from-blue-200 to-blue-500 rounded-full"></div>
                    </div>
                    {task.assigned_to === user.id && (
                      <Link
                        href={route('confirmations.create', { task: task.id })}
                        className="mt-4 bg-blue-800 hover:bg-yellow-500 text-white px-4 py-2 rounded-full flex items-center justify-center"
                      >
                        <CheckCircleIcon className="w-4 h-4 mr-2" />
                        Finish Task
                      </Link>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <p className="text-gray-500 italic">All caught up! No pending tasks 🎉</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'completed' && (
        <div className="tab-content pl-11 pr-11">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {finishedTasks.length > 0 ? (
              finishedTasks.map((task) => (
                <div
                  key={task.id}
                  className="p-6 bg-white/5 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden border-l-4 border-yellow-500 transition-all duration-300 hover:transform hover:-translate-y-1"
                >
                  <div className="flex items-center space-x-3">
                    <CheckCircleIcon className="w-5 h-5 text-green-500" />
                    <h3 className="text-base font-bold ">{task.title}</h3>
                  </div>
                  <div className="space-y-2 py-3">
                    <div className="flex items-center text-gray-300">
                      <UserCircleIcon className="w-4 h-4 mr-3 text-yellow-500" />
                      <span>{task.confirmation?.created_by_user?.name || 'Team member'}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <CalendarIcon className="w-4 h-4 mr-3 text-cyan-300" />
                      <span>{task.confirmation?.created_at ? formatCompletionDate(task.confirmation.created_at) : 'No completion date'}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <CalendarIcon className="w-4 h-4 mr-3 text-cyan-300" />
                      <span>{task.due_date ? formatDueDate(task.due_date) : 'No deadline'}</span>
                    </div>
                    {task.confirmation?.file_path && (
                      <a
                        href={`/storage/${task.confirmation.file_path}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-800 flex items-center mt-2"
                      >
                        <svg
                          className="w-4 h-4 mr-1.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        View Attachment
                      </a>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <p className="text-gray-500 italic">No completed tasks yet. Finish some tasks! 💪</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
    </div>

  );
};

export default Tasks;
