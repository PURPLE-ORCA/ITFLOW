import React, { useCallback, useRef } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Excalidraw, WelcomeScreen } from '@excalidraw/excalidraw';
import { debounce } from 'lodash';
import ProjectLayout from '@/Layouts/ProjectLayout';
import axios from 'axios';
import { ArrowLeftIcon, PencilIcon } from '@heroicons/react/24/outline';

export default function Show({ auth, project, drawing }) {
    const debouncedSave = useRef(
        debounce((newData, drawingId) => {
            axios.patch(route('drawings.autosave', drawingId), {
                data: newData,
            })
            .then(response => {
                console.log('Auto-saved!', response.data.message);
            })
            .catch(error => {
                console.error('Auto-save failed:', error.response?.data || error.message);
            });
        }, 1500)
    ).current;

    const onExcalidrawChange = (elements, appState) => {
        const newData = {
            elements,
            appState: {
                viewBackgroundColor: appState.viewBackgroundColor,
                gridSize: appState.gridSize,
            },
        };
        debouncedSave(newData, drawing.id);
    };

    const initialData = drawing.data || null;

    return (
        <ProjectLayout
            user={auth.user}
            project={project}
            header={
                <div className="flex items-center space-x-4">
                    <h2 className="font-semibold text-xl text-white/90 leading-tight">
                        Drawing: {drawing.name}
                    </h2>
                    <Link
                        href={route('drawings.edit', [project.id, drawing.id])}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                        <PencilIcon className="h-5 w-5" />
                    </Link>
                </div>
            }
            hideContentPadding={true}
        >
            <Head title={`Drawing: ${drawing.name}`} />

            {/* Background */}
            <div className="fixed inset-0 bg-gradient-to-br from-blue-800 via-black to-blue-800 -z-10">
                <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-400/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            {/* Floating back button */}
            <div className="absolute top-4 left-4 z-10">
                <Link
                    href={route('projects.show', project.id)}
                    className="flex items-center space-x-2 bg-slate-400/5 border border-white/10 text-gray-200 rounded-lg px-4 py-2 font-medium hover:bg-white/10 transition-all duration-200"
                >
                    <ArrowLeftIcon className="h-4 w-4" />
                    <span>Back to Project</span>
                </Link>
            </div>

            {/* Drawing canvas */}
            <div style={{ height: 'calc(100vh - 65px)' }} className="relative">
                <Excalidraw
                    key={drawing.id}
                    initialData={initialData}
                    onChange={onExcalidrawChange}
                    theme="dark"
                >
                    <WelcomeScreen>
                        <WelcomeScreen.Hints.MenuHint />
                        <WelcomeScreen.Hints.ToolbarHint />
                        <WelcomeScreen.Hints.HelpHint />
                    </WelcomeScreen>
                </Excalidraw>

                {/* Auto-save indicator */}
                <div className="absolute bottom-4 right-4 bg-slate-400/5 border border-white/10 text-gray-200 rounded-lg px-3 py-1 text-sm font-medium backdrop-blur-sm">
                    Auto-save enabled
                </div>
            </div>
        </ProjectLayout>
    );
}