import React from 'react'

const HeroSection = () => {
  return (
    <section className="animated-section h-[50vh] md:h-screen box-border flex flex-col items-center md:justify-center relative text-[rgb(157,239,255)] m-0 p-0">
        <div className="animated-section-content animate-showText">
            <h1 className="text-[#FFD700] font-normal m-0 text-[10vw] md:text-4xl">
                Optimize your
                <span className=" text-cyan-300 animate__animated animate__backInLeft animate__infinite">
                    ITFLOW
                </span>
                projects <br />
                with our innovative solution.
            </h1>
            <p className="text-white m-1">
                Track progress, manage tasks, and collaborate <br />
                seamlessly with an all-in-one tool for tech teams.
            </p>
            <div className="space-x-4 py-6 pl-4">
                <a
                    href={route("login")}
                    className="border-3 border-blue-500 border-x-[#FFD700] dark:ring-offset-cyan-500 rounded-full px-3 py-2 font-semibold text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500 hover:shadow-lg hover:shadow-cyan-500/50"
                >
                    Get started
                </a>
                <a
                    href="#learn-more"
                    className="text-white hover:text-cyan-300 transition duration-300"
                >
                    Learn more →
                </a>
            </div>
        </div>
    </section>
  );
}

export default HeroSection
