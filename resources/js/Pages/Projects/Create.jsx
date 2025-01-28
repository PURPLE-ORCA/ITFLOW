import React, { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Create = () => {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        type: '',
        deadline: '',
        file: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('projects.store'), {
            onSuccess: () => {
                // Optionally, you can redirect or show a success message here
            },
        });
    };

    return (
 <AuthenticatedLayout
            header={
                <h2 className="text-4xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Create a New Project
                </h2>
            }
        >
            <Head title="Create" />

            <main className="min-h-screen bg-gray-100 p-6">

                <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
                    <form onSubmit={handleSubmit}>
                        {/* Title Field */}
                        <div className="mb-6">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                
                            />
                            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                        </div>

                        {/* Description Field */}
                        <div className="mb-6">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                rows={4}
                            />
                            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                        </div>

                        {/* Title Field */}
                        <div className="mb-6">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                Type
                            </label>
                            <input
                                type="text"
                                id="type"
                                name="type"
                                value={data.type}
                                onChange={(e) => setData('type', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                
                            />
                            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                        </div>

                        {/* Deadline Field */}
                        <div className="mb-6">
                            <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
                                Deadline
                            </label>
                            <input
                                type="date"
                                id="deadline"
                                name="deadline"
                                value={data.deadline}
                                onChange={(e) => setData('deadline', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            />
                            {errors.deadline && <p className="text-red-500 text-sm mt-1">{errors.deadline}</p>}
                        </div>

                        {/* File Upload Field */}
                        <div className="mb-6">
                            <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                                Upload File (Optional)
                            </label>
                            <input
                                type="file"
                                id="file"
                                name="file"
                                onChange={(e) => setData('file', e.target.files[0])}
                                className="mt-1 block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                            {errors.file && <p className="text-red-500 text-sm mt-1">{errors.file}</p>}
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end">
                            <Link
                                href={route('dashboard')}
                                className="mr-4 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg transition duration-300"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300"
                            >
                                {processing ? 'Creating...' : 'Create Project'}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </AuthenticatedLayout>
    );
};

export default Create;