import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import ProjectLayout from '@/Layouts/ProjectLayout';

export default function Index({ auth, project, drawings }) {
    return (
        <ProjectLayout
            user={auth.user}
            project={project}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Drawings for {project.name}</h2>}
        >
            <Head title={`Drawings for ${project.name}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-medium">All Drawings</h3>
                                <Link
                                    href={route('projects.drawings.create', project.id)}
                                    className="inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                                >
                                    Create New Drawing
                                </Link>
                            </div>

                            {drawings.length > 0 ? (
                                <ul className="divide-y divide-gray-700">
                                    {drawings.map((drawing) => (
                                        <li key={drawing.id} className="py-4 flex justify-between items-center">
                                            <Link href={route('drawings.show', drawing.id)} className="text-blue-400 hover:underline">
                                                {drawing.name}
                                            </Link>
                                            <div className="flex items-center space-x-2">
                                                <Link
                                                    href={route('drawings.edit', drawing.id)}
                                                    className="text-sm text-gray-400 hover:text-gray-200"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => {
                                                        if (confirm('Are you sure you want to delete this drawing?')) {
                                                            // Implement delete logic here
                                                            // Inertia.delete(route('drawings.destroy', drawing.id));
                                                        }
                                                    }}
                                                    className="text-sm text-red-500 hover:text-red-400"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-400">No drawings found for this project.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </ProjectLayout>
    );
}
