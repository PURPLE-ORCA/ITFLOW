import ProjectLayout from "@/Layouts/ProjectLayout";
import React, { useState } from "react";
import { Link, router } from "@inertiajs/react";
import ConfirmationModal from "@/Components/ConfirmationModal";
import {
    UserCircleIcon,
    CalendarIcon,
    DocumentTextIcon,
    TrashIcon,
    PencilSquareIcon,
    PlusCircleIcon,
    ChartBarIcon,
    ClockIcon,
    UserGroupIcon,
    FolderIcon,
    StarIcon,
    BoltIcon,
} from "@heroicons/react/24/outline";

const Show = ({ project, auth }) => {
    const isProjectManager = project.owner.id === auth.user.id;
    const [showUserConfirmationModal, setShowUserConfirmationModal] =
        useState(false);
    const [userToRemove, setUserToRemove] = useState(null);
    const [showTaskConfirmationModal, setShowTaskConfirmationModal] =
        useState(false);
    const [taskToRemove, setTaskToRemove] = useState(null);
    const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
        useState(false);

    const handleRemoveUser = (user) => {
        setUserToRemove(user);
        setShowUserConfirmationModal(true);
    };

    const confirmRemoveUser = () => {
        if (userToRemove) {
            router.delete(
                route("projects.removeUser", {
                    project: project.id,
                    user: userToRemove.id,
                }),
                {
                    onSuccess: () => {
                        setShowUserConfirmationModal(false);
                        setUserToRemove(null);
                    },
                }
            );
        }
    };

    const handleRemoveTask = (task) => {
        setTaskToRemove(task);
        setShowTaskConfirmationModal(true);
    };

    const confirmRemoveTask = () => {
        if (taskToRemove) {
            router.delete(route("tasks.destroy", { task: taskToRemove.id }), {
                onSuccess: () => {
                    setShowTaskConfirmationModal(false);
                    setTaskToRemove(null);
                },
            });
        }
    };

    const formatDate = (dateString) => {
        const options = { day: "numeric", month: "short", year: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <ProjectLayout>
            <div className=" text-white ">
                {/* Effets techniques d'arrière-plan */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Superpositions de dégradés */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-yellow-900/10" />
                    <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />

                    {/* Motif de grille technique */}
                    <div
                        className="absolute inset-0 opacity-5"
                        style={{
                            backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
              `,
                            backgroundSize: "60px 60px",
                        }}
                    />
                </div>

                <div className="relative">
                    {/* Dégradé d'arrière-plan subtil */}
                    <div className="absolute " />

                    {/* En-tête principal */}
                    <div className="relative z-10 border-b border-white/10 backdrop-blur-xl">
                        <div className="max-w-7xl mx-auto px-6 py-6">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-yellow-400/20 rounded-lg flex items-center justify-center">
                                        <FolderIcon className="w-6 h-6 text-yellow-400" />
                                    </div>

                                    <div>
                                        <h1 className="text-3xl font-bold text-white">
                                            {project.title}
                                        </h1>
                                        <p className="text-gray-400 mt-1">
                                            Gestion de projet moderne
                                        </p>
                                    </div>
                                </div>

                                {/* Actions principales */}
                                {isProjectManager && (
                                    <div className="flex items-center gap-3">
                                        <Link
                                            href={route("projects.edit", {
                                                project: project.id,
                                            })}
                                            className="group flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg transition-all duration-200"
                                        >
                                            <PencilSquareIcon className="w-5 h-5 text-gray-400 group-hover:text-white" />
                                            <span className="text-gray-400 group-hover:text-white">
                                                Modifier
                                            </span>
                                        </Link>
                                        <button
                                            onClick={() =>
                                                setShowDeleteConfirmationModal(
                                                    true
                                                )
                                            }
                                            className="group flex items-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-600/30 hover:border-red-600/50 rounded-lg transition-all duration-200"
                                        >
                                            <TrashIcon className="w-5 h-5 text-red-400 group-hover:text-red-300" />
                                            <span className="text-red-400 group-hover:text-red-300">
                                                Supprimer
                                            </span>
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Barre d'informations sur le projet */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500/20 to-yellow-400/20 rounded-lg flex items-center justify-center">
                                        <UserCircleIcon className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wider ">
                                            Propriétaire
                                        </p>
                                        <p className="text-white font-medium">
                                            {project.owner.name}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500/20 to-yellow-400/20 rounded-lg flex items-center justify-center">
                                        <DocumentTextIcon className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wider">
                                            Type
                                        </p>
                                        <p className="text-white font-medium">
                                            {project.type}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500/20 to-yellow-400/20 rounded-lg flex items-center justify-center">
                                        <CalendarIcon className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wider">
                                            Échéance
                                        </p>
                                        <p className="text-white font-medium">
                                            {project.deadline
                                                ? formatDate(project.deadline)
                                                : "Aucune"}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500/20 to-yellow-400/20 rounded-lg flex items-center justify-center">
                                        <ChartBarIcon className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wider">
                                            Statut
                                        </p>
                                        <p className="text-white font-medium">
                                            {project.status}
                                        </p>
                                    </div>
                                </div>

                                {project.file_path && (
                                    <a
                                        href={route("project.file", {
                                            project: project.id,
                                        })}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 p-4 rounded-xl g-gradient-to-r from-black/80 to-blue-950/80 backdrop-blur-xl hover:bg-blue-600/30 border border-blue-600/30 hover:border-blue-600/50 transition-all duration-200 group"
                                    >
                                        <DocumentTextIcon className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
                                        <div>
                                            <p className="text-xs text-blue-500 uppercase tracking-wider">
                                                Documentation
                                            </p>
                                            <p className="text-blue-400 group-hover:text-blue-300 font-medium">
                                                Voir les documents
                                            </p>
                                        </div>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Description du projet */}
                {project.description && (
                    <div className="max-w-7xl mx-auto px-6 py-6">
                        <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm. ">
                            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                                <DocumentTextIcon className="w-5 h-5 text-yellow-400" />
                                Description du projet
                            </h3>
                            <p className="text-gray-300 leading-relaxed">
                                {project.description}
                            </p>
                        </div>
                    </div>
                )}

                {/* Grille de contenu principal */}
                <div className="max-w-7xl mx-auto px-6 pb-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Section Membres de l'équipe */}
                        <div className="lg:col-span-1">
                            <div className="relative group">
                                <div className="absolute -inset-1 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                                <div className="relative bg-black/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl overflow-hidden">
                                    <div className="p-6 border-b border-gray-700/50 bg-gradient-to-r from-blue-500/10 to-yellow-400/10">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-lg flex items-center justify-center">
                                                    <UserCircleIcon className="w-6 h-6 text-black" />
                                                </div>
                                                <h2 className="text-xl font-bold text-white">
                                                    Membres de l'équipe
                                                </h2>
                                            </div>
                                            {isProjectManager && (
                                                <Link
                                                    href={route(
                                                        "projects.addUserForm",
                                                        { project: project.id }
                                                    )}
                                                    className="p-2 bg-gradient-to-r from-yellow-400 to-blue-500 hover:from-yellow-500 hover:to-blue-600 rounded-lg transition-all duration-300 transform hover:scale-110"
                                                >
                                                    <PlusCircleIcon className="w-5 h-5 text-black" />
                                                </Link>
                                            )}
                                        </div>
                                    </div>

                                    <div className="p-4 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                                        <div className="space-y-3">
                                            {project.users.map(
                                                (user, index) => (
                                                    <div
                                                        key={user.id}
                                                        className="group/user relative p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/30 hover:from-blue-500/10 hover:to-yellow-400/10 border border-gray-600/30 rounded-xl transition-all duration-300 hover:scale-105"
                                                        style={{
                                                            animationDelay: `${
                                                                index * 100
                                                            }ms`,
                                                        }}
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full flex items-center justify-center">
                                                                    <span className="text-black font-bold text-lg">
                                                                        {user.name
                                                                            .charAt(
                                                                                0
                                                                            )
                                                                            .toUpperCase()}
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    <p className="text-white font-semibold">
                                                                        {
                                                                            user.name
                                                                        }
                                                                    </p>
                                                                    <p className="text-blue-400 text-sm font-medium">
                                                                        {
                                                                            user
                                                                                .pivot
                                                                                .role
                                                                        }
                                                                    </p>
                                                                    <p className="text-gray-400 text-xs">
                                                                        {
                                                                            user.email
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            {isProjectManager && (
                                                                <button
                                                                    onClick={() =>
                                                                        handleRemoveUser(
                                                                            user
                                                                        )
                                                                    }
                                                                    className="opacity-0 group-hover/user:opacity-100 p-2 hover:bg-red-500/20 rounded-lg text-red-400 transition-all duration-300"
                                                                >
                                                                    <TrashIcon className="w-4 h-4" />
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section Tâches */}
                        <div className="lg:col-span-2">
                            <div className="relative group">
                                <div className="absolute -inset-1  rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                                <div className="relative bg-black/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl overflow-hidden">
                                    <div className="p-6 border-b border-gray-700/50 bg-gradient-to-r from-yellow-400/10 to-blue-500/10">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-blue-500 rounded-lg flex items-center justify-center">
                                                    <DocumentTextIcon className="w-6 h-6 text-black" />
                                                </div>
                                                <h2 className="text-xl font-bold text-white">
                                                    Tâches du projet
                                                </h2>
                                            </div>
                                            {isProjectManager && (
                                                <Link
                                                    href={route(
                                                        "projects.tasks.create",
                                                        { project: project.id }
                                                    )}
                                                    className="p-2 bg-gradient-to-r from-blue-500 to-yellow-400 hover:from-blue-600 hover:to-yellow-500 rounded-lg transition-all duration-300 transform hover:scale-110"
                                                >
                                                    <PlusCircleIcon className="w-5 h-5 text-black" />
                                                </Link>
                                            )}
                                        </div>
                                    </div>

                                    <div className="p-4 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                                        <div className="space-y-4">
                                            {project.tasks.map(
                                                (task, index) => (
                                                    <div
                                                        key={task.id}
                                                        className="group/task relative p-6 bg-gradient-to-r from-gray-800/50 to-gray-700/30 hover:from-yellow-400/5 hover:to-blue-500/5 border border-gray-600/30 rounded-xl transition-all duration-300 hover:scale-102"
                                                        style={{
                                                            animationDelay: `${
                                                                index * 150
                                                            }ms`,
                                                        }}
                                                    >
                                                        <div className="flex justify-between items-start mb-4">
                                                            <div className="flex-1">
                                                                <h3 className="text-lg font-semibold text-white mb-2">
                                                                    {task.title}
                                                                </h3>
                                                                {task.description && (
                                                                    <p className="text-gray-400 text-sm mb-3 leading-relaxed">
                                                                        {
                                                                            task.description
                                                                        }
                                                                    </p>
                                                                )}
                                                            </div>
                                                            {isProjectManager && (
                                                                <div className="flex gap-2 opacity-0 group-hover/task:opacity-100 transition-all duration-300">
                                                                    <Link
                                                                        href={route(
                                                                            "tasks.edit",
                                                                            {
                                                                                task: task.id,
                                                                            }
                                                                        )}
                                                                        className="p-2 hover:bg-blue-500/20 rounded-lg text-blue-400 transition-all duration-300"
                                                                    >
                                                                        <PencilSquareIcon className="w-4 h-4" />
                                                                    </Link>
                                                                    <button
                                                                        onClick={() =>
                                                                            handleRemoveTask(
                                                                                task
                                                                            )
                                                                        }
                                                                        className="p-2 hover:bg-red-500/20 rounded-lg text-red-400 transition-all duration-300"
                                                                    >
                                                                        <TrashIcon className="w-4 h-4" />
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div className="flex flex-wrap gap-2">
                                                            <span className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-blue-600/30 text-blue-300 rounded-full text-sm font-medium border border-blue-500/30">
                                                                {task.status}
                                                            </span>
                                                            <span className="px-3 py-1 bg-gradient-to-r from-yellow-400/20 to-yellow-500/30 text-yellow-300 rounded-full text-sm font-medium border border-yellow-400/30">
                                                                {task.phase}
                                                            </span>
                                                            <span className="px-3 py-1 bg-gradient-to-r from-gray-500/20 to-gray-600/30 text-gray-300 rounded-full text-sm font-medium border border-gray-500/30">
                                                                {task
                                                                    .assigned_user
                                                                    ?.name ||
                                                                    "Non assigné"}
                                                            </span>
                                                            <span className="px-3 py-1 bg-gradient-to-r from-indigo-500/20 to-indigo-600/30 text-indigo-300 rounded-full text-sm font-medium border border-indigo-500/30">
                                                                {task.due_date
                                                                    ? formatDate(
                                                                          task.due_date
                                                                      )
                                                                    : "Pas d'échéance"}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modals */}
                <ConfirmationModal
                    isOpen={showUserConfirmationModal}
                    onClose={() => setShowUserConfirmationModal(false)}
                    onConfirm={confirmRemoveUser}
                    title="Confirmer la suppression"
                    message={`Êtes-vous sûr de vouloir supprimer ${userToRemove?.name} du projet ?`}
                />

                <ConfirmationModal
                    isOpen={showTaskConfirmationModal}
                    onClose={() => setShowTaskConfirmationModal(false)}
                    onConfirm={confirmRemoveTask}
                    title="Confirmer la suppression"
                    message={`Êtes-vous sûr de vouloir supprimer la tâche "${taskToRemove?.title}" ?`}
                />

                <ConfirmationModal
                    isOpen={showDeleteConfirmationModal}
                    onClose={() => setShowDeleteConfirmationModal(false)}
                    onConfirm={() => {
                        router.delete(
                            route("projects.destroy", { project: project.id }),
                            {
                                onSuccess: () => {
                                    setShowDeleteConfirmationModal(false);
                                },
                            }
                        );
                    }}
                    title="Confirmer la suppression"
                    message={`Êtes-vous sûr de vouloir supprimer le projet "${project.title}" ?`}
                />
            </div>
        </ProjectLayout>
    );
};

export default Show;