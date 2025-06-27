import React, { useState } from 'react';
import ApplicationLogo from './ApplicationLogo';
import { Link, usePage } from '@inertiajs/react';

const Sidebar = () => {
    const user = usePage().props.auth.user;
    const projectId = usePage().props.project?.id || 1;
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    return (
        <nav className="fixed top-0 h-screen w-16 hover:w-64 bg-transparent backdrop-blur-md transition-all duration-300 overflow-hidden group border-r border-white/10 z-50">
            <div className="flex flex-col h-full">
                {/* Section Logo */}
                <div className="w-full h-20 bg-transparent flex items-center justify-center duration-300">
                    <Link
                        href="/"
                        className="flex items-center justify-center w-16 h-16"
                    >
                        <ApplicationLogo className="relative z-10" />
                    </Link>
                </div>

                {/* Section Navigation */}
                <div className="flex-1 overflow-y-auto py-4 space-y-3 px-2">
                    {/* Tableau de bord */}
                    <Link
                        href={route("dashboard")}
                        className="flex items-center p-2 text-yellow-400 hover:text-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-sm shadow-yellow-400 hover:shadow-lg hover:shadow-blue-700 rounded-md group/item"
                    >
                        <i className="bx bxs-dashboard text-2xl text-yellow-400 group-hover/item:text-blue-400"></i>
                        <span className="ml-4 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Tableau de bord
                        </span>
                    </Link>

                    {/* Détails du projet */}
                    <Link
                        href={route("projects.show", { project: projectId })}
                        className="flex items-center p-2 text-yellow-400 hover:text-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-sm shadow-yellow-400 hover:shadow-lg hover:shadow-blue-700 rounded-md group/item"
                    >
                        <i className="bx bxs-folder-open text-2xl text-yellow-400 group-hover/item:text-blue-400"></i>
                        <span className="ml-4 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Détails du projet
                        </span>
                    </Link>

                    {/* Section Phases du projet */}
                    <div className="space-y-2 mt-6">
                        <div className="px-3">
                            <h3 className="text-xs font-semibold text-yellow-400/60 opacity-0 group-hover:opacity-100">
                                PHASES DU PROJET
                            </h3>
                        </div>

                        {/* Analyse */}
                        <Link
                            href={route("projects.phases", {
                                project: projectId,
                                phase: "analysis",
                            })}
                            className="flex items-center p-2 text-yellow-400 hover:text-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-sm shadow-yellow-400 hover:shadow-lg hover:shadow-blue-700 rounded-md group/item"
                        >
                            <i className="bx bxs-bar-chart-alt-2 text-2xl text-yellow-400 group-hover/item:text-blue-400"></i>
                            <span className="ml-4 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                Analyse
                            </span>
                        </Link>

                        {/* Conception */}
                        <Link
                            href={route("projects.phases", {
                                project: projectId,
                                phase: "design",
                            })}
                            className="flex items-center p-2 text-yellow-400 hover:text-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-sm shadow-yellow-400 hover:shadow-lg hover:shadow-blue-700 rounded-md group/item"
                        >
                            <i className="bx bxs-palette text-2xl text-yellow-400 group-hover/item:text-blue-400"></i>
                            <span className="ml-4 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                Conception
                            </span>
                        </Link>

                        {/* Développement */}
                        <Link
                            href={route("projects.phases", {
                                project: projectId,
                                phase: "development",
                            })}
                            className="flex items-center p-2 text-yellow-400 hover:text-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-sm shadow-yellow-400 hover:shadow-lg hover:shadow-blue-700 rounded-md group/item"
                        >
                            <i className="bx bx-code-alt text-2xl text-yellow-400 group-hover/item:text-blue-400"></i>
                            <span className="ml-4 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                Développement
                            </span>
                        </Link>

                        {/* Tests */}
                        <Link
                            href={route("projects.phases", {
                                project: projectId,
                                phase: "testing",
                            })}
                            className="flex items-center p-2 text-yellow-400 hover:text-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-sm shadow-yellow-400 hover:shadow-lg hover:shadow-blue-700 rounded-md group/item"
                        >
                            <i className="bx bxs-bug text-2xl text-yellow-400 group-hover/item:text-blue-400"></i>
                            <span className="ml-4 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                Tests
                            </span>
                        </Link>

                        {/* Finalisation */}
                        <Link
                            href={route("projects.phases", {
                                project: projectId,
                                phase: "wrapping",
                            })}
                            className="flex items-center p-2 text-yellow-400 hover:text-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-sm shadow-yellow-400 hover:shadow-lg hover:shadow-blue-700 rounded-md group/item"
                        >
                            <i className="bx bxs-package text-2xl text-yellow-400 group-hover/item:text-blue-400"></i>
                            <span className="ml-4 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                Finalisation
                            </span>
                        </Link>
                    </div>

                    <div className="mt-6">
                        <div className="px-3">
                            <h3 className="text-xs font-semibold text-yellow-400/60 opacity-0 group-hover:opacity-100">
                                OUTILS
                            </h3>
                        </div>
                        {/* Assistant IA */}
                        <Link
                            href={route("chat.index")}
                            className="flex items-center p-2 text-yellow-400 hover:text-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-sm shadow-yellow-400 hover:shadow-lg hover:shadow-blue-700 rounded-md group/item"
                        >
                            <i className="bx bx-bot text-2xl text-yellow-400 group-hover/item:text-blue-400"></i>
                            <span className="ml-4 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                Assistant IA
                            </span>
                        </Link>

                        {/* Dessins */}
                        <Link
                            href={route("projects.drawings.index", projectId)}
                            className="flex items-center p-2 text-yellow-400 hover:text-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-sm shadow-yellow-400 hover:shadow-lg hover:shadow-blue-700 rounded-md group/item"
                        >
                            <i className="bx bxs-paint text-2xl text-yellow-400 group-hover/item:text-blue-400"></i>
                            <span className="ml-4 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                Dessins
                            </span>
                        </Link>
                    </div>
                </div>

                {/* Section Profil */}
                <div className="mt-auto border-t border-blue-500/20">
                    <div
                        className="relative p-4"
                        onMouseEnter={() => setShowProfileMenu(true)}
                        onMouseLeave={() => setShowProfileMenu(false)}
                    >
                        <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
                                <i className="bx bxs-user text-2xl text-yellow-400"></i>
                            </div>
                            <div className="ml-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                                <p className="text-sm font-semibold text-white">
                                    {user.name}
                                </p>
                                <p className="text-xs text-blue-400">
                                    Administrateur
                                </p>
                            </div>
                        </div>

                        {/* Menu Profil */}
                        <div
                            className={`absolute bottom-full left-4 right-4 bg-black/95 backdrop-blur-xl rounded-2xl border border-blue-500/20 shadow-2xl transition-all duration-300 ${
                                showProfileMenu
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-4 pointer-events-none"
                            }`}
                        >
                            <Link
                                href={route("profile.edit")}
                                className="flex items-center px-6 py-4 hover:bg-yellow-400/10 transition-colors rounded-t-2xl border-b border-blue-500/10"
                            >
                                <i className="bx bxs-cog text-xl text-yellow-400"></i>
                                <span className="ml-4 text-sm text-white">
                                    Paramètres du profil
                                </span>
                            </Link>
                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="w-full flex items-center px-6 py-4 hover:bg-blue-500/10 transition-colors rounded-b-2xl"
                            >
                                <i className="bx bxs-log-out text-xl text-blue-400"></i>
                                <span className="ml-4 text-sm text-white">
                                    Déconnexion
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Sidebar;