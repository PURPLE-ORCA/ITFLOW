import React, { useRef, useState } from 'react';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ProjectLayout from '@/Layouts/ProjectLayout';
import ApplicationLogo from '@/Components/ApplicationLogo';


export default function Edit({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;

    // State management code remains the same...
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const {
        data: deleteData,
        setData: setDeleteData,
        delete: destroy,
        processing: deleteProcessing,
        reset: deleteReset,
        errors: deleteErrors,
        clearErrors: deleteClearErrors,
    } = useForm({ password: '' });

    // All other state and handlers remain the same...
    const confirmUserDeletion = () => setConfirmingUserDeletion(true);
    const closeModal = () => {
        setConfirmingUserDeletion(false);
        deleteClearErrors();
        deleteReset();
    };

    const deleteUser = (e) => {
        e.preventDefault();
        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => deleteReset(),
        });
    };

    const passwordInputRef = useRef();
    const currentPasswordInputRef = useRef();

    const {
        data: formData,
        setData: setFormData,
        errors: formErrors,
        put,
        patch,
        reset: formReset,
        processing: formProcessing,
        recentlySuccessful: formRecentlySuccessful,
    } = useForm({
        name: user.name,
        email: user.email,
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    // Form submission handlers remain the same...
    const updatePassword = (e) => {
        e.preventDefault();
        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => formReset('current_password', 'password', 'password_confirmation'),
            onError: (errors) => {
                if (errors.password) {
                    formReset('password', 'password_confirmation');
                    passwordInputRef.current.focus();
                }
                if (errors.current_password) {
                    formReset('current_password');
                    currentPasswordInputRef.current.focus();
                }
            },
        });
    };

    const submitProfile = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (


<div className="min-h-screen p-6">
{/* Arrière-plan avec les couleurs demandées */}

<nav className="fixed top-0 h-screen w-16 hover:w-64 bg-transparent backdrop-blur-md transition-all duration-300 overflow-hidden group border-r border-white/10 z-50">
            <div className="flex flex-col h-full">
                {/* Logo Section */}
                <div className="w-full h-20 bg-transparent flex items-center justify-center duration-300">
                    <Link href="/" className="flex items-center justify-center w-16 h-16">
                        <ApplicationLogo className="relative z-10" />
                    </Link>
                </div>

                {/* Navigation Section */}
                <div className="flex-1 overflow-y-auto py-4 space-y-3 px-2">
                    {/* Dashboard */}
                    <Link href={route('dashboard')} className="flex items-center p-2 text-yellow-400 hover:text-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-sm shadow-yellow-400 hover:shadow-lg hover:shadow-blue-700 rounded-md group/item">
                        <i className='bx bxs-dashboard text-2xl text-yellow-400 group-hover/item:text-blue-400'></i>
                        <span className="ml-4 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">Dashboard</span>
                    </Link>

                    {/* Project Details */}


                    {/* Project Phases Section */}
                </div>

                {/* Profile Section */}
                <div className="mt-auto">
                    <div
                        className="relative px-2 py-4 5"
                        onMouseEnter={() => setShowProfileMenu(true)}
                        onMouseLeave={() => setShowProfileMenu(false)}
                    >
                        <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
                                <i className='bx bxs-user text-2xl text-yellow-400'></i>
                            </div>
                            <div className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <p className="text-sm font-medium text-yellow-400">{user.name}</p>
                                <p className="text-xs text-blue-400">Admin</p>
                            </div>
                        </div>

                        {/* Profile Menu */}
                        <div className={`absolute bottom-full left-0 w-full bg-gray-800/95 backdrop-blur-lg rounded-t-xl overflow-hidden transition-all duration-300 ${showProfileMenu ? 'block' : 'hidden'}`}>
                            <Link href={route('profile.edit')} className="flex items-center px-4 py-3 hover:bg-yellow-400/20 transition-colors">
                                <i className='bx bxs-cog text-xl text-yellow-400'></i>
                                <span className="ml-3 text-sm text-yellow-400">Profile Settings</span>
                            </Link>
                            <Link href={route('logout')} method="post" as="button" className="w-full flex items-center px-4 py-3 hover:bg-blue-700/20 transition-colors">
                                <i className='bx bxs-log-out text-xl text-blue-400'></i>
                                <span className="ml-3 text-sm text-blue-400">Sign Out</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
         {/* Background Gradient */}
         <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 -z-10" />

   {/* Overlay en clip-path */}
   <div
          className="fixed bottom-0 right-0 w-full h-full bg-gradient-to-r from-[#FDCD65] to-[#FDC03E] transition-all duration-800 ease-in-out -z-10 pointer-events-none"
          style={{ clipPath: "polygon(2% 0, 52% 28%, 99% 0)" }}
        ></div>
            <div className="max-w-4xl mx-auto pt-12 px-4 md:px-8">
            <div className="relative z-10 text-center mb-8">

<h className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-blue-300 bg-clip-text text-transparent mb-4">
Profile Settings
    </h>
    <p className="text-gray-300 mt-4 text-lg mb-4">
    Manage your account settings and preferences
    </p>
    <div className="w-28 h-1 bg-gradient-to-r from-yellow-400 to-blue-400 mx-auto rounded-full"></div>

</div>

                <div className="grid grid-cols-1 md:grid-cols-1 gap-8 p-11">
                    {/* Profile Information Card */}
                    <div className="bg-gray-800/10 dark:bg-gray-800/10 shadow-2xl rounded-3xl p-8 backdrop-blur-lg transform transition-all duration-300 hover:scale-[1.02]">
                        <header className="mb-8  border-blue-100 dark:border-blue-800 pb-6">
                            <h3 className="text-2xl mb-5 font-bold bg-gradient-to-r from-blue-600 to-yellow-500 bg-clip-text text-transparent">
                                Profile Information & Security
                            </h3>
                            <div className="w-full h-1 bg-gradient-to-r from-blue-950 to-blue-400 mx-auto rounded-full"></div>

                        </header>

                        {/* Profile Form */}
                        <form onSubmit={submitProfile} className="space-y-8 mb-12">
                            <div className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="name" value="Name" className="text-lg text-blue-600 dark:text-blue-400" />
                                    <TextInput
                                        id="name"
                                        className="mt-2 block w-full rounded-xl border-2 border-blue-100 dark:border-blue-800 focus:border-blue-500 focus:ring-blue-500"
                                        value={formData.name}
                                        onChange={(e) => setFormData('name', e.target.value)}
                                        required
                                        isFocused
                                        autoComplete="name"
                                    />
                                    <InputError className="mt-2" message={formErrors.name} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="email" value="Email" className="text-lg text-blue-600 dark:text-blue-400" />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        className="mt-2 block w-full rounded-xl border-2 border-blue-100 dark:border-blue-800 focus:border-blue-500 focus:ring-blue-500"
                                        value={formData.email}
                                        onChange={(e) => setFormData('email', e.target.value)}
                                        required
                                        autoComplete="username"
                                    />
                                    <InputError className="mt-2" message={formErrors.email} />
                                </div>

                                {mustVerifyEmail && user.email_verified_at === null && (
                                    <div className="bg-yellow-50/90 dark:bg-yellow-900/30 rounded-2xl p-6 border-2 border-yellow-200 dark:border-yellow-700">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-shrink-0">
                                                <svg className="h-6 w-6 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-base text-yellow-700 dark:text-yellow-200">
                                                    Your email address is unverified.
                                                    <Link href={route('verification.send')} method="post" as="button" className="ml-2 font-semibold text-yellow-600 dark:text-yellow-300 underline hover:text-yellow-500">
                                                        Click here to re-send the verification email.
                                                    </Link>
                                                </p>
                                            </div>
                                        </div>
                                        {status === 'verification-link-sent' && (
                                            <div className="mt-4 bg-green-50/90 dark:bg-green-900/30 p-4 rounded-xl border border-green-200 dark:border-green-700">
                                                <p className="text-sm text-green-700 dark:text-green-200">
                                                    A new verification link has been sent to your email address.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-end">
                                <PrimaryButton className={`px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl text-lg font-semibold transform transition-all duration-200 hover:scale-105 ${formProcessing && 'opacity-75 cursor-wait'}`} disabled={formProcessing}>
                                    Save Changes
                                </PrimaryButton>
                            </div>

                            <Transition show={formRecentlySuccessful}>
                                <p className="text-base text-green-600 dark:text-green-400 flex items-center justify-center bg-green-50 dark:bg-green-900/30 p-4 rounded-xl">
                                    Changes saved successfully
                                </p>
                            </Transition>
                        </form>

                        {/* Password Update Form */}
                        <form onSubmit={updatePassword} className="space-y-8">
                            <div className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="current_password" value="Current Password" className="text-lg text-blue-600 dark:text-blue-400" />
                                    <TextInput
                                        id="current_password"
                                        ref={currentPasswordInputRef}
                                        value={formData.current_password}
                                        onChange={(e) => setFormData('current_password', e.target.value)}
                                        type="password"
                                        className="mt-2 block w-full rounded-xl border-2 border-blue-100 dark:border-blue-800 focus:border-blue-500 focus:ring-blue-500"
                                        autoComplete="current-password"
                                    />
                                    <InputError message={formErrors.current_password} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="password" value="New Password" className="text-lg text-blue-600 dark:text-blue-400" />
                                    <TextInput
                                        id="password"
                                        ref={passwordInputRef}
                                        value={formData.password}
                                        onChange={(e) => setFormData('password', e.target.value)}
                                        type="password"
                                        className="mt-2 block w-full rounded-xl border-2 border-blue-100 dark:border-blue-800 focus:border-blue-500 focus:ring-blue-500"
                                        autoComplete="new-password"
                                    />
                                    <InputError message={formErrors.password} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" className="text-lg text-blue-600 dark:text-blue-400" />
                                    <TextInput
                                        id="password_confirmation"
                                        value={formData.password_confirmation}
                                        onChange={(e) => setFormData('password_confirmation', e.target.value)}
                                        type="password"
                                        className="mt-2 block w-full rounded-xl border-2 border-blue-100 dark:border-blue-800 focus:border-blue-500 focus:ring-blue-500"
                                        autoComplete="new-password"
                                    />
                                    <InputError message={formErrors.password_confirmation} className="mt-2" />
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <PrimaryButton className={`px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl text-lg font-semibold transform transition-all duration-200 hover:scale-105 ${formProcessing && 'opacity-75 cursor-wait'}`} disabled={formProcessing}>
                                    Update Password
                                </PrimaryButton>
                            </div>

                            <Transition show={formRecentlySuccessful}>
                                <p className="text-base text-green-600 dark:text-green-400 flex items-center justify-center bg-green-50 dark:bg-green-900/30 p-4 rounded-xl">
                                    Password updated successfully
                                </p>
                            </Transition>
                        </form>
                    </div>

                    {/* Delete Account Card */}
                    <div className="bg-gray-800/40 dark:bg-gray-800/40  shadow-2xl rounded-3xl p-8 backdrop-blur-lg transform transition-all duration-300 hover:scale-[1.02]">
                        <header className="mb-6">
                            <h3 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">Delete Account</h3>
                            <p className="text-gray-600 dark:text-gray-400">This action cannot be undone. Please be certain.</p>
                        </header>

                        <DangerButton
                            onClick={confirmUserDeletion}
                            className="w-full py-4 text-lg font-semibold rounded-xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transform transition-all duration-200 hover:scale-105"
                        >
                            Delete Account
                        </DangerButton>

                        <Modal show={confirmingUserDeletion} onClose={closeModal}>
                            <form onSubmit={deleteUser} className="p-8">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                                    Are you sure?
                                </h2>
                                <p className="text-base text-gray-600 dark:text-gray-400 mb-6">
                                    Once your account is deleted, all of its resources and data will be permanently deleted.
                                </p>
                                <div className="mb-6">
                                    <InputLabel htmlFor="password" value="Password" className="sr-only" />
                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        ref={passwordInput}
                                        value={deleteData.password}
                                        onChange={(e) => setDeleteData('password', e.target.value)}
                                        className="mt-1 block w-full rounded-xl"
                                        isFocused
                                        placeholder="Enter your password to confirm"/>
                                        <InputError message={deleteErrors.password} className="mt-2" />
                                    </div>
                                    <div className="flex justify-end space-x-4">
                                        <SecondaryButton
                                            onClick={closeModal}
                                            className="px-6 py-3 rounded-xl text-base font-semibold hover:bg-gray-100 dark:hover:bg-gray-700"
                                        >
                                            Cancel
                                        </SecondaryButton>
                                        <DangerButton
                                            className="px-6 py-3 rounded-xl text-base font-semibold bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                                            disabled={deleteProcessing}
                                        >
                                            Delete Account
                                        </DangerButton>
                                    </div>
                                </form>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>

        );
    }