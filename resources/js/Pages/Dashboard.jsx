import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { DocumentTextIcon, CalendarIcon, ChartBarIcon, PlusCircleIcon } from '@heroicons/react/24/outline';

export default function Dashboard() {
    const { auth, currentProjects, tasksByStatus, upcomingDeadlines } = usePage().props;
    const user = auth.user;

    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            {/* Background Gradient */}
            <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 -z-10" />
               {/* Overlay en clip-path */}
        <div
          className="fixed bottom-0 right-0 w-full h-full bg-gradient-to-r from-[#FDCD65] to-[#FDC03E] transition-all duration-800 ease-in-out -z-10 pointer-events-none"
          style={{ clipPath: "polygon(52% 0, 100% 0, 100% 100%, 0% 00%)" }}
        ></div>

            <main className="min-h-screen p-8">
                {/* Header Section */}
                <div className="max-w-7xl mx-auto mb-12">
                    <div className="flex justify-between items-center bg-white/10 backdrop-blur-xl p-8 rounded-2xl">
                        <h2 className="text-4xl font-bold text-white">
                            Welcome back, {user.name}! 👋
                        </h2>
                        <a
                            href={route('projects.create')}
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
                                                <h4 className="text-xl font-bold text-white truncate">{project.title}</h4>
                                                <span className="px-3 py-1 text-xs font-medium bg-red-500/20 text-red-300 rounded-full">
                                                    {project.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <p className="text-white/70 mb-6 line-clamp-3">
                                            {project.description || 'No description available'}
                                        </p>

                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-cyan-400/70">Recent Tasks</span>
                                                <span className="text-[#FDC03E]">
                                                    {project.tasks.length} tasks
                                                </span>
                                            </div>
                                            <div className="space-y-3">
                                                {project.tasks.slice(0, 3).map((task) => (
                                                    <div
                                                        key={task.id}
                                                        className="flex items-center bg-black/20 rounded-lg p-3"
                                                    >
                                                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                                                        <span className="text-white/90 truncate flex-grow">{task.title}</span>
                                                        <span className="ml-3 text-xs text-white/50 capitalize">
                                                            {task.status.replaceAll('_', ' ')}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                            <a
                                                href={route('projects.show', { project: project.id })}
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
                                    <div key={taskGroup.status} className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-white/70 capitalize">
                                                {taskGroup.status.replaceAll('_', ' ')}
                                            </span>
                                            <span className="text-white font-bold">{taskGroup.count}</span>
                                        </div>
                                        <div className="w-full bg-white/10 rounded-full h-2">
                                            <div
                                                className="bg-blue-500 h-2 rounded-full transition-all"
                                                style={{
                                                    width: `${(taskGroup.count / tasksByStatus.reduce((sum, t) => sum + t.count, 0)) * 100}%`
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
                                            href={route('projects.show', { project: task.project.id })}
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
        </AuthenticatedLayout>
    );
}
