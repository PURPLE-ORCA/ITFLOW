import React, { createContext, useState, useEffect } from 'react';

export const TranslationContext = createContext();

const TranslationProvider = ({ children }) => {
    const [language, setLanguage] = useState('en'); // Default language
    const [translations, setTranslations] = useState({});

    useEffect(() => {
        const loadTranslations = async () => {
            try {
                const langFile = await import(`../lang/${language}.json`);
                setTranslations(langFile.default);
            } catch (error) {
                console.error(`Failed to load translations for ${language}:`, error);
                // Fallback to English if selected language fails to load
                const enLangFile = await import(`../lang/en.json`);
                setTranslations(enLangFile.default);
                setLanguage('en');
            }
        };
        loadTranslations();
    }, [language]);

    const switchLanguage = (newLanguage) => {
        setLanguage(newLanguage);
    };

    return (
        <TranslationContext.Provider value={{ language, translations, switchLanguage }}>
            {children}
        </TranslationContext.Provider>
    );
};

export default TranslationProvider;
