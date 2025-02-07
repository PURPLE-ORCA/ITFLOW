import React, { useContext, useState } from 'react';
import { ProjectContext } from '@/contexts/ProjectContext';
import { Link, usePage } from '@inertiajs/react';
import {
  BeakerIcon,
  ShieldCheckIcon,
  BugAntIcon,
  UserCircleIcon,
  ClockIcon,
  DocumentMagnifyingGlassIcon,
  ChevronUpIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';

const TestingTasks = () => {
  const { pendingTasks = [], finishedTasks = [] } = useContext(ProjectContext);
  const { user } = usePage().props.auth;
  const [activeTab, setActiveTab] = useState('pending');

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

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Tabs Navigation */}
      <div className="flex justify-center mb-8 border-b border-white/10">
        <button
          onClick={() => setActiveTab('pending')}
          className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors relative ${
            activeTab === 'pending'
              ? 'text-amber-400 border-b-2 border-amber-400'
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          <BeakerIcon className="w-5 h-5" />
          Pending Tests
          <span className="ml-2 px-2 py-0.5 text-xs bg-amber-500/10 text-amber-400 rounded-full">
            {pendingTasks.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors relative ${
            activeTab === 'completed'
              ? 'text-blue-400 border-b-2 border-blue-400'
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          <ShieldCheckIcon className="w-5 h-5" />
          Completed Tests
          <span className="ml-2 px-2 py-0.5 text-xs bg-blue-500/10 text-blue-400 rounded-full">
            {finishedTasks.length}
          </span>
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
        {activeTab === 'pending' ? (
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 bg-black/20">
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Test Case</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Assignee</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Priority</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Due Date</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingTasks.map(task => (
                <tr key={task.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <BeakerIcon className="w-5 h-5 text-amber-400" />
                      <span className="font-medium text-white">{task.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    <div className="flex items-center gap-2">
                      <UserCircleIcon className="w-4 h-4 text-gray-400" />
                      {task.assigned_user?.name || 'Unassigned'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      task.priority === 'High' ? 'bg-red-500/10 text-red-400' :
                      task.priority === 'Medium' ? 'bg-yellow-500/10 text-yellow-400' :
                      'bg-green-500/10 text-green-400'
                    }`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{formatDate(task.due_date)}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400">
                      {task.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {task.assigned_to === user.id && (
                      <Link
                        href={route('confirmations.create', { task: task.id })}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm rounded-lg font-medium hover:from-amber-600 hover:to-orange-600 transition-colors"
                      >
                        <BugAntIcon className="w-4 h-4" />
                        Test
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 bg-black/20">
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Test Case</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Tester</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Completion Date</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Result</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {finishedTasks.map(task => (
                <tr key={task.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <ShieldCheckIcon className="w-5 h-5 text-blue-400" />
                      <span className="font-medium text-white">{task.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    <div className="flex items-center gap-2">
                      <UserCircleIcon className="w-4 h-4 text-gray-400" />
                      {task.confirmation?.created_by_user?.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    {formatDate(task.confirmation?.created_at, true)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400">
                      Completed
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {task.confirmation?.file_path && (
                      <a
                        href={`/storage/${task.confirmation.file_path}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm rounded-lg font-medium hover:from-blue-600 hover:to-cyan-600 transition-colors"
                      >
                        <DocumentMagnifyingGlassIcon className="w-4 h-4" />
                        View Report
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TestingTasks;