import React from 'react';
import LanguageSwitcher from './LanguageSwitcher';
// import NotificationBadge from './NotificationBadge';

export default function Header({ user }) {
    return (
        <header className="flex items-center justify-between w-full h-16 px-6 bg-transparent">
            {/* Left side can be for breadcrumbs or page titles if you want */}
            <div>
                {/* Placeholder */}
            </div>

            {/* Right side for user actions */}
            <div className="flex items-center space-x-4">
                {/* <NotificationBadge /> */}
                <LanguageSwitcher />
            </div>
        </header>
    );
}
