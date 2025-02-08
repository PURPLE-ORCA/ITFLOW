import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="font-poppins text-white p-5 flex flex-col items-center justify-center h-auto w-auto">

            {/* Background with the requested colors */}
            <div
                className="absolute inset-0 -z-10 background-pattern"
                style={{
                    background: `linear-gradient(to bottom right, #1e3a8a, #000000, #1e40af)`,
                    backgroundSize: 'cover',
                    backgroundBlendMode: 'overlay',
                }}
            ></div>

            <div className="py">
                {children}
            </div>
        </div>
    );
}
