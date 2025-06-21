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
            {/* Sidebar Navigation */}
           <nav className="fixed top-0 left-0 right-0 h-20 bg-transparent backdrop-blur-md transition-all duration-300 border-b border-white/10 z-50">
                <div className="flex items-center justify-between h-full px-8">
                    {/* Logo Section */}
                    <div className="flex items-center">
                        <Link
                            href="/"
                            className="flex items-center justify-center w-16 h-16"
                        >
                            <ApplicationLogo className="relative z-10" />
                        </Link>
                    </div>

                   

                    {/* Right Section - New Project Button and Profile */}
                    <div className="flex items-center space-x-4">


                        {/* Profile Section */}
                        <div
                            className="relative"
                            onMouseEnter={() => setShowProfileMenu(true)}
                            onMouseLeave={() => setShowProfileMenu(false)}
                        >
                            <div className="flex items-center p-2 hover:bg-blue-500/10 rounded-xl transition-all duration-300">
                                <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
                                    <i className="bx bxs-user text-2xl text-yellow-400"></i>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-semibold text-white">
                                        {user.name}
                                    </p>
                                    <p className="text-xs text-blue-400">
                                        Administrator
                                    </p>
                                </div>
                            </div>

                            {/* Profile Menu */}
                            <div
                                className={`absolute top-full right-0 mt-2 bg-black/95 backdrop-blur-xl rounded-2xl border border-blue-500/20 shadow-2xl transition-all duration-300 ${
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
                                        Profile Settings
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
                                        Sign Out
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>




            <Head title="Dashboard" />

            {/* Background */}
            <div className="fixed inset-0 bg-gradient-to-br from-blue-800 via-black to-blue-800 -z-10">
                {/* Animated Background Elements */}
                <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-400/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <main className="min-h-screen pt-24 transition-all duration-500">
                {/* Header Section */}
                <div className="p-8 pb-6">
                    <div className="relative max-w-7xl mx-auto">
                        <div className="bg-gradient-to-r from-black/80 to-blue-950/80 backdrop-blur-xl rounded-3xl border border-yellow-400/20 p-8 shadow-2xl shadow-yellow-400/5 overflow-hidden">
                            {/* Background Pattern */}
                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 to-blue-500/5"></div>
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-yellow-400/10 to-transparent rounded-full blur-3xl"></div>

                            <div className="relative z-10 flex justify-between items-center">
                                <div>
                                    <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-blue-400 bg-clip-text text-transparent mb-2">
                                        Welcome back
                                    </h1>
                                    <p className="text-2xl text-white/80">
                                        {user.name}
                                        <span className="ml-3 text-3xl">
                                            👋
                                        </span>
                                    </p>
                                </div>
                                <Link
                                    href={route("projects.create")}
                                    className="group relative flex items-center px-8 py-4 bg-gradient-to-r from-yellow-400 to-blue-500 text-black font-semibold rounded-2xl shadow-lg  transition-all duration-300 transform hover:scale-105"
                                >
<PlusCircleIcon className="w-5 h-5 text-black bx bx-plus text-xl mr-2 group-hover:rotate-180 transition-transform duration-500" />                                    <span>New Project</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="px-8">
                    <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8">
                        {/* Projects Section */}
                        <div className="col-span-12 lg:col-span-8">
                            {/* Projects Header */}
                            <div className="mb-8">
                                <div className="bg-black/40 backdrop-blur-xl rounded-3xl border border-blue-500/20 p-6 shadow-xl">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-blue-500 rounded-2xl flex items-center justify-center mr-4">
                                                <DocumentTextIcon className="w-6 h-6 text-black" />
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-bold text-white">
                                                    Active Projects
                                                </h2>
                                                <p className="text-blue-400">
                                                    Manage your ongoing work
                                                </p>
                                            </div>
                                        </div>
                                        <div className="bg-gradient-to-r from-yellow-400/20 to-blue-500/20 backdrop-blur-sm rounded-2xl px-6 py-3 border border-yellow-400/30">
                                            <span className="text-2xl font-bold text-yellow-400">
                                                {currentProjects.length}
                                            </span>
                                            <span className="text-sm text-white/70 ml-2">
                                                projects
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Projects Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {currentProjects.map((project) => (
                                    <div
                                        key={project.id}
                                        className="group relative bg-black/60 backdrop-blur-xl rounded-3xl border border-blue-500/20 overflow-hidden transition-all duration-500 hover:border-yellow-400/40 hover:shadow-2xl hover:shadow-yellow-400/10 hover:scale-[1.02]"
                                    >
                                        {/* Card Background Effect */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                        {/* Header */}
                                        <div className="relative z-10 p-6 border-b border-blue-500/20">
                                            <div className="flex justify-between items-start mb-3">
                                                <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors truncate pr-4">
                                                    {project.title}
                                                </h3>
                                                <span className="px-3 py-1 text-xs font-medium bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30">
                                                    {project.status}
                                                </span>
                                            </div>
                                            <p className="text-white/60 text-sm line-clamp-2">
                                                {project.description ||
                                                    "No description available"}
                                            </p>
                                        </div>

                                        {/* Tasks */}
                                        <div className="relative z-10 p-6">
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="text-blue-400 font-medium">
                                                    Recent Tasks
                                                </span>
                                                <span className="text-yellow-400 font-semibold">
                                                    {project.tasks.length} tasks
                                                </span>
                                            </div>

                                            <div className="space-y-3 mb-6">
                                                {project.tasks
                                                    .slice(0, 3)
                                                    .map((task) => (
                                                        <div
                                                            key={task.id}
                                                            className="flex items-center bg-black/40 backdrop-blur-sm rounded-xl p-3 border border-blue-500/10 hover:border-yellow-400/20 transition-colors"
                                                        >
                                                            <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-blue-500 rounded-full mr-3"></div>
                                                            <span className="text-white/90 truncate flex-grow text-sm">
                                                                {task.title}
                                                            </span>
                                                            <span className="ml-3 text-xs text-blue-400 capitalize px-2 py-1 bg-blue-500/10 rounded-full">
                                                                {task.status.replaceAll(
                                                                    "_",
                                                                    " "
                                                                )}
                                                            </span>
                                                        </div>
                                                    ))}
                                            </div>

                                            <Link
                                                href={route("projects.show", {
                                                    project: project.id,
                                                })}
                                                className="block w-full text-center py-3 bg-gradient-to-r from-transparent to-transparent hover:from-yellow-400/20 hover:to-blue-500/20 text-white hover:text-yellow-400 rounded-2xl border border-blue-500/20 hover:border-yellow-400/40 transition-all duration-300 font-medium"
                                            >
                                                View Project →
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Sidebar */}
                        <div className="col-span-12 lg:col-span-4 space-y-8">
                            {/* Task Overview */}
                            <div className="bg-black/60 backdrop-blur-xl rounded-3xl border border-blue-500/20 overflow-hidden shadow-xl">
                                <div className="p-6 border-b border-blue-500/20 bg-gradient-to-r from-blue-500/10 to-yellow-400/10">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-blue-500 rounded-xl flex items-center justify-center mr-3">
                                            <ChartBarIcon className="w-5 h-5 text-black" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white">
                                                Task Overview
                                            </h3>
                                            <p className="text-blue-400 text-sm">
                                                Progress tracking
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 space-y-6">
                                    {tasksByStatus.map((taskGroup) => (
                                        <div
                                            key={taskGroup.status}
                                            className="space-y-3"
                                        >
                                            <div className="flex justify-between items-center">
                                                <span className="text-white font-medium capitalize">
                                                    {taskGroup.status.replaceAll(
                                                        "_",
                                                        " "
                                                    )}
                                                </span>
                                                <span className="text-yellow-400 font-bold text-lg">
                                                    {taskGroup.count}
                                                </span>
                                            </div>
                                            <div className="relative w-full bg-black/40 rounded-full h-3 overflow-hidden">
                                                <div
                                                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-400 to-blue-500 rounded-full transition-all duration-1000 ease-out shadow-lg shadow-yellow-400/30"
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
                            <div className="bg-black/60 backdrop-blur-xl rounded-3xl border border-blue-500/20 overflow-hidden shadow-xl">
                                <div className="p-6 border-b border-blue-500/20 bg-gradient-to-r from-yellow-400/10 to-blue-500/10">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-blue-500 rounded-xl flex items-center justify-center mr-3">
                                            <CalendarIcon className="w-5 h-5 text-black" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white">
                                                Upcoming Deadlines
                                            </h3>
                                            <p className="text-blue-400 text-sm">
                                                Stay on track
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 space-y-4">
                                    {upcomingDeadlines.map((task) => (
                                        <div
                                            key={task.id}
                                            className="group relative bg-black/40 backdrop-blur-sm rounded-2xl p-4 border border-blue-500/10 hover:border-yellow-400/30 transition-all duration-300 hover:bg-gradient-to-r hover:from-yellow-400/5 hover:to-blue-500/5"
                                        >
                                            <div className="flex justify-between items-start mb-3">
                                                <h4 className="font-semibold text-white group-hover:text-yellow-400 transition-colors truncate pr-2 text-sm">
                                                    {task.title}
                                                </h4>
                                                <span className="px-3 py-1 text-xs bg-gradient-to-r from-yellow-400/20 to-blue-500/20 text-yellow-300 rounded-full border border-yellow-400/30 whitespace-nowrap">
                                                    {formatDate(task.due_date)}
                                                </span>
                                            </div>
                                            <Link
                                                href={route("projects.show", {
                                                    project: task.project.id,
                                                })}
                                                className="text-sm text-blue-400 hover:text-blue-300 truncate block transition-colors"
                                            >
                                                📁 {task.project.title}
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
