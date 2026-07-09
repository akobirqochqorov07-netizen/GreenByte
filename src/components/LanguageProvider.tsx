"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, translations } from "@/i18n/translations";

type LanguageContextType = {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: typeof translations.uz;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>("uz");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("app_lang") as Language;
        if (saved && ["uz", "ru", "en"].includes(saved)) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setLanguage(saved);
        }
        setMounted(true);
    }, []);

    const handleLanguageChange = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem("app_lang", lang);
    };

    if (!mounted) return <div className="min-h-screen bg-[#050505]"></div>;

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleLanguageChange, t: translations[language] }}>
            <div className="animate-in fade-in duration-500">
                {children}
            </div>
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
