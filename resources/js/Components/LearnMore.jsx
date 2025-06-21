import React from 'react'

const LearnMore = () => {
  return (
    <section id="learn-more" className="py-16 bg-black text-white">
        <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="text-3xl font-semibold text-yellow-300 mb-6 animate__animated animate__pulse animate__infinite">
                Why Choose ITFLOW?
            </h2>
            <p className="text-base text-gray-300 mb-12">
                Discover the benefits of ITFLOW, your ultimate solution for
                seamless project management. From collaboration to task
                tracking, we've got you covered!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-gradient-to-br from-blue-900/70 to-black/45 p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                    <img
                        src="storage/svg/project-completed_fwjq.svg"
                        alt="Project Management"
                        className="w-16 h-16 mx-auto mb-4"
                    />
                    <h3 className="text-lg font-semibold text-cyan-300 mb-2">
                        Project Management
                    </h3>
                    <p className="text-sm text-gray-400">
                        Simplify your workflow with tools designed for
                        efficient project management and tracking.
                    </p>
                </div>
                <div className="bg-gradient-to-br from-blue-900/70 to-black/50 p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                    <img
                        src="storage/svg/team-collaboration_phnf.svg"
                        alt="Team Collaboration"
                        className="w-16 h-16 mx-auto mb-4"
                    />
                    <h3 className="text-lg font-semibold text-cyan-300 mb-2 ">
                        Team Collaboration
                    </h3>
                    <p className="text-sm text-gray-400">
                        Collaborate in real-time with your team to stay
                        aligned and productive on all tasks.
                    </p>
                </div>
                <div className="bg-gradient-to-br from-blue-900/70 to-black/50 p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                    <img
                        src="storage/svg/data_0ml2.svg"
                        alt="Data Analysis"
                        className="w-16 h-16 mx-auto mb-4"
                    />
                    <h3 className="text-lg font-semibold text-cyan-300 mb-2">
                        Data Insights
                    </h3>
                    <p className="text-sm text-gray-400">
                        Gain valuable insights into project performance with
                        our detailed analytics tools.
                    </p>
                </div>
            </div>
            <div className="mt-12">
                <a
                    href={route("login")}
                    className="border-3 border-blue-500 border-x-[#FFD700] dark:ring-offset-cyan-500 rounded-full px-3 py-2 font-semibold text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500 hover:shadow-lg hover:shadow-cyan-500/50"
                >
                    Contact Us →
                </a>
            </div>
        </div>
    </section>
  );
}

export default LearnMore
