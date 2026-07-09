/* eslint-disable @next/next/no-img-element */
"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { translations } from "@/i18n/translations";
import { ArrowUpRight } from "lucide-react";
import ContactBlock from "@/components/ContactBlock";

export default function ServicesPage() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <main className="min-h-screen bg-[#0F0F0F] text-[#FFFFFF] font-sans">
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-16 pt-24 md:pt-32 pb-40">

        {/* HERO SECTION */}
        <section id="home" className="mb-48 md:mb-64 min-h-[50vh] flex flex-col justify-center">
          <h4 className="text-[14px] text-[#A3A3A3] font-light tracking-wide mb-8">
            {t.hero.breadcrumbs}
          </h4>
          <h1 className="text-5xl md:text-[80px] font-normal tracking-tight mb-8 leading-[1.05]">
            {t.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-[#A3A3A3] font-light leading-relaxed max-w-[800px] mt-6">
            {t.hero.desc}
          </p>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="mb-48 md:mb-64">
          <h2 className="text-[50px] md:text-[80px] font-normal mb-20 tracking-tight border-b border-white/10 pb-10">
            {t.services.title}
          </h2>
          <div className="space-y-40">
            {t.services.list.map((service, idx) => (
              <div key={idx} className="flex flex-col lg:flex-row items-start justify-between gap-16 lg:gap-24 border-b border-white/10 pb-20">
                <div className="flex-1 w-full">
                  <h2 className="text-4xl md:text-[40px] font-normal mb-8 leading-tight">{service.title}</h2>
                  <div className="space-y-6 text-[#A3A3A3] text-[16px] md:text-[18px] leading-[1.6] font-light mb-10">
                    <p>{service.text1}</p>
                    <p>{service.text2}</p>
                  </div>
                  <a href="#contact" className="inline-flex items-center space-x-3 text-[15px] font-light text-white hover:text-[#A3A3A3] transition-colors group">
                    <span>{t.services.specLink}</span>
                    <span className="text-[#FFB800] group-hover:translate-x-1 transition-transform">›</span>
                  </a>
                </div>

                <div className="flex-1 w-full flex flex-col justify-between">
                  <div className="w-full relative mb-12 rounded-lg overflow-hidden group">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-[300px] md:h-[400px] object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-6 border-t border-white/10">
                    <div>
                      <div className="text-[13px] text-[#A3A3A3] font-light mb-1">{service.time}</div>
                      <div className="text-[20px] font-normal">{service.price}</div>
                    </div>
                    <a href="#contact" className="mt-6 sm:mt-0 flex items-center space-x-2 text-[15px] text-white hover:text-[#A3A3A3] transition-colors group cursor-pointer">
                      <span>{t.services.cta}</span>
                      <ArrowUpRight className="w-4 h-4 text-[#FFB800] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="pt-20 mb-48 md:mb-64">
          <h2 className="text-[40px] font-normal mb-20 tracking-tight">{t.projects.title}</h2>
          <div className="space-y-40">
            {t.projects.list.map((project, idx) => (
              <div key={idx} className="flex flex-col border-t border-white/10 pt-16">
                <h4 className="text-[14px] text-[#A3A3A3] font-light tracking-wide mb-5">
                  {project.category}
                </h4>
                <h3 className="text-[32px] md:text-[40px] font-normal leading-[1.1] tracking-tight mb-8">
                  {project.title}
                </h3>
                <div className="mb-12">
                  <a href={project.link} className="inline-block text-[15px] font-light border-b border-white/30 pb-1 hover:border-white transition-colors">
                    {t.projects.viewSite}
                  </a>
                </div>
                <div className="w-full mb-16 md:px-10">
                  <img src={project.image} alt={project.title} className="w-full h-auto max-h-[600px] object-cover rounded-[6px]" />
                </div>
                <div>
                  <h4 className="text-[28px] font-normal mb-6 tracking-tight">{t.projects.resultsTitle}</h4>
                  <ul className="list-disc pl-5 space-y-3 text-[17px] text-[#D1D1D1] font-light">
                    {project.results.map((res: string, rIdx: number) => (
                      <li key={rIdx} className="pl-2">{res}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT SECTION ISOLATED */}
        <ContactBlock />

      </div>
    </main>
  );
}
