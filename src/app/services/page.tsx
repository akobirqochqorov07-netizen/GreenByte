/* eslint-disable @next/next/no-img-element */
"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { translations } from "@/i18n/translations";
import { ArrowUpRight } from "lucide-react";
import ContactBlock from "@/components/ContactBlock";
import { motion, type Variants } from "framer-motion";

export default function ServicesPage() {
  const { language } = useLanguage();
  const t = translations[language];

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.08, ease: "easeOut" },
    }),
  };

  return (
    <main className="relative min-h-screen bg-[#0A0A0A] text-white font-sans overflow-x-hidden">

      {/* Aurora background */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 right-0 w-[120vw] h-[70vh] rounded-full bg-[radial-gradient(circle_at_center,rgba(30,215,96,0.16),transparent_60%)] blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[80vw] h-[50vh] rounded-full bg-[radial-gradient(circle_at_center,rgba(120,80,255,0.1),transparent_60%)] blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-5 sm:px-6 md:px-16 pt-24 md:pt-32 pb-16 md:pb-24">

        {/* HERO */}
        <section id="home" className="mb-24 md:mb-48 min-h-[38vh] flex flex-col justify-center">
          <motion.h4
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[13px] text-[#A3A3A3] font-light tracking-[0.25em] uppercase mb-6"
          >
            {t.hero.breadcrumbs}
          </motion.h4>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-[2.4rem] leading-[1.05] sm:text-5xl md:text-[80px] font-normal tracking-tight mb-6 md:mb-8 max-w-[14ch]"
          >
            {t.hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[16px] sm:text-lg md:text-2xl text-[#A3A3A3] font-light leading-[1.6] max-w-[760px]"
          >
            {t.hero.desc}
          </motion.p>
        </section>

        {/* SERVICES */}
        <section id="services" className="mb-24 md:mb-48">
          <h2 className="text-4xl sm:text-[50px] md:text-[80px] font-normal mb-12 md:mb-20 tracking-tight border-b border-white/10 pb-8 md:pb-10">
            {t.services.title}
          </h2>
          <div className="space-y-16 md:space-y-32">
            {t.services.list.map((service, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-20 border-b border-white/10 pb-14 md:pb-20"
              >
                <motion.div variants={fadeUp} custom={0} className="flex-1 w-full">
                  <h2 className="text-3xl sm:text-4xl md:text-[40px] font-normal mb-6 md:mb-8 leading-tight">{service.title}</h2>
                  <div className="space-y-4 md:space-y-5 text-[#A3A3A3] text-[15px] sm:text-[16px] md:text-[18px] leading-[1.6] font-light mb-8 md:mb-10">
                    <p>{service.text1}</p>
                    <p>{service.text2}</p>
                  </div>
                  <a href="#contact" className="inline-flex items-center space-x-3 text-[15px] font-light text-white hover:text-[#A3A3A3] transition-colors group">
                    <span>{t.services.specLink}</span>
                    <span className="text-[#FFB800] group-hover:translate-x-1 transition-transform">›</span>
                  </a>
                </motion.div>

                <motion.div variants={fadeUp} custom={1} className="flex-1 w-full flex flex-col justify-between">
                  <div className="w-full relative mb-8 md:mb-10 rounded-2xl overflow-hidden border border-white/10 group">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-[230px] sm:h-[300px] md:h-[400px] object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-6 border-t border-white/10">
                    <div>
                      <div className="text-[13px] text-[#A3A3A3] font-light mb-1">{service.time}</div>
                      <div className="text-[20px] font-normal">{service.price}</div>
                    </div>
                    <a href="#contact" className="mt-5 sm:mt-0 flex items-center space-x-2 text-[15px] text-white hover:text-[#A3A3A3] transition-colors group cursor-pointer">
                      <span>{t.services.cta}</span>
                      <ArrowUpRight className="w-4 h-4 text-[#FFB800] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="pt-16 md:pt-20 mb-24 md:mb-48">
          <h2 className="text-3xl sm:text-[40px] font-normal mb-12 md:mb-20 tracking-tight">{t.projects.title}</h2>
          <div className="space-y-16 md:space-y-32">
            {t.projects.list.map((project, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
                className="flex flex-col border-t border-white/10 pt-12 md:pt-16"
              >
                <motion.h4 variants={fadeUp} custom={0} className="text-[13px] text-[#1ED760] font-light tracking-[0.18em] uppercase mb-4">
                  {project.category}
                </motion.h4>
                <motion.h3 variants={fadeUp} custom={1} className="text-3xl sm:text-[32px] md:text-[40px] font-normal leading-[1.1] tracking-tight mb-6 md:mb-8">
                  {project.title}
                </motion.h3>
                <motion.div variants={fadeUp} custom={2} className="mb-8 md:mb-12">
                  <a href={project.link} className="inline-block text-[15px] font-light border-b border-white/30 pb-1 hover:border-white transition-colors">
                    {t.projects.viewSite}
                  </a>
                </motion.div>
                <motion.div variants={fadeUp} custom={3} className="w-full mb-12 md:mb-16 rounded-2xl overflow-hidden border border-white/10">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    onError={(e) => {
                      const el = e.currentTarget;
                      el.style.display = "none";
                      if (el.parentElement) {
                        el.parentElement.classList.add("flex", "items-center", "justify-center", "aspect-[16/9]", "bg-gradient-to-br", "from-white/10", "to-white/[0.02]");
                        el.parentElement.innerHTML = `<span class="text-3xl font-light text-white/70 tracking-tight">${project.title}</span>`;
                      }
                    }}
                    className="w-full h-auto max-h-[600px] object-cover"
                  />
                </motion.div>
                <motion.div variants={fadeUp} custom={4}>
                  <h4 className="text-2xl sm:text-[28px] font-normal mb-5 md:mb-6 tracking-tight">{t.projects.resultsTitle}</h4>
                  <ul className="list-disc pl-5 space-y-3 text-[15px] sm:text-[17px] text-[#D1D1D1] font-light">
                    {project.results.map((res: string, rIdx: number) => (
                      <li key={rIdx} className="pl-2">{res}</li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </section>

        <ContactBlock />

      </div>
    </main>
  );
}
