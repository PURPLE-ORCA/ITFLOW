import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, Link } from "@inertiajs/react";
import {
    DocumentTextIcon,
    CalendarIcon,
    ChartBarIcon,
    PlusCircleIcon,
} from "@heroicons/react/24/outline";
import ProjectLayout from "@/Layouts/ProjectLayout";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { useState } from "react";

export default function Dashboard() {
    const { auth, currentProjects, tasksByStatus, upcomingDeadlines } =
        usePage().props;
    const user = auth.user;
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const formatDate = (dateString) => {
        const options = { day: "numeric", month: "short", year: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <>
            <Head title="Dashboard" />

            <nav className="fixed top-0 h-screen w-16 hover:w-64 bg-transparent backdrop-blur-md transition-all duration-300 overflow-hidden group border-r border-white/10 z-50">
                <div className="flex flex-col h-full">
                    {/* Logo Section */}
                    <div className="w-full h-20 bg-transparent flex items-center justify-center duration-300">
                        <Link
                            href="/"
                            className="flex items-center justify-center w-16 h-16"
                        >
                            <ApplicationLogo className="relative z-10" />
                        </Link>
                    </div>

                    {/* Navigation Section */}
                    <div className="flex-1 overflow-y-auto py-4 space-y-3 px-2">
                        {/* Dashboard */}
                        <Link
                            href={route("dashboard")}
                            className="flex items-center p-2 text-yellow-400 hover:text-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-sm shadow-yellow-400 hover:shadow-lg hover:shadow-blue-700 rounded-md group/item"
                        >
                            <i className="bx bxs-dashboard text-2xl text-yellow-400 group-hover/item:text-blue-400"></i>
                            <span className="ml-4 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                Dashboard
                            </span>
                        </Link>

                        {/* Project Details */}

                        {/* Project Phases Section */}
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
                                    <i className="bx bxs-user text-2xl text-yellow-400"></i>
                                </div>
                                <div className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <p className="text-sm font-medium text-yellow-400">
                                        {user.name}
                                    </p>
                                    <p className="text-xs text-blue-400">
                                        Admin
                                    </p>
                                </div>
                            </div>

                            {/* Profile Menu */}
                            <div
                                className={`absolute bottom-full left-0 w-full bg-gray-800/95 backdrop-blur-lg rounded-t-xl overflow-hidden transition-all duration-300 ${
                                    showProfileMenu ? "block" : "hidden"
                                }`}
                            >
                                <Link
                                    href={route("profile.edit")}
                                    className="flex items-center px-4 py-3 hover:bg-yellow-400/20 transition-colors"
                                >
                                    <i className="bx bxs-cog text-xl text-yellow-400"></i>
                                    <span className="ml-3 text-sm text-yellow-400">
                                        Profile Settings
                                    </span>
                                </Link>
                                <Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                    className="w-full flex items-center px-4 py-3 hover:bg-blue-700/20 transition-colors"
                                >
                                    <i className="bx bxs-log-out text-xl text-blue-400"></i>
                                    <span className="ml-3 text-sm text-blue-400">
                                        Sign Out
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Background Gradient */}
            <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 -z-10" />

            <main className="min-h-screen p-5 pl-10">
                {/* Header Section */}
                <div className="max-w-7xl mx-auto mb-12 pl-5">
                    <div className="flex justify-between items-center  bg-gradient-to-r from-amber-400/45 to-[#FDC03E]  p-8 rounded-2xl">
                        <h2 className="text-4xl font-bold text-white">
                            Welcome back, {user.name}! 👋
                        </h2>
                        <a
                            href={route("projects.create")}
                            className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg transition-all"
                        >
                            <PlusCircleIcon className="w-5 h-5 mr-2" />
                            New Project
                        </a>
                    </div>
                </div>

                {/* Main Grid Layout */}
                <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8">
                    {/* Projects Section - Spans 8 columns */}
                    <div className="col-span-12 lg:col-span-8 space-y-6">
                        <div className="bg-gradient-to-br from-[#FDC03E] to-blue-800 p-1 rounded-xl text-white mb-6">
                            <div className="bg-black/90 backdrop-blur-xl rounded-lg p-6">
                                <div className="flex items-center space-x-4">
                                    <h3 className="text-2xl font-bold flex items-center">
                                        <DocumentTextIcon className="w-7 h-7 mr-3 text-blue-400" />
                                        Active Projects
                                        <span className="ml-3 px-3 py-1 bg-blue-600 text-white rounded-full text-sm">
                                            {currentProjects.length}
                                        </span>
                                    </h3>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {currentProjects.map((project) => (
                                <div
                                    key={project.id}
                                    className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 rounded-xl overflow-hidden transition-all hover:transform hover:scale-102 "
                                >
                                    <div className="bg-gradient-to-br from-[#FDC03E] to-blue-800 p-1 rounded-xl text-white mb-2">
                                        <div className="bg-black/90 backdrop-blur-xl rounded-lg p-4">
                                            <div className="flex justify-between items-center">
                                                <h4 className="text-xl font-bold text-white truncate">
                                                    {project.title}
                                                </h4>
                                                <span className="px-3 py-1 text-xs font-medium bg-red-500/20 text-red-300 rounded-full">
                                                    {project.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <p className="text-white/70 mb-6 line-clamp-3">
                                            {project.description ||
                                                "No description available"}
                                        </p>

                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-cyan-400/70">
                                                    Recent Tasks
                                                </span>
                                                <span className="text-[#FDC03E]">
                                                    {project.tasks.length} tasks
                                                </span>
                                            </div>
                                            <div className="space-y-3">
                                                {project.tasks
                                                    .slice(0, 3)
                                                    .map((task) => (
                                                        <div
                                                            key={task.id}
                                                            className="flex items-center bg-black/20 rounded-lg p-3"
                                                        >
                                                            <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                                                            <span className="text-white/90 truncate flex-grow">
                                                                {task.title}
                                                            </span>
                                                            <span className="ml-3 text-xs text-white/50 capitalize">
                                                                {task.status.replaceAll(
                                                                    "_",
                                                                    " "
                                                                )}
                                                            </span>
                                                        </div>
                                                    ))}
                                            </div>
                                            <a
                                                href={route("projects.show", {
                                                    project: project.id,
                                                })}
                                                className="mt-6 w-full flex items-center justify-center px-4 py-2 bg-blue-600/20 text-white rounded-2xl hover:bg-blue-600/10 transition-all"
                                            >
                                                View Project
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Sidebar - Spans 4 columns */}
                    <div className="col-span-12 lg:col-span-4 space-y-8">
                        {/* Task Overview */}
                        <div className="bg-white/10 backdrop-blur-xl rounded-xl overflow-hidden">
                            <div className="p-6 border-b border-white/10 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
                                <h3 className="text-xl font-bold text-white flex items-center">
                                    <ChartBarIcon className="w-6 h-6 mr-2 text-blue-400" />
                                    Task Overview
                                </h3>
                            </div>
                            <div className="p-6 space-y-4">
                                {tasksByStatus.map((taskGroup) => (
                                    <div
                                        key={taskGroup.status}
                                        className="space-y-2"
                                    >
                                        <div className="flex justify-between items-center">
                                            <span className="text-white/70 capitalize">
                                                {taskGroup.status.replaceAll(
                                                    "_",
                                                    " "
                                                )}
                                            </span>
                                            <span className="text-white font-bold">
                                                {taskGroup.count}
                                            </span>
                                        </div>
                                        <div className="w-full bg-white/10 rounded-full h-2">
                                            <div
                                                className="bg-blue-500 h-2 rounded-full transition-all"
                                                style={{
                                                    width: `${
                                                        (taskGroup.count /
                                                            tasksByStatus.reduce(
                                                                (sum, t) =>
                                                                    sum +
                                                                    t.count,
                                                                0
                                                            )) *
                                                        100
                                                    }%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Upcoming Deadlines */}
                        <div className="bg-white/10 backdrop-blur-xl rounded-xl overflow-hidden">
                            <div className="p-6 border-b border-white/10 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
                                <h3 className="text-xl font-bold text-white flex items-center">
                                    <CalendarIcon className="w-6 h-6 mr-2 text-blue-400" />
                                    Upcoming Deadlines
                                </h3>
                            </div>
                            <div className="p-6 space-y-4">
                                {upcomingDeadlines.map((task) => (
                                    <div
                                        key={task.id}
                                        className="bg-gradient-to-br from-[#FDC03E] to-blue-800 rounded-lg p-1 hover:bg-black/30 transition-all"
                                    >
                                        <div className="bg-black/80 backdrop-blur-xl rounded-lg p-6">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-medium text-white truncate pr-2">
                                                    {task.title}
                                                </h4>
                                                <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-300 rounded-full">
                                                    {formatDate(task.due_date)}
                                                </span>
                                            </div>
                                            <a
                                                href={route("projects.show", {
                                                    project: task.project.id,
                                                })}
                                                className="text-sm text-blue-400 hover:text-blue-300 truncate block"
                                            >
                                                {task.project.title}
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
