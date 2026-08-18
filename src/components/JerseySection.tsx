import React, { useState } from 'react';
import { Sparkles, Trophy, Shirt, ChevronLeft, Award, Shield } from 'lucide-react';
import { FAMOUS_PLAYERS } from '../data/products';

interface JerseySectionProps {
  onOpenCustomizer: () => void;
}

export const JerseySection: React.FC<JerseySectionProps> = ({ onOpenCustomizer }) => {
  const [quickName, setQuickName] = useState('MITROVIĆ');
  const [quickNumber, setQuickNumber] = useState('9');
  const [quickKit, setQuickKit] = useState<'home' | 'away' | 'third'>('home');

  const getKitBg = () => {
    if (quickKit === 'away') return 'bg-gradient-to-b from-slate-200 via-white to-slate-300 text-slate-900 border-2 border-blue-400';
    if (quickKit === 'third') return 'bg-gradient-to-b from-[#18181b] via-[#0f0f10] to-[#050506] text-amber-300 border-2 border-[#2a2a2e]';
    return 'bg-gradient-to-b from-[#0047AB] via-blue-900 to-[#071d3f] text-white border-2 border-blue-400/50';
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <div className="relative overflow-hidden bg-gradient-to-r from-[#111113] via-[#161618] to-[#111113] rounded-3xl border border-[#222226] p-6 sm:p-8 lg:p-10 shadow-2xl">
        
        {/* Background ambient glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#0047AB]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Info Side */}
          <div className="lg:col-span-7 space-y-4 text-center lg:text-right">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0047AB]/20 border border-[#0047AB]/40 text-blue-300 text-xs font-extrabold">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>خدمة الطباعة الحرارية الرسمية المعتمدة</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              خاصية <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 via-white to-[#0047AB]">صمّم قميصك المفضل</span> برقمك واسمك!
            </h2>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-medium max-w-xl mx-auto lg:mx-0">
              اطبع اسمك ورقمك الفردي على طقم الهلال الجديد 2026 بالخط الرسمي المعتمد لدوري روشن السعودي مع إضافة شارات بطولات آسيا وكأس العالم للأندية!
            </p>

            {/* Feature Badges */}
            <div className="grid grid-cols-3 gap-2 py-2 max-w-md mx-auto lg:mx-0 text-right">
              <div className="bg-[#1a1a1d] p-2.5 rounded-xl border border-[#2a2a2e]">
                <div className="font-extrabold text-xs text-white">الخط الرسمي 🇸🇦</div>
                <div className="text-[10px] text-zinc-400">دوري روشن السعودي</div>
              </div>
              <div className="bg-[#1a1a1d] p-2.5 rounded-xl border border-[#2a2a2e]">
                <div className="font-extrabold text-xs text-white">شارات البطولات 🏆</div>
                <div className="text-[10px] text-zinc-400">آسيا وكأس العالم</div>
              </div>
              <div className="bg-[#1a1a1d] p-2.5 rounded-xl border border-[#2a2a2e]">
                <div className="font-extrabold text-xs text-white">ضمان الطباعة 💯</div>
                <div className="text-[10px] text-zinc-400">لا تتأثر بالغسيل</div>
              </div>
            </div>

            {/* Quick Interactive Inputs on Section */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <button
                onClick={onOpenCustomizer}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#0047AB] hover:bg-blue-600 text-white font-extrabold rounded-xl shadow-lg shadow-[#0047AB]/30 flex items-center justify-center gap-2 text-sm transition-transform active:scale-95"
              >
                <Shirt className="w-5 h-5 text-amber-300" />
                <span>افتح استوديو التصميم الكامل 🎨</span>
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-xs font-bold text-zinc-400">
                <span>أو اختر نجماً:</span>
                {FAMOUS_PLAYERS.slice(0, 3).map((p) => (
                  <button
                    key={p.number}
                    onClick={() => {
                      setQuickName(p.name.toUpperCase());
                      setQuickNumber(p.number);
                    }}
                    className="px-2 py-1 bg-[#1a1a1d] hover:bg-[#222226] text-zinc-200 border border-[#2a2a2e] rounded-lg text-xs"
                  >
                    #{p.number} {p.name}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Jersey Interactive Mini Preview Side */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            
            <div className="relative w-56 h-72 sm:w-64 sm:h-80 rounded-2xl p-5 flex flex-col items-center justify-center shadow-2xl transition-all border border-white/20 group">
              
              <div className={`absolute inset-0 rounded-2xl ${getKitBg()} transition-all duration-300`} />

              {/* Collar detail */}
              <div className="absolute top-0 w-24 h-7 bg-black/40 rounded-b-xl border-b border-white/20 z-10" />

              {/* Back Content */}
              <div className="relative z-10 flex flex-col items-center justify-center my-auto">
                <div className="font-mono font-black text-6xl text-amber-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] my-1">
                  {quickNumber || '9'}
                </div>
                <div className="font-black text-lg tracking-widest text-white uppercase text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] px-2">
                  {quickName || 'NAME'}
                </div>
              </div>

              {/* Badge */}
              <div className="relative z-10 absolute bottom-3 flex items-center gap-1 opacity-90 text-[9px] font-extrabold tracking-widest uppercase text-zinc-300 bg-black/50 px-2.5 py-1 rounded-full border border-white/10">
                <Award className="w-3 h-3 text-amber-300" />
                <span>AL HILAL FC • OFFICIAL</span>
              </div>
            </div>

            {/* Quick Kit selector */}
            <div className="flex items-center gap-2 mt-3 text-xs font-bold text-zinc-400">
              <span>الطقم:</span>
              <button
                onClick={() => setQuickKit('home')}
                className={`w-5 h-5 rounded-full bg-[#0047AB] border ${quickKit === 'home' ? 'ring-2 ring-white scale-110' : ''}`}
                title="الأساسي"
              />
              <button
                onClick={() => setQuickKit('away')}
                className={`w-5 h-5 rounded-full bg-white border ${quickKit === 'away' ? 'ring-2 ring-white scale-110' : ''}`}
                title="الاحتياطي"
              />
              <button
                onClick={() => setQuickKit('third')}
                className={`w-5 h-5 rounded-full bg-black border border-zinc-700 ${quickKit === 'third' ? 'ring-2 ring-white scale-110' : ''}`}
                title="الثالث"
              />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
