import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import ProjectLayout from '@/Layouts/ProjectLayout';

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
    <ProjectLayout>
      <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-800 to-blue-700 bg-clip-text text-transparent">
        Create New Task for Project: {project.title}
      </h1>

      <form onSubmit={handleSubmit} className="mt-6">
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

        <div className="mb-4">
          <label htmlFor="assigned_to" className="block text-sm font-medium text-white/90">
            Assign To
          </label>
          <select
            id="assigned_to"
            value={data.assigned_to}
            onChange={(e) => setData('assigned_to', e.target.value)} // Store the selected user ID
            className="mt-1 block w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
          >
            <option value="">Select Team Member</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} - {user.pivot.role}
              </option>
            ))}
          </select>
          {errors.assigned_to && <p className="text-red-500 text-sm">{errors.assigned_to}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="phase" className="block text-sm font-medium text-white/90">
            Phase
          </label>
          <select
            id="phase"
            value={data.phase}
            onChange={(e) => setData('phase', e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
          >
            <option value="">Select Phase</option>
            <option value="analysis">Analysis</option>
            <option value="design">Design</option>
            <option value="development">Development</option>
            <option value="testing">Testing</option>
            <option value="wrapping">Wrapping</option>
          </select>
          {errors.phase && <p className="text-red-500 text-sm">{errors.phase}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="due_date" className="block text-sm font-medium text-white/90">
            Due Date
          </label>
          <input
            type="date"
            id="due_date"
            value={data.due_date}
            onChange={(e) => setData('due_date', e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
          />
          {errors.due_date && <p className="text-red-500 text-sm">{errors.due_date}</p>}
        </div>

        <button
          type="submit"
          disabled={processing}
          className="inline-block px-4 py-2 bg-yellow-400 text-black rounded-md hover:bg-yellow-500 transition-colors duration-300"
        >
          Create Task
        </button>
      </form>
    </ProjectLayout>
  );
};

export default Create;