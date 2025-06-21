import { useState } from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function IsLogin({ status, canResetPassword }) {
    const [isLogin, setIsLogin] = useState(true);

    const loginForm = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const registerForm = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        loginForm.post(route('login'), {
            onFinish: () => loginForm.reset('password'),
            onSuccess: () => {
                window.location.href = route('dashboard');
            },
        });
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        registerForm.post(route('register'), {
            onFinish: () => registerForm.reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title={isLogin ? "Log in" : "Register"} />

            {/* Animated Background */}
            <div
                className="fixed bottom-0 right-0 w-full h-full bg-gradient-to-r from-[#f3b42a] to-[#f0af22] transition-all duration-800 ease-in-out -z-10 pointer-events-none"
                style={{ clipPath: "polygon(100% 0, 100% 0, 100% 100%, 0% 100%)" }}
            ></div>

            <div className="container mx-auto px-4 py-10">
                <div className="w-full px-8 py-1 rounded-lg border-b-2 border-black text-white placeholder-gray-100/5 transition duration-200">
                    <div className="flex flex-col items-center text-center py-6 bg-transparent text-yellow-300">
                    <img src={`${window.location.origin}/storage/img/logo2.png`} alt="Logo" className="min-w-24 h-24 mb-3" />

                        <p className="mt-2 text-lg">Join our amazing community</p>
                    </div>
                    <div className="p-8">
                        <div className="flex justify-center mb-6 space-x-4">
                            <button
                                onClick={() => setIsLogin(true)}
                                className={`px-5 py-1 rounded-full focus:outline-none transition-colors duration-300 ${
                                    isLogin ? 'bg-blue-500 text-white shadow-lg' : 'bg-black text-blue-500'
                                }`}
                            >
                                Login
                            </button>
                            <button
                                onClick={() => setIsLogin(false)}
                                className={`px-4 py-1 rounded-full focus:outline-none transition-colors duration-300 ${
                                    !isLogin ? 'bg-yellow-500 text-white shadow-lg' : 'bg-black text-yellow-500'
                                }`}
                            >
                                Sing Up
                            </button>
                        </div>

                        {isLogin ? (
                            <form onSubmit={handleLoginSubmit} className="space-y-4">
                                <div className="relative">
                                    <InputLabel htmlFor="email" value="" className="text-gray-300" />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={loginForm.data.email}
                                        className="w-full px-8 py-2 rounded-lg border-b-2 border-white text-white text-center "
                                        autoComplete="username"
                                        isFocused={true}
                                        onChange={(e) => loginForm.setData('email', e.target.value)}
                                        placeholder="Email"
                                    />
                                    <i className="fas fa-envelope absolute left-3 top-3 text-gray-400"></i>
                                    <InputError message={loginForm.errors.email} className="mt-2" />
                                </div>

                                <div className="relative">
                                    <InputLabel htmlFor="password" value="" className="text-gray-300" />
                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={loginForm.data.password}
                                        className="w-full px-8 py-2 rounded-lg border-b-2 border-white text-white text-center"
                                        autoComplete="current-password"
                                        onChange={(e) => loginForm.setData('password', e.target.value)}
                                        placeholder="Password"
                                    />
                                    <i className="fas fa-lock absolute left-3 top-3 text-gray-400"></i>
                                    <InputError message={loginForm.errors.password} className="mt-2" />
                                </div>

                                <div className="mt-4 flex items-center justify-between">
                                    <label className="flex items-center">
                                        <Checkbox
                                            name="remember"
                                            checked={loginForm.data.remember}
                                            onChange={(e) =>
                                                loginForm.setData('remember', e.target.checked)
                                            }
                                        />
                                        <span className="ms-2 text-sm text-gray-300">
                                            Remember me
                                        </span>
                                    </label>

                                    {canResetPassword && (
                                        <Link
                                            href={route('password.request')}
                                            className="text-sm text-gray-300 underline hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >
                                            Forgot your password?
                                        </Link>
                                    )}
                                </div>

                                <div className="mt-4">
                                    <PrimaryButton className="w-full py-1.5 bg-blue-600 rounded-full hover:bg-yellow-500 hover:text-white text-black hover:opacity-90 transition-opacity duration-300 transform hover:scale-105" disabled={loginForm.processing}>
                                        Log in
                                    </PrimaryButton>
                                </div>
                            </form>
                        ) : (
                            <form onSubmit={handleRegisterSubmit} className="space-y-4">
                                <div className="relative">
                                    <InputLabel htmlFor="name" value="" className="text-gray-300" />
                                    <TextInput
                                        id="name"
                                        name="name"
                                        value={registerForm.data.name}
                                        className="w-full px-8 py-2 rounded-lg border-b-2 border-white bg-white bg-opacity-20 focus:bg-opacity-30 focus:ring-2 focus:ring-cyan-300 text-white text-center placeholder-gray-300 transition duration-200"
                                        autoComplete="name"
                                        isFocused={true}
                                        onChange={(e) => registerForm.setData('name', e.target.value)}
                                        placeholder="Full Name"
                                        required
                                    />
                                    <i className="fas fa-user absolute left-3 top-3 text-gray-400"></i>
                                    <InputError message={registerForm.errors.name} className="mt-2" />
                                </div>

                                <div className="relative">
                                    <InputLabel htmlFor="email" value="" className="text-gray-300" />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={registerForm.data.email}
                                        className="w-full px-8 py-2 rounded-lg border-b-2 border-white bg-white bg-opacity-20 focus:bg-opacity-30 focus:ring-2 focus:ring-cyan-300 text-white text-center placeholder-gray-300 transition duration-200"
                                        autoComplete="username"
                                        onChange={(e) => registerForm.setData('email', e.target.value)}
                                        placeholder="Email"
                                        required
                                    />
                                    <i className="fas fa-envelope absolute left-3 top-3 text-gray-400"></i>
                                    <InputError message={registerForm.errors.email} className="mt-2" />
                                </div>

                                <div className="relative">
                                    <InputLabel htmlFor="password" value="" className="text-gray-300" />
                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={registerForm.data.password}
                                        className="w-full px-8 py-2 rounded-lg border-b-2 border-white bg-white bg-opacity-20 focus:bg-opacity-30 focus:ring-2 focus:ring-cyan-300 text-white text-center placeholder-gray-300 transition duration-200"
                                        autoComplete="new-password"
                                        onChange={(e) => registerForm.setData('password', e.target.value)}
                                        placeholder="Password"
                                        required
                                    />
                                    <i className="fas fa-lock absolute left-3 top-3 text-gray-400"></i>
                                    <InputError message={registerForm.errors.password} className="mt-2" />
                                </div>

                                <div className="relative">
                                    <InputLabel htmlFor="password_confirmation" value="" className="text-gray-300" />
                                    <TextInput
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        value={registerForm.data.password_confirmation}
                                        className="w-full px-8 py-2 rounded-lg border-b-2 border-white bg-white bg-opacity-20 focus:bg-opacity-30 focus:ring-2 focus:ring-cyan-300 text-white text-center placeholder-gray-300 transition duration-200"
                                        autoComplete="new-password"
                                        onChange={(e) =>
                                            registerForm.setData('password_confirmation', e.target.value)
                                        }
                                        placeholder="Confirm Password"
                                        required
                                    />
                                    <i className="fas fa-lock absolute left-3 top-3 text-gray-400"></i>
                                    <InputError message={registerForm.errors.password_confirmation} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <PrimaryButton className="w-full py-2 text-black bg-blue-600 rounded-full hover:bg-yellow-500 hover:text-white transition" disabled={registerForm.processing}>
                                        Sign Up
                                    </PrimaryButton>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
