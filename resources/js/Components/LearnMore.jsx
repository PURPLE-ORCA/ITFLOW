import React from 'react'

const LearnMore = () => {
  return (
    <section id="learn-more" className="py-16 bg-black text-white">
        <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="text-3xl font-semibold text-yellow-300 mb-6 animate__animated animate__pulse animate__infinite">
                Pourquoi choisir ITFLOW ?
            </h2>
            <p className="text-base text-gray-300 mb-12">
                Découvrez les avantages d'ITFLOW, votre solution ultime pour
                une gestion de projet fluide. De la collaboration au suivi des
                tâches, nous avons tout prévu !
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-gradient-to-br from-blue-900/70 to-black/45 p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                    <img
                        src="storage/svg/project-completed_fwjq.svg"
                        alt="Gestion de projet"
                        className="w-16 h-16 mx-auto mb-4"
                    />
                    <h3 className="text-lg font-semibold text-cyan-300 mb-2">
                        Gestion de projet
                    </h3>
                    <p className="text-sm text-gray-400">
                        Simplifiez votre flux de travail avec des outils conçus
                        pour une gestion et un suivi efficaces des projets.
                    </p>
                </div>
                <div className="bg-gradient-to-br from-blue-900/70 to-black/50 p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                    <img
                        src="storage/svg/team-collaboration_phnf.svg"
                        alt="Collaboration d'équipe"
                        className="w-16 h-16 mx-auto mb-4"
                    />
                    <h3 className="text-lg font-semibold text-cyan-300 mb-2 ">
                        Collaboration d'équipe
                    </h3>
                    <p className="text-sm text-gray-400">
                        Collaborez en temps réel avec votre équipe pour rester
                        aligné et productif sur toutes les tâches.
                    </p>
                </div>
                <div className="bg-gradient-to-br from-blue-900/70 to-black/50 p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                    <img
                        src="storage/svg/data_0ml2.svg"
                        alt="Analyse de données"
                        className="w-16 h-16 mx-auto mb-4"
                    />
                    <h3 className="text-lg font-semibold text-cyan-300 mb-2">
                        Analyse des données
                    </h3>
                    <p className="text-sm text-gray-400">
                        Obtenez des insights précieux sur la performance de vos
                        projets grâce à nos outils d'analyse détaillés.
                    </p>
                </div>
            </div>
            <div className="mt-12">
                <a
                    href={route("login")}
                    className="border-3 border-blue-500 border-x-[#FFD700] dark:ring-offset-cyan-500 rounded-full px-3 py-2 font-semibold text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500 hover:shadow-lg hover:shadow-cyan-500/50"
                >
                    Contactez-nous →
                </a>
            </div>
        </div>
    </section>
  );
}

export default LearnMore