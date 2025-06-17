import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="font-poppins text-white p-5 flex flex-col items-center justify-center h-auto w-auto">

              {/* Background */}
<div className="fixed inset-0 bg-gradient-to-br from-blue-800 via-black to-blue-800 -z-10">
  {/* Animated Background Elements */}
  <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-400/5 rounded-full blur-3xl animate-pulse"></div>
  <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
</div>

            <div className="py">
                {children}
            </div>
        </div>
    );
}
