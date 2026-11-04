"use client";

import React, { useState } from "react";
import { Mail, Send, CheckCircle2, MessageSquare, Sparkles } from "lucide-react";
import { AdBanner } from "@/components/ui/AdBanner";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-2xl mx-auto py-10 space-y-10">
      <header className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium">
          <Mail className="w-3.5 h-3.5 text-amber-300" />
          <span>Direct Connection</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-black text-white">
          Contact AuraPulse
        </h1>
        <p className="text-sm text-white/60">
          We welcome reader questions, editorial corrections, partnership inquiries, and shared spiritual experiences.
        </p>
      </header>

      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl relative">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-white/60 block mb-1">Your Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-400"
                placeholder="Elena Vance"
              />
            </div>

            <div>
              <label className="text-xs text-white/60 block mb-1">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-400"
                placeholder="elena@example.com"
              />
            </div>

            <div>
              <label className="text-xs text-white/60 block mb-1">Inquiry Topic</label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full bg-cosmic-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-400"
              >
                <option value="General Question">General Question</option>
                <option value="Dream Interpretation Request">Dream Interpretation Request</option>
                <option value="Advertising & Sponsorship">Advertising & Sponsorship</option>
                <option value="Editorial Correction">Editorial Correction</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-white/60 block mb-1">Your Message</label>
              <textarea
                rows={5}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-400"
                placeholder="Write your reflection or question here..."
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium text-xs shadow-lg shadow-purple-950/50 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Transmit Message</span>
            </button>
          </form>
        ) : (
          <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h3 className="text-2xl font-serif font-bold text-white">Message Transmitted</h3>
            <p className="text-xs sm:text-sm text-white/70 max-w-sm mx-auto">
              Thank you for reaching out to AuraPulse. Our editorial team typically responds within 24–48 business hours.
            </p>
          </div>
        )}
      </div>

      <div className="text-center text-xs text-white/40 space-y-1">
        <p>AuraPulse Network • San Francisco & London</p>
        <p>Direct Inquiries: support@aurapulse.com</p>
      </div>

      <AdBanner format="in-article" label="SANCTUARY SPONSOR" />
    </div>
  );
}

