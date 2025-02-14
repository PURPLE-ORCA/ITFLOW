import React from 'react';
import { useForm } from '@inertiajs/react';
import ProjectLayout from '@/Layouts/ProjectLayout';
import { DocumentIcon } from '@heroicons/react/24/outline';

const Create = ({ task }) => {
  const { data, setData, post, processing, errors } = useForm({
    description: '',
    file: null,
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('confirmations.store', { task: task.id }));
  };

  return (
    <ProjectLayout>
      <div className="font-poppins text-white">
        <div className="min-h-screen p-2">
          <div className="max-w-2xl mx-auto backdrop-blur-lg bg-slate-400/5 border border-white/20 rounded-xl">
            <div className="p-6 space-y-1">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <DocumentIcon className="h-6 w-6 text-blue-300" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-[#FDC03E] to-blue-500 bg-clip-text text-transparent">
                  Complete Task: {task.title}
                </h2>
              </div>
            </div>

            <div className="p-6">
              <form onSubmit={submit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200">
                    Description
                  </label>
                  <textarea
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    rows="4"
                    className="w-full px-4 py-3 rounded-lg bg-slate-400/5 border border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-white placeholder-gray-400"
                  />
                  {errors.description && <span className="text-red-400 text-sm">{errors.description}</span>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200">
                    Attachment
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
                        <span>Submitting...</span>
                      </span>
                    ) : (
                      'Submit Completion'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </ProjectLayout>
  );
};

export default Create;
