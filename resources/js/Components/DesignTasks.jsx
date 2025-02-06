import React, { useContext } from 'react';
import { ProjectContext } from '@/contexts/ProjectContext';
import { CheckCircleIcon, UserCircleIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { Link, usePage } from '@inertiajs/react';

const Tasks = () => {
  const { pendingTasks = [], finishedTasks = [] } = useContext(ProjectContext);
  const { user } = usePage().props.auth;

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

  return (
    <div className="max-w-7xl mx-auto px-4 relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pending Tasks */}
        <div className="backdrop-blur-lg bg-slate-400/10 rounded-3xl p-6 border border-white/20 hover:border-yellow-400/50 transition-all duration-500">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-3 h-12 bg-yellow-400 rounded-full"></div>
              <h2 className="text-2xl font-bold text-white">Pending</h2>
            </div>
            <span className="px-4 py-1 bg-yellow-400/20 text-yellow-400 rounded-full text-sm">
              {pendingTasks.length} Tasks
            </span>
          </div>

          <div className="space-y-4">
            {pendingTasks.length > 0 ? (
              pendingTasks.map((task) => (
                <div key={task.id}
                  className="group bg-slate-500/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-yellow-400/30 transition-all duration-300">
                  <h3 className="text-white font-semibold text-lg mb-3">{task.title}</h3>

                  <div className="flex flex-wrap gap-4 text-sm text-blue-200">
                    <div className="flex items-center gap-2">
                      <UserCircleIcon className="w-4 h-4" />
                      {task.assigned_user?.name || 'Unassigned'}
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4" />
                      {task.due_date ? formatDueDate(task.due_date) : 'No deadline'}
                    </div>
                  </div>

                  {task.assigned_to === user.id && (
                    <Link
                      href={route('confirmations.create', { task: task.id })}
                      className="mt-4 inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 rounded-full text-sm font-medium transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/20"
                    >
                      <CheckCircleIcon className="w-4 h-4" />
                      Complete Task
                    </Link>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-blue-200">
                <p className="text-lg">All caught up! 🎉</p>
                <p className="text-sm opacity-70">No pending tasks</p>
              </div>
            )}
          </div>
        </div>

        {/* Completed Tasks */}
        <div className="backdrop-blur-lg bg-slate-500/10 rounded-3xl p-6 border border-white/20 hover:border-blue-400/50 transition-all duration-500">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-3 h-12 bg-blue-400 rounded-full"></div>
              <h2 className="text-2xl font-bold text-white">Completed</h2>
            </div>
            <span className="px-4 py-1 bg-blue-400/20 text-blue-400 rounded-full text-sm">
              {finishedTasks.length} Tasks
            </span>
          </div>

          <div className="space-y-4">
            {finishedTasks.length > 0 ? (
              finishedTasks.map((task) => (
                <div key={task.id}
                  className="group bg-slate-400/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-blue-400/30 transition-all duration-300">
                  <h3 className="text-white font-semibold text-lg mb-3">{task.title}</h3>

                  <div className="flex flex-wrap gap-4 text-sm text-blue-200">
                    <div className="flex items-center gap-2">
                      <UserCircleIcon className="w-4 h-4" />
                      {task.confirmation?.created_by_user?.name || 'Team member'}
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4" />
                      {task.confirmation?.created_at ? formatCompletionDate(task.confirmation.created_at) : 'No completion date'}
                    </div>
                  </div>

                  {task.confirmation?.file_path && (
                    <a
                      href={`/storage/${task.confirmation.file_path}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-full text-sm font-medium transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-400/20"
                    >
                      <svg
                        className="w-4 h-4"
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
              ))
            ) : (
              <div className="text-center py-8 text-blue-200">
                <p className="text-lg">Start completing tasks! 💪</p>
                <p className="text-sm opacity-70">No completed tasks yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
