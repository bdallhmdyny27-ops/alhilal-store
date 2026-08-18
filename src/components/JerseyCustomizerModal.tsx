import React, { useState } from 'react';
import { X, Sparkles, ShoppingBag, Trophy, RotateCcw, Shirt, Check, Palette, Award, Shield, Eye } from 'lucide-react';
import { FAMOUS_PLAYERS, PRODUCTS } from '../data/products';
import { Product } from '../types';

interface JerseyCustomizerModalProps {
  onClose: () => void;
  onAddToCart: (
    product: Product,
    size: string,
    color: string,
    quantity: number,
    customName?: string,
    customNumber?: string,
    customDetails?: string
  ) => void;
}

export const JerseyCustomizerModal: React.FC<JerseyCustomizerModalProps> = ({
  onClose,
  onAddToCart,
}) => {
  const jerseyProduct = PRODUCTS.find((p) => p.isCustomizable) || PRODUCTS[0];

  // Customization state
  const [viewAngle, setViewAngle] = useState<'back' | 'front'>('back');
  const [genderFit, setGenderFit] = useState<'men' | 'women' | 'kids'>('men');
  const [name, setName] = useState('MITROVIĆ');
  const [number, setNumber] = useState('9');
  const [size, setSize] = useState('L');
  const [kitType, setKitType] = useState<'home' | 'away' | 'third' | 'gk'>('home');

  const getSizesForGender = () => {
    switch (genderFit) {
      case 'women':
        return ['XS', 'S', 'M', 'L', 'XL'];
      case 'kids':
        return ['4-5 سنوات', '6-7 سنوات', '8-9 سنوات', '10-11 سنة', '12-13 سنة'];
      case 'men':
      default:
        return ['S', 'M', 'L', 'XL', 'XXL', '3XL'];
    }
  };
  const [fontStyle, setFontStyle] = useState<'roshn' | 'royal' | 'modern'>('roshn');
  const [printColor, setPrintColor] = useState<'gold' | 'white' | 'blue' | 'silver'>('gold');
  const [selectedPatches, setSelectedPatches] = useState<string[]>(['roshn', 'afc']);

  // Preset players handler
  const handleQuickPlayer = (player: typeof FAMOUS_PLAYERS[0]) => {
    setName(player.name.toUpperCase());
    setNumber(player.number);
  };

  // Toggle patch
  const togglePatch = (patchId: string) => {
    if (selectedPatches.includes(patchId)) {
      setSelectedPatches(selectedPatches.filter((p) => p !== patchId));
    } else {
      setSelectedPatches([...selectedPatches, patchId]);
    }
  };

  // Kit background styles
  const getKitBg = () => {
    switch (kitType) {
      case 'away':
        return {
          bg: 'bg-gradient-to-b from-slate-100 via-white to-slate-200 text-slate-900 border-2 border-blue-400',
          accent: 'bg-[#0047AB]',
          label: 'الطقم الاحتياطي (الأبيض الناصع)',
        };
      case 'third':
        return {
          bg: 'bg-gradient-to-b from-[#18181b] via-[#0f0f10] to-[#050506] text-amber-300 border-2 border-[#2a2a2e]',
          accent: 'bg-amber-400',
          label: 'الطقم الثالث الأسطوري (الأسود)',
        };
      case 'gk':
        return {
          bg: 'bg-gradient-to-b from-purple-900 via-purple-950 to-slate-950 text-white border-2 border-purple-500',
          accent: 'bg-purple-500',
          label: 'طقم الحراسة الملكي (البنفسجي)',
        };
      case 'home':
      default:
        return {
          bg: 'bg-gradient-to-b from-[#0047AB] via-blue-900 to-[#071d3f] text-white border-2 border-blue-400/40',
          accent: 'bg-yellow-400',
          label: 'الطقم الأساسي (الأزرق الملكي)',
        };
    }
  };

  // Print text color style
  const getTextColorClass = () => {
    switch (printColor) {
      case 'white':
        return 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]';
      case 'blue':
        return 'text-[#0047AB] drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]';
      case 'silver':
        return 'text-slate-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]';
      case 'gold':
      default:
        return 'text-amber-300 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]';
    }
  };

  // Font family class
  const getFontFamilyClass = () => {
    switch (fontStyle) {
      case 'royal':
        return 'font-serif tracking-widest uppercase';
      case 'modern':
        return 'font-sans font-black tracking-wider uppercase';
      case 'roshn':
      default:
        return 'font-mono font-extrabold tracking-widest uppercase';
    }
  };

  const currentKit = getKitBg();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#161618] text-white rounded-2xl shadow-2xl overflow-hidden my-auto border border-[#222226] flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-[#111113] text-white flex items-center justify-between shrink-0 border-b border-[#222226]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0047AB] flex items-center justify-center text-white shadow-md shadow-[#0047AB]/30 border border-white/10">
              <Shirt className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-black text-lg sm:text-xl text-white">استوديو تصميم قميص الهلال 2026</h2>
                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  طباعة حرارية أصلية
                </span>
              </div>
              <p className="text-xs text-zinc-400">خصص اسمك ورقمك والشعارات الرسمية بالخط المعتمد لنادي الهلال</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#1a1a1d] hover:bg-[#222226] text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Side: Interactive 2D Jersey Canvas Preview */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-4 bg-[#0d0d0f] p-6 rounded-2xl border border-[#222226] relative">
            
            {/* Front / Back Toggle Buttons */}
            <div className="flex items-center gap-1 p-1 bg-[#161618] rounded-xl border border-[#2a2a2e] text-xs">
              <button
                onClick={() => setViewAngle('back')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
                  viewAngle === 'back'
                    ? 'bg-[#0047AB] text-white shadow-xs'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>الظهر (الاسم والرقم)</span>
              </button>
              <button
                onClick={() => setViewAngle('front')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
                  viewAngle === 'front'
                    ? 'bg-[#0047AB] text-white shadow-xs'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>الوجه (الشعار والراعي)</span>
              </button>
            </div>

            {/* Visual Jersey Canvas Container */}
            <div className="relative w-64 h-80 sm:w-72 sm:h-96 flex items-center justify-center">
              
              {/* Stadium Lights / Glow Effect */}
              <div className="absolute inset-0 bg-[#0047AB]/20 rounded-full blur-2xl pointer-events-none" />

              {/* Main Jersey Card */}
              <div
                className={`relative w-full h-full rounded-2xl ${currentKit.bg} p-6 flex flex-col items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-[1.02] border border-white/10 overflow-hidden`}
              >
                {/* Collar detail */}
                <div className="absolute top-0 w-28 h-9 bg-black/40 rounded-b-2xl border-b border-white/20 flex items-center justify-center">
                  <span className="text-[9px] font-bold tracking-widest text-zinc-300">AL HILAL FC</span>
                </div>

                {/* Shoulder Stripes */}
                <div className="absolute top-5 left-3 right-3 flex justify-between px-3">
                  <div className="w-10 h-1 bg-amber-400/80 rounded-full" />
                  <div className="w-10 h-1 bg-amber-400/80 rounded-full" />
                </div>

                {/* Sleeve Patches Preview */}
                <div className="absolute top-16 left-2 flex flex-col gap-1">
                  {selectedPatches.includes('roshn') && (
                    <span className="px-1.5 py-0.5 bg-black/60 text-amber-300 rounded text-[9px] font-black border border-amber-400/40">
                      روشن 🇸🇦
                    </span>
                  )}
                  {selectedPatches.includes('afc') && (
                    <span className="px-1.5 py-0.5 bg-blue-950/80 text-yellow-300 rounded text-[9px] font-black border border-yellow-400/40">
                      آسيا 🏆
                    </span>
                  )}
                </div>

                {/* FIFA Club World Cup Badge */}
                {selectedPatches.includes('fifa') && (
                  <div className="absolute top-16 right-2">
                    <span className="px-1.5 py-0.5 bg-yellow-500/90 text-black rounded text-[9px] font-black">
                      FIFA 🌟
                    </span>
                  </div>
                )}

                {/* Render Content Based on Angle */}
                {viewAngle === 'back' ? (
                  <div className="flex flex-col items-center justify-center w-full my-auto z-10">
                    {/* Number */}
                    <div
                      className={`text-6xl sm:text-7xl ${getFontFamilyClass()} ${getTextColorClass()} my-1 select-none`}
                    >
                      {number || '00'}
                    </div>

                    {/* Name */}
                    <div
                      className={`text-lg sm:text-xl ${getFontFamilyClass()} ${getTextColorClass()} text-center select-none max-w-[95%] break-words px-2`}
                    >
                      {name || 'YOUR NAME'}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center w-full my-auto z-10 space-y-4">
                    {/* Al Hilal Official Crest */}
                    <div className="w-16 h-16 rounded-full bg-blue-950/80 border-2 border-yellow-400 flex flex-col items-center justify-center p-2 shadow-lg text-center">
                      <Trophy className="w-7 h-7 text-amber-300" />
                      <span className="text-[8px] font-black tracking-widest text-white mt-0.5">1957</span>
                    </div>

                    {/* Sponsor Logo */}
                    <div className="px-4 py-1.5 bg-black/40 rounded-lg border border-white/10 text-center">
                      <span className="text-xs font-black tracking-widest text-white uppercase">SAVVY</span>
                      <div className="text-[8px] text-zinc-400">GLOBAL GAMING GROUP</div>
                    </div>
                  </div>
                )}

                {/* Bottom Authenticity Badge */}
                <div className="absolute bottom-3 flex items-center gap-1.5 opacity-85 text-[9px] font-bold tracking-widest uppercase text-zinc-300 bg-black/40 px-3 py-1 rounded-full border border-white/10">
                  <Award className="w-3 h-3 text-amber-400" />
                  <span>OFFICIAL AL HILAL KIT • 2026</span>
                </div>
              </div>
            </div>

            {/* Quick Kit Color Switcher */}
            <div className="w-full space-y-2">
              <div className="text-xs font-bold text-zinc-400 text-center">اختر طقمك المفضّل:</div>
              <div className="grid grid-cols-4 gap-2">
                <button
                  onClick={() => setKitType('home')}
                  className={`p-2 rounded-xl text-center text-[11px] font-bold transition-all border ${
                    kitType === 'home'
                      ? 'bg-[#0047AB] text-white border-blue-400 ring-2 ring-[#0047AB]/50'
                      : 'bg-[#1a1a1d] text-zinc-400 border-[#2a2a2e] hover:text-white'
                  }`}
                >
                  الأساسي
                </button>

                <button
                  onClick={() => setKitType('away')}
                  className={`p-2 rounded-xl text-center text-[11px] font-bold transition-all border ${
                    kitType === 'away'
                      ? 'bg-white text-slate-900 border-white ring-2 ring-white/50'
                      : 'bg-[#1a1a1d] text-zinc-400 border-[#2a2a2e] hover:text-white'
                  }`}
                >
                  الاحتياطي
                </button>

                <button
                  onClick={() => setKitType('third')}
                  className={`p-2 rounded-xl text-center text-[11px] font-bold transition-all border ${
                    kitType === 'third'
                      ? 'bg-[#0a0a0b] text-amber-400 border-amber-400/50 ring-2 ring-amber-400/30'
                      : 'bg-[#1a1a1d] text-zinc-400 border-[#2a2a2e] hover:text-white'
                  }`}
                >
                  الثالث
                </button>

                <button
                  onClick={() => setKitType('gk')}
                  className={`p-2 rounded-xl text-center text-[11px] font-bold transition-all border ${
                    kitType === 'gk'
                      ? 'bg-purple-700 text-white border-purple-400 ring-2 ring-purple-500/50'
                      : 'bg-[#1a1a1d] text-zinc-400 border-[#2a2a2e] hover:text-white'
                  }`}
                >
                  الحراسة
                </button>
              </div>
            </div>

          </div>

          {/* Right Side: Options & Customization Form Controls */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* 1. Star Player Quick Presets */}
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-2 flex items-center justify-between">
                <span>🌟 اختر قميص نجمك المفضل من نجوم الهلال:</span>
                <span className="text-[10px] text-zinc-400">نقرة واحدة للتطبيق المباشر</span>
              </label>
              <div className="flex flex-wrap gap-1.5">
                {FAMOUS_PLAYERS.map((p) => (
                  <button
                    key={p.number}
                    onClick={() => handleQuickPlayer(p)}
                    className="px-3 py-1.5 bg-[#1a1a1d] hover:bg-[#222226] text-zinc-200 border border-[#2a2a2e] hover:border-[#0047AB] rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95"
                  >
                    <span className="text-amber-400 font-mono">#{p.number}</span>
                    <span>{p.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Custom Name and Number Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#111113] p-4 rounded-xl border border-[#222226]">
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">
                  الاسم المطبوع على ظهر القميص:
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value.toUpperCase())}
                  maxLength={15}
                  placeholder="اكتب اسمك هنا"
                  className="w-full px-3.5 py-2.5 bg-[#1a1a1d] border border-[#2a2a2e] text-white placeholder-zinc-500 rounded-xl text-sm font-bold uppercase focus:ring-2 focus:ring-[#0047AB] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">
                  الرقم المفضّل (1 - 99):
                </label>
                <input
                  type="text"
                  value={number}
                  onChange={(e) => setNumber(e.target.value.replace(/\D/g, ''))}
                  maxLength={2}
                  placeholder="مثال: 10"
                  className="w-full px-3.5 py-2.5 bg-[#1a1a1d] border border-[#2a2a2e] text-white placeholder-zinc-500 rounded-xl text-sm font-bold text-center font-mono focus:ring-2 focus:ring-[#0047AB] focus:outline-none"
                />
              </div>
            </div>

            {/* 3. Font Style & Print Color Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Font Style */}
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                  نوع أسلوب الخط الرسمي:
                </label>
                <div className="space-y-1.5">
                  {[
                    { id: 'roshn', label: 'خط دوري روشن الرسمي' },
                    { id: 'royal', label: 'الخط الملكي المقوس' },
                    { id: 'modern', label: 'الخط الرياضي العصري' },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setFontStyle(f.id as any)}
                      className={`w-full text-right px-3 py-2 rounded-xl text-xs font-bold border transition-all flex items-center justify-between ${
                        fontStyle === f.id
                          ? 'bg-[#0047AB]/20 text-blue-300 border-[#0047AB]'
                          : 'bg-[#1a1a1d] text-zinc-400 border-[#2a2a2e] hover:text-white'
                      }`}
                    >
                      <span>{f.label}</span>
                      {fontStyle === f.id && <Check className="w-4 h-4 text-[#0047AB]" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Print Text Color */}
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                  لون الطباعة الحرارية:
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { id: 'gold', label: 'الذهبي الملكي 👑', bg: 'bg-amber-400 text-black' },
                    { id: 'white', label: 'الأبيض الناصع ⚪', bg: 'bg-white text-black' },
                    { id: 'blue', label: 'الأزرق الهلالي 🔵', bg: 'bg-[#0047AB] text-white' },
                    { id: 'silver', label: 'الفضي البرّاق 🥈', bg: 'bg-slate-300 text-black' },
                  ].map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setPrintColor(c.id as any)}
                      className={`p-2 rounded-xl text-xs font-bold border transition-all text-center ${
                        printColor === c.id
                          ? 'border-amber-400 ring-2 ring-amber-400/30 font-black'
                          : 'bg-[#1a1a1d] text-zinc-400 border-[#2a2a2e] hover:text-white'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 4. Official Tournament Patches / Badges */}
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                إضافة الشارات والبطولات الرسمية (اختياري):
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'roshn', label: 'شارة دوري روشن 🇸🇦' },
                  { id: 'afc', label: 'شارة دوري أبطال آسيا 🏆' },
                  { id: 'fifa', label: 'شارة كأس العالم 🌟' },
                ].map((p) => {
                  const active = selectedPatches.includes(p.id);
                  return (
                    <button
                      key={p.id}
                      onClick={() => togglePatch(p.id)}
                      className={`p-2.5 rounded-xl text-xs font-bold border transition-all flex flex-col items-center gap-1 text-center ${
                        active
                          ? 'bg-[#0047AB]/20 text-white border-[#0047AB]'
                          : 'bg-[#1a1a1d] text-zinc-400 border-[#2a2a2e] hover:text-white'
                      }`}
                    >
                      <span>{p.label}</span>
                      {active ? (
                        <span className="text-[10px] text-emerald-400 font-medium">مضافة ✓</span>
                      ) : (
                        <span className="text-[10px] text-zinc-500">+ أضف</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. Gender Fit & Size Selection */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                  اختر القَصّة والنوع (رجالي / نسائي / أطفال):
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'men', label: 'قصة رجالية 👨' },
                    { id: 'women', label: 'قصة نسائية 👩' },
                    { id: 'kids', label: 'مقاس أطفال 👶' },
                  ].map((g) => (
                    <button
                      key={g.id}
                      onClick={() => {
                        setGenderFit(g.id as any);
                        const available = g.id === 'women' ? 'M' : g.id === 'kids' ? '8-9 سنوات' : 'L';
                        setSize(available);
                      }}
                      className={`p-2.5 rounded-xl text-xs font-bold border transition-all ${
                        genderFit === g.id
                          ? 'bg-[#0047AB] text-white border-blue-400 font-extrabold shadow-md'
                          : 'bg-[#1a1a1d] text-zinc-400 border-[#2a2a2e] hover:text-white'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                  اختر المقاس المناسب:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {getSizesForGender().map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSize(sz)}
                      className={`px-3 py-2 rounded-xl font-bold text-xs border transition-all ${
                        size === sz
                          ? 'bg-[#0047AB] text-white border-[#0047AB] shadow-md shadow-[#0047AB]/30'
                          : 'bg-[#1a1a1d] text-zinc-300 border-[#2a2a2e] hover:bg-[#222226]'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit / Add To Cart Action Button */}
            <div className="pt-2 border-t border-[#222226]">
              <button
                onClick={() => {
                  const customDetailsText = `طقم: ${currentKit.label} | اسم: ${name || 'بدون'} | رقم: ${number || '0'} | خط: ${fontStyle} | لون: ${printColor} | شارات: ${selectedPatches.join(', ') || 'بدون'}`;
                  onAddToCart(
                    jerseyProduct,
                    size,
                    currentKit.label,
                    1,
                    name || '00',
                    number || '0',
                    customDetailsText
                  );
                  onClose();
                }}
                className="w-full py-4 bg-[#0047AB] hover:bg-blue-600 text-white font-extrabold rounded-xl shadow-xl shadow-[#0047AB]/30 flex items-center justify-center gap-2 text-sm sm:text-base transition-transform active:scale-95"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>إضافة القميص المخصص للسلة ({jerseyProduct.price} ر.س)</span>
              </button>
              <p className="text-[11px] text-zinc-400 text-center mt-2">
                🔒 شامل الطباعة الحرارية المعتمدة والضمان الذهبي للأزياء الأصلية
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
