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

    // State management
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const passwordInput = useRef();

    const {
        data: deleteData,
        setData: setDeleteData,
        delete: destroy,
        processing: deleteProcessing,
        reset: deleteReset,
        errors: deleteErrors,
        clearErrors: deleteClearErrors,
    } = useForm({ password: '' });

    const confirmUserDeletion = () => setConfirmingUserDeletion(true);
    const closeModal = () => {
        setConfirmingUserDeletion(false);
        deleteClearErrors();
        deleteReset();
    };

    const deleteUser = (e) => {
        e.preventDefault();
        setIsLoading(true);
        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => {
                deleteReset();
                setIsLoading(false);
            },
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

    const updatePassword = (e) => {
        e.preventDefault();
        setIsLoading(true);
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
            onFinish: () => setIsLoading(false),
        });
    };

    const submitProfile = (e) => {
        e.preventDefault();
        setIsLoading(true);
        patch(route('profile.update'), {
            onFinish: () => setIsLoading(false),
        });
    };

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Animated Background */}
         <div className="fixed inset-0 bg-gradient-to-br from-blue-800 via-black to-blue-800 -z-10">
  {/* Animated Background Elements */}
  <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-400/5 rounded-full blur-3xl animate-pulse"></div>
  <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
</div>

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

                           </div>

                           {/* Profile Section */}
                               <div className="mt-auto border-t border-blue-500/20">
                                   <div
                                       className="relative p-4"
                                       onMouseEnter={() => setShowProfileMenu(true)}
                                       onMouseLeave={() => setShowProfileMenu(false)}
                                   >
                                       <div className="flex items-center">
                                           <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
                                           <i className='bx bxs-user text-2xl text-yellow-400'></i>
                                           </div>
                                           <div className="ml-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                                               <p className="text-sm font-semibold text-white">{user.name}</p>
                                               <p className="text-xs text-blue-400">Administrator</p>
                                           </div>
                                       </div>

                                       {/* Profile Menu */}
                                       <div className={`absolute bottom-full left-4 right-4 bg-black/95 backdrop-blur-xl rounded-2xl border border-blue-500/20 shadow-2xl transition-all duration-300 ${showProfileMenu ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                                           <Link
                                               href={route('profile.edit')}
                                               className="flex items-center px-6 py-4 hover:bg-yellow-400/10 transition-colors rounded-t-2xl border-b border-blue-500/10"
                                           >
                                               <i className='bx bxs-cog text-xl text-yellow-400'></i>
                                               <span className="ml-4 text-sm text-white">Profile Settings</span>
                                           </Link>
                                           <Link
                                               href={route('logout')}
                                               method="post"
                                               as="button"
                                               className="w-full flex items-center px-6 py-4 hover:bg-blue-500/10 transition-colors rounded-b-2xl"
                                           >
                                               <i className='bx bxs-log-out text-xl text-blue-400'></i>
                                               <span className="ml-4 text-sm text-white">Sign Out</span>
                                           </Link>
                                       </div>
                                   </div>
                               </div>
                       </div>
                   </nav>

            {/* Main Content */}
            <div className="ml-20 min-h-screen relative z-10">
                <div className="max-w-6xl mx-auto px-8 py-12">
                    {/* Header Section */}
                    <div className="text-center mb-16 relative">
                        <div className="relative inline-block">
                            <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-300 to-blue-400 bg-clip-text text-transparent mb-6 relative z-10">
                                Profile Settings
                            </h1>
                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-blue-400/20 blur-3xl"></div>
                        </div>
                        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                            Manage your account settings and security preferences with our modern interface
                        </p>
                        <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-blue-400 mx-auto rounded-full shadow-lg shadow-yellow-400/50"></div>
                    </div>

                    {/* Main Content Card */}
                    <div className="relative">
                        {/* Glassmorphism Card */}
                        <div className="bg-black/20 backdrop-blur-2xl rounded-3xl border border-blue-500/20 shadow-2xl shadow-blue-500/10 overflow-hidden relative">
                            {/* Card border glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-transparent to-blue-500/10 rounded-3xl"></div>

                            <div className="relative z-10 p-12">


                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                    {/* Profile Information Section */}
                                    <div className="space-y-8">
                                        <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-8 border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/10">
                                            <h3 className="text-2xl font-semibold text-yellow-400 mb-6 flex items-center">
                                                <i className='bx bxs-user-circle text-3xl mr-3'></i>
                                                Profile Information
                                            </h3>

                                            <form onSubmit={submitProfile} className="space-y-6">
                                                <div className="space-y-6">
                                                    <div className="group">
                                                        <InputLabel htmlFor="name" value="Full Name" className="text-lg text-blue-300 mb-3 font-medium" />
                                                        <div className="relative">
                                                            <TextInput
                                                                id="name"
                                                                className="w-full px-6 py-4 bg-black/40 border-2 border-blue-500/30 rounded-xl text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 backdrop-blur-sm"
                                                                value={formData.name}
                                                                onChange={(e) => setFormData('name', e.target.value)}
                                                                required
                                                                autoComplete="name"
                                                            />
                                                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 to-blue-400/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                                        </div>
                                                        <InputError className="mt-2 text-red-400" message={formErrors.name} />
                                                    </div>

                                                    <div className="group">
                                                        <InputLabel htmlFor="email" value="Email Address" className="text-lg text-blue-300 mb-3 font-medium" />
                                                        <div className="relative">
                                                            <TextInput
                                                                id="email"
                                                                type="email"
                                                                className="w-full px-6 py-4 bg-black/40 border-2 border-blue-500/30 rounded-xl text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 backdrop-blur-sm"
                                                                value={formData.email}
                                                                onChange={(e) => setFormData('email', e.target.value)}
                                                                required
                                                                autoComplete="username"
                                                            />
                                                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 to-blue-400/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                                        </div>
                                                        <InputError className="mt-2 text-red-400" message={formErrors.email} />
                                                    </div>

                                                    {mustVerifyEmail && user.email_verified_at === null && (
                                                        <div className="bg-yellow-400/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-yellow-400/30">
                                                            <div className="flex items-start space-x-4">
                                                                <div className="flex-shrink-0 mt-1">
                                                                    <i className='bx bxs-error text-2xl text-yellow-400'></i>
                                                                </div>
                                                                <div>
                                                                    <p className="text-yellow-300 mb-3">
                                                                        Your email address needs verification.
                                                                    </p>
                                                                    <Link
                                                                        href={route('verification.send')}
                                                                        method="post"
                                                                        as="button"
                                                                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105"
                                                                    >
                                                                        Resend Verification Email
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                            {status === 'verification-link-sent' && (
                                                                <div className="mt-4 bg-green-500/10 backdrop-blur-sm p-4 rounded-xl border border-green-400/30">
                                                                    <p className="text-green-300 flex items-center">
                                                                        <i className='bx bxs-check-circle text-xl mr-2'></i>
                                                                        Verification email sent successfully!
                                                                    </p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex justify-end pt-4">
                                                    <button
                                                        type="submit"
                                                        disabled={formProcessing || isLoading}
                                                        className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        <span className="relative z-10 flex items-center">
                                                            {(formProcessing || isLoading) ? (
                                                                <>
                                                                    <i className='bx bx-loader-alt animate-spin text-xl mr-2'></i>
                                                                    Saving...
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <i className='bx bxs-save text-xl mr-2'></i>
                                                                    Save Changes
                                                                </>
                                                            )}
                                                        </span>
                                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-600/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                    </button>
                                                </div>

                                                <Transition
                                                    show={formRecentlySuccessful}
                                                    enter="transition ease-out duration-300"
                                                    enterFrom="opacity-0 transform scale-95"
                                                    enterTo="opacity-100 transform scale-100"
                                                    leave="transition ease-in duration-200"
                                                    leaveFrom="opacity-100 transform scale-100"
                                                    leaveTo="opacity-0 transform scale-95"
                                                >
                                                    <div className="bg-green-500/10 backdrop-blur-sm p-4 rounded-xl border border-green-400/30 text-center">
                                                        <p className="text-green-300 flex items-center justify-center">
                                                            <i className='bx bxs-check-circle text-xl mr-2'></i>
                                                            Profile updated successfully!
                                                        </p>
                                                    </div>
                                                </Transition>
                                            </form>
                                        </div>
                                    </div>

                                    {/* Password Security Section */}
                                    <div className="space-y-8">
                                        <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-8 border border-blue-400/20 hover:border-blue-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-blue-400/10">
                                            <h3 className="text-2xl font-semibold text-blue-400 mb-6 flex items-center">
                                                <i className='bx bxs-lock-alt text-3xl mr-3'></i>
                                                Security Settings
                                            </h3>

                                            <form onSubmit={updatePassword} className="space-y-6">
                                                <div className="space-y-6">
                                                    <div className="group">
                                                        <InputLabel htmlFor="current_password" value="Current Password" className="text-lg text-blue-300 mb-3 font-medium" />
                                                        <div className="relative">
                                                            <TextInput
                                                                id="current_password"
                                                                ref={currentPasswordInputRef}
                                                                value={formData.current_password}
                                                                onChange={(e) => setFormData('current_password', e.target.value)}
                                                                type="password"
                                                                className="w-full px-6 py-4 bg-black/40 border-2 border-blue-500/30 rounded-xl text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 backdrop-blur-sm"
                                                                autoComplete="current-password"
                                                            />
                                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-yellow-400/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                                        </div>
                                                        <InputError message={formErrors.current_password} className="mt-2 text-red-400" />
                                                    </div>

                                                    <div className="group">
                                                        <InputLabel htmlFor="password" value="New Password" className="text-lg text-blue-300 mb-3 font-medium" />
                                                        <div className="relative">
                                                            <TextInput
                                                                id="password"
                                                                ref={passwordInputRef}
                                                                value={formData.password}
                                                                onChange={(e) => setFormData('password', e.target.value)}
                                                                type="password"
                                                                className="w-full px-6 py-4 bg-black/40 border-2 border-blue-500/30 rounded-xl text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 backdrop-blur-sm"
                                                                autoComplete="new-password"
                                                            />
                                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-yellow-400/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                                        </div>
                                                        <InputError message={formErrors.password} className="mt-2 text-red-400" />
                                                    </div>

                                                    <div className="group">
                                                        <InputLabel htmlFor="password_confirmation" value="Confirm New Password" className="text-lg text-blue-300 mb-3 font-medium" />
                                                        <div className="relative">
                                                            <TextInput
                                                                id="password_confirmation"
                                                                value={formData.password_confirmation}
                                                                onChange={(e) => setFormData('password_confirmation', e.target.value)}
                                                                type="password"
                                                                className="w-full px-6 py-4 bg-black/40 border-2 border-blue-500/30 rounded-xl text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 backdrop-blur-sm"
                                                                autoComplete="new-password"
                                                            />
                                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-yellow-400/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                                        </div>
                                                        <InputError message={formErrors.password_confirmation} className="mt-2 text-red-400" />
                                                    </div>
                                                </div>

                                                <div className="flex justify-end pt-4">
                                                    <button
                                                        type="submit"
                                                        disabled={formProcessing || isLoading}
                                                        className="group relative px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 rounded-xl text-black font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        <span className="relative z-10 flex items-center">
                                                            {(formProcessing || isLoading) ? (
                                                                <>
                                                                    <i className='bx bx-loader-alt animate-spin text-xl mr-2'></i>
                                                                    Updating...
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <i className='bx bxs-key text-xl mr-2'></i>
                                                                    Update Password
                                                                </>
                                                            )}
                                                        </span>
                                                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                    </button>
                                                </div>

                                                <Transition
                                                    show={formRecentlySuccessful}
                                                    enter="transition ease-out duration-300"
                                                    enterFrom="opacity-0 transform scale-95"
                                                    enterTo="opacity-100 transform scale-100"
                                                    leave="transition ease-in duration-200"
                                                    leaveFrom="opacity-100 transform scale-100"
                                                    leaveTo="opacity-0 transform scale-95"
                                                >
                                                    <div className="bg-green-500/10 backdrop-blur-sm p-4 rounded-xl border border-green-400/30 text-center">
                                                        <p className="text-green-300 flex items-center justify-center">
                                                            <i className='bx bxs-check-circle text-xl mr-2'></i>
                                                            Password updated successfully!
                                                        </p>
                                                    </div>
                                                </Transition>
                                            </form>
                                        </div>

                                        {/* Danger Zone */}
                                        <div className="bg-red-900/10 backdrop-blur-xl rounded-2xl p-8 border border-red-500/20 hover:border-red-500/40 transition-all duration-300">
                                            <h3 className="text-2xl font-semibold text-red-400 mb-6 flex items-center">
                                                <i className='bx bxs-error text-3xl mr-3'></i>
                                                Danger Zone
                                            </h3>
                                            <p className="text-gray-300 mb-6">
                                                Once you delete your account, all of its resources and data will be permanently deleted.
                                            </p>
                                            <button
                                                onClick={confirmUserDeletion}
                                                className="group relative px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl text-white font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/30"
                                            >
                                                <span className="relative z-10 flex items-center">
                                                    <i className='bx bxs-trash text-xl mr-2'></i>
                                                    Delete Account
                                                </span>
                                                <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-red-600/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced Delete Confirmation Modal */}
            <Modal show={confirmingUserDeletion} onClose={closeModal} maxWidth="md">
                <div className="bg-black/90 backdrop-blur-2xl border border-red-500/30 rounded-2xl overflow-hidden">
                    <div className="p-8">
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className='bx bxs-error text-4xl text-red-400'></i>
                            </div>
                            <h2 className="text-2xl font-bold text-red-400 mb-4">Delete Account</h2>
                            <p className="text-gray-300 leading-relaxed">
                                Are you sure you want to delete your account? This action cannot be undone.
                                All of your data will be permanently removed from our servers.
                            </p>
                        </div>

                        <form onSubmit={deleteUser} className="space-y-6">
                            <div>
                                <InputLabel htmlFor="password" value="Confirm with your password" className="text-lg text-red-300 mb-3 font-medium" />
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    ref={passwordInput}
                                    value={deleteData.password}
                                    onChange={(e) => setDeleteData('password', e.target.value)}
                                    className="w-full px-6 py-4 bg-black/40 border-2 border-red-500/30 rounded-xl text-white placeholder-gray-400 focus:border-red-400 focus:ring-2 focus:ring-red-400/20 transition-all duration-300"
                                    placeholder="Enter your password"
                                />
                                <InputError message={deleteErrors.password} className="mt-2 text-red-400" />
                            </div>

                            <div className="flex justify-end space-x-4 pt-4">
                                <SecondaryButton
                                    onClick={closeModal}
                                    className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl transition-all duration-300"
                                >
                                    Cancel
                                </SecondaryButton>
                                <DangerButton
                                    className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl transition-all duration-300 transform hover:scale-105"
                                    disabled={deleteProcessing || isLoading}
                                >
                                    {(deleteProcessing || isLoading) ? (
                                        <>
                                            <i className='bx bx-loader-alt animate-spin text-xl mr-2'></i>
                                            Deleting...
                                        </>
                                    ) : (
                                        <>
                                            <i className='bx bxs-trash text-xl mr-2'></i>
                                            Delete Account
                                        </>
                                    )}
                                </DangerButton>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

