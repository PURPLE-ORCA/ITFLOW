import React, { useContext, useState } from 'react';
import { ProjectContext } from '@/contexts/ProjectContext';
import { CheckCircleIcon, UserCircleIcon, CalendarIcon, CodeBracketIcon, DocumentIcon, BeakerIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { Link, usePage } from '@inertiajs/react';

const Tasks = () => {
  const { pendingTasks = [], finishedTasks = [] } = useContext(ProjectContext);
  const { user } = usePage().props.auth;
  const [activeTab, setActiveTab] = useState('pending');

  const formatDate = (dateString, includeTime = false) => {
    const options = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      ...(includeTime && {
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  const TaskCard = ({ task, status }) => {
    const isPending = status === 'pending';
    const cardStyles = isPending
      ? 'bg-gradient-to-br from-[#FDC03E]/50 to-blue-800'
      : 'bg-gradient-to-br from-cyan-500/50 to-blue-500/10';

    return (
      <div className={`relative group ${cardStyles} p-1 rounded-2xl text-white transition-all duration-500 ease-out`}>
        {/* Indicateur de statut */}
        <div className="absolute -left-1 top-6 w-2 h-12 rounded-xl bg-gradient-to-b from-blue-500 to-yellow-500 group-hover:scale-y-110 transition-transform duration-300" />

        <div className="bg-black/90 backdrop-blur-xl rounded-xl p-6 min-h-full">
          {/* En-tête de tâche */}
          <div className="flex items-center gap-3 mb-2">
            <CodeBracketIcon className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-bold">{task.title}</h3>
          </div>

          {/* Métadonnées de tâche */}
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-300 mb-4">
            <div className="flex items-center gap-2">
              <UserCircleIcon className="w-4 h-4 text-gray-400" />
              <span>{isPending ? task.assigned_user?.name || 'Non assigné' : task.confirmation?.created_by_user?.name || 'Membre équipe'}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-gray-400" />
              <span>
                {isPending
                  ? task.due_date ? formatDate(task.due_date) : 'Pas d\'échéance'
                  : task.confirmation?.created_at ? formatDate(task.confirmation.created_at, true) : 'Pas de date'}
              </span>
            </div>
          </div>

          {/* Actions */}
          {isPending && task.assigned_to === user.id ? (
            <Link
              href={route('confirmations.create', { task: task.id })}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-yellow-500 to-blue-500 text-white rounded-xl font-medium transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
            >
              <CheckCircleIcon className="w-4 h-4" />
              Marquer comme terminé
            </Link>
          ) : task.confirmation?.file_path && (
            <a
              href={`/storage/${task.confirmation.file_path}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-medium transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
            >
              <DocumentIcon className="w-4 h-4" />
              Voir les fichiers
            </a>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6 relative">
      {/* Navigation des onglets */}
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

      {/* Conteneur des cartes */}
      <div className="grid grid-cols-1 md:grid-cols- gap-8">
        {activeTab === 'pending' ? (
          <div className="bg-slate-400/5 border border-white/5 backdrop-blur-xl rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-12 bg-yellow-400 rounded-full"></div>
                <h2 className="text-2xl font-bold text-white">En cours</h2>
              </div>
              <span className="px-4 py-1 bg-yellow-400/20 text-yellow-400 rounded-full text-sm">
                {pendingTasks.length} Tâches
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pendingTasks.length > 0 ? (
                pendingTasks.map((task) => (
                  <TaskCard key={task.id} task={task} status="pending" />
                ))
              ) : (
                <div className="text-center py-8 text-blue-200 col-span-full">
                  <p className="text-lg">Tout est à jour ! 🎉</p>
                  <p className="text-sm opacity-70">Aucune tâche en cours</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-slate-400/5 border border-white/5 backdrop-blur-xl rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-12 bg-blue-400 rounded-full"></div>
                <h2 className="text-2xl font-bold text-white">Terminées</h2>
              </div>
              <span className="px-4 py-1 bg-blue-400/20 text-blue-400 rounded-full text-sm">
                {finishedTasks.length} Tâches
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {finishedTasks.length > 0 ? (
                finishedTasks.map((task) => (
                  <TaskCard key={task.id} task={task} status="completed" />
                ))
              ) : (
                <div className="text-center py-8 text-blue-200 col-span-full">
                  <p className="text-lg">Commencez à compléter des tâches ! 💪</p>
                  <p className="text-sm opacity-70">Aucune tâche terminée</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;