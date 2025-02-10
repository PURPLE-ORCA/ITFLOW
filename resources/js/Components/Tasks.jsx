import React, { useContext, useState } from 'react';
import { ProjectContext } from '@/contexts/ProjectContext';
import { usePage } from '@inertiajs/react';
import {
  CheckCircleIcon,
  ClockIcon,
  UserCircleIcon,
  CalendarIcon,
  DocumentTextIcon,
  ExclamationCircleIcon,
  BeakerIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

const Tasks = () => {
  const { pendingTasks = [], finishedTasks = [] } = useContext(ProjectContext);
  const { user } = usePage().props.auth;
  const [activeTab, setActiveTab] = useState('pending');

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const TaskCard = ({ task, status }) => {
    const isPending = status === 'pending';
    const cardStyles = isPending
      ? ' bg-gradient-to-br from-[#FDC03E] to-blue-800'
      : 'bg-gradient-to-br from-cyan-500 to-blue-900';

    return (
      <div className={`relative group transition-all duration-300 overflow-hidden rounded-3xl  ${cardStyles} p-1`}>
        <div className="h-full bg-black/90 backdrop-blur-lg rounded-2xl p-6 text-white">
          <div className="flex items-start justify-between mb-4 h-min">
            <div className="flex items-center space-x-3">
              {isPending ? (
                <ClockIcon className="w-5 h-5 text-yellow-400" />
              ) : (
                <CheckCircleIcon className="w-5 h-5 text-teal-400" />
              )}
              <h3 className="text-lg font-semibold">{task.title}</h3>
            </div>
            {isPending && task.assigned_to === user.id && (
              <button
                onClick={() => window.location.href = route('confirmations.create', { task: task.id })}
                className="px-4 py-2 text-sm font-medium bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
              >
                Terminer
              </button>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center text-gray-300">
              <UserCircleIcon className="w-4 h-4 mr-3 text-indigo-400" />
              <span>{isPending
                ? (task.assigned_user?.name || 'Non assigné')
                : (task.confirmation?.created_by_user?.name || 'Membre')}</span>
            </div>

            <div className="flex items-center text-gray-300">
              <CalendarIcon className="w-4 h-4 mr-3 text-cyan-400" />
              <span>{task.due_date ? formatDate(task.due_date) : 'Pas de deadline'}</span>
            </div>

            {isPending ? (
              <div className="flex items-center text-gray-300">
                <ClockIcon className="w-4 h-4 mr-3 text-purple-400" />
                <span>Créé le {formatDate(task.created_at)}</span>
              </div>
            ) : (
              <div className="flex items-center text-gray-300">
                <CheckCircleIcon className="w-4 h-4 mr-3 text-teal-400" />
                <span>Terminé le {formatDate(task.confirmation?.created_at)}</span>
              </div>
            )}

            {!isPending && task.confirmation?.file_path && (
              <a
                href={`/storage/${task.confirmation.file_path}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
              >
                <DocumentTextIcon className="w-4 h-4 mr-2" />
                Voir la pièce jointe
              </a>
            )}

          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-center mb-8 border-b border-white/10">
        <button
          onClick={() => setActiveTab('pending')}
          className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors relative ${
            activeTab === 'pending'
              ? 'text-amber-400 border-b-2 border-amber-400'
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          <BeakerIcon className="w-5 h-5" />
          Tâches en cours
          <span className="ml-2 px-2 py-0.5 text-xs bg-amber-500/10 text-amber-400 rounded-full">
            {pendingTasks.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors relative ${
            activeTab === 'completed'
              ? 'text-blue-400 border-b-2 border-blue-400'
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          <ShieldCheckIcon className="w-5 h-5" />
          Tâches terminées
          <span className="ml-2 px-2 py-0.5 text-xs bg-blue-500/10 text-blue-400 rounded-full">
            {finishedTasks.length}
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeTab === 'pending' && (
          <>
            {pendingTasks.length > 0 ? (
              pendingTasks.map(task => (
                <TaskCard key={task.id} task={task} status="pending" />
              ))
            ) : (
              <div className="col-span-full flex items-center justify-center p-8 rounded-xl bg-gray-800/50">
                <div className="text-center">
                  <ExclamationCircleIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-400">Pas de tâches en cours ! 🎉</p>
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === 'completed' && (
          <>
            {finishedTasks.length > 0 ? (
              finishedTasks.map(task => (
                <TaskCard key={task.id} task={task} status="completed" />
              ))
            ) : (
              <div className="col-span-full flex items-center justify-center p-8 rounded-xl bg-gray-800/50">
                <div className="text-center">
                  <ExclamationCircleIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-400">Aucune tâche terminée pour le moment ! 💪</p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Tasks;
