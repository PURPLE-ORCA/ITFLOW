import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div class="font-poppins bg-gradient-to-br from-blue-900 via-black to-blue-950 min-h-screen text-white p-5 flex flex-col items-center justify-center h-auto w-auto">
            <div>
                <Link href="/">
                    <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
                </Link>
            </div>

            <div className="">
                {children}
            </div>
        </div>
    );
}
