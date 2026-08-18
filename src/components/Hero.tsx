import React from 'react';
import { HERO_BANNER_IMAGE } from '../data/products';
import { ShieldCheck, Zap, RotateCcw, Award, ChevronLeft } from 'lucide-react';
import { ProductCategory } from '../types';

interface HeroProps {
  onSelectCategory: (category: ProductCategory) => void;
  onOpenJerseyCustomizer: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectCategory, onOpenJerseyCustomizer }) => {
  return (
    <div className="relative overflow-hidden bg-[#161618] text-white my-4 mx-4 sm:mx-6 lg:mx-8 rounded-2xl border border-[#222226] shadow-2xl">
      {/* Background image & gradient overlay */}
      <div className="absolute inset-0 z-0 opacity-30 mix-blend-luminosity">
        <img
          src={HERO_BANNER_IMAGE}
          alt="Al Hilal Hero Banner"
          className="w-full h-full object-cover object-center scale-105"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-l from-[#0047AB]/90 via-[#002e6e]/95 to-[#0d0d0f] z-10" />

      {/* Decorative royal pattern */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#0047AB]/20 rounded-full blur-3xl z-10 pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl z-10 pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 py-12 sm:py-16 lg:py-20 flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="max-w-2xl text-center lg:text-right">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-blue-200 text-xs sm:text-sm font-bold mb-4 backdrop-blur-md">
            <Award className="w-4 h-4 text-yellow-400 animate-bounce" />
            <span>المتجر المعتمد - جميع المقاسات متوفرة حتى مقاس 44 (4XL) ولجميع الأعمار</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
            اصدار النخبة <span className="italic text-transparent bg-clip-text bg-gradient-to-l from-white via-blue-200 to-[#0047AB]">بشعار الهلال الأصلي</span>
          </h1>

          <p className="mt-4 text-zinc-300 text-base sm:text-lg font-medium leading-relaxed">
            جميع الملابس والأطقم مزودة بشعار نادي الهلال الأصلي المطرز ومتوفرة لكافة الأعمار وللجنسين من المقاسات الصغيرة وحتى مقاس 44 (4XL) مع خدمة طباعة الاسم والرقم مجاناً!
          </p>

          {/* Quick CTA Actions */}
          <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
            <button
              onClick={() => onSelectCategory('tops')}
              className="px-6 py-3.5 bg-[#0047AB] hover:bg-blue-600 text-white font-extrabold rounded-xl shadow-xl shadow-[#0047AB]/30 flex items-center gap-2 text-sm sm:text-base hover:scale-105 active:scale-95 transition-all"
            >
              <span>تسوق القمصان والبلايز</span>
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={() => onSelectCategory('shoes')}
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-extrabold rounded-xl border border-white/20 backdrop-blur-md flex items-center gap-2 text-sm sm:text-base hover:scale-105 active:scale-95 transition-all"
            >
              <span>أحذية الهلال والجزم</span>
            </button>

            <button
              onClick={onOpenJerseyCustomizer}
              className="px-5 py-3.5 bg-[#1a1a1d] hover:bg-[#222226] text-zinc-200 font-bold rounded-xl border border-[#2a2a2e] text-sm flex items-center gap-2 transition-colors"
            >
              <span>✨ اصنع قميصك برقمك وتوقيعك</span>
            </button>
          </div>
        </div>

        {/* Feature Highlights Pills */}
        <div className="w-full lg:w-auto grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3 pt-4 lg:pt-0">
          <div className="bg-[#161618]/80 backdrop-blur-md border border-[#222226] p-4 rounded-xl text-right flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#0047AB]/20 text-[#0047AB] shrink-0">
              <Zap className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <div className="font-bold text-sm text-white">توصيل سريع</div>
              <div className="text-xs text-zinc-400">خلال 24 - 48 ساعة</div>
            </div>
          </div>

          <div className="bg-[#161618]/80 backdrop-blur-md border border-[#222226] p-4 rounded-xl text-right flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-sm text-white">شعار أصلي 100%</div>
              <div className="text-xs text-zinc-400">جودة مطرزة ومطبوعة</div>
            </div>
          </div>

          <div className="bg-[#161618]/80 backdrop-blur-md border border-[#222226] p-4 rounded-xl text-right flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-sm text-white">استبدال سهل</div>
              <div className="text-xs text-zinc-400">خلال 14 يوماً مجاناً</div>
            </div>
          </div>

          <div className="bg-[#161618]/80 backdrop-blur-md border border-[#222226] p-4 rounded-xl text-right flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-sm text-white">طباعة حرارية</div>
              <div className="text-xs text-zinc-400">مجانية لجميع القمصان</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
