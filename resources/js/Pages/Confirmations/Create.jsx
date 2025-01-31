import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ProjectLayout from '@/Layouts/ProjectLayout';

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
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Complete Task: {task.title}</h1>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
              <textarea
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                rows="3"
              />
            </label>
            {errors.description && <div className="text-red-600 text-sm">{errors.description}</div>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Attachment
              <input
                type="file"
                onChange={(e) => setData('file', e.target.files[0])}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
            </label>
            {errors.file && <div className="text-red-600 text-sm">{errors.file}</div>}
          </div>

          <button
            type="submit"
            disabled={processing}
            className="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 active:bg-green-900 focus:outline-none focus:border-green-900 focus:ring ring-green-300 disabled:opacity-25 transition ease-in-out duration-150"
          >
            Submit Completion
          </button>
        </form>
      </div>
    </ProjectLayout>
  );
};

export default Create;