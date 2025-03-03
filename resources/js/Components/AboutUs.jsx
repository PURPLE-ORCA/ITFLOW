import React from 'react'

const AboutUs = () => {
  return (
    <section id="About" className="py-16 text-center text-white/20">
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-semibold mb-5 text-yellow-300 animate__animated animate__pulse animate__infinite">
                About Our Solution
            </h2>
            <p className="text-base mb-8 text-white">
                <span className="inline-block bg-gradient-to-r from-cyan-300 to-cyan-400 text-black px-1 py-0 rounded-lg transform hover:scale-105 transition-all duration-300">
                    Our solution
                </span>{" "}
                is specially designed to simplify
                <span className="inline-block bg-gradient-to-r from-[#FFD700] to-yellow-400 text-black px-1 py-0 rounded-lg transform hover:scale-105 transition-all duration-300">
                    ITFlow
                </span>{" "}
                ,enabling <br />
                technical teams to collaborate effectively and adopt agile
                methodologies for better
                <span className="inline-block bg-gradient-to-r from-cyan-300 to-cyan-400 text-black px-1 py-0 rounded-lg transform hover:scale-105 transition-all duration-300">
                    performance.
                </span>
            </p>
            <div className="relative wrap overflow-hidden p-5">
                <div className="border-2-2 absolute border-opacity-20 border-gray-700 h-full border left-1/2"></div>
                <div className="mb-8 flex justify-between items-center w-full right-timeline">
                    <div className="order-1 w-5/12"></div>
                    <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-12 h-12 rounded-full">
                        <h1 className="mx-auto font-semibold text-lg text-yellow-200">
                            1
                        </h1>
                    </div>
                    <div className="order-1 border-y-2 rounded-lg ounded-lg shadow-lg border-cyan-200 shadow-cyan-500/50 w-5/12 px-6 py-4">
                        <h3 className="text-white font-semibold text-3xl">
                            Mohammed El Moussaoui
                        </h3>
                        <p className="text-white text-lg leading-tight">
                            Project manager and back-end developer
                        </p>
                    </div>
                </div>
                <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
                    <div className="order-1 w-5/12"></div>
                    <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-12 h-12 rounded-full">
                        <h1 className="mx-auto font-semibold text-lg text-yellow-300">
                            2
                        </h1>
                    </div>
                    <div className="order-1 text-white border-y-2 rounded-lg shadow-lg border-cyan-200 shadow-cyan-500/50 w-5/12 px-6 py-4">
                        <h3 className="mb-3 font-bold text-3xl">
                            Kaouthar Missaoui
                        </h3>
                        <p className="text-white leading-tight text-lg">
                            UX/UI design expert and frontend developer
                        </p>
                    </div>
                </div>
                    <div className=" text-white border-y-2 rounded-lg shadow-lg border-cyan-200 shadow-cyan-500/50 px-6 py-4">
                        <h1 className="mb-3 font-bold text-3xl">
                            Encadre par Ilyes rafai
                        </h1>
                    </div>
            </div>
        </div>
    </section>
  );
}

export default AboutUs
