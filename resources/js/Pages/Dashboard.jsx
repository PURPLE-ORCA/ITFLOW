import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link } from '@inertiajs/react';
import { DocumentTextIcon, CalendarIcon, ChartBarIcon, PlusCircleIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

export default function Dashboard() {
    const { auth, currentProjects, tasksByStatus, upcomingDeadlines } = usePage().props;
    const user = auth.user;

    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Welcome back, {user.name}! 👋
                </h2>
            }
        >
            <Head title="Dashboard" />
            
            <main className="p-6 max-w-7xl mx-auto space-y-12">
                {/* Current Projects Section */}
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center">
                                <DocumentTextIcon className="w-6 h-6 mr-2 text-blue-500" />
                                Active Projects
                            </h3>
                            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                                {currentProjects.length} ongoing
                            </span>
                        </div>
                        {/* In the Current Projects section header */}
                        <div className="flex items-center space-x-4">
                            <Link
                                href={route('projects.create')} 
                                className="flex items-center px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-lg transition-colors"
                            >
                                <PlusCircleIcon className="w-5 h-5 mr-2" />
                                New Project
                            </Link>
                            <Link
                                href={route('projects.index')} // Changed from projects.show to projects.index
                                className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                                View All
                                <ArrowRightIcon className="w-4 h-4 ml-2" />
                            </Link>
                        </div>
                    </div>
                    
                    {currentProjects.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {currentProjects.map((project) => (
                                <div 
                                    key={project.id} 
                                    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                                            {project.title}
                                        </h4>
                                        <span className="px-2 py-1 text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full">
                                            {project.status}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">
                                        {project.description || 'No description'}
                                    </p>
                                    
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-500 dark:text-gray-400">Recent Tasks</span>
                                            <span className="text-blue-600 dark:text-blue-400">
                                                {project.tasks.length} tasks
                                            </span>
                                        </div>
                                        <ul className="space-y-2">
                                            {project.tasks.slice(0, 3).map((task) => (
                                                <li 
                                                    key={task.id} 
                                                    className="flex items-center text-sm text-gray-700 dark:text-gray-300"
                                                >
                                                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                                                    <span className="truncate">{task.title}</span>
                                                    <span className="ml-auto text-xs text-gray-500 dark:text-gray-400 capitalize">
                                                        {task.status.replaceAll('_', ' ')}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    
                                    <Link
                                        href={route('projects.show', { project: project.id })} 
                                        className="mt-6 w-full flex items-center justify-center px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300"
                                    >
                                        View Project
                                        <ArrowRightIcon className="w-4 h-4 ml-2" />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-8 text-center bg-gray-50 dark:bg-gray-900 rounded-xl">
                            <p className="text-gray-600 dark:text-gray-400">
                                No active projects. Time to Netflix and chill? 🍿
                            </p>
                        </div>
                    )}
                </div>

                {/* Tasks by Status Section */}
                <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center">
                        <ChartBarIcon className="w-6 h-6 mr-2 text-purple-500" />
                        Task Overview
                    </h3>
                    {tasksByStatus.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {tasksByStatus.map((taskGroup) => (
                                <div 
                                    key={taskGroup.status} 
                                    className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-800 shadow-sm"
                                >
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-lg font-medium capitalize text-gray-800 dark:text-gray-200">
                                            {taskGroup.status.replaceAll('_', ' ')}
                                        </h4>
                                        <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                                            {taskGroup.count}
                                        </span>
                                    </div>
                                    <div className="mt-4 h-2 bg-gray-200 dark:bg-gray-600 rounded-full">
                                        <div 
                                            className="h-2 bg-blue-500 rounded-full" 
                                            style={{ width: `${(taskGroup.count / tasksByStatus.reduce((sum, t) => sum + t.count, 0)) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-8 text-center bg-gray-50 dark:bg-gray-900 rounded-xl">
                            <p className="text-gray-600 dark:text-gray-400">
                                No tasks? Are you even working? 😅
                            </p>
                        </div>
                    )}
                </div>

                {/* Upcoming Deadlines Section */}
                <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center">
                        <CalendarIcon className="w-6 h-6 mr-2 text-red-500" />
                        Upcoming Deadlines
                    </h3>
                    {upcomingDeadlines.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {upcomingDeadlines.map((task) => (
                                <div 
                                    key={task.id} 
                                    className="group p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-red-100 dark:border-red-900/50"
                                >
                                    <div className="flex justify-between items-start">
                                        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                                            {task.title}
                                        </h4>
                                        <span className="px-2 py-1 text-xs font-medium bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-full">
                                            Due Soon
                                        </span>
                                    </div>
                                    <div className="mt-4 space-y-2">
                                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                            <CalendarIcon className="w-4 h-4 mr-2 text-red-500" />
                                            {formatDate(task.due_date)}
                                        </div>
                                        <Link 
                                            href={route('projects.show', { project: task.project.id })}
                                            className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline"
                                        >
                                            <DocumentTextIcon className="w-4 h-4 mr-2" />
                                            {task.project.title}
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-8 text-center bg-gray-50 dark:bg-gray-900 rounded-xl">
                            <p className="text-gray-600 dark:text-gray-400">
                                No deadlines? Living the life, huh? 😎
                            </p>
                        </div>
                    )}
                </div>
            </main>
        </AuthenticatedLayout>
    );
}