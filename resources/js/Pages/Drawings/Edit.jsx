import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import ProjectLayout from '@/Layouts/ProjectLayout';
import { DocumentIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function Edit({ auth, project, drawing }) {
    const { data, setData, put, processing, errors } = useForm({
        name: drawing.name || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('drawings.update', drawing.id));
    };

    return (
        <ProjectLayout
            user={auth.user}
            project={project}
            header={<h2 className="font-semibold text-xl text-white/90 leading-tight">Renommer le dessin</h2>}
        >
            <Head title={`Renommer ${drawing.name}`} />

            <div className="font-poppins text-white p-5 h-auto w-full">
                {/* Arrière-plan */}
                <div className="fixed inset-0 bg-gradient-to-br from-blue-800 via-black to-blue-800 -z-10">
                    {/* Éléments animés d'arrière-plan */}
                    <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-400/5 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>

                <div className="min-h-screen p-2">
                    <div className="max-w-2xl mx-auto backdrop-blur-lg bg-slate-400/5 border border-white/20 rounded-xl">
                        <div className="p-6 space-y-1">
                            <div className="flex items-center space-x-4">
                                <div className="p-3 bg-blue-500/20 rounded-lg">
                                    <DocumentIcon className="h-6 w-6 text-blue-300" />
                                </div>
                                <h2 className="text-2xl font-bold bg-gradient-to-r from-[#FDC03E] to-blue-500 bg-clip-text text-transparent">
                                    Renommer le dessin
                                </h2>
                            </div>
                        </div>

                        <div className="p-6">
                            <form onSubmit={submit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-200">
                                        Nom du dessin
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg bg-slate-400/5 border border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-white placeholder-gray-400"
                                    />
                                    {errors.name && <span className="text-red-400 text-sm">{errors.name}</span>}
                                </div>

                                <div className="space-y-4">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full px-4 py-3 bg-gradient-to-r from-[#FDC03E] to-blue-500 text-white rounded-lg font-medium hover:from-blue-500 hover:to-[#FDC03E] focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 disabled:opacity-50"
                                    >
                                        {processing ? (
                                            <span className="flex items-center justify-center space-x-2">
                                                <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin" />
                                                <span>Enregistrement...</span>
                                            </span>
                                        ) : (
                                            'Enregistrer les modifications'
                                        )}
                                    </button>

                                    <Link
                                        href={route('projects.show', project.id)}
                                        className="w-full px-4 py-3 bg-slate-400/5 border border-white/10 text-gray-200 rounded-lg font-medium hover:bg-white/10 focus:ring-2 focus:ring-blue-500 transition-all duration-200 flex items-center justify-center space-x-2"
                                    >
                                        <ArrowLeftIcon className="h-4 w-4" />
                                        <span>Retour au projet</span>
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </ProjectLayout>
    );
}