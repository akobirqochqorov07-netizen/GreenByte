"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageProvider";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { translations } from "@/i18n/translations";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
    const { language, setLanguage } = useLanguage();
    const t = translations[language];
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [mobileOpen]);

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        // If we're already on the page where the given ID exists, scroll smoothly
        const element = document.getElementById(id);
        if (element) {
            e.preventDefault();
            window.scrollTo({
                top: element.offsetTop,
                behavior: "smooth",
            });
        }
        // Else, standard link navigation occurs natively
    };

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex flex-col fixed top-0 left-0 h-screen w-[280px] xl:w-[320px] bg-[#111111] text-white border-r border-white/5 py-10 px-8 z-50 justify-between">

                <div>
                    <Link href="/" className="inline-block text-2xl font-bold tracking-tight mb-16 hover:opacity-80 transition-opacity flex items-center gap-2">
                        GREEN<span className="font-light">BYTE</span>
                    </Link>

                    <nav className="flex flex-col space-y-6">
                        <Link
                            href="/"
                            className={`text-[15px] font-light transition-colors ${pathname === '/' ? 'text-white' : 'text-[#A3A3A3] hover:text-white'}`}
                        >
                            {t.sidebar.about}
                        </Link>
                        <Link
                            href="/services"
                            className={`text-[15px] font-light transition-colors ${pathname === '/services' ? 'text-white' : 'text-[#A3A3A3] hover:text-white'}`}
                        >
                            {t.sidebar.services}
                        </Link>
                        <Link
                            href="/services#projects"
                            className={`text-[15px] font-light transition-colors text-[#A3A3A3] hover:text-white`}
                        >
                            {t.sidebar.projects}
                        </Link>
                        <a href="#contact" onClick={(e) => handleScroll(e, 'contact')} className="text-[15px] font-light text-[#A3A3A3] hover:text-white transition-colors">
                            {t.sidebar.contact}
                        </a>
                    </nav>
                </div>

                <div className="flex flex-col space-y-8">

                    <div className="flex items-center space-x-3 text-[13px] tracking-widest font-normal text-[#A3A3A3]">
                        <button
                            onClick={() => setLanguage('ru')}
                            className={`hover:text-white transition-colors ${language === 'ru' ? 'text-white' : ''}`}
                        >
                            RU
                        </button>
                        <span className="w-px h-3 bg-white/20 block"></span>
                        <button
                            onClick={() => setLanguage('uz')}
                            className={`hover:text-white transition-colors ${language === 'uz' ? 'text-white' : ''}`}
                        >
                            UZ
                        </button>
                        <span className="w-px h-3 bg-white/20 block"></span>
                        <button
                            onClick={() => setLanguage('en')}
                            className={`hover:text-white transition-colors ${language === 'en' ? 'text-white' : ''}`}
                        >
                            EN
                        </button>
                    </div>

                    <a href="#contact" onClick={(e) => handleScroll(e, 'contact')} className="flex items-center space-x-2 text-[14px] text-white hover:opacity-80 transition-opacity group cursor-pointer w-fit pb-8 border-b border-white/10 w-full mb-8">
                        <span>{t.sidebar.ctaBtn}</span>
                        <ArrowUpRight className="w-4 h-4 text-[#FFB800] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>

                    <div className="text-[13px] text-[#A3A3A3] font-light leading-relaxed whitespace-pre-line">
                        {t.sidebar.address}
                    </div>
                </div>
            </aside>

            {/* Mobile Topbar */}
            <header className="md:hidden flex items-center justify-between px-5 py-4 fixed top-0 left-0 right-0 w-full z-[60] bg-[#111111]/95 backdrop-blur-md border-b border-white/10">
                <Link href="/" className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                    GREEN<span className="font-light">BYTE</span>
                </Link>
                <button
                    onClick={() => setMobileOpen(true)}
                    aria-label="Open menu"
                    className="text-white/80 hover:text-white transition-colors p-1"
                >
                    <Menu className="w-6 h-6" strokeWidth={1.5} />
                </button>
            </header>

            {/* Mobile Drawer Overlay */}
            {mobileOpen && (
                <div className="md:hidden fixed inset-0 z-[70]">
                    <div
                        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                        onClick={() => setMobileOpen(false)}
                    />
                    <aside className="absolute top-0 right-0 h-full w-[78%] max-w-[320px] bg-[#111111] border-l border-white/10 px-7 py-6 flex flex-col justify-between overflow-y-auto">
                        <div>
                            <div className="flex items-center justify-between mb-12">
                                <span className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                                    GREEN<span className="font-light">BYTE</span>
                                </span>
                                <button
                                    onClick={() => setMobileOpen(false)}
                                    aria-label="Close menu"
                                    className="text-white/70 hover:text-white transition-colors p-1"
                                >
                                    <X className="w-6 h-6" strokeWidth={1.5} />
                                </button>
                            </div>

                            <nav className="flex flex-col space-y-7">
                                <Link
                                    href="/"
                                    onClick={() => setMobileOpen(false)}
                                    className={`text-[22px] font-light transition-colors ${pathname === '/' ? 'text-white' : 'text-[#A3A3A3] hover:text-white'}`}
                                >
                                    {t.sidebar.about}
                                </Link>
                                <Link
                                    href="/services"
                                    onClick={() => setMobileOpen(false)}
                                    className={`text-[22px] font-light transition-colors ${pathname === '/services' ? 'text-white' : 'text-[#A3A3A3] hover:text-white'}`}
                                >
                                    {t.sidebar.services}
                                </Link>
                                <Link
                                    href="/services#projects"
                                    onClick={() => setMobileOpen(false)}
                                    className="text-[22px] font-light text-[#A3A3A3] hover:text-white transition-colors"
                                >
                                    {t.sidebar.projects}
                                </Link>
                                <a
                                    href="#contact"
                                    onClick={(e) => { handleScroll(e, 'contact'); setMobileOpen(false); }}
                                    className="text-[22px] font-light text-[#A3A3A3] hover:text-white transition-colors"
                                >
                                    {t.sidebar.contact}
                                </a>
                            </nav>
                        </div>

                        <div className="flex flex-col space-y-7 mt-10">
                            <div className="flex items-center space-x-4 text-[14px] tracking-widest font-normal text-[#A3A3A3]">
                                <button
                                    onClick={() => setLanguage('ru')}
                                    className={`hover:text-white transition-colors ${language === 'ru' ? 'text-white' : ''}`}
                                >
                                    RU
                                </button>
                                <span className="w-px h-3 bg-white/20 block" />
                                <button
                                    onClick={() => setLanguage('uz')}
                                    className={`hover:text-white transition-colors ${language === 'uz' ? 'text-white' : ''}`}
                                >
                                    UZ
                                </button>
                                <span className="w-px h-3 bg-white/20 block" />
                                <button
                                    onClick={() => setLanguage('en')}
                                    className={`hover:text-white transition-colors ${language === 'en' ? 'text-white' : ''}`}
                                >
                                    EN
                                </button>
                            </div>

                            <a
                                href="#contact"
                                onClick={(e) => { handleScroll(e, 'contact'); setMobileOpen(false); }}
                                className="flex items-center space-x-2 text-[15px] text-white hover:opacity-80 transition-opacity group cursor-pointer w-fit"
                            >
                                <span>{t.sidebar.ctaBtn}</span>
                                <ArrowUpRight className="w-4 h-4 text-[#FFB800] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </a>

                            <div className="text-[13px] text-[#A3A3A3] font-light leading-relaxed whitespace-pre-line">
                                {t.sidebar.address}
                            </div>
                        </div>
                    </aside>
                </div>
            )}
        </>
    );
}
