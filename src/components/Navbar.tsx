import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, Truck, Package, ShieldCheck, Trophy, Sparkles, Menu, X, Printer, UserCheck } from 'lucide-react';
import { ProductCategory, GenderFilter } from '../types';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenTracking: () => void;
  onOpenJerseyCustomizer: () => void;
  onOpenInvoice?: () => void;
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  selectedGender: GenderFilter;
  onSelectGender: (gender: GenderFilter) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenTracking,
  onOpenJerseyCustomizer,
  onOpenInvoice,
  selectedCategory,
  onSelectCategory,
  selectedGender,
  onSelectGender,
  searchQuery,
  onSearchChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories: { id: ProductCategory; label: string; icon: string }[] = [
    { id: 'all', label: 'الكل', icon: '⚡' },
    { id: 'tops', label: 'بلايز وقمصان', icon: '👕' },
    { id: 'shoes', label: 'أحذية وجزم', icon: '👟' },
    { id: 'shorts', label: 'شورتات', icon: '🩳' },
    { id: 'kits', label: 'أطقم كاملة', icon: '🏆' },
    { id: 'accessories', label: 'إكسسوارات', icon: '🧢' },
  ];

  const genderOptions: { id: GenderFilter; label: string; icon: string }[] = [
    { id: 'all', label: 'جميع الفئات', icon: '👥' },
    { id: 'men', label: 'رجالي 👨', icon: '👨' },
    { id: 'women', label: 'نسائي 👩', icon: '👩' },
    { id: 'kids', label: 'أطفال وولادي 👶', icon: '👶' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#111113]/90 backdrop-blur-md border-b border-[#222226] text-white">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#002e6e] via-[#0047AB] to-[#002e6e] text-white text-xs sm:text-sm py-2 px-4 text-center font-medium flex items-center justify-center gap-2 border-b border-blue-500/20">
        <Truck className="w-4 h-4 text-blue-300 animate-pulse shrink-0" />
        <span>توصيل مجاني لجميع مدن المملكة عند الشراء بـ 200 ريال أو أكثر! 🚚 كود الخصم: <strong className="text-yellow-300 bg-black/40 px-2 py-0.5 rounded border border-white/20">HILAL1957</strong></span>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-zinc-400 hover:bg-[#1a1a1d]"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <a href="#" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-full bg-[#0047AB] flex items-center justify-center text-white shadow-lg shadow-[#0047AB]/30 group-hover:scale-105 transition-transform border border-white/20">
                <Trophy className="w-6 h-6 text-yellow-300" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl sm:text-2xl text-white tracking-tight">متجر الزعيم الملكي</span>
                </div>
                <span className="text-xs text-zinc-400 font-medium -mt-1">المتجر الرسمي للأزياء والمنتجات</span>
              </div>
            </a>
          </div>

          {/* Search Box - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="ابحث عن قميص، حذاء، شورت أو منتج..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-4 pr-11 py-2.5 bg-[#1a1a1d] border border-[#2a2a2e] text-white placeholder-zinc-500 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0047AB] focus:border-[#0047AB] transition-all"
              />
              <Search className="w-5 h-5 text-zinc-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white bg-[#2a2a2e] rounded-full w-4 h-4 flex items-center justify-center"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Print Invoice */}
            {onOpenInvoice && (
              <button
                onClick={onOpenInvoice}
                className="hidden md:flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-amber-300 hover:text-white bg-[#1a1a1d] hover:bg-[#222226] rounded-xl transition-colors border border-amber-500/30"
                title="طبع الفاتورة الضريبية"
              >
                <Printer className="w-4 h-4 text-amber-300" />
                <span>طبع الفاتورة 🖨️</span>
              </button>
            )}

            {/* Order Tracking */}
            <button
              onClick={onOpenTracking}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-zinc-300 hover:text-white bg-[#1a1a1d] hover:bg-[#222226] rounded-xl transition-colors border border-[#2a2a2e]"
              title="تتبع شحنتك"
            >
              <Package className="w-4 h-4 text-[#0047AB]" />
              <span>تتبع الطلب</span>
            </button>

            {/* Wishlist */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2.5 rounded-xl text-zinc-300 hover:bg-[#1a1a1d] transition-colors border border-transparent hover:border-[#2a2a2e]"
              aria-label="المفضلة"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 bg-[#0047AB] hover:bg-blue-600 text-white px-4 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-[#0047AB]/20 active:scale-95 transition-all"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline">السلة</span>
              {cartCount > 0 && (
                <span className="bg-yellow-400 text-blue-950 font-black text-xs px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="pb-3 md:hidden">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="ابحث عن جزمة، شورت، قميص..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-4 pr-10 py-2 bg-[#1a1a1d] border border-[#2a2a2e] text-white placeholder-zinc-500 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0047AB]"
            />
            <Search className="w-4 h-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Gender Filter Bar (الرجالي / النسائي / الأطفال) */}
        <div className="flex items-center gap-1.5 py-2 overflow-x-auto no-scrollbar border-t border-[#222226]/80 text-xs font-bold">
          <span className="text-zinc-500 hidden sm:inline ml-1 font-normal text-2xs">التصنيف:</span>
          {genderOptions.map((g) => (
            <button
              key={g.id}
              onClick={() => onSelectGender(g.id)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                selectedGender === g.id
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-400/40 font-extrabold'
                  : 'bg-[#18181c] text-zinc-400 hover:text-white hover:bg-[#222226] border border-[#2a2a2e]'
              }`}
            >
              <span>{g.label}</span>
            </button>
          ))}
        </div>

        {/* Category Nav Bar */}
        <nav className="hidden lg:flex items-center gap-2 py-2 overflow-x-auto no-scrollbar border-t border-[#222226] text-sm font-semibold">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-[#0047AB] text-white font-bold border border-blue-400/30 shadow-md'
                  : 'text-zinc-400 hover:bg-[#1a1a1d] hover:text-white'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}

          {/* Highlighted Jersey Customizer Tab */}
          <button
            onClick={onOpenJerseyCustomizer}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500/20 via-blue-600/30 to-amber-500/20 hover:from-amber-500/30 hover:to-blue-600/40 text-amber-300 font-extrabold border border-amber-500/40 rounded-xl transition-all whitespace-nowrap shadow-sm active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>🎨 صمم قميصك المفضل</span>
          </button>

          <div className="mr-auto flex items-center gap-3 text-xs text-zinc-400 font-normal">
            <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-emerald-400" /> منتجات أصلية 100%</span>
            <span className="flex items-center gap-1"><Sparkles className="w-4 h-4 text-amber-400" /> خامة فاخرة بشعار النادي</span>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#222226] bg-[#111113] p-4 space-y-3">
          <div className="font-bold text-xs text-zinc-500 px-2">الأقسام والفئات</div>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#0047AB] text-white'
                    : 'bg-[#1a1a1d] border border-[#2a2a2e] text-zinc-300'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              onOpenJerseyCustomizer();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-[#0047AB] to-blue-600 text-white text-xs font-extrabold rounded-xl shadow-lg shadow-[#0047AB]/30 border border-blue-400/30"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>✨ صمم قميصك باسمك ورقمك الآن</span>
          </button>

          {onOpenInvoice && (
            <button
              onClick={() => {
                onOpenInvoice();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#1a1a1d] hover:bg-[#222226] text-amber-300 font-extrabold text-xs rounded-xl border border-amber-500/30"
            >
              <Printer className="w-4 h-4 text-amber-300" />
              <span>طبع الفاتورة الضريبية 🖨️</span>
            </button>
          )}

          <button
            onClick={() => {
              onOpenTracking();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#1a1a1d] border border-[#2a2a2e] text-zinc-200 text-xs font-bold rounded-xl"
          >
            <Package className="w-4 h-4 text-[#0047AB]" />
            <span>تتبع شحنتك المباشرة</span>
          </button>
        </div>
      )}
    </header>
  );
};
