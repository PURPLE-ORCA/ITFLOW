import React from 'react';
import { useForm } from '@inertiajs/react';
import ProjectLayout from '@/Layouts/ProjectLayout';
import { PencilIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const Create = ({ project, users }) => {
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    description: '',
    assigned_to: '',
    phase: '',
    due_date: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('projects.tasks.store', { project: project.id }));
  };

  return (
    <div className="font-poppins text-white p-5 h-auto w-full">

      <ProjectLayout>
        <div className="min-h-screen p-2">
          <div className="max-w-2xl mx-auto backdrop-blur-lg bg-slate-400/5 border border-white/20 rounded-xl">
            <div className="p-6 space-y-1">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <PencilIcon className="h-6 w-6 text-blue-300" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-[#FDC03E] to-blue-500 bg-clip-text text-transparent">
                  Create New Task for Project
                </h2>
              </div>
            </div>

            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200">
                    Title
                  </label>
                  <input
                    type="text"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-slate-400/5 border border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-white placeholder-gray-400"
                  />
                  {errors.title && <span className="text-red-400 text-sm">{errors.title}</span>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200">
                    Description
                  </label>
                  <textarea
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-slate-400/5 border border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-white placeholder-gray-400"
                  />
                  {errors.description && <span className="text-red-400 text-sm">{errors.description}</span>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200">
                    Assign To
                  </label>
                  <select
                    value={data.assigned_to}
                    onChange={(e) => setData('assigned_to', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-slate-400/5 border border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-white"
                  >
                    <option value="">Select Team Member</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name} - {user.pivot.role}
                      </option>
                    ))}
                  </select>
                  {errors.assigned_to && <span className="text-red-400 text-sm">{errors.assigned_to}</span>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200">
                    Phase
                  </label>
                  <select
                    value={data.phase}
                    onChange={(e) => setData('phase', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-slate-400/5 border border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-white"
                  >
                    <option value="">Select Phase</option>
                    <option value="analysis">Analysis</option>
                    <option value="design">Design</option>
                    <option value="development">Development</option>
                    <option value="testing">Testing</option>
                    <option value="wrapping">Wrapping</option>
                  </select>
                  {errors.phase && <span className="text-red-400 text-sm">{errors.phase}</span>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={data.due_date}
                    onChange={(e) => setData('due_date', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-slate-400/5 border border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-white placeholder-gray-400"
                  />
                  {errors.due_date && <span className="text-red-400 text-sm">{errors.due_date}</span>}
                </div>

                <div className="space-y-4">
                  <button
                    type="submit"
                    disabled={processing}
                    className="w-full px-4 py-3 bg-gradient-to-r from-[#FDC03E] to-blue-500 text-white rounded-lg font-medium hover:from-blue-500 hover:to-[#FDC03E] focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 disabled:opacity-50"
                  >
                    {processing ? (
                      <span className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin" />
                        <span>Creating...</span>
                      </span>
                    ) : (
                      'Create Task'
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="w-full px-4 py-3 bg-slate-400/5 border border-white/10 text-gray-200 rounded-lg font-medium hover:bg-white/10 focus:ring-2 focus:ring-blue-500 transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <ArrowLeftIcon className="h-4 w-4" />
                    <span>Back to Project</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </ProjectLayout>
    </div>
  );
};

export default Create;
