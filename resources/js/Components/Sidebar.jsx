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
                {/* Logo Section */}
                <div className="w-full h-20 bg-transparent flex items-center justify-center duration-300">
                    <Link href="/" className="flex items-center justify-center w-16 h-16">
                        <ApplicationLogo className="relative z-10" />
                    </Link>
                </div>

                {/* Navigation Section */}
                <div className="flex-1 overflow-y-auto py-4 space-y-3 px-2">
                    {/* Dashboard */}
                    <Link href={route('dashboard')} className="flex items-center p-2 text-yellow-400 hover:text-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-sm shadow-yellow-400 hover:shadow-lg hover:shadow-blue-700 rounded-md group/item">
                        <i className='bx bxs-dashboard text-2xl text-yellow-400 group-hover/item:text-blue-400'></i>
                        <span className="ml-4 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">Dashboard</span>
                    </Link>

                    {/* Project Details */}
                    <Link href={route('projects.show', { project: projectId })} className="flex items-center p-2 text-yellow-400 hover:text-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-sm shadow-yellow-400 hover:shadow-lg hover:shadow-blue-700 rounded-md group/item">
                        <i className='bx bxs-folder-open text-2xl text-yellow-400 group-hover/item:text-blue-400'></i>
                        <span className="ml-4 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">Project Details</span>
                    </Link>

                    {/* Project Phases Section */}
                    <div className="space-y-2 mt-6">
                        <div className="px-3">
                            <h3 className="text-xs font-semibold text-yellow-400/60 opacity-0 group-hover:opacity-100">PROJECT PHASES</h3>
                        </div>

                        {/* Analysis */}
                        <Link href={route('projects.phases', { project: projectId, phase: 'analysis' })} className="flex items-center p-2 text-yellow-400 hover:text-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-sm shadow-yellow-400 hover:shadow-lg hover:shadow-blue-700 rounded-md group/item">
                            <i className='bx bxs-bar-chart-alt-2 text-2xl text-yellow-400 group-hover/item:text-blue-400'></i>
                            <span className="ml-4 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">Analysis</span>
                        </Link>

                        {/* Design */}
                        <Link href={route('projects.phases', { project: projectId, phase: 'design' })} className="flex items-center p-2 text-yellow-400 hover:text-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-sm shadow-yellow-400 hover:shadow-lg hover:shadow-blue-700 rounded-md group/item">
                            <i className='bx bxs-palette text-2xl text-yellow-400 group-hover/item:text-blue-400'></i>
                            <span className="ml-4 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">Design</span>
                        </Link>

                        {/* Development */}
                        <Link href={route('projects.phases', { project: projectId, phase: 'development' })} className="flex items-center p-2 text-yellow-400 hover:text-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-sm shadow-yellow-400 hover:shadow-lg hover:shadow-blue-700 rounded-md group/item">
                            <i className='bx bx-code-alt text-2xl text-yellow-400 group-hover/item:text-blue-400'></i>
                            <span className="ml-4 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">Development</span>
                        </Link>

                        {/* Testing */}
                        <Link href={route('projects.phases', { project: projectId, phase: 'testing' })} className="flex items-center p-2 text-yellow-400 hover:text-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-sm shadow-yellow-400 hover:shadow-lg hover:shadow-blue-700 rounded-md group/item">
                            <i className='bx bxs-bug text-2xl text-yellow-400 group-hover/item:text-blue-400'></i>
                            <span className="ml-4 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">Testing</span>
                        </Link>

                        {/* Wrapping */}
                        <Link href={route('projects.phases', { project: projectId, phase: 'wrapping' })} className="flex items-center p-2 text-yellow-400 hover:text-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-sm shadow-yellow-400 hover:shadow-lg hover:shadow-blue-700 rounded-md group/item">
                            <i className='bx bxs-package text-2xl text-yellow-400 group-hover/item:text-blue-400'></i>
                            <span className="ml-4 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">Wrapping</span>
                        </Link>
                    </div>

                    {/* AI Assistant */}
                    <Link href={route('chat.index')} className="flex items-center p-2 text-yellow-400 hover:text-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-sm shadow-yellow-400 hover:shadow-lg hover:shadow-blue-700 rounded-md group/item">
                        <i className='bxr bx-robot text-2xl text-yellow-400 group-hover/item:text-blue-400'></i>
                        <span className="ml-4 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">AI Assistant</span>
                    </Link>
                </div>

                {/* Profile Section */}
                <div className="mt-auto">
                    <div
                        className="relative px-2 py-4 5"
                        onMouseEnter={() => setShowProfileMenu(true)}
                        onMouseLeave={() => setShowProfileMenu(false)}
                    >
                        <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
                                <i className='bx bxs-user text-2xl text-yellow-400'></i>
                            </div>
                            <div className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <p className="text-sm font-medium text-yellow-400">{user.name}</p>
                                <p className="text-xs text-blue-400">Admin</p>
                            </div>
                        </div>

                        {/* Profile Menu */}
                        <div className={`absolute bottom-full left-0 w-full bg-gray-800/95 backdrop-blur-lg rounded-t-xl overflow-hidden transition-all duration-300 ${showProfileMenu ? 'block' : 'hidden'}`}>
                            <Link href={route('profile.edit')} className="flex items-center px-4 py-3 hover:bg-yellow-400/20 transition-colors">
                                <i className='bx bxs-cog text-xl text-yellow-400'></i>
                                <span className="ml-3 text-sm text-yellow-400">Profile Settings</span>
                            </Link>
                            <Link href={route('logout')} method="post" as="button" className="w-full flex items-center px-4 py-3 hover:bg-blue-700/20 transition-colors">
                                <i className='bx bxs-log-out text-xl text-blue-400'></i>
                                <span className="ml-3 text-sm text-blue-400">Sign Out</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Sidebar;
