"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageProvider";
import { ArrowUpRight } from "lucide-react";
import { translations } from "@/i18n/translations";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const { language, setLanguage } = useLanguage();
    const t = translations[language];
    const pathname = usePathname();

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
                            className={`text-[15px] font-light transition-colors ${pathname === '/' ? 'text-white font-medium' : 'text-[#A3A3A3] hover:text-white'}`}
                        >
                            {t.sidebar.about}
                        </Link>
                        <Link
                            href="/services"
                            className={`text-[20px] font-normal transition-colors ${pathname === '/services' ? 'text-white' : 'text-[#A3A3A3] hover:text-white'}`}
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
            <header className="md:hidden flex items-center justify-between px-6 py-4 fixed top-0 w-full z-50 bg-[#111111]/90 backdrop-blur-md border-b border-white/10">
                <Link href="/" className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                    GREEN<span className="font-light">BYTE</span>
                </Link>
                <button className="text-[13px] uppercase font-light text-[#A3A3A3]">Menu</button>
            </header>
        </>
    );
}
