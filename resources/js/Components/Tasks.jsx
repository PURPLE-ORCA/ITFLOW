import React, { useContext } from 'react';
import { ProjectContext } from '@/contexts/ProjectContext';
import { CheckCircleIcon, ClockIcon, UserCircleIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { Link, usePage , useForm } from '@inertiajs/react';

const Tasks = () => {
  const { pendingTasks = [], finishedTasks = [] } = useContext(ProjectContext);
  const { user } = usePage().props.auth; // Get authenticated user

  // Function to format due date
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
    <div className="bg-white rounded-xl shadow-sm p-6 w-full max-w-3xl mx-auto space-y-8">
      {/* Pending Tasks Section */}
      <div>
        <div className="flex items-center mb-6">
          <div className="w-1 h-8 bg-red-500 rounded-r-full"></div>
          <h3 className="ml-3 text-xl font-semibold text-gray-800">
            Pending Tasks ({pendingTasks.length})
          </h3>
        </div>
        
        <ul className="space-y-3">
          {pendingTasks.length > 0 ? (
            pendingTasks.map((task) => (
              <li 
                key={task.id}
                className="group p-4 bg-white rounded-lg border border-gray-200 hover:border-red-200 hover:shadow-sm transition-all duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-800">{task.title}</h4>
                    {task.description && (
                      <p className="text-sm text-gray-600">{task.description}</p>
                    )}
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center text-gray-500">
                        <UserCircleIcon className="w-4 h-4 mr-1.5" />
                        <span>{task.assigned_to || 'Unassigned'}</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <CalendarIcon className="w-4 h-4 mr-1.5" />
                        <span>{task.due_date ? formatDueDate(task.due_date) : 'No deadline'}</span>
                      </div>
                      <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                        {task.status}
                      </span>
                    </div>
                  </div>
                  <ClockIcon className="w-5 h-5 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {task.assigned_to === user.id && (
              <div className="mt-2">
                <Link 
                  href={route('confirmations.create', { task: task.id })}
                  className="text-sm text-green-600 hover:text-green-800 flex items-center"
                >
                  <CheckCircleIcon className="w-4 h-4 mr-1" />
                  Finish Task
                </Link>
              </div>
            )}
                </div>
              </li>
            ))
          ) : (
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <p className="text-gray-500 italic">All caught up! No pending tasks 🎉</p>
            </div>
          )}
        </ul>
      </div>

      {/* Finished Tasks Section */}
        <div>
        <div className="flex items-center mb-6">
          <div className="w-1 h-8 bg-green-500 rounded-r-full"></div>
          <h3 className="ml-3 text-xl font-semibold text-gray-800">
            Completed Tasks ({finishedTasks.length})
          </h3>
        </div>

        <ul className="space-y-3">
          {finishedTasks.length > 0 ? (
            finishedTasks.map((task) => (
              <li 
                key={task.id}
                className="group p-4 bg-white rounded-lg border border-green-100 hover:border-green-200 hover:shadow-sm transition-all duration-200"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-green-800">{task.title}</h4>
                    <CheckCircleIcon className="w-5 h-5 text-green-500" />
                  </div>

                  {task.confirmation && (
                    <div className="space-y-2">
                      <div className="text-sm text-gray-600">
                        <p>{task.confirmation.description}</p>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <CalendarIcon className="w-4 h-4 mr-1.5" />
                          <span>Completed at: {formatCompletionDate(task.confirmation.created_at)}</span>
                        </div>

                        {task.confirmation.file_path && (
                          <div className="flex items-center">
                            <a 
                              href={`/storage/${task.confirmation.file_path}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-indigo-600 hover:text-indigo-800 flex items-center"
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
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="pt-2 border-t border-gray-100">
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center text-gray-500">
                        <UserCircleIcon className="w-4 h-4 mr-1.5" />
                        <span>Completed by: {task.confirmation?.created_by_user?.name || 'Team member'}</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <CalendarIcon className="w-4 h-4 mr-1.5" />
                        <span>Original deadline: {task.due_date ? formatDueDate(task.due_date) : 'None'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <p className="text-gray-500 italic">No completed tasks yet. Finish some tasks! 💪</p>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Tasks;