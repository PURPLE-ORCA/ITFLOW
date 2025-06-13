import React from "react";
import Sidebar from "@/Components/Sidebar";
import Header from "@/Components/Header";
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
                {/* Arrière-plan avec les couleurs demandées */}
                <div
                    className="absolute inset-0 -z-10 background-pattern"
                    style={{
                        background: `linear-gradient(to bottom right, #1e3a8a, #000000, #1e40af)`,
                        backgroundSize: "cover",
                        backgroundBlendMode: "overlay",
                    }}
                ></div>

                <Sidebar />
                <div className="flex flex-col ml-16">
                    <Header user={usePage().props.auth.user} />
                    <main className="p-6 w-full">{children}</main>
                </div>
            </div>
        </ProjectProvider>
    );
}
