import React from 'react';
import { useForm } from '@inertiajs/react';
import ProjectLayout from '@/Layouts/ProjectLayout';

const Edit = ({ project }) => {
  const { data, setData, patch, processing, errors } = useForm({
    title: project.title,
    description: project.description || '',
    deadline: project.deadline || '',
    status: project.status || 'Active',
    file: null, // For file uploads
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    patch(route('projects.update', { project: project.id }), {
      onSuccess: () => {
        // Reset the file input after successful submission
        setData('file', null);
      },
    });
  };

  return (
    <ProjectLayout>
      <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-800 to-blue-700 bg-clip-text text-transparent">
        Edit Project: {project.title}
      </h1>

      <form onSubmit={handleSubmit} className="mt-6">
        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-white/90">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={data.title}
            onChange={(e) => setData('title', e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-white/90">
            Description
          </label>
          <textarea
            id="description"
            value={data.description}
            onChange={(e) => setData('description', e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        </div>

        {/* Deadline */}
        <div className="mb-4">
          <label htmlFor="deadline" className="block text-sm font-medium text-white/90">
            Deadline
          </label>
          <input
            type="date"
            id="deadline"
            value={data.deadline}
            onChange={(e) => setData('deadline', e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
          />
          {errors.deadline && <p className="text-red-500 text-sm">{errors.deadline}</p>}
        </div>

        {/* Status */}
        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium text-white/90">
            Status
          </label>
          <select
            id="status"
            value={data.status}
            onChange={(e) => setData('status', e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
          >
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
          </select>
          {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
        </div>

        {/* File Upload */}
        <div className="mb-4">
          <label htmlFor="file" className="block text-sm font-medium text-white/90">
            Upload File (Optional)
          </label>
          <input
            type="file"
            id="file"
            onChange={(e) => setData('file', e.target.files[0])}
            className="mt-1 block w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
          />
          {errors.file && <p className="text-red-500 text-sm">{errors.file}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={processing}
          className="inline-block px-4 py-2 bg-yellow-400 text-black rounded-md hover:bg-yellow-500 transition-colors duration-300"
        >
          Update Project
        </button>
      </form>
    </ProjectLayout>
  );
};

export default Edit;