// resources/js/Pages/Drawings/Index.jsx

import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import ProjectLayout from '../../Layouts/ProjectLayout';
import ConfirmationModal from '../../Components/ConfirmationModal';

const EmptyState = ({ projectId }) => (
    // ... EmptyState component is perfect, no changes needed ...
    <div className="text-center py-16">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-slate-800 border-2 border-slate-700">
            <i className="bx bxs-paint-roll text-3xl text-yellow-400"></i>
        </div>
        <h3 className="mt-4 text-lg font-semibold text-white">No Whiteboards Yet</h3>
        <p className="mt-2 text-sm text-gray-400">Get started by creating the first whiteboard for this project.</p>
        <div className="mt-6">
            <Link href={route('projects.drawings.create', projectId)} className="inline-flex items-center px-4 py-2 bg-yellow-500 border border-transparent rounded-md font-bold text-xs text-gray-900 uppercase tracking-widest hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150">
                Create First Drawing
            </Link>
        </div>
    </div>
);

export default function Index({ auth, project, drawings }) {
    // --- 3. ADD STATE MANAGEMENT FOR THE MODAL ---
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [drawingToDelete, setDrawingToDelete] = useState(null);

    const openConfirmationModal = (drawing) => {
        setDrawingToDelete(drawing);
        setIsModalOpen(true);
    };

    const closeConfirmationModal = () => {
        setIsModalOpen(false);
        setDrawingToDelete(null);
    };

    const confirmDelete = () => {
        if (drawingToDelete) {
            router.delete(route('drawings.destroy', drawingToDelete.id), {
                preserveScroll: true,
                onSuccess: () => closeConfirmationModal(), // Close modal on success
                onError: () => closeConfirmationModal(), // Also close on error
            });
        }
    };

    return (
        <ProjectLayout
            user={auth.user}
            project={project}
            header={<h2 className="font-semibold text-xl text-white/90 leading-tight">Project Whiteboards</h2>}
        >
            <Head title={`Drawings for ${project.name}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-2xl p-6">
                        {/* ... Header and EmptyState logic is perfect ... */}
                        {drawings.length > 0 && (
                            <div className="flex justify-between items-center mb-6 border-b border-slate-700 pb-4">
                                <h3 className="text-lg font-medium text-gray-100">All Drawings</h3>
                                <Link href={route('projects.drawings.create', project.id)} className="inline-flex items-center px-4 py-2 bg-slate-700 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150">
                                    <i className='bx bx-plus text-lg mr-1'></i> New Drawing
                                </Link>
                            </div>
                        )}
                        
                        {drawings.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                                {drawings.map((drawing) => (
                                    <div key={drawing.id} className="bg-slate-800/60 rounded-lg p-4 border border-slate-700 hover:border-yellow-500/50 transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between">
                                        <Link href={route('drawings.show', drawing.id)} className="flex items-center space-x-3 mb-4">
                                            <i className='bx bxs-paint-roll text-xl text-yellow-400'></i>
                                            <span className="font-semibold text-white hover:underline">{drawing.name}</span>
                                        </Link>
                                        <div className="flex items-center justify-end space-x-4 border-t border-slate-700/50 pt-3">
                                            <Link href={route('drawings.edit', drawing.id)} className="text-sm text-slate-400 hover:text-white transition-colors">
                                                <i className='bx bxs-edit-alt mr-1'></i> Rename
                                            </Link>
                                            {/* --- 4. UPDATE THE DELETE BUTTON'S ONCLICK --- */}
                                            <button
                                                onClick={() => openConfirmationModal(drawing)}
                                                className="text-sm text-red-500 hover:text-red-400 transition-colors"
                                            >
                                                <i className='bx bxs-trash-alt mr-1'></i> Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <EmptyState projectId={project.id} />
                        )}
                    </div>
                </div>
            </div>

            {/* --- 5. RENDER THE MODAL --- */}
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={closeConfirmationModal}
                onConfirm={confirmDelete}
                title="Delete Drawing"
                message={`Are you sure you want to permanently delete "${drawingToDelete?.name}"? This action cannot be undone.`}
            />
        </ProjectLayout>
    );
}
