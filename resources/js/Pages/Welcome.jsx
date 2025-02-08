import ApplicationLogo from "@/Components/ApplicationLogo";
import { Head, Link } from "@inertiajs/react";
import AnimatedBackground from "@/Components/AnimatedBackground";

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome" />
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Montserrat&family=Oswald:wght@400;600&display=swap"
                rel="stylesheet"
            />

            <div className=" ">
                <AnimatedBackground />

                <header className="bg-black fixed inset-x-0 top-0 z-50 shadow-md">
                    <nav className="mx-3 flex justify-between items-center py-4">
                        <div>
                            <ApplicationLogo />
                        </div>
                        <div class="hidden lg:flex gap-x-8">
                            <a
                                href="#features"
                                class="text-sm font-semibold text-white hover:text-cyan-200"
                            >
                                Features
                            </a>
                            <a
                                href="#About"
                                class="text-sm font-semibold text-white hover:text-cyan-200"
                            >
                                About
                            </a>
                            <a
                                href="#learn-more"
                                class="text-sm font-semibold text-white hover:text-cyan-200"
                            >
                                Contact
                            </a>
                        </div>
                        <div>
    {auth.user ? (
        <Link
            href={route("dashboard")}
            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
        >
            Dashboard
        </Link>
    ) : (
        <Link
            href={route("login")}
            className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-full hover:bg-cyan-400 transition"
        >
            Log in
        </Link>
    )}
