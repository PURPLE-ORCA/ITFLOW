import React from 'react';

// Modal de confirmation redessinée pour correspondre au thème sombre et vitré de l'application
export default function ConfirmationModal({ isOpen, onClose, onConfirm, title, message }) {
    if (!isOpen) return null;

    // Empêche le défilement du fond lorsque la modal est ouverte
    React.useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={onClose} // Ferme la modal si l'arrière-plan est cliqué
        >
            <div
                className="bg-slate-900/80 border border-slate-700/50 rounded-lg shadow-2xl w-full max-w-md m-4 p-6"
                onClick={e => e.stopPropagation()} // Empêche la fermeture lors d'un clic à l'intérieur
            >
                <div className="flex items-start space-x-4">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-900/50 sm:mx-0 sm:h-10 sm:w-10">
                        <i className='bx bxs-error-alt text-2xl text-red-500'></i>
                    </div>
                    <div className="flex-1">
                        <h2 className="text-lg font-bold text-white">{title}</h2>
                        <p className="mt-2 text-sm text-gray-400">{message}</p>
                    </div>
                </div>

                <div className="mt-5 sm:mt-4 flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex justify-center rounded-md border border-slate-600 px-4 py-2 bg-slate-700 text-base font-medium text-gray-200 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 focus:ring-offset-slate-800 sm:text-sm"
                    >
                        Annuler
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 bg-red-600 text-base font-bold text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:ring-offset-slate-800 sm:text-sm"
                    >
                        <i className='bx bxs-trash-alt mr-2'></i>
                        Oui, supprimer
                    </button>
                </div>
            </div>
        </div>
    );
};