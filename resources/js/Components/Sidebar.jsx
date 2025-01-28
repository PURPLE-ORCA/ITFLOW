import React from 'react';
import ApplicationLogo from './ApplicationLogo';
import { Link, usePage } from '@inertiajs/react';

const Sidebar = () => {
    const user = usePage().props.auth.user;

    return (
        <div className="fixed top-0 h-screen w-14 hover:w-64 bg-transparent backdrop-blur-md transition-all duration-300 overflow-hidden group border-r border-white/10 z-50">
            <ul className="flex flex-col items-center h-full">
                {/* Logo */}
                <li className="w-full h-20 bg-transparent flex items-center justify-center duration-300">
                    <Link href="/">
                        <ApplicationLogo />
                    </Link>
                </li>

                {/* Menu Items */}
                <li className="w-full group">
                    <Link href={route('dashboard')} className="flex items-center p-2 text-yellow-400 hover:text-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-sm shadow-yellow-400 hover:shadow-lg hover:shadow-blue-700 rounded-md">
                        <div className="w-10 h-10 flex items-center justify-center">
                            <i className='bx bxs-dashboard text-2xl'></i>
                        </div>
                        <span className="ml-4 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">Dashboard</span>
                    </Link>
                </li>

                {/* Profile Section */}
                <li className="w-full group flex flex-col items-center mt-auto px-2 py-4">
                    <div className="flex items-center w-full">
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700">
                            <i className='bx bxs-user text-2xl text-yellow-400'></i>
                        </div>
                        <span className="ml-4 text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">{user.name}</span>
                    </div>

                    {/* Dropdown for Profile and Logout */}
                    <div className="w-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Link href={route('profile.edit')} className="flex items-center p-2 text-yellow-400 hover:text-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-sm shadow-yellow-400 hover:shadow-lg hover:shadow-blue-700 rounded-md">
                            <div className="w-10 h-10 flex items-center justify-center">
                                <i className='bx bxs-cog text-2xl'></i>
                            </div>
                            <span className="ml-4 text-sm">Profile</span>
                        </Link>
                        <Link href={route('logout')} method="post" as="button" className="flex items-center p-2 text-yellow-400 hover:text-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-sm shadow-yellow-400 hover:shadow-lg hover:shadow-blue-700 rounded-md">
                            <div className="w-10 h-10 flex items-center justify-center">
                                <i className='bx bxs-log-out text-2xl'></i>
                            </div>
                            <span className="ml-4 text-sm">Logout</span>
                        </Link>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;