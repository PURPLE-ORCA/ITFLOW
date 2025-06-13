// resources/js/Pages/Drawings/Create.jsx

import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import ProjectLayout from '@/Layouts/ProjectLayout';
import DrawingForm from '@/Components/DrawingForm'; // <-- Import our new component

export default function Create({ auth, project }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('projects.drawings.store', project.id));
    };

    return (
        <ProjectLayout
            user={auth.user}
            project={project}
            header={<h2 className="font-semibold text-xl text-white/90 leading-tight">Create New Whiteboard</h2>}
        >
            <Head title="Create New Drawing" />

            <DrawingForm
                data={data}
                setData={setData}
                submit={submit}
                processing={processing}
                errors={errors}
                buttonText="Create Drawing"
            />
        </ProjectLayout>
    );
}
