// resources/js/Pages/Drawings/Show.jsx

import React, { useCallback, useRef } from 'react';
import { Head } from '@inertiajs/react';
import { Excalidraw, WelcomeScreen } from '@excalidraw/excalidraw';
import { debounce } from 'lodash';
import ProjectLayout from '../../Layouts/ProjectLayout';
import axios from 'axios'; // <-- 1. IMPORT AXIOS

export default function Show({ auth, project, drawing }) {

    const debouncedSave = useRef(
        debounce((newData, drawingId) => {
            // --- 2. THE FIX IS HERE: We replace router.patch with axios.patch ---
            // Axios is built for this kind of background data request.
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
            header={<h2 className="font-semibold text-xl text-white/90 leading-tight">Drawing: {drawing.name}</h2>}
            hideContentPadding={true}
        >
            <Head title={`Drawing: ${drawing.name}`} />

            <div style={{ height: 'calc(100vh - 65px)' }}>
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
            </div>
        </ProjectLayout>
    );
}
