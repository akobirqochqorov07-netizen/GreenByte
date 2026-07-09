"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { translations } from "@/i18n/translations";
import { useState } from "react";

export default function ContactBlock() {
    const { language } = useLanguage();
    const t = translations[language];

    const [contactMethod, setContactMethod] = useState<'telegram' | 'call'>('telegram');

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        telegram: '',
        services: '',
        sphere: '',
        company: '',
        additionalInfo: ''
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const serviceOptions = language === 'ru'
        ? ["IT-разработка", "SMM продвижение", "SEO оптимизация", "UI/UX Дизайн & Брендинг", "Другое"]
        : language === 'uz'
            ? ["IT-dasturlash", "SMM", "SEO optimizatsiya", "UI/UX Dizayn & Brending", "Boshqa"]
            : ["IT Development", "SMM", "SEO Optimization", "UI/UX Design & Branding", "Other"];

    // Defensive check since contact translations might be nested under `t.contact`.
    if (!t.contact) return null;

    const handleSubmit = async () => {
        if (!formData.name) return alert("Please enter your name");
        if (!formData.phone && !formData.telegram) return alert("Please enter either Phone or Telegram");

        setLoading(true);
        try {
            const res = await fetch("/api/telegram", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, contactMethod })
            });

            if (res.ok) {
                setSuccess(true);
                setFormData({ name: '', phone: '', telegram: '', services: '', sphere: '', company: '', additionalInfo: '' });
                setTimeout(() => setSuccess(false), 5000);
            } else {
                const data = await res.json();
                alert(`Xato yuz berdi: ${data.error || 'Server error'}`);
            }
        } catch (error) {
            console.error(error);
            alert("Error submitting request.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="pt-20 border-t border-white/10 mb-20 md:mb-40">
            <div className="flex flex-col lg:flex-row justify-between gap-16 md:gap-20">

                {/* Contact Title */}
                <div className="flex-1 w-full max-w-[500px]">
                    <h2 className="text-4xl md:text-[50px] font-normal leading-[1.1] mb-8">
                        {t.contact.title}
                    </h2>
                    <p className="text-[20px] text-[#A3A3A3] font-light leading-relaxed">
                        {t.contact.subtitle}
                    </p>
                </div>

                {/* Form Fields */}
                <div className="flex-1 w-full space-y-12">

                    <div className="flex flex-col">
                        <label className="text-[13px] text-[#A3A3A3] mb-2">{t.contact.form.name}</label>
                        <input
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            type="text"
                            className="w-full bg-transparent border-b border-[#333] pb-2 text-[16px] text-white focus:outline-none focus:border-white transition-colors"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-[13px] text-[#A3A3A3] mb-2">{t.contact.form.phone}</label>
                        <div className="flex items-end border-b border-[#333] pb-2 focus-within:border-white transition-colors w-full space-x-3">
                            <div className="flex items-center space-x-2 pb-0.5">
                                {/* Simplified distinct visual indicator simulating flag */}
                                <span className="w-5 h-3.5 bg-gradient-to-b from-blue-400 via-white to-green-500 block rounded-[1px]"></span>
                                <span className="text-[16px] text-white">+998</span>
                            </div>
                            <span className="w-px h-5 bg-[#333] block mb-0.5"></span>
                            <input
                                value={formData.phone}
                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                type="text"
                                className="w-full bg-transparent text-[16px] text-white focus:outline-none px-2"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-[13px] text-[#A3A3A3] mb-2">{t.contact.form.telegram}</label>
                        <input
                            value={formData.telegram}
                            onChange={e => setFormData({ ...formData, telegram: e.target.value })}
                            type="text"
                            className="w-full bg-transparent border-b border-[#333] pb-2 text-[16px] text-white focus:outline-none focus:border-white transition-colors"
                        />
                    </div>

                    <div className="flex flex-col space-y-4">
                        <label className="text-[14px] text-white font-medium">{t.contact.form.contactMethod}</label>
                        <div className="flex items-center space-x-12">
                            <label className="flex items-center space-x-3 cursor-pointer">
                                <div
                                    className={`w-4 h-4 border ${contactMethod === 'telegram' ? 'border-[#FFB800] bg-transparent flex items-center justify-center flex-shrink-0' : 'border-[#333] bg-transparent flex-shrink-0'}`}
                                    onClick={() => setContactMethod('telegram')}
                                >
                                    {contactMethod === 'telegram' && <div className="w-2 h-2 bg-[#FFB800]"></div>}
                                </div>
                                <span className="text-[14px] text-[#A3A3A3] hover:text-white transition-colors">{t.contact.form.methodTg}</span>
                            </label>
                            <label className="flex items-center space-x-3 cursor-pointer">
                                <div
                                    className={`w-4 h-4 border ${contactMethod === 'call' ? 'border-[#FFB800] bg-transparent flex items-center justify-center flex-shrink-0' : 'border-[#333] bg-transparent flex-shrink-0'}`}
                                    onClick={() => setContactMethod('call')}
                                >
                                    {contactMethod === 'call' && <div className="w-2 h-2 bg-[#FFB800]"></div>}
                                </div>
                                <span className="text-[14px] text-[#A3A3A3] hover:text-white transition-colors">{t.contact.form.methodCall}</span>
                            </label>
                        </div>
                    </div>

                    <div className="pt-2 flex flex-col">
                        <label className="text-[13px] text-[#A3A3A3] mb-2">{t.contact.form.selectServices}</label>
                        <select
                            value={formData.services}
                            onChange={e => setFormData({ ...formData, services: e.target.value })}
                            className="w-full bg-transparent border-b border-[#333] pb-2 text-[16px] text-white focus:outline-none focus:border-white transition-colors cursor-pointer appearance-none"
                        >
                            <option value="" disabled className="bg-[#111]">-- {language === 'uz' ? 'Tanlang' : language === 'ru' ? 'Выберите' : 'Select'} --</option>
                            {serviceOptions.map((opt, i) => (
                                <option key={i} value={opt} className="bg-[#111]">{opt}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-[13px] text-[#A3A3A3] mb-2">{t.contact.form.sphere}</label>
                        <input
                            value={formData.sphere}
                            onChange={e => setFormData({ ...formData, sphere: e.target.value })}
                            type="text"
                            className="w-full bg-transparent border-b border-[#333] pb-2 text-[16px] text-white focus:outline-none focus:border-white transition-colors"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-[13px] text-[#A3A3A3] mb-2">{t.contact.form.company}</label>
                        <input
                            value={formData.company}
                            onChange={e => setFormData({ ...formData, company: e.target.value })}
                            type="text"
                            className="w-full bg-transparent border-b border-[#333] pb-2 text-[16px] text-white focus:outline-none focus:border-white transition-colors"
                        />
                    </div>

                    <div className="flex flex-col pt-2">
                        <textarea
                            value={formData.additionalInfo}
                            onChange={e => setFormData({ ...formData, additionalInfo: e.target.value })}
                            placeholder={t.contact.form.additionalInfo}
                            className="w-full bg-transparent border border-[#333] p-4 text-[15px] text-white focus:outline-none focus:border-[#555] transition-colors resize-none h-[120px] rounded-sm"
                        />
                    </div>

                    <div className="pt-6 flex items-center space-x-6">
                        <button
                            onClick={handleSubmit}
                            disabled={loading || success}
                            className={`text-[15px] ${success ? 'text-green-500 border-green-500' : 'text-[#FFB800] border-[#FFB800] hover:opacity-80'} font-normal transition-all border-b pb-0.5 inline-block disabled:opacity-50`}
                        >
                            {loading ? "Отправка..." : success ? "Отправлено!" : t.contact.form.submitBtn}
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
}
