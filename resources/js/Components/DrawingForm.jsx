import React from 'react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

// Un composant de formulaire réutilisable et stylisé pour la création et modification de dessins
export default function DrawingForm({ data, setData, submit, processing, errors, buttonText = "Enregistrer" }) {
    return (
        <div className="py-12">
            <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                {/* Utilise le même conteneur vitré que nos autres pages */}
                <div className="bg-gray-900/50 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-2xl">
                    <form onSubmit={submit} className="p-6 md:p-8 space-y-6">
                        <header>
                            <h2 className="text-lg font-medium text-white">
                                Détails du dessin
                            </h2>
                            <p className="mt-1 text-sm text-gray-400">
                                Donnez un nom à votre nouveau tableau blanc. Vous pourrez le modifier plus tard.
                            </p>
                        </header>

                        <div className="border-t border-slate-700 pt-6">
                            <InputLabel htmlFor="name" value="Nom" className="text-gray-300" />

                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full bg-slate-800/50 border-slate-600 focus:ring-yellow-500 focus:border-yellow-500 text-gray-200"
                                autoComplete="off"
                                isFocused={true}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />

                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div className="flex items-center justify-end gap-4 border-t border-slate-700 pt-6">
                            <PrimaryButton className="bg-yellow-500 hover:bg-yellow-600 focus:bg-yellow-700 active:bg-yellow-800 text-gray-900 font-bold" disabled={processing}>
                                <i className='bx bxs-save text-lg mr-2'></i>
                                {buttonText}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}