import React, { useContext } from 'react';
import { ProjectContext } from '@/contexts/ProjectContext';
import { CheckCircleIcon, ClockIcon, UserCircleIcon, CalendarIcon } from '@heroicons/react/24/outline';

const Tasks = () => {
  const { pendingTasks = [], finishedTasks = [] } = useContext(ProjectContext);

  // Function to format due date
  const formatDueDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
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
                className="p-4 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-medium text-gray-800 line-through">{task.title}</h4>
                    <div className="flex items-center space-x-3 text-sm text-gray-500">
                      <span>Completed by {task.assigned_to}</span>
                      {task.due_date && (
                        <span className="flex items-center">
                          <CalendarIcon className="w-4 h-4 mr-1.5" />
                          {formatDueDate(task.due_date)}
                        </span>
                      )}
                    </div>
                  </div>
                  <CheckCircleIcon className="w-5 h-5 text-green-600" />
                </div>
              </li>
            ))
          ) : (
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <p className="text-gray-500 italic">No tasks completed yet. Let's get to work! 💪</p>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Tasks;