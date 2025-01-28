import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link } from '@inertiajs/react'; // Import Link from Inertia

export default function Dashboard() {
    const { auth, currentProjects, tasksByStatus, upcomingDeadlines } = usePage().props;
    const user = auth.user;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-4xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Welcome to your dashboard, {user.name}!
                </h2>            }
        >
            <Head title="Dashboard" />
            
            <main className="p-6">
                {/* Current Projects Section */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-2xl font-bold">Your Current Projects</h3>
                        {/* Add the Link here */}
                        <Link
                            // href={route('projects.show')} 
                            className=""
                        >
                            View All Projects <i class='bx bx-right-arrow-alt'></i>
                        </Link>
                    </div>
                    <div className='mb-4 ml-4'>
                        <Link
                                href={route('projects.create')} 
                                className=""
                            >
                                <i class='bx bxs-plus-circle' ></i> create a new project 
                        </Link>
                    </div>
                    {currentProjects.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {currentProjects.map((project) => (
                                <div key={project.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                                    <h4 className="text-xl font-semibold mb-2">{project.title}</h4>
                                    <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                                    <h5 className="font-medium mb-2">Recent Tasks:</h5>
                                    <ul>
                                        {project.tasks.map((task) => (
                                            <li key={task.id} className="text-sm text-gray-700 dark:text-gray-300">
                                                {task.title && task.title} - {task.status && task.status.replaceAll('_', ' ')}
                                            </li>
                                        ))}
                                    </ul>
                                    <Link
                                        href={route('projects.show', { project: project.id })} 
                                        className=""
                                    >
                                        Enter Project <i class='bx bx-right-arrow-alt'></i>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-600 dark:text-gray-400">No active projects. Time to Netflix and chill?</p>
                    )}
                </div>

                {/* Tasks by Status Section */}
                <div className="mb-8">
                    <h3 className="text-2xl font-bold mb-4">Your Tasks by Status</h3>
                    {tasksByStatus.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {tasksByStatus.map((taskGroup) => (
                                <div key={taskGroup.status} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                                    <h4 className="text-xl font-semibold mb-2 uppercase">{taskGroup.status && taskGroup.status.replaceAll('_', ' ')}</h4>
                                    <p className="text-3xl font-bold">{taskGroup.count}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-600 dark:text-gray-400">No tasks? Are you even working?</p>
                    )}
                </div>

                {/* Upcoming Deadlines Section */}
                <div className="mb-8">
                    <h3 className="text-2xl font-bold mb-4">Upcoming Deadlines</h3>
                    {upcomingDeadlines.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {upcomingDeadlines.map((task) => (
                                <div key={task.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                                    <h4 className="text-xl font-semibold mb-2">{task.title}</h4>
                                    <p className="text-gray-600 dark:text-gray-400 mb-2">Due: {new Date(task.due_date).toLocaleDateString()}</p>
                                    <p className="text-sm text-gray-700 dark:text-gray-300">Project: {task.project.title}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-600 dark:text-gray-400">No deadlines? Living the life, huh?</p>
                    )}
                </div>
            </main>
        </AuthenticatedLayout>
    );
}