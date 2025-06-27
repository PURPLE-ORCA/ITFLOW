import React from 'react'

const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 text-white bg-black">
        <div className="container mx-auto text-center">
            <h2 className="text-3xl text-yellow-300 font-semibold mb-6 animate__animated animate__pulse animate__infinite">
                Fonctionnalités principales
            </h2>
            <p className="text-base mb-12 text-white">
                Découvrez comment notre
                <span className="inline-block bg-gradient-to-r from-cyan-300 to-cyan-400 text-black px-1 py-0 rounded-lg transform hover:scale-105 transition-all duration-300">
                    {" "}
                    Application{" "}
                </span>
               peut optimiser votre
                <span className="inline-block bg-gradient-to-r from-[#FFD700] to-yellow-400 text-black px-1 py-0 rounded-lg transform hover:scale-105 transition-all duration-300">
                    {" "}
                    ITFlow{" "}
                </span>
                avec des outils efficaces et conviviaux.
            </p>
        </div>
        <div className="cards flex flex-wrap justify-center gap-[55px] p-5  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
            <div className="card-container ">
                <div className="card shadow-md relative w-full max-w-[320px] p-[3em] text-[--text-color] bg-[--bg-color] rounded-[1em]">
                    <img
                        src="storage/svg/workers_8xeu (1).svg"
                        alt=""
                        className="block mx-auto size-28"
                    />
                    <hr />
                    <h3 className="text-base p-3 text-black">
                        Gestion de projet simplifiée
                    </h3>
                    <p className="text-sm text-white">
                       Créez, gérez et suivez l'avancement de vos projets avec simplicité et efficacité en une seule ligne.
                    </p>
                    <div className="absolute inset-0 w-full h-full -z-10 preserve-3d">
                        <div className="layer absolute inset-0 w-full h-full rounded-[1em]"></div>
                    </div>
                </div>
            </div>
            <div className="card-container">
                <div className="card shadow-md relative w-full max-w-[320px] p-[3em] text-[--text-color] bg-[--bg-color] rounded-[1em]">
                    <img
                        src="storage/svg/real-time-collaboration_g4mc.svg"
                        alt=""
                        className="block mx-auto size-28"
                    />
                    <hr />
                    <h3 className="text-base p-3 text-black">
                        Collaboration en temps réel
                    </h3>
                    <p className="text-sm text-white">
                         Travaillez en équipe, communiquez instantanément et suivez les mises à jour de chaque tâche.
                    </p>
                    <div className="absolute inset-0 w-full h-full -z-10 preserve-3d">
                        <div className="layer absolute inset-0 w-full h-full rounded-[1em]"></div>
                    </div>
                </div>
            </div>
            <div className="card-container">
                <div className="card shadow-md relative w-full max-w-[320px] p-[3em] text-[--text-color] bg-[--bg-color] rounded-[1em]">
                    <img
                        src="storage/svg/staks_term-sheet_70lo.svg"
                        alt=""
                        className="block mx-auto size-28"
                    />
                    <hr />
                    <h3 className="text-base p-3 text-black">
                        Suivi des tâches et progression
                    </h3>
                    <p className="text-sm text-white">
                        Surveillez l'avancement des tâches et gérez les échéances efficacement avec des rapports détaillés.
                    </p>
                    <div className="absolute inset-0 w-full h-full -z-10 preserve-3d">
                        <div className="layer absolute inset-0 w-full h-full rounded-[1em]"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}

export default FeaturesSection
