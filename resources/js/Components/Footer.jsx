import React from 'react'

const Footer = () => {
  return (
    <footer className="py-6 text-center text-sm text-gray-600 dark:text-gray-400 bg-black -z-10">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 lg:px-8">
            <div>
                <h3 className="text-lg font-semibold text-yellow-300 mb-4">
                    À propos d'ITFLOW
                </h3>
                <p className="text-sm">
                    ITFLOW est votre outil ultime pour une gestion de projet fluide
                    et une collaboration efficace. Donnez à votre équipe des
                    fonctionnalités innovantes et des solutions agiles.
                </p>
            </div>
            <div>
                <h3 className="text-lg font-semibold text-yellow-300 mb-4">
                    Liens rapides
                </h3>
                <nav className="flex flex-col gap-y-2 ">
                    <a
                        href="#features"
                        className="text-sm hover:text-cyan-200"
                    >
                        Fonctionnalités
                    </a>
                    <a href="#About" className="text-sm hover:text-cyan-200">
                        À propos
                    </a>
                    <a
                        href="#learn-more"
                        className="text-sm hover:text-cyan-200"
                    >
                        Contact
                    </a>
                    <a
                        href="login.html"
                        className="text-sm hover:text-cyan-200"
                    >
                        Connexion
                    </a>
                </nav>
            </div>
            <div>
                <h3 className="text-lg font-semibold text-yellow-300 mb-4 ">
                    Suivez-nous
                </h3>
                <div className="flex gap-4 pl-36 ">
                    <a href="#" aria-label="Facebook">
                        <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.406.593 24 1.325 24h11.495v-9.294H9.708v-3.622h3.112V8.413c0-3.086 1.883-4.766 4.63-4.766 1.316 0 2.447.097 2.776.141v3.223h-1.905c-1.494 0-1.783.711-1.783 1.752v2.297h3.566l-.465 3.622h-3.101V24h6.078C23.406 24 24 23.406 24 22.676V1.325C24 .593 23.406 0 22.675 0z" />
                        </svg>
                    </a>
                    <a href="#" aria-label="Twitter">
                        <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path d="M24 4.557a9.926 9.926 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724 9.865 9.865 0 0 1-3.127 1.195 4.916 4.916 0 0 0-8.38 4.482A13.938 13.938 0 0 1 1.671 3.149 4.917 4.917 0 0 0 3.195 9.88a4.893 4.893 0 0 1-2.224-.616c-.053 2.28 1.581 4.415 3.946 4.89a4.904 4.904 0 0 1-2.212.085 4.918 4.918 0 0 0 4.6 3.419A9.867 9.867 0 0 1 0 21.543a13.905 13.905 0 0 0 7.548 2.211c9.056 0 14.002-7.496 14.002-13.986 0-.213-.005-.425-.014-.636A10.012 10.012 0 0 0 24 4.557z" />
                        </svg>
                    </a>
                    <a href="#" aria-label="LinkedIn">
                        <svg
                            className="w-6 h-6"
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
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
            Équipe ITFLOW &copy; {new Date().getFullYear()}
        </div>
    </footer>
  );
}

export default Footer