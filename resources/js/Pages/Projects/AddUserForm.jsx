import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import ProjectLayout from '@/Layouts/ProjectLayout';
import { UsersIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const AddUserForm = ({ project }) => {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    role: 'developer',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('projects.addUser', { project: project.id }));
  };

  return (
    <div className="font-poppins  text-white p-5 h-auto w-full">
    {/* Background overlay */}

    <ProjectLayout>

      <div className="min-h-screen  p-8">
        <div className="max-w-xl mx-auto backdrop-blur-lg bg-slate-400/5 border border-white/20 rounded-xl">
          <div className="p-6 space-y-1">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <UsersIcon className="h-6 w-6 text-blue-300" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-[#FDC03E] to-blue-500 bg-clip-text text-transparent">
                Add Team Member
              </h2>
            </div>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-200">Email Address</label>
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-slate-400/5 border border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-white placeholder-gray-400"
                  placeholder="colleague@company.com"
                />
                {errors.email && (
                  <span className="text-red-400 text-sm">{errors.email}</span>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-200">Team Role</label>
                <select
                  value={data.role}
                  onChange={(e) => setData('role', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-slate-400/5 border border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-white"
                >
                  <option value="manager" className="bg-gray-900">Manager</option>
                  <option value="developer" className="bg-gray-900">Developer</option>
                  <option value="designer" className="bg-gray-900">Designer</option>
                  <option value="tester" className="bg-gray-900">Tester</option>
                  <option value="analyst" className="bg-gray-900">Analyst</option>
                </select>
                {errors.role && (
                  <span className="text-red-400 text-sm">{errors.role}</span>
                )}
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
                      <span>Processing...</span>
                    </span>
                  ) : (
                    'Add Team Member'
                  )}
                </button>

                <Link
                  href={route('projects.show', { project: project.id })}
                  className="w-full px-4 py-3 bg-slate-400/5 border border-white/10 text-gray-200 rounded-lg font-medium hover:bg-white/10 focus:ring-2 focus:ring-blue-500 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <ArrowLeftIcon className="h-4 w-4" />
                  <span>Back to Project</span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </ProjectLayout>


    </div>
  );
};

export default AddUserForm;