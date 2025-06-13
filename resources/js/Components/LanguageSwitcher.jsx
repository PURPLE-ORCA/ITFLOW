import React, { useContext } from 'react';
import { TranslationContext } from '../Contexts/TranslationContext';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

const locales = [
    { locale: 'en', label: 'English' },
    { locale: 'fr', label: 'Français' },
    { locale: 'ar', label: 'العربية' },
];

export default function LanguageSwitcher() {
    const { language, switchLanguage } = useContext(TranslationContext);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-9 w-9">
                    <i className='bx bx-world text-xl text-gray-300 hover:text-white'></i>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 bg-slate-800 border-slate-700 text-gray-200">
                {locales.map((loc) => (
                    <DropdownMenuItem
                        key={loc.locale}
                        onClick={() => switchLanguage(loc.locale)}
                        className={`flex items-center justify-between hover:!bg-slate-700/50 hover:!text-white ${loc.locale === 'ar' ? 'font-arabic flex-row-reverse justify-end' : ''}`}
                    >
                        <span>{loc.label}</span>
                        {loc.locale === language && <i className='bx bx-check text-lg text-yellow-400'></i>}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
