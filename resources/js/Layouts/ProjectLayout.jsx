import React from "react";
import Sidebar from "@/Components/Sidebar";
import ProjectProvider from "@/contexts/ProjectContext";
import { usePage } from "@inertiajs/react";
import Toast from "@/Components/Toast";

export default function ProjectLayout({
    children,
    project,
    pendingTasks,
    finishedTasks,
}) {
    return (
        <ProjectProvider
            project={project}
            pendingTasks={pendingTasks}
            finishedTasks={finishedTasks}
        >
            <div className="relative min-h-screen p-5 text-white font-poppins">
                {/* Background */}
<div className="fixed inset-0 bg-gradient-to-br from-blue-800 via-black to-blue-800 -z-10">
  {/* Animated Background Elements */}
  <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-400/5 rounded-full blur-3xl animate-pulse"></div>
  <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
</div>

                <Sidebar />
                <main className="pl-20 p-6 w-full">{children}</main>
            </div>
        </ProjectProvider>
    );
}
