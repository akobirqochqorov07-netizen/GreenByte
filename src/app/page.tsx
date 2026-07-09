/* eslint-disable @next/next/no-img-element */
"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { translations } from "@/i18n/translations";
import ContactBlock from "@/components/ContactBlock";
import { ChevronLeft, ChevronRight, ArrowDownRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const { language } = useLanguage();
  const t = translations[language];

  // Active state for sliders / interactive tabs
  const [partnerIndex, setPartnerIndex] = useState(0);
  const [activeWorkflow, setActiveWorkflow] = useState(0);

  // Fallbacks if data doesn't exist
  if (!t.glavnaya || !t.successStories || !t.servicesTeaser || !t.workflow || !t.clients) return null;

  const currentPartner = t.successStories.list[partnerIndex];

  const handleNextPartner = () => setPartnerIndex((prev) => (prev + 1) % t.successStories.list.length);
  const handlePrevPartner = () => setPartnerIndex((prev) => (prev - 1 + t.successStories.list.length) % t.successStories.list.length);

  return (
    <main className="min-h-screen bg-[#0F0F0F] text-[#FFFFFF] font-sans overflow-x-hidden">
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-16 pt-16 md:pt-24 pb-20">

        {/* Main Hero & Stats Block */}
        <section className="flex flex-col lg:flex-row justify-between mb-32">
          {/* Left Column: Titles and Descriptions (Moved higher up by adjusting padding) */}
          <div className="w-full lg:w-[45%] pr-0 lg:pr-10 mb-16 lg:mb-0">
            <h4 className="text-[13px] text-[#A3A3A3] mb-6">{t.glavnaya.badge}</h4>
            <h1 className="text-5xl md:text-[64px] font-normal leading-[1.05] tracking-tight mb-16 text-white">
              {t.glavnaya.title}
            </h1>

            <p className="text-[15px] font-light text-[#A3A3A3] mb-8 leading-[1.6] max-w-[400px]">
              {t.glavnaya.desc1}
            </p>
            <p className="text-[15px] font-light text-[#A3A3A3] leading-[1.6] max-w-[400px]">
              {t.glavnaya.desc2}
            </p>
            {/* Removed Video-obzor button as requested */}
          </div>

          {/* Right Column: Giant Stats */}
          <div className="w-full lg:w-[50%] flex flex-col mt-0 lg:-mt-2">
            {t.glavnaya.stats.map((stat, i) => (
              <div
                key={i}
                className={`flex flex-col sm:flex-row justify-between items-start sm:items-center py-10 ${i === 0 ? "pt-0" : ""} border-b border-white/20`}
              >
                <div className="text-[72px] md:text-[90px] font-light tracking-tighter leading-none mb-6 sm:mb-0">
                  {stat.big}
                </div>
                <div className="text-[14px] text-[#A3A3A3] sm:max-w-[200px] leading-relaxed">
                  {stat.small}
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* SUCCESS STORIES SLIDER */}
        <section className="mb-40 pt-10 border-t border-white/10">
          <h2 className="text-4xl md:text-[70px] lg:text-[85px] font-normal leading-[1.05] tracking-tight max-w-[1000px] mb-20 whitespace-pre-wrap">
            <span className="block">{t.successStories.title}</span>
            <span className="block">{t.successStories.subtitle}</span>
          </h2>

          {/* Slider Container mimicking Screenshot 1 */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24 relative pb-10 border-b border-white/5">

            {/* Left Navigation Arrow */}
            <button onClick={handlePrevPartner} className="absolute left-[-40px] top-1/2 -translate-y-1/2 hidden lg:flex text-white/50 hover:text-white transition-colors cursor-pointer">
              <ChevronLeft className="w-8 h-8 font-light" strokeWidth={1} />
            </button>

            {/* Main Content Areas */}
            {currentPartner && (
              <>
                <div className="w-full lg:w-[60%] flex-shrink-0 animate-in fade-in zoom-in-95 duration-500">
                  <img
                    src={currentPartner.image}
                    alt={currentPartner.brand}
                    className="w-full h-auto object-cover rounded-sm border border-white/5 shadow-2xl"
                  />
                </div>

                <div className="w-full lg:w-[40%] flex flex-col justify-start animate-in fade-in slide-in-from-right-4 duration-500">
                  <p className="text-[14px] text-[#A3A3A3] font-light mb-2">{currentPartner.niche}</p>
                  <h3 className="text-[32px] md:text-[40px] font-normal mb-10 leading-tight">
                    {currentPartner.brand}
                  </h3>

                  <ul className="space-y-4 mb-20">
                    {currentPartner.results.map((res, idx) => (
                      <li key={idx} className="flex items-start text-[#D1D1D1] text-[15px] font-light leading-[1.6]">
                        <span className="text-[#FFB800] mr-4">+</span>
                        <span>{res}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/services" className="inline-flex items-center space-x-3 text-[16px] text-white hover:text-[#A3A3A3] transition-colors group border-b border-white/20 pb-1 w-fit">
                    <span>{currentPartner.linkText}</span>
                    <ArrowDownRight className="w-4 h-4 text-[#FFB800] group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
                  </Link>
                </div>
              </>
            )}

            {/* Right Navigation Arrow */}
            <button onClick={handleNextPartner} className="absolute right-[-40px] top-1/2 -translate-y-1/2 hidden lg:flex text-white/50 hover:text-white transition-colors cursor-pointer">
              <ChevronRight className="w-8 h-8 font-light" strokeWidth={1} />
            </button>

            {/* Mobile Navigation Arrows */}
            <div className="flex lg:hidden space-x-6 w-full justify-center">
              <button onClick={handlePrevPartner} className="text-white/50 hover:text-white transition-colors p-2"><ChevronLeft /></button>
              <button onClick={handleNextPartner} className="text-white/50 hover:text-white transition-colors p-2"><ChevronRight /></button>
            </div>
          </div>
        </section>


        {/* CLIENTS GRID / CREATIVE LAYOUT */}
        <section className="mb-40">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 border-b border-white/5 pb-20">
            <div className="w-full lg:w-[40%]">
              <h2 className="text-3xl md:text-[50px] font-normal mb-4">{t.clients.title}</h2>
              <p className="text-[#A3A3A3] text-[17px] font-light">{t.clients.desc}</p>
            </div>
            <div className="w-full lg:w-[60%] grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {t.clients.list.map((client, i) => (
                <div key={i} className="text-[20px] md:text-[24px] font-light text-[#E5E5E5] flex items-center justify-center h-20 border border-white/5 rounded-sm hover:border-[#FFB800]/50 hover:text-[#FFB800] transition-colors cursor-crosshair">
                  {client}
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* SERVICES TEASER BLOCK (Screenshot #2) */}
        <section className="mb-40">
          <h2 className="text-[50px] md:text-[80px] font-normal leading-[1] mb-6 tracking-tight">
            {t.servicesTeaser.mainTitle}
          </h2>
          <div className="text-[18px] md:text-[24px] text-[#A3A3A3] font-light border-b border-white/20 pb-12 mb-16">
            {t.servicesTeaser.subTitle}
          </div>

          <div className="flex flex-col lg:flex-row justify-between pt-4 border-b border-white/5 pb-20">
            {/* Huge Left Dev Category Text */}
            <div className="w-full lg:w-[45%] mb-12 lg:mb-0">
              <h3 className="text-4xl md:text-[60px] font-normal leading-[1.05]">
                {t.servicesTeaser.devCategory}
              </h3>
            </div>

            {/* Right Lists */}
            <div className="w-full lg:w-[50%] flex flex-col justify-start">
              <p className="text-[15px] font-light text-[#A3A3A3] mb-12 leading-[1.7] max-w-[500px]">
                {t.servicesTeaser.devDesc}
              </p>

              <div className="space-y-4 mb-20 text-[14px] md:text-[15px] font-light text-[#D1D1D1]">
                {t.servicesTeaser.items.map((srv, idx) => (
                  <div key={idx}>{srv}</div>
                ))}
              </div>

              <div className="flex justify-end pr-10">
                <Link href="/services" className="inline-flex items-center space-x-3 text-[18px] text-white hover:text-[#A3A3A3] transition-colors group">
                  <span className="font-light">{t.servicesTeaser.more}</span>
                  <ArrowDownRight className="w-5 h-5 text-[#FFB800] group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>


        {/* WORKFLOW (СТАРТ РАБОТ) TABS (Screenshot #3 & #4) */}
        <section className="mb-32">
          <h2 className="text-[50px] md:text-[80px] font-normal leading-[1] mb-8 tracking-tight">
            {t.workflow.title}
          </h2>
          <p className="text-[#A3A3A3] text-[17px] md:text-[20px] font-light leading-[1.6] max-w-[800px] mb-20">
            {t.workflow.desc}
          </p>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center h-auto lg:h-[600px]">

            {/* Left Dynamic Image */}
            <div className="w-full lg:w-1/2 h-[400px] lg:h-full relative shrink-0">
              {t.workflow.steps.map((step, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${idx === activeWorkflow ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                >
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover rounded-sm grayscale-[30%] shadow-xl"
                  />
                </div>
              ))}
            </div>

            {/* Right Interactive List */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-10 pl-0 lg:pl-10 h-full relative z-20">
              {t.workflow.steps.map((step, idx) => {
                const isActive = idx === activeWorkflow;
                return (
                  <div
                    key={idx}
                    onClick={() => setActiveWorkflow(idx)}
                    className={`flex items-center gap-10 cursor-pointer transition-all duration-500 group ${isActive ? 'opacity-100 scale-100' : 'opacity-40 hover:opacity-70 scale-95 origin-left'}`}
                  >
                    <div className={`text-[60px] md:text-[100px] font-light leading-none ${isActive ? 'text-white' : 'text-transparent'} [-webkit-text-stroke:1px_rgba(255,255,255,0.4)] transition-all duration-500`}>
                      {step.num}
                    </div>
                    <div className={`text-[24px] md:text-[36px] font-normal tracking-tight transition-colors duration-500 ${isActive ? 'text-white' : 'text-[#A3A3A3]'}`}>
                      {step.title}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>


        {/* GLOBAL SECURE CONTACT BLOCK */}
        <ContactBlock />

      </div>
    </main>
  );
}
