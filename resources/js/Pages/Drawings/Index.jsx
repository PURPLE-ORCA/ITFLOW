import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import ProjectLayout from '../../Layouts/ProjectLayout';
import ConfirmationModal from '../../Components/ConfirmationModal';
import {
    PlusCircleIcon,
} from "@heroicons/react/24/outline";

const EmptyState = ({ projectId }) => (
    <div className="text-center py-20 relative">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-10 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-10 right-1/4 w-24 h-24 bg-yellow-400/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10">
            {/* Animated icon container */}
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-600/20 to-blue-800/30 border border-blue-500/30 backdrop-blur-sm shadow-xl mb-6 transform hover:scale-110 transition-all duration-500">
                <div className="relative">
                    <i className="bx bxs-paint-roll text-4xl text-yellow-400 animate-bounce"></i>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
                </div>
            </div>

            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-yellow-400 bg-clip-text text-transparent mb-3">
                No Whiteboards
            </h3>
            <p className="text-blue-200/70 text-lg mb-8 max-w-md mx-auto leading-relaxed">
                Unleash your creativity by creating your first interactive whiteboard
            </p>

            <Link
                href={route('projects.drawings.create', projectId)}
                className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-blue-900 font-bold text-sm uppercase tracking-wider rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border-2 border-yellow-400/50 hover:border-yellow-300"
            >
                <i className="bx bx-plus text-xl mr-2 group-hover:rotate-90 transition-transform duration-300"></i>
                Create First Whiteboard
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/0 to-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
        </div>
    </div>
);

export default function Index({ auth, project, drawings }) {
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
                onSuccess: () => closeConfirmationModal(),
                onError: () => closeConfirmationModal(),
            });
        }
    };

    return (
        <ProjectLayout
            user={auth.user}
            project={project}
            header={
                <h2 className="font-bold text-2xl bg-gradient-to-r from-blue-400 via-blue-300 to-yellow-400 bg-clip-text text-transparent leading-tight">
                    Project Whiteboards
                </h2>
            }
        >
            <Head title={`Drawings for ${project.name}`} />

            {/* Background animated elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-10 w-48 h-48 bg-yellow-400/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/3 to-yellow-400/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="py-12 relative z-10">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-br from-blue-900/20 via-transparent to-blue-800/10 backdrop-blur-xl border border-blue-500/20 rounded-3xl shadow-2xl p-8 relative overflow-hidden">
                        {/* Decorative corner elements */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-yellow-400/10 to-transparent rounded-bl-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-tr-3xl"></div>

                        {drawings.length > 0 && (
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 pb-6 relative">
                                <div
                                    className="absolute bottom-0 left-0 right-0 h-px"
                                    style={{
                                        background: 'linear-gradient(90deg, transparent, #3b82f6, #fbbf24, #3b82f6, transparent)'
                                    }}
                                ></div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-2">All Whiteboards</h3>
                                    <p className="text-blue-200/60">Manage your creative works</p>
                                </div>
                                <Link
                                    href={route('projects.drawings.create', project.id)}
                                    className="group mt-4 sm:mt-0 inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-400 to-blue-500 text-black font-semibold rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105"
                                >
                                    <PlusCircleIcon className="w-5 h-5 text-black bx bx-plus text-xl mr-2 group-hover:rotate-180 transition-transform duration-500" />
                                    New Whiteboard
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-400/0 to-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </Link>
                            </div>
                        )}

                        {drawings.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {drawings.map((drawing, index) => (
                                    <div
                                        key={drawing.id}
                                        className="group relative bg-gradient-to-br from-blue-800/30 via-blue-900/20 to-transparent backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20 hover:border-yellow-400/50 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 shadow-lg hover:shadow-2xl"
                                        style={{
                                            animationDelay: `${index * 100}ms`
                                        }}
                                    >
                                        {/* Card background effect */}
                                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-400/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                        {/* Decorative corner */}
                                        <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-yellow-400/20 to-transparent rounded-bl-2xl rounded-tr-2xl"></div>

                                        <div className="relative z-10 flex flex-col h-full">
                                            <Link
                                                href={route('drawings.show', drawing.id)}
                                                className="flex items-center space-x-4 mb-6 group-hover:mb-8 transition-all duration-300"
                                            >
                                                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400/20 to-yellow-500/30 border border-yellow-400/30 group-hover:scale-110 transition-transform duration-300">
                                                    <i className='bx bxs-paint-roll text-xl text-yellow-400 group-hover:rotate-12 transition-transform duration-300'></i>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-bold text-white text-lg truncate group-hover:text-yellow-300 transition-colors duration-300">
                                                        {drawing.name}
                                                    </h4>
                                                    <p className="text-blue-200/60 text-sm">Interactive whiteboard</p>
                                                </div>
                                            </Link>

                                            <div className="flex items-center justify-between pt-4 border-t border-blue-500/20 group-hover:border-yellow-400/30 transition-colors duration-300 mt-auto">
                                                <Link
                                                    href={route('drawings.edit', drawing.id)}
                                                    className="flex items-center text-sm text-blue-300 hover:text-yellow-400 transition-colors duration-300 group/edit"
                                                >
                                                    <i className='bx bxs-edit-alt mr-2 group-hover/edit:rotate-12 transition-transform duration-300'></i>
                                                    Rename
                                                </Link>
                                                <button
                                                    onClick={() => openConfirmationModal(drawing)}
                                                    className="flex items-center text-sm text-red-400 hover:text-red-300 transition-colors duration-300 group/delete"
                                                >
                                                    <i className='bx bxs-trash-alt mr-2 group-hover/delete:scale-110 transition-transform duration-300'></i>
                                                    Delete
                                                </button>
                                            </div>
                                        </div>

                                        {/* Hover glow effect */}
                                        <div className="absolute inset-0 rounded-2xl shadow-lg shadow-yellow-400/0 group-hover:shadow-yellow-400/20 transition-shadow duration-500"></div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <EmptyState projectId={project.id} />
                        )}
                    </div>
                </div>
            </div>

            {/* Modal with matching design */}
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={closeConfirmationModal}
                onConfirm={confirmDelete}
                title="Delete Whiteboard"
                message={`Are you sure you want to permanently delete "${drawingToDelete?.name}"? This action cannot be undone.`}
                className="bg-gradient-to-br from-blue-900/95 via-blue-800/90 to-blue-900/95 backdrop-blur-xl border border-blue-500/30 rounded-2xl"
            />
        </ProjectLayout>
    );
}