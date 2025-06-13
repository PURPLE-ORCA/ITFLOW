// resources/js/Pages/Drawings/Edit.jsx

import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import ProjectLayout from '@/Layouts/ProjectLayout';
import DrawingForm from '@/Components/DrawingForm'; // <-- Import our new component

export default function Edit({ auth, project, drawing }) {
    const { data, setData, put, processing, errors } = useForm({
        name: drawing.name || '',
    });

    const submit = (e) => {
        e.preventDefault();
        // Remember, the name update is on the standard `update` route
        put(route('drawings.update', drawing.id));
    };

    return (
        <ProjectLayout
            user={auth.user}
            project={project}
            header={<h2 className="font-semibold text-xl text-white/90 leading-tight">Rename Drawing</h2>}
        >
            <Head title={`Rename ${drawing.name}`} />

            <DrawingForm
                data={data}
                setData={setData}
                submit={submit}
                processing={processing}
                errors={errors}
                buttonText="Save Changes"
            />
        </ProjectLayout>
    );
}
