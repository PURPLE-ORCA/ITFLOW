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
export default function ProfileSettings({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;

    // State for deleting user
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
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
        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => deleteReset(),
        });
    };

    // State for updating password
    const passwordInputRef = useRef();
    const currentPasswordInputRef = useRef();

    const {
        data: passwordData,
        setData: setPasswordData,
        errors: passwordErrors,
        put,
        reset: passwordReset,
        processing: passwordProcessing,
        recentlySuccessful: passwordRecentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();
        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => passwordReset(),
            onError: (errors) => {
                if (errors.password) {
                    passwordReset('password', 'password_confirmation');
                    passwordInputRef.current.focus();
                }
                if (errors.current_password) {
                    passwordReset('current_password');
                    currentPasswordInputRef.current.focus();
                }
            },
        });
    };

    // State for updating profile information
    const {
        data: profileData,
        setData: setProfileData,
        patch,
        errors: profileErrors,
        processing: profileProcessing,
        recentlySuccessful: profileRecentlySuccessful,
    } = useForm({
        name: user.name,
        email: user.email,
    });

    const submitProfile = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (

        <div className={`space-y-6 ${className}`}>
            {/* Delete Account Section */}



            <section>


                <header>
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Delete Account</h2>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Once your account is deleted, all of its resources and data will be permanently deleted.
                    </p>
                </header>
                <DangerButton onClick={confirmUserDeletion}>Delete Account</DangerButton>
                <Modal show={confirmingUserDeletion} onClose={closeModal}>
                    <form onSubmit={deleteUser} className="p-6">
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                            Are you sure you want to delete your account?
                        </h2>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            Please enter your password to confirm.
                        </p>
                        <div className="mt-6">
                            <InputLabel htmlFor="password" value="Password" className="sr-only" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                ref={passwordInput}
                                value={deleteData.password}
                                onChange={(e) => setDeleteData('password', e.target.value)}
                                className="mt-1 block w-3/4"
                                isFocused
                                placeholder="Password"
                            />
                            <InputError message={deleteErrors.password} className="mt-2" />
                        </div>
                        <div className="mt-6 flex justify-end">
                            <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
                            <DangerButton className="ms-3" disabled={deleteProcessing}>
                                Delete Account
                            </DangerButton>
                        </div>
                    </form>
                </Modal>
            </section>

            {/* Update Password Section */}
            <section className="relative">
                <div className="p-8 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl">
                    <header className="text-center">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Update Password</h2>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Ensure your account is using a long, random password to stay secure.
                        </p>
                    </header>
                    <form onSubmit={updatePassword} className="mt-8 space-y-6">
                        <div className="relative group">
                            <InputLabel htmlFor="current_password" value="Current Password" className="text-gray-700 dark:text-gray-300" />
                            <TextInput
                                id="current_password"
                                ref={currentPasswordInputRef}
                                value={passwordData.current_password}
                                onChange={(e) => setPasswordData('current_password', e.target.value)}
                                type="password"
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                            />
                            <InputError message={passwordErrors.current_password} className="mt-2" />
                        </div>
                        <div className="relative group">
                            <InputLabel htmlFor="password" value="New Password" className="text-gray-700 dark:text-gray-300" />
                            <TextInput
                                id="password"
                                ref={passwordInputRef}
                                value={passwordData.password}
                                onChange={(e) => setPasswordData('password', e.target.value)}
                                type="password"
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                            />
                            <InputError message={passwordErrors.password} className="mt-2" />
                        </div>
                        <div className="relative group">
                            <InputLabel htmlFor="password_confirmation" value="Confirm Password" className="text-gray-700 dark:text-gray-300" />
                            <TextInput
                                id="password_confirmation"
                                value={passwordData.password_confirmation}
                                onChange={(e) => setPasswordData('password_confirmation', e.target.value)}
                                type="password"
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                            />
                            <InputError message={passwordErrors.password_confirmation} className="mt-2" />
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                            <PrimaryButton className={`px-6 py-3 ${passwordProcessing && 'opacity-75 cursor-wait'}`} disabled={passwordProcessing}>
                                Update Password
                            </PrimaryButton>
                            <Transition show={passwordRecentlySuccessful}>
                                <p className="text-sm text-green-600 dark:text-green-400 flex items-center">
                                    Password updated successfully
                                </p>
                            </Transition>
                        </div>
                    </form>
                </div>
            </section>

            {/* Update Profile Information Section */}
            <section className="relative">
                <div className="p-8 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl">
                    <header className="text-center">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Profile Information</h2>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Keep your profile information up to date</p>
                    </header>
                    <form onSubmit={submitProfile} className="mt-8 space-y-6">
                        <div className="relative group">
                            <InputLabel htmlFor="name" value="Name" className="text-gray-700 dark:text-gray-300" />
                            <TextInput
                                id="name"
                                className="mt-1 block w-full"
                                value={profileData.name}
                                onChange={(e) => setProfileData('name', e.target.value)}
                                required
                                isFocused
                                autoComplete="name"
                            />
                            <InputError className="mt-2" message={profileErrors.name} />
                        </div>
                        <div className="relative group">
                            <InputLabel htmlFor="email" value="Email" className="text-gray-700 dark:text-gray-300" />
                            <TextInput
                                id="email"
                                type="email"
                                className="mt-1 block w-full"
                                value={profileData.email}
                                onChange={(e) => setProfileData('email', e.target.value)}
                                required
                                autoComplete="username"
                            />
                            <InputError className="mt-2" message={profileErrors.email} />
                        </div>
                        {mustVerifyEmail && user.email_verified_at === null && (
                            <div className="bg-yellow-50 dark:bg-yellow-900/30 rounded-lg p-4">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-yellow-700 dark:text-yellow-200">
                                            Your email address is unverified.
                                            <Link href={route('verification.send')} method="post" as="button" className="ml-2 font-medium text-yellow-700 dark:text-yellow-200 underline hover:text-yellow-600 dark:hover:text-yellow-100">
                                                Click here to re-send the verification email.
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                                {status === 'verification-link-sent' && (
                                    <div className="mt-4 bg-green-50 dark:bg-green-900/30 p-3 rounded-md">
                                        <p className="text-sm text-green-700 dark:text-green-200">
                                            A new verification link has been sent to your email address.
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                            <PrimaryButton className={`px-6 py-3 ${profileProcessing && 'opacity-75 cursor-wait'}`} disabled={profileProcessing}>
                                Save Changes
                            </PrimaryButton>
                            <Transition show={profileRecentlySuccessful}>
                                <p className="text-sm text-green-600 dark:text-green-400 flex items-center">
                                    Changes saved successfully
                                </p>
                            </Transition>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
}
