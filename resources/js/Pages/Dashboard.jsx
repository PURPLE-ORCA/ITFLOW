import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';



import { DocumentTextIcon, CalendarIcon, ChartBarIcon, PlusCircleIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

export default function Dashboard() {
    const { auth, currentProjects, tasksByStatus, upcomingDeadlines } = usePage().props;
    const user = auth.user;

    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <AuthenticatedLayout>
        <div className="font-poppins bg-gradient-to-br from-blue-900 via-black to-blue-950 min-h-screen text-white p-5">
            {/* Background overlay */}
            <div
                className="fixed bottom-0 right-0 w-1/2 h-full bg-gradient-to-r from-[#FDC03E] to-[#FDCD65] transition-all duration-800 ease-in-out -z-10"
                style={{clipPath: 'polygon(52% 0, 100% 0, 100% 100%, 0% 100%)'}}
            ></div>

            <Head title="Dashboard" />


            <main className="max-w-7xl mx-auto space-y-12">
                {/* Welcome Header */}
                <div className="mb-8">
                    <h2 className="text-4xl font-bold text-white">
                        Welcome back, {user.name}! 👋
                    </h2>
                </div>



                {/* Current Projects Section */}

                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <h3 className="text-2xl font-bold text-white flex items-center">
                                <DocumentTextIcon className="w-7 h-7 mr-3 text-[#FDC03E]" />
                                Active Projects
                                <span className="ml-3 px-3 py-1 bg-blue-600 text-white rounded-full text-sm">
                                    {currentProjects.length}
                                </span>
                            </h3>
                        </div>
                        <div className="flex items-center space-x-4">
                            <a
                                href={route('projects.create')}
                                className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-800 text-white rounded-2xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1"
                            >
                                <PlusCircleIcon className="w-5 h-5 mr-2" />
                                New Project
                            </a>
                        </div>
                    </div>

                    {currentProjects.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {currentProjects.map((project) => (
                                <div
                                    key={project.id}
                                    className="bg-white/10  py-10 backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2"
                                >
                                    <div className="bg-gradient-to-br  from-[#FDC03E] to-blue-800 p-1 rounded-xl text-white">
                                        <div class="bg-black/90 backdrop-blur-xl rounded-lg p-6">
                                        <div className="flex justify-between items-center ">
                                            <h4 className="text-xl font-bold truncate pr-4">{project.title}</h4>
                                            <span className="px-2 py-1 text-xs font-medium bg-red-600/35 rounded-full">
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
                                            <ul className="space-y-2">
                                                {project.tasks.slice(0, 3).map((task) => (
                                                    <li
                                                        key={task.id}
                                                        className="flex items-center text-sm text-white bg-slate-400/10 px-3 py-2 rounded-lg"
                                                    >
                                                        <span className="w-2 h-2 bg-[#FDC03E] rounded-full mr-3"></span>
                                                        <span className="truncate flex-grow">{task.title}</span>
                                                        <span className="ml-auto text-xs text-white/50 capitalize">
                                                            {task.status.replaceAll('_', ' ')}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <a
                                            href={route('projects.show', { project: project.id })}
                                            className="mt-6 w-full flex items-center justify-center px-4 py-2 bg-black/10 text-white rounded-2xl hover:bg-slate-400/20 transition-all"
                                        >
                                            View Project
                                            <ArrowRightIcon className="w-5 h-5 ml-2" />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-12 text-center bg-white/10 backdrop-blur-lg rounded-2xl">
                            <p className="text-white/70 text-lg">
                                No active projects. Time to spark some creativity? 🚀
                            </p>
                        </div>
                    )}
                </div>

                 {/* Dashboard Grid */}
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Tasks by Status Section */}
                    <div className="bg-white/10 backdrop-blur-lg rounded-3xl overflow-hidden">
                        <div className="p-6 bg-gradient-to-r from-blue-600 to-[#FDC03E] text-white">
                            <h3 className="text-2xl font-bold flex items-center">
                                <ChartBarIcon className="w-7 h-7 mr-3 stroke-[2.5]" />
                                Task Overview
                            </h3>
                        </div>

                        {tasksByStatus.length > 0 ? (
                            <div className="grid grid-cols-2 gap-4 p-6">
                                {tasksByStatus.map((taskGroup) => (
                                    <div
                                        key={taskGroup.status}
                                        className="bg-gradient-to-br  from-[#FDC03E] to-blue-800 p-1 rounded-xl  transform transition-all hover:scale-105"
                                    >
                                        <div class="bg-black/70 backdrop-blur-xl rounded-lg p-6">


                                        <div className="flex items-center justify-between  mb-3">
                                            <h4 className="text-md font-semibold text-yellow-300  capitalize">
                                                {taskGroup.status.replaceAll('_', ' ')}
                                            </h4>
                                            <span className="text-2xl font-bold text-[#FDC03E]">
                                                {taskGroup.count}
                                            </span>
                                        </div>

                                        <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                                            <div
                                                className="bg-blue-300 h-2 rounded-full"
                                                style={{
                                                    width: `${(taskGroup.count / tasksByStatus.reduce((sum, t) => sum + t.count, 0)) * 100}%`,
                                                    transition: 'width 0.5s ease-in-out'
                                                }}
                                            ></div>
                                        </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-8 text-center">
                                <p className="text-white/70">No tasks? Creativity loading... 🚀</p>
                            </div>
                        )}
                    </div>

                    {/* Upcoming Deadlines Section */}
                    <div className="bg-white/10 backdrop-blur-lg rounded-3xl overflow-hidden">
                        <div className="p-6 bg-gradient-to-r from-blue-600 to-[#FDC03E] text-white">
                            <h3 className="text-2xl font-bold flex items-center">
                                <CalendarIcon className="w-7 h-7 mr-3 stroke-[2.5]" />
                                Deadline Horizon
                            </h3>
                        </div>

                        {upcomingDeadlines.length > 0 ? (
                            <div className="space-y-4 p-6">
                                {upcomingDeadlines.map((task) => (
                                    <div
                                        key={task.id}
                                        className="bg-gradient-to-br  from-[#FDC03E] to-blue-800  rounded-xl p-1 border-l-4 border-[#FDC03E] transform transition-all hover:scale-105"
                                    >
                                    <div class="bg-black/90 backdrop-blur-xl rounded-lg p-6">

                                        <div className="flex justify-between items-start  mb-3">
                                            <h4 className="text-md font-semibold text-white pr-2 truncate">
                                                {task.title}
                                            </h4>
                                            <span className="px-2 py-1 text-xs font-medium bg-yellow-500/20 text-yellow-300 rounded-full">
                                                Urgent
                                            </span>
                                        </div>

                                        <div className="space-y-1">
                                            <div className="flex items-center text-sm text-white/70">
                                                <CalendarIcon className="w-4 h-4 mr-2 text-[#FDC03E]" />
                                                {formatDate(task.due_date)}
                                            </div>
                                            <a
                                                href={route('projects.show', { project: task.project.id })}
                                                className="flex items-center text-sm text-blue-300 hover:underline truncate"
                                            >
                                                <DocumentTextIcon className="w-4 h-4 mr-2" />
                                                {task.project.title}
                                            </a>
                                        </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-8 text-center">
                                <p className="text-white/70">No deadlines? Smooth sailing! 🌊</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
        </AuthenticatedLayout>
    );
}