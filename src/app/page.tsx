/* eslint-disable @next/next/no-img-element */
"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { translations } from "@/i18n/translations";
import ContactBlock from "@/components/ContactBlock";
import { ChevronLeft, ChevronRight, ArrowDownRight, Sparkles, Landmark, LineChart, ShieldCheck, Wallet, Code2, Cloud, Database, Rocket, type LucideIcon } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";

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

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 28 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.08, ease: "easeOut" },
    }),
  };

  const clientIcons: Record<string, LucideIcon> = {
    landmark: Landmark,
    lineChart: LineChart,
    shieldCheck: ShieldCheck,
    wallet: Wallet,
    code: Code2,
    cloud: Cloud,
    database: Database,
    rocket: Rocket,
  };

  const clientLogos: Record<string, string> = {
    google: "https://cdn.simpleicons.org/google/A3A3A3",
    microsoft: "https://cdn.simpleicons.org/microsoft/A3A3A3",
    amazon: "https://cdn.simpleicons.org/amazon/A3A3A3",
    meta: "https://cdn.simpleicons.org/meta/A3A3A3",
    apple: "https://cdn.simpleicons.org/apple/A3A3A3",
    netflix: "https://cdn.simpleicons.org/netflix/A3A3A3",
    spotify: "https://cdn.simpleicons.org/spotify/A3A3A3",
    tesla: "https://cdn.simpleicons.org/tesla/A3A3A3",
  };

  // Background theme timer — alternates between vibrant (green+violet) and pure black
  const [bgVibrant, setBgVibrant] = useState(true);
  useEffect(() => {
    const id = setInterval(() => setBgVibrant((v) => !v), 9000);
    return () => clearInterval(id);
  }, []);

  return (
    <main className="relative min-h-screen bg-[#0A0A0A] text-white font-sans overflow-x-hidden">

      {/* ── Aurora / Grid background (timer-switched vibrant ⇄ black) ── */}
      <div
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden transition-colors duration-[1500ms]"
        style={{ backgroundColor: bgVibrant ? "transparent" : "#000000" }}
      >
        {/* vibrant glows (fade in/out with state) */}
        <div
          className={`absolute -top-40 left-1/2 -translate-x-1/2 w-[140vw] h-[80vh] rounded-full bg-[radial-gradient(circle_at_center,rgba(30,215,96,0.18),transparent_60%)] blur-3xl transition-opacity duration-[1500ms] ${bgVibrant ? "opacity-100" : "opacity-0"}`}
        />
        <div
          className={`absolute bottom-0 right-0 w-[90vw] h-[60vh] rounded-full bg-[radial-gradient(circle_at_center,rgba(120,80,255,0.12),transparent_60%)] blur-3xl transition-opacity duration-[1500ms] ${bgVibrant ? "opacity-100" : "opacity-0"}`}
        />
        {/* grid always subtle */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-5 sm:px-6 md:px-16 pt-24 md:pt-32 pb-16 md:pb-24">

        {/* ── HERO ── */}
        <section className="flex flex-col lg:flex-row justify-between gap-14 lg:gap-10 mb-24 md:mb-40">
          {/* Left: titles */}
          <motion.div
            className="w-full lg:w-[48%] pr-0 lg:pr-10"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#1ED760]" />
              <span className="text-[11px] sm:text-[12px] uppercase tracking-[0.2em] text-[#A3A3A3]">{t.glavnaya.badge}</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-[2.6rem] leading-[1.04] sm:text-5xl md:text-[64px] font-normal tracking-tight mb-8 md:mb-12 text-white"
            >
              {t.glavnaya.title}
            </motion.h1>

            <motion.p variants={fadeUp} custom={2} className="text-[15px] sm:text-[16px] font-light text-[#A3A3A3] mb-5 leading-[1.65] max-w-[440px]">
              {t.glavnaya.desc1}
            </motion.p>
            <motion.p variants={fadeUp} custom={3} className="text-[15px] sm:text-[16px] font-light text-[#A3A3A3] leading-[1.65] max-w-[440px]">
              {t.glavnaya.desc2}
            </motion.p>
          </motion.div>

          {/* Right: giant stats */}
          <div className="w-full lg:w-[50%] flex flex-col mt-2 lg:-mt-2">
            {t.glavnaya.stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                className={`flex flex-col sm:flex-row justify-between items-start sm:items-center py-8 md:py-10 ${i === 0 ? "pt-0" : ""} border-b border-white/15`}
              >
                <div className="text-[3.5rem] leading-none sm:text-[64px] md:text-[90px] font-light tracking-tighter mb-3 sm:mb-0 bg-gradient-to-br from-white to-white/55 bg-clip-text text-transparent">
                  {stat.big}
                </div>
                <div className="text-[14px] text-[#A3A3A3] sm:max-w-[210px] leading-relaxed">
                  {stat.small}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── SUCCESS STORIES SLIDER ── */}
        <section className="mb-24 md:mb-40 pt-10 border-t border-white/10">
          <h2 className="text-[2.6rem] leading-[1.04] sm:text-5xl md:text-[64px] font-normal leading-[1.04] tracking-tight max-w-[1000px] mb-12 md:mb-20 whitespace-pre-wrap">
            <span className="block">{t.successStories.title}</span>
            <span className="block text-white/50">{t.successStories.subtitle}</span>
          </h2>

          <div className="relative flex flex-col lg:flex-row items-center gap-10 lg:gap-24 pb-4 border-b border-white/5">
            {/* Prev (desktop) */}
            <button onClick={handlePrevPartner} aria-label="Previous" className="absolute left-[-44px] top-1/2 -translate-y-1/2 hidden lg:flex text-white/40 hover:text-white transition-colors cursor-pointer">
              <ChevronLeft className="w-9 h-9" strokeWidth={1} />
            </button>

            {currentPartner && (
              <>
                {/* Real picture card */}
                <div className="w-full lg:w-[58%] flex-shrink-0">
                  <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl group aspect-[4/3] lg:aspect-auto lg:h-[420px] bg-white/[0.02]">
                    <img
                      src={currentPartner.image}
                      alt={currentPartner.brand}
                      loading="lazy"
                      onError={(e) => {
                        const el = e.currentTarget;
                        el.style.display = "none";
                        if (el.parentElement) {
                          el.parentElement.classList.add("flex", "items-center", "justify-center");
                          el.parentElement.innerHTML = `<span class="text-2xl font-light text-white/60 tracking-tight">${currentPartner.brand}</span>`;
                        }
                      }}
                      className="absolute inset-0 w-full h-full object-cover grayscale contrast-105 transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                </div>

                {/* Text block next to image */}
                <div className="w-full lg:w-[42%] flex flex-col justify-start lg:pt-4">
                  <p className="text-[12px] sm:text-[13px] uppercase tracking-[0.18em] text-[#1ED760] font-light mb-2">{currentPartner.niche}</p>
                  <h3 className="text-[26px] sm:text-[34px] md:text-[40px] font-normal leading-tight text-white mb-6">
                    {currentPartner.brand}
                  </h3>
                  <ul className="space-y-3.5 mb-8">
                    {currentPartner.results.map((res, idx) => (
                      <li key={idx} className="flex items-start text-[#D1D1D1] text-[14px] sm:text-[15px] font-light leading-[1.6]">
                        <span className="text-[#FFB800] mr-3 mt-0.5">+</span>
                        <span>{res}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/services" className="inline-flex items-center space-x-3 text-[15px] sm:text-[16px] text-white hover:text-[#A3A3A3] transition-colors group border-b border-white/20 pb-1 w-fit">
                    <span>{currentPartner.linkText}</span>
                    <ArrowDownRight className="w-4 h-4 text-[#FFB800] group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
                  </Link>
                </div>
              </>
            )}

            {/* Next (desktop) */}
            <button onClick={handleNextPartner} aria-label="Next" className="absolute right-[-44px] top-1/2 -translate-y-1/2 hidden lg:flex text-white/40 hover:text-white transition-colors cursor-pointer">
              <ChevronRight className="w-9 h-9" strokeWidth={1} />
            </button>

            {/* Mobile nav */}
            <div className="flex lg:hidden space-x-6 w-full justify-center pt-2">
              <button onClick={handlePrevPartner} aria-label="Previous" className="text-white/50 hover:text-white transition-colors p-2"><ChevronLeft className="w-6 h-6" /></button>
              <button onClick={handleNextPartner} aria-label="Next" className="text-white/50 hover:text-white transition-colors p-2"><ChevronRight className="w-6 h-6" /></button>
            </div>
          </div>
        </section>

        {/* ── CLIENTS — infinity carousel (blurred, behind, "soon") ── */}
        <section className="mb-24 md:mb-40">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 border-b border-white/5 pb-16 md:pb-20">
            <div className="w-full lg:w-[40%]">
              <h2 className="text-[2.6rem] leading-[1.04] sm:text-5xl md:text-[64px] font-normal mb-4">{t.clients.title}</h2>
              <p className="text-[#A3A3A3] text-[16px] sm:text-[17px] font-light leading-relaxed">{t.clients.desc}</p>
            </div>

            {/* Infinity marquee — real UZ IT companies, seamless/smooth */}
            <div className="w-full lg:w-[60%] relative overflow-hidden mask-fade-x">
              <div className="client-marquee flex w-max gap-3 sm:gap-4">
                {/* duplicated list for seamless loop */}
                {[...t.clients.list, ...t.clients.list, ...t.clients.list, ...t.clients.list].map((client, i) => {
                  return (
                    <div
                      key={i}
                      className="flex flex-col items-center justify-center gap-2 w-[104px] sm:w-[120px] h-[104px] sm:h-[120px] border border-white/[0.06] rounded-2xl bg-white/[0.015] hover:border-white/20 transition-colors shrink-0"
                    >
                      {client.logo && (
                        <img
                          src={client.logo}
                          alt={client.label}
                          className="w-7 h-7 sm:w-8 sm:h-8 object-contain opacity-45"
                          loading="lazy"
                        />
                      )}
                      <span className="text-[11px] sm:text-[12px] font-light text-white/45 tracking-wide">{client.label}</span>
                    </div>
                  );
                })}
              </div>

              {/* center "soon" badge */}
              <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
                <span className="soon-pulse px-5 py-2 rounded-full border border-[#1ED760]/40 bg-[#0A0A0A]/70 text-[#1ED760] text-[13px] tracking-[0.25em] uppercase font-light backdrop-blur-sm">
                  Soon
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── SERVICES TEASER ── */}
        <section className="mb-24 md:mb-40">
          <h2 className="text-[2.6rem] leading-[1.04] sm:text-5xl md:text-[64px] font-normal leading-[1] mb-5 tracking-tight">
            {t.servicesTeaser.mainTitle}
          </h2>
          <div className="text-[17px] sm:text-[20px] md:text-[24px] text-[#A3A3A3] font-light border-b border-white/20 pb-10 md:pb-12 mb-12 md:mb-16">
            {t.servicesTeaser.subTitle}
          </div>

          <div className="flex flex-col lg:flex-row justify-between pt-4 border-b border-white/5 pb-16 md:pb-20 gap-10 lg:gap-16">
            <div className="w-full lg:w-[45%] mb-8 lg:mb-0">
              <h3 className="text-[2.6rem] leading-[1.04] sm:text-5xl md:text-[64px] font-normal leading-[1.04] bg-gradient-to-br from-white to-white/50 bg-clip-text text-transparent">
                {t.servicesTeaser.devCategory}
              </h3>
            </div>

            <div className="w-full lg:w-[50%] flex flex-col justify-start">
              <p className="text-[15px] sm:text-[16px] font-light text-[#A3A3A3] mb-10 leading-[1.7] max-w-[520px]">
                {t.servicesTeaser.devDesc}
              </p>

              <div className="space-y-3.5 mb-12 text-[14px] sm:text-[15px] font-light text-[#D1D1D1]">
                {t.servicesTeaser.items.map((srv, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="text-[#1ED760] mt-0.5">→</span>
                    <span>{srv}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-start sm:justify-end">
                <Link href="/services" className="inline-flex items-center space-x-3 text-[16px] sm:text-[18px] text-white hover:text-[#A3A3A3] transition-colors group">
                  <span className="font-light">{t.servicesTeaser.more}</span>
                  <ArrowDownRight className="w-5 h-5 text-[#FFB800] group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── WORKFLOW TABS ── */}
        <section className="mb-20 md:mb-32">
          <h2 className="text-[2.6rem] leading-[1.04] sm:text-5xl md:text-[64px] font-normal leading-[1] mb-6 md:mb-8 tracking-tight">
            {t.workflow.title}
          </h2>
          <p className="text-[#A3A3A3] text-[16px] sm:text-[18px] md:text-[20px] font-light leading-[1.6] max-w-[800px] mb-12 md:mb-20">
            {t.workflow.desc}
          </p>

          <div className="flex flex-col lg:flex-row gap-10 lg:gap-24 items-stretch lg:items-center lg:h-[600px]">
            {/* Image */}
            <div className="w-full lg:w-1/2 h-[280px] sm:h-[400px] lg:h-full relative shrink-0 rounded-2xl overflow-hidden border border-white/10">
              {t.workflow.steps.map((step, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${idx === activeWorkflow ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                >
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover grayscale-[25%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
              ))}
            </div>

            {/* List */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-6 sm:space-y-8 lg:pl-10 relative z-20">
              {t.workflow.steps.map((step, idx) => {
                const isActive = idx === activeWorkflow;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveWorkflow(idx)}
                    className={`flex items-center gap-5 sm:gap-8 cursor-pointer transition-all duration-500 text-left group ${isActive ? 'opacity-100 scale-100' : 'opacity-40 hover:opacity-70 scale-95 origin-left'}`}
                  >
                    <div className={`text-[44px] sm:text-[60px] md:text-[100px] font-light leading-none transition-all duration-500 ${isActive ? 'text-white' : 'text-transparent'} [-webkit-text-stroke:1px_rgba(255,255,255,0.4)]`}>
                      {step.num}
                    </div>
                    <div className={`text-[20px] sm:text-[24px] md:text-[34px] font-normal tracking-tight transition-colors duration-500 ${isActive ? 'text-white' : 'text-[#A3A3A3]'}`}>
                      {step.title}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <ContactBlock />

      </div>
    </main>
  );
}
