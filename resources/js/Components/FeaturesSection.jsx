import React from 'react'

const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 text-white bg-black">
        <div className="container mx-auto text-center">
            <h2 className="text-3xl text-yellow-300 font-semibold mb-6 animate__animated animate__pulse animate__infinite">
                Core Features
            </h2>
            <p className="text-base mb-12 text-white">
                Discover how our
                <span className="inline-block bg-gradient-to-r from-cyan-300 to-cyan-400 text-black px-1 py-0 rounded-lg transform hover:scale-105 transition-all duration-300">
                    {" "}
                    Application{" "}
                </span>
                can optimize your
                <span className="inline-block bg-gradient-to-r from-[#FFD700] to-yellow-400 text-black px-1 py-0 rounded-lg transform hover:scale-105 transition-all duration-300">
                    {" "}
                    ITFlow{" "}
                </span>
                with efficient and user-friendly tools.
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
                        Simplified Project Management
                    </h3>
                    <p className="text-sm text-white">
                        Create, manage, and track the progress of your
                        projects with ease.
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
                        Real-Time Collaboration
                    </h3>
                    <p className="text-sm text-white">
                        Work as a team, communicate instantly, and track
                        updates for every task.
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
                        Task and Progress Tracking
                    </h3>
                    <p className="text-sm text-white">
                        Monitor task progress and manage deadlines efficiently
                        with detailed reports.
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
