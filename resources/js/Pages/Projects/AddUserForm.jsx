import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import ProjectLayout from '@/Layouts/ProjectLayout';

const AddUserForm = ({ project }) => {
  const { data, setData, post, processing, errors } = useForm({
    email: '', // Change from user_id to email
    role: 'developer', // Default role
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('projects.addUser', { project: project.id }));
  };

  return (
    <ProjectLayout>
      <div className="p-6 bg-white/20 backdrop-blur-md rounded-xl">
        <h1 className="text-2xl font-bold mb-4 text-yellow-200">Add Team Member</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white">User Email</label>
            <input
              type="email" // Change type to email
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white">Role</label>
            <select
              value={data.role}
              onChange={(e) => setData('role', e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white"
            >
              <option value="manager">Manager</option>
              <option value="developer">Developer</option>
              <option value="designer">Designer</option>
              <option value="tester">Tester</option>
              <option value="analyst">Analyst</option>
            </select>
            {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
          </div>
          <button
            type="submit"
            disabled={processing}
            className="px-4 py-2 bg-yellow-400 text-black rounded-md hover:bg-yellow-500 transition-colors duration-300"
          >
            {processing ? 'Adding...' : 'Add Team Member'}
          </button>
        </form>
        <Link
          href={route('projects.show', { project: project.id })}
          className="mt-4 inline-block text-blue-400 hover:text-blue-300 underline"
        >
          Back to Project
        </Link>
      </div>
    </ProjectLayout>
  );
};

export default AddUserForm;