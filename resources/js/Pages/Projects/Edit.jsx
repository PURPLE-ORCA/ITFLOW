import React from 'react';
import { useForm } from '@inertiajs/react';
import ProjectLayout from '@/Layouts/ProjectLayout';
import { PencilIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const Edit = ({ project }) => {
  const { data, setData, patch, processing, errors } = useForm({
    title: project.title,
    description: project.description || '',
    deadline: project.deadline || '',
    status: project.status || 'Active',
    file: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    patch(route('projects.update', { project: project.id }), {
      onSuccess: () => {
        setData('file', null);
      },
    });
  };

  return (
    <div className="font-poppins  text-white p-5 h-auto w-full">
      {/* Background overlay */}
      <div id="back"
        className="fixed bottom-0 right-0 w-2/6 h-full bg-gradient-to-r from-[#FDCD65] to-[#FDC03E] transition-all duration-800 ease-in-out -z-10"
        style={{ clipPath: 'circle(50% at 100% 50%)' }}></div>
      <ProjectLayout>
        <div className=" min-h-screen  p-2">
          <div className="max-w-2xl mx-auto backdrop-blur-lg bg-slate-400/5 border border-white/20 rounded-xl">
            <div className="p-6 space-y-1">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <PencilIcon className="h-6 w-6 text-blue-300" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-[#FDC03E] to-blue-500 bg-clip-text text-transparent">
                  Edit Project
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
                    Deadline
                  </label>
                  <input
                    type="date"
                    value={data.deadline}
                    onChange={(e) => setData('deadline', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-slate-400/5 border border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-white placeholder-gray-400"
                  />
                  {errors.deadline && <span className="text-red-400 text-sm">{errors.deadline}</span>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200">
                    Status
                  </label>
                  <select
                    value={data.status}
                    onChange={(e) => setData('status', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-slate-400/5 border border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-white"
                  >
                    <option value="Active" className="bg-gray-900">Active</option>
                    <option value="Completed" className="bg-gray-900">Completed</option>
                  </select>
                  {errors.status && <span className="text-red-400 text-sm">{errors.status}</span>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200">
                    Upload File (Optional)
                  </label>
                  <input
                    type="file"
                    onChange={(e) => setData('file', e.target.files[0])}
                    className="w-full px-4 py-3 rounded-lg bg-slate-400/5 border border-white/10 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500/20 file:text-blue-200 hover:file:bg-purple-500/30 transition-all duration-200"
                  />
                  {errors.file && <span className="text-red-400 text-sm">{errors.file}</span>}
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
                        <span>Updating...</span>
                      </span>
                    ) : (
                      'Update Project'
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

export default Edit;
