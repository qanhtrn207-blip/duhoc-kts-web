"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Phone, MessageCircle, Calendar, X, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function FloatingContact() {
  const [minimized, setMinimized] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
      {/* Floating Buttons */}
      {!minimized ? (
        <div className="flex flex-col items-end gap-2.5 pointer-events-auto animate-fade-in">
          {/* Appointment booking */}
          <Link
            href="/dat-lich-tu-van"
            className="group flex items-center gap-2.5 bg-brand-navy hover:bg-brand-navy-light text-white text-xs font-bold py-2.5 px-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 border border-white/20"
          >
            <Calendar className="w-4 h-4 text-brand-gold animate-bounce" />
            <span className="hidden sm:inline">Đặt lịch tư vấn KTS</span>
          </Link>

          {/* Zalo button */}
          <a
            href={siteConfig.contact.zaloUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 bg-[#0068FF] hover:bg-[#0052cc] text-white text-xs font-bold py-2.5 px-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 border border-white/20"
          >
            <div className="w-4 h-4 rounded-full bg-white text-[#0068FF] flex items-center justify-center font-extrabold text-[10px]">
              Z
            </div>
            <span className="hidden sm:inline">Chat Zalo Cố vấn</span>
          </a>

          {/* Call Hotline with pulse glow */}
          <a
            href={`tel:${siteConfig.contact.hotline.replace(/\s/g, "")}`}
            className="group flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 px-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 border border-white/20 animate-pulse-glow"
          >
            <Phone className="w-4 h-4 text-white animate-pulse" />
            <span className="hidden sm:inline">Hotline: {siteConfig.contact.hotlineDisplay}</span>
          </a>

          {/* Minimize toggle */}
          <button
            onClick={() => setMinimized(true)}
            className="w-6 h-6 rounded-full bg-slate-300/80 hover:bg-slate-400 text-slate-700 flex items-center justify-center text-[10px] shadow transition-transform hover:scale-110"
            title="Thu nhỏ nút liên hệ"
            aria-label="Thu nhỏ"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setMinimized(false)}
          className="pointer-events-auto w-12 h-12 rounded-full bg-brand-blue hover:bg-brand-blue-hover text-white flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 animate-pulse-glow"
          title="Mở hỗ trợ tư vấn Du Học KTS"
          aria-label="Hỗ trợ tư vấn"
        >
          <MessageCircle className="w-6 h-6 text-brand-gold animate-bounce" />
        </button>
      )}
    </div>
  );
}
