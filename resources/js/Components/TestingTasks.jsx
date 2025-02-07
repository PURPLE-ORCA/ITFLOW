import React, { useContext } from 'react';
import { ProjectContext } from '@/contexts/ProjectContext';
import { Link, usePage } from '@inertiajs/react';
import {
  BeakerIcon,
  CheckBadgeIcon,
  BugAntIcon,
  UserCircleIcon,
  CalendarIcon,
  DocumentMagnifyingGlassIcon
} from '@heroicons/react/24/outline';

const Tasks = () => {
  const { pendingTasks = [], finishedTasks = [] } = useContext(ProjectContext);
  const { user } = usePage().props.auth;

  const formatDate = (dateString, includeTime = false) => {
    const options = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      ...(includeTime && {
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const TaskCard = ({ task, status }) => {
    const isPending = status === 'pending';
    const statusColors = isPending
      ? 'bg-gradient-to-br from-[#FDC03E] to-blue-800'
      : 'bg-gradient-to-br from-cyan-500 to-blue-900';

    return (
      <div className={`relative group ${statusColors} p-1 rounded-3xl text-white transition-all duration-500 ease-out`}>
        {/* Status Indicator */}
        <div className="absolute -left-1 top-6 flex space-x-0.5">
          <div className="w-1 h-12 rounded-full bg-gradient-to-b from-blue-500 to-amber-500 animate-pulse" />
          <div className="w-1 h-12 rounded-full bg-gradient-to-b from-yellow-500 to-cyan-500 animate-pulse delay-75" />
        </div>

        <div className="bg-black/90 backdrop-blur-lg rounded-2xl p-6">
          {/* Task Header */}
          <div className="ml-4">
            <div className="flex items-center gap-3 mb-3">
              <BeakerIcon className="w-6 h-6 text-amber-400 animate-bounce" />
              <h3 className="text-white font-bold text-lg">{task.title}</h3>
            </div>

            {/* Task Meta */}
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-300 mb-4">
              <div className="flex items-center gap-2">
                <UserCircleIcon className="w-4 h-4 text-gray-400" />
                <span>{isPending ? task.assigned_user?.name || 'Unassigned' : task.confirmation?.created_by_user?.name || 'QA Engineer'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-gray-400" />
                <span>
                  {isPending
                    ? (task.due_date ? formatDate(task.due_date) : 'No deadline')
                    : (task.confirmation?.created_at ? formatDate(task.confirmation.created_at, true) : 'No completion date')}
                </span>
              </div>
            </div>

            {/* Actions */}
            {isPending && task.assigned_to === user.id ? (
              <Link
                href={route('confirmations.create', { task: task.id })}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-xl font-medium transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/25 group"
              >
                <BugAntIcon className="w-4 h-4 group-hover:animate-spin" />
                Mark as Tested
              </Link>
            ) : task.confirmation?.file_path && (
              <a
                href={`/storage/${task.confirmation.file_path}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-medium transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
              >
                <DocumentMagnifyingGlassIcon className="w-4 h-4" />
                View Test Results
              </a>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pending Tests Column */}
        <div className="bg-slate-400/10 border border-white/5 backdrop-blur-xl rounded-3xl">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <BeakerIcon className="w-6 h-6 text-amber-400" />
                <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
                  In Testing
                </h2>
              </div>
              <span className="px-4 py-1.5 bg-amber-500/10 text-amber-400 rounded-xl text-sm font-medium">
                {pendingTasks.length} Tests
              </span>
            </div>

            <div className="space-y-4">
              {pendingTasks.length > 0 ? (
                pendingTasks.map(task => <TaskCard key={task.id} task={task} status="pending" />)
              ) : (
                <div className="text-center py-12 text-gray-400">
                  <BeakerIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">Testing Queue Empty</p>
                  <p className="text-sm opacity-70">All features have been tested</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Completed Tests Column */}
        <div className="bg-slate-400/10 border border-white/5 backdrop-blur-xl rounded-3xl">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <CheckBadgeIcon className="w-6 h-6 text-blue-400" />
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Test Completed
                </h2>
              </div>
              <span className="px-4 py-1.5 bg-blue-500/10 text-blue-400 rounded-xl text-sm font-medium">
                {finishedTasks.length} Tests
              </span>
            </div>

            <div className="space-y-4">
              {finishedTasks.length > 0 ? (
                finishedTasks.map(task => <TaskCard key={task.id} task={task} status="completed" />)
              ) : (
                <div className="text-center py-12 text-gray-400">
                  <CheckBadgeIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">No Completed Tests</p>
                  <p className="text-sm opacity-70">Start testing features from the queue</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