</div>

                    </nav>
                </header>

                <main className="mt-6 ">
                    <section class=" h-[50vh] md:h-screen box-border flex flex-col items-center md:justify-center relative text-[rgb(157,239,255)] m-0 p-0">
                        <h1 class="text-[#FFD700] font-normal m-0 text-[10vw] md:text-4xl">
                            Optimize your
                            <span class="bg-slate-600 text-cyan-300 animate__animated animate__backInLeft animate__infinite">
                                ITFLOW
                            </span>
                            projects <br />
                            with our innovative solution.
                        </h1>
                        <p class="text-white m-1">
                            Track progress, manage tasks, and collaborate <br />
                            seamlessly with an all-in-one tool for tech teams.
                        </p>
                        <div className="space-x-4 animate-slideIn py-6">
          <a
            href="/log"
            className="ring-2 ring-lcyan-200 ring-offset-1 ring-offset-slate-50 dark:ring-offset-emerald-200 rounded-full px-3 py-2 font-semibold text-white hover:text-black shadow-sm hover:bg-[#FFD700]  "
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
                    </section>


                    <section class="py-16 text-white bg-gradient-to-br from-black to-slate-900 overflow-hidden">


                        <div class="container mx-auto text-center mb-20">
                        <h2 class="text-3xl font-semibold mb-5 text-yellow-300 animate__animated animate__pulse animate__infinite">
                                Core Features
                            </h2>
                            <p class="text-base mb-8 text-white/90">
                                Discover how our
                                <span class="inline-block bg-gradient-to-r from-cyan-300 to-cyan-400 text-black px-1 py-0 rounded-lg transform hover:scale-105 transition-all duration-300">
                                    Application
                                </span>
                                can optimize your
                                <span class="inline-block bg-gradient-to-r from-[#FFD700] to-yellow-400 text-black px-1 py-0 rounded-lg transform hover:scale-105 transition-all duration-300">
                                    ITFlow
                                </span>
                                with efficient and user-friendly tools.
                            </p>
                        </div>

                        <div class="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 relative z-10 ">
                            <div class="group relative ">
                                <div class="absolute inset-0.5 bg-gradient-to-r from-[#180db6] to-[#03e6ff] rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-700"></div>
                                <div class="relative flex flex-col bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl hover:transform hover:-translate-y-2 transition-all duration-300 ">
                                    <div class="absolute inset-0 bg-gradient-to-r from-[#180db6] to-[#03e6ff] rounded-3xl"></div>
                                    <div class="relative">
                                        <div class="w-20 h-20 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                            <img
                                                src="storage/svg/workers_8xeu (1).svg"
                                                alt=""
                                                class="w-full h-full"
                                            />
                                        </div>
                                        <h3 class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#001aff] mb-4 text-center">
                                            Project Management
                                        </h3>
                                        <p class="text-white/80 text-center">
                                            Create, manage, and track the
                                            progress of your projects with ease.
                                        </p>

                                        <div class="max-h-0 overflow-hidden group-hover:max-h-40 transition-all duration-500">
                                            <div class="pt-4 mt-4 border-t border-white/10">
                                                <ul class="space-y-2 text-sm text-white/70">
                                                    <li class="flex items-center">
                                                        <span class="w-2 h-2 bg-slate-400 rounded-full mr-2"></span>
                                                        Task Organization
                                                    </li>
                                                    <li class="flex items-center">
                                                        <span class="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                                                        Progress Tracking
                                                    </li>
                                                    <li class="flex items-center">
                                                        <span class="w-2 h-2 bg-[#FFD700] rounded-full mr-2"></span>
                                                        Team Management
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="group relative ">
                                <div class="absolute inset-0.5 bg-gradient-to-r from-[#180db6] to-[#03e6ff] rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-700"></div>
                                <div class="relative flex flex-col bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl hover:transform hover:-translate-y-2 transition-all duration-300 ">
                                    <div class="absolute inset-0 bg-gradient-to-r from-[#180db6] to-[#03e6ff] rounded-3xl"></div>
                                    <div class="relative">
                                        <div class="w-20 h-20 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                            <img
                                                src="storage/svg/workers_8xeu (1).svg"
                                                alt=""
                                                class="w-full h-full"
                                            />
                                        </div>
                                        <h3 class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#001aff] mb-4 text-center">
                                            Real-Time Collaboration
                                        </h3>
                                        <p class="text-white/80 text-center">
                                            Work as a team, communicate
                                            instantly, and track updates.
                                        </p>

                                        <div class="max-h-0 overflow-hidden group-hover:max-h-40 transition-all duration-500">
                                            <div class="pt-4 mt-4 border-t border-white/10">
                                                <ul class="space-y-2 text-sm text-white/70">
                                                    <li class="flex items-center">
                                                        <span class="w-2 h-2 bg-slate-400  rounded-full mr-2"></span>
                                                        Live Updates
                                                    </li>
                                                    <li class="flex items-center">
                                                        <span class="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                                                        Team Chat
                                                    </li>
                                                    <li class="flex items-center">
                                                        <span class="w-2 h-2 bg-[#FFD700] rounded-full mr-2"></span>
                                                        File Sharing
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="group relative ">
                                <div class="absolute inset-0.5 bg-gradient-to-r from-[#180db6] to-[#03e6ff] rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-700"></div>
                                <div class="relative flex flex-col bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl hover:transform hover:-translate-y-2 transition-all duration-300 ">
                                    <div class="absolute inset-0 bg-gradient-to-r from-[#180db6] to-[#03e6ff] rounded-3xl"></div>
                                    <div class="relative">
                                        <div class="w-20 h-20 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                            <img
                                                src="storage/svg/workers_8xeu (1).svg"
                                                alt=""
                                                class="w-full h-full"
                                            />
                                        </div>
                                        <h3 class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#001aff] mb-4 text-center">
                                            Progress Tracking
                                        </h3>
                                        <p class="text-white/80 text-center">
                                            Monitor tasks and manage deadlines
                                            with detailed reports.
                                        </p>

                                        <div class="max-h-0 overflow-hidden group-hover:max-h-40 transition-all duration-500">
                                            <div class="pt-4 mt-4 border-t border-white/10">
                                                <ul class="space-y-2 text-sm text-white/70">
                                                    <li class="flex items-center">
                                                        <span class="w-2 h-2 bg-slate-400  rounded-full mr-2"></span>
                                                        Analytics
                                                    </li>
                                                    <li class="flex items-center">
                                                        <span class="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                                                        Reports
                                                    </li>
                                                    <li class="flex items-center">
                                                        <span class="w-2 h-2 bg-[#FFD700] rounded-full mr-2"></span>
                                                        Timelines
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="About" class="py-16 text-center text-white/20">
                        <div class="container mx-auto px-4 py-8">
                            <h2 class="text-3xl font-semibold mb-5 text-yellow-300 animate__animated animate__pulse animate__infinite">
                                About Our Solution
                            </h2>
                            <p class="text-base mb-8 text-white">
                            <span class="inline-block bg-gradient-to-r from-cyan-300 to-cyan-400 text-black px-1 py-0 rounded-lg transform hover:scale-105 transition-all duration-300">
                                    Our solution
                                </span>{" "}
                                is specially designed to simplify
                                <span class="inline-block bg-gradient-to-r from-[#FFD700] to-yellow-400 text-black px-1 py-0 rounded-lg transform hover:scale-105 transition-all duration-300">
                                    ITFlow
                                </span>{" "}
                                ,enabling <br />
                                technical teams to collaborate effectively and
                                adopt agile methodologies for better
                                <span class="bg-cyan-200 text-black">
                                    performance.
                                </span>
                            </p>

                            <div class="relative wrap overflow-hidden p-5">
                                <div class="border-2-2 absolute border-opacity-20 border-gray-700 h-full border left-1/2"></div>
                                <div class="mb-8 flex justify-between items-center w-full right-timeline">
                                    <div class="order-1 w-5/12"></div>
                                    <div class="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-12 h-12 rounded-full">
                                        <h1 class="mx-auto font-semibold text-lg text-yellow-200">
                                            1
                                        </h1>
                                    </div>
                                    <div class="order-1 border-y-2 rounded-lg ounded-lg shadow-lg border-cyan-200 shadow-cyan-500/50 w-5/12 px-6 py-4">
                                        <h3 class="text-white font-semibold text-xl">
                                            Mohammed El Moussaoui
                                        </h3>
                                        <p class="text-white text-sm leading-tight">
                                        Project manager and back-end developer specializing in cloud solutions and agile development, ensuring robust and scalable systems.
                                        </p>
                                    </div>
                                </div>
                                <div class="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
                    <div class="order-1 w-5/12"></div>
                    <div class="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-12 h-12 rounded-full">
                        <h1 class="mx-auto font-semibold text-lg text-yellow-300">2</h1>
                    </div>
                    <div
                        class="order-1 text-white border-y-2 rounded-lg shadow-lg border-cyan-200 shadow-cyan-500/50 w-5/12 px-6 py-4">
                        <h3 class="mb-3 font-bold text-xl">Kaouthar Mssaoui</h3>
                        <p class="text-white leading-tight text-sm">

                            UX/UI design expert dedicated to creating intuitive and
                            aesthetic user interfaces for an optimal experience.
                        </p>
                    </div>
                </div>
                            </div>
                        </div>
                    </section>

                    <section
                        id="learn-more"
                        class="py-16 bg-gray-900 text-white"
                    >
                        <div class="container mx-auto px-4 lg:px-8 text-center">
                            <h2 class="text-3xl font-semibold text-yellow-300 mb-6 animate__animated animate__pulse animate__infinite">
                                Why Choose ITFLOW?
                            </h2>
                            <p class="text-base text-gray-300 mb-12">
                                Discover the benefits of ITFLOW, your ultimate
                                solution for seamless project management. From
                                collaboration to task tracking, we've got you
                                covered!
                            </p>

                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                <div class="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
                                    <img
                                        src="storage/svg/project-completed_fwjq.svg"
                                        alt="Project Management"
                                        class="w-16 h-16 mx-auto mb-4"
                                    />
                                    <h3 class="text-lg font-semibold text-cyan-300 mb-2">
                                        Project Management
                                    </h3>
                                    <p class="text-sm text-gray-400">
                                        Simplify your workflow with tools
                                        designed for efficient project
                                        management and tracking.
                                    </p>
                                </div>

                                <div class="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
                                    <img
                                        src="storage/svg/team-collaboration_phnf.svg"
                                        alt="Team Collaboration"
                                        class="w-16 h-16 mx-auto mb-4"
                                    />
                                    <h3 class="text-lg font-semibold text-cyan-300 mb-2 animate__animated animate__pulse animate__infinite">
                                        Team Collaboration
                                    </h3>
                                    <p class="text-sm text-gray-400">
                                        Collaborate in real-time with your team
                                        to stay aligned and productive on all
                                        tasks.
                                    </p>
                                </div>

                                <div class="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
                                    <img
                                        src="storage/svg/data_0ml2.svg"
                                        alt="Data Analysis"
                                        class="w-16 h-16 mx-auto mb-4"
                                    />
                                    <h3 class="text-lg font-semibold text-cyan-300 mb-2">
                                        Data Insights
                                    </h3>
                                    <p class="text-sm text-gray-400">
                                        Gain valuable insights into project
                                        performance with our detailed analytics
                                        tools.
                                    </p>
                                </div>
                            </div>

                            <div class="mt-12">
                                <a
                                    href="login.html"
                                    class="inline-flex items-center px-6 py-3 bg-yellow-300 text-black text-sm font-semibold rounded-full hover:bg-blue-500 hover:text-white transition"
                                >
                                    Contact Us →
                                </a>
                            </div>
                        </div>
                    </section>
                </main>

                <footer className="py-6 text-center text-sm text-gray-600 dark:text-gray-400 bg-gradient-to-br from-blue-900/70 to-black/50 -z-10">
                    <div class="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 lg:px-8">
                        <div>
                            <h3 class="text-lg font-semibold text-yellow-300 mb-4">
                                About ITFLOW
                            </h3>
                            <p class="text-sm">
                                ITFLOW is your ultimate tool for seamless
                                project management and collaboration. Empower
                                your team with innovative features and agile
                                solutions.
                            </p>
                        </div>

                        <div>
                            <h3 class="text-lg font-semibold text-yellow-300 mb-4">
                                Quick Links
                            </h3>
                            <nav class="flex flex-col gap-y-2">
                                <a
                                    href="#features"
                                    class="text-sm text-white hover:text-cyan-200"
                                >
                                    Features
                                </a>
                                <a
                                    href="#About"
                                    class="text-sm text-white hover:text-cyan-200"
                                >
                                    About
                                </a>
                                <a
                                    href="#learn-more"
                                    class="text-sm text-white hover:text-cyan-200"
                                >
                                    Contact
                                </a>
                                <a
                                    href="login.html"
                                    class="text-sm text-white hover:text-cyan-200"
                                >
                                    Log in
                                </a>
                            </nav>
                        </div>

                        <div>
                            <h3 class="text-lg font-semibold text-yellow-300 mb-4">
                                Follow Us
                            </h3>
                            <div class="flex gap-4">
                                <a
                                    href="#"
                                    aria-label="Facebook"
                                    class="text-white hover:text-cyan-200"
                                >
                                    <svg
                                        class="w-6 h-6"
                                        fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.406.593 24 1.325 24h11.495v-9.294H9.708v-3.622h3.112V8.413c0-3.086 1.883-4.766 4.63-4.766 1.316 0 2.447.097 2.776.141v3.223h-1.905c-1.494 0-1.783.711-1.783 1.752v2.297h3.566l-.465 3.622h-3.101V24h6.078C23.406 24 24 23.406 24 22.676V1.325C24 .593 23.406 0 22.675 0z" />
                                    </svg>
                                </a>
                                <a
                                    href="#"
                                    aria-label="Twitter"
                                    class="text-white hover:text-cyan-200"
                                >
                                    <svg
                                        class="w-6 h-6"
                                        fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M24 4.557a9.926 9.926 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724 9.865 9.865 0 0 1-3.127 1.195 4.916 4.916 0 0 0-8.38 4.482A13.938 13.938 0 0 1 1.671 3.149 4.917 4.917 0 0 0 3.195 9.88a4.893 4.893 0 0 1-2.224-.616c-.053 2.28 1.581 4.415 3.946 4.89a4.904 4.904 0 0 1-2.212.085 4.918 4.918 0 0 0 4.6 3.419A9.867 9.867 0 0 1 0 21.543a13.905 13.905 0 0 0 7.548 2.211c9.056 0 14.002-7.496 14.002-13.986 0-.213-.005-.425-.014-.636A10.012 10.012 0 0 0 24 4.557z" />
                                    </svg>
                                </a>
                                <a
                                    href="#"
                                    aria-label="LinkedIn"
                                    class="text-white hover:text-cyan-200"
                                >
                                    <svg
                                        class="w-6 h-6"
                                        fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M22.225 0H1.771C.79 0 0 .774 0 1.729v20.542C0 23.228.79 24 1.771 24h20.451C23.206 24 24 23.228 24 22.271V1.729C24 .774 23.206 0 22.225 0zM7.081 20.452H3.544V9.033h3.537v11.419zM5.311 7.57C4.02 7.57 3 6.546 3 5.255c0-1.292 1.02-2.316 2.311-2.316 1.284 0 2.311 1.024 2.311 2.316-.001 1.291-1.027 2.315-2.311 2.315zM20.452 20.452h-3.536v-5.634c0-1.343-.027-3.074-1.872-3.074-1.873 0-2.158 1.462-2.158 2.973v5.735h-3.537V9.033h3.396v1.558h.046c.471-.892 1.625-1.832 3.347-1.832 3.58 0 4.241 2.355 4.241 5.418v6.275z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div class="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
                        IT Flow Team &copy; {new Date().getFullYear()}
                    </div>
                </footer>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
            </div>
        </>
    );
}
