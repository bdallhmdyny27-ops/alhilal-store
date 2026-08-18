import React, { useState } from 'react';
import { Product, Review } from '../types';
import { X, Star, Heart, ShoppingBag, ShieldCheck, Truck, Check, Sparkles, Ruler, MessageSquare } from 'lucide-react';
import { FAMOUS_PLAYERS } from '../data/products';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (product: Product) => void;
  onAddToCart: (
    product: Product,
    size: string,
    color: string,
    quantity: number,
    customName?: string,
    customNumber?: string
  ) => void;
  onOpenSizeGuide: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
  onOpenSizeGuide,
}) => {
  if (!product) return null;

  const [selectedImage, setSelectedImage] = useState(product.image);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [quantity, setQuantity] = useState(1);

  // Jersey customization state
  const [customName, setCustomName] = useState('');
  const [customNumber, setCustomNumber] = useState('');

  // Review submission state
  const [activeTab, setActiveTab] = useState<'details' | 'reviews'>('details');
  const [reviewsList, setReviewsList] = useState<Review[]>(product.reviews || []);
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const handleSelectPlayer = (player: typeof FAMOUS_PLAYERS[0]) => {
    setCustomName(player.name);
    setCustomNumber(player.number);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewComment.trim()) return;

    const newRev: Review = {
      id: Date.now().toString(),
      userName: newReviewName,
      rating: newReviewRating,
      date: 'الآن',
      comment: newReviewComment,
      verifiedPurchase: true,
    };

    setReviewsList([newRev, ...reviewsList]);
    setNewReviewName('');
    setNewReviewComment('');
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#161618] text-white rounded-2xl shadow-2xl overflow-hidden my-auto border border-[#222226] max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#222226] bg-[#111113] shrink-0">
          <div className="flex items-center gap-2">
            <span className="bg-[#0047AB] text-white text-xs font-bold px-2.5 py-1 rounded-md">
              {product.categoryLabel}
            </span>
            {product.gender && (
              <span className={`px-2 py-1 rounded-md text-xs font-extrabold border ${
                product.gender === 'women'
                  ? 'bg-rose-950/80 text-rose-300 border-rose-700/60'
                  : product.gender === 'men'
                  ? 'bg-blue-950/80 text-blue-300 border-blue-700/60'
                  : product.gender === 'kids'
                  ? 'bg-amber-950/80 text-amber-300 border-amber-700/60'
                  : 'bg-zinc-800 text-zinc-300 border-zinc-700'
              }`}>
                {product.gender === 'women' ? 'قصة نسائية 👩' : product.gender === 'men' ? 'قصة رجالية 👨' : product.gender === 'kids' ? 'مقاس أطفال 👶' : 'للجنسين 👥'}
              </span>
            )}
            <span className="text-xs text-zinc-400 font-bold hidden sm:inline">كود المنتج: {product.id}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite(product)}
              className={`p-2 rounded-xl border transition-colors ${
                isFavorite
                  ? 'bg-rose-600 text-white border-rose-500'
                  : 'bg-[#1a1a1d] text-zinc-300 hover:bg-[#222226] border-[#2a2a2e]'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-white' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-[#1a1a1d] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          
          {/* Right Column: Image Gallery & Customization Preview */}
          <div className="space-y-4">
            <div className="relative aspect-square w-full rounded-xl bg-[#111113] overflow-hidden border border-[#222226]">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />

              {/* Live Printed Jersey Overlay Preview if name/number is set */}
              {product.isCustomizable && (customName || customNumber) && (
                <div className="absolute inset-x-0 bottom-4 mx-auto w-3/4 bg-[#0a0a0b]/90 text-white rounded-xl p-3 border border-[#0047AB]/50 shadow-xl text-center backdrop-blur-md">
                  <div className="text-[10px] text-blue-300 font-bold tracking-widest uppercase mb-1">
                    معاينة الطباعة خلف القميص
                  </div>
                  <div className="font-extrabold text-3xl tracking-widest text-amber-300 font-mono">
                    {customNumber || '00'}
                  </div>
                  <div className="font-bold text-lg text-white tracking-widest uppercase">
                    {customName || 'NAME'}
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnail Carousel */}
            {product.galleryImages.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {product.galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImage === img ? 'border-[#0047AB] scale-102' : 'border-[#222226] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}

            {/* Guarantees Box */}
            <div className="bg-[#111113] p-4 rounded-xl border border-[#222226] space-y-2 text-xs text-zinc-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>ضمان الجودة والأصالة بشعار نادي الهلال المعتمد.</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#0047AB] shrink-0" />
                <span>توصيل سريع خلال 24-48 ساعة داخل المملكة.</span>
              </div>
            </div>
          </div>

          {/* Left Column: Specs & Customization Form */}
          <div className="space-y-5">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
                {product.name}
              </h2>

              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-1 text-amber-400 font-bold text-sm">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{product.rating}</span>
                </div>
                <span className="text-zinc-600">•</span>
                <span className="text-xs text-zinc-400 font-medium">
                  {reviewsList.length} تقييم عالي من المشجعين
                </span>
              </div>

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-black text-[#0047AB]">{product.price}</span>
                <span className="text-sm font-bold text-zinc-400">ريال سعودي</span>
                {product.originalPrice && (
                  <span className="text-sm text-zinc-500 line-through mr-2">
                    {product.originalPrice} ر.س
                  </span>
                )}
              </div>
            </div>

            {/* Colors */}
            {product.colors.length > 0 && (
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-2">
                  اللون: <span className="text-blue-400 font-semibold">{selectedColor}</span>
                </label>
                <div className="flex items-center gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                        selectedColor === c.name
                          ? 'border-[#0047AB] bg-[#0047AB]/20 text-white shadow-xs'
                          : 'border-[#2a2a2e] bg-[#1a1a1d] text-zinc-300 hover:bg-[#222226]'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-[#2a2a2e]"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-zinc-300">
                  المقاس المطلوب: <span className="text-blue-400 font-semibold">{selectedSize}</span>
                </label>
                <button
                  onClick={onOpenSizeGuide}
                  className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 underline"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>دليل المقاسات</span>
                </button>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`py-2 px-1 text-center font-bold text-xs rounded-xl border transition-all ${
                      selectedSize === sz
                        ? 'bg-[#0047AB] text-white border-[#0047AB] shadow-md'
                        : 'border-[#2a2a2e] text-zinc-300 hover:border-[#0047AB] bg-[#1a1a1d]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Jersey Customization Section (if applicable) */}
            {product.isCustomizable && (
              <div className="p-4 rounded-xl bg-[#111113] border border-[#222226] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-sm text-white">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>خدمة طباعة الاسم والرقم مجاناً!</span>
                  </div>
                  <span className="text-[10px] font-bold bg-[#0047AB] text-white px-2 py-0.5 rounded-md">
                    اختياري
                  </span>
                </div>

                <p className="text-xs text-zinc-400">
                  اكتب اسمك ورقمك المفضل أو اختر من أبطال الهلال:
                </p>

                {/* Famous Players Quick Chips */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                  {FAMOUS_PLAYERS.map((p) => (
                    <button
                      key={p.number}
                      type="button"
                      onClick={() => handleSelectPlayer(p)}
                      className="px-2.5 py-1 bg-[#1a1a1d] border border-[#2a2a2e] hover:border-[#0047AB] rounded-md text-xs font-bold text-zinc-200 whitespace-nowrap transition-colors shrink-0"
                    >
                      #{p.number} {p.name}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-2 pt-1">
                  <div className="col-span-2">
                    <input
                      type="text"
                      placeholder="اسمك (مثال: SAUD)"
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value.toUpperCase())}
                      className="w-full px-3 py-2 bg-[#1a1a1d] border border-[#2a2a2e] text-white placeholder-zinc-500 rounded-xl text-xs font-bold uppercase focus:ring-2 focus:ring-[#0047AB] focus:outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="الرقم (مثال: 9)"
                      maxLength={2}
                      value={customNumber}
                      onChange={(e) => setCustomNumber(e.target.value.replace(/\D/g, ''))}
                      className="w-full px-3 py-2 bg-[#1a1a1d] border border-[#2a2a2e] text-white placeholder-zinc-500 rounded-xl text-xs font-bold text-center focus:ring-2 focus:ring-[#0047AB] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Quantity Controls */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-bold text-zinc-300">الكمية:</span>
              <div className="flex items-center border border-[#2a2a2e] rounded-xl bg-[#1a1a1d] overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-zinc-300 hover:bg-[#222226] font-bold"
                >
                  -
                </button>
                <span className="px-4 font-bold text-sm text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 text-zinc-300 hover:bg-[#222226] font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart CTA */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  onAddToCart(
                    product,
                    selectedSize,
                    selectedColor,
                    quantity,
                    customName,
                    customNumber
                  );
                  onClose();
                }}
                className="w-full py-3.5 bg-[#0047AB] hover:bg-blue-600 active:scale-98 text-white font-extrabold rounded-xl shadow-lg shadow-[#0047AB]/30 flex items-center justify-center gap-2 transition-all text-base"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>إضافة إلى سلة الشراء ({product.price * quantity} ر.س)</span>
              </button>
            </div>

            {/* Specs / Reviews Tabs */}
            <div className="border-t border-[#222226] pt-4">
              <div className="flex border-b border-[#222226] text-xs font-bold">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-2 px-3 border-b-2 transition-colors ${
                    activeTab === 'details'
                      ? 'border-[#0047AB] text-blue-400'
                      : 'border-transparent text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  المواصفات والخامة
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-2 px-3 border-b-2 transition-colors flex items-center gap-1 ${
                    activeTab === 'reviews'
                      ? 'border-[#0047AB] text-blue-400'
                      : 'border-transparent text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>آراء المشجعين ({reviewsList.length})</span>
                </button>
              </div>

              {activeTab === 'details' ? (
                <div className="py-3 text-xs text-zinc-300 space-y-2 leading-relaxed">
                  <p>{product.description}</p>
                  <ul className="space-y-1 mt-2">
                    {product.details.map((d, i) => (
                      <li key={i} className="flex items-center gap-2 text-zinc-300">
                        <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="py-3 space-y-4 text-xs">
                  {/* Reviews list */}
                  <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                    {reviewsList.map((rev) => (
                      <div key={rev.id} className="p-3 bg-[#111113] rounded-xl border border-[#222226]">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-white">{rev.userName}</span>
                          <span className="text-[10px] text-zinc-500">{rev.date}</span>
                        </div>
                        <div className="flex items-center gap-1 text-amber-400 mb-1">
                          {[...Array(5)].map((_, idx) => (
                            <Star
                              key={idx}
                              className={`w-3 h-3 ${
                                idx < rev.rating ? 'fill-amber-400' : 'text-zinc-600'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-zinc-300">{rev.comment}</p>
                      </div>
                    ))}
                  </div>

                  {/* Submit review */}
                  <form onSubmit={handleAddReview} className="bg-[#111113] p-3 rounded-xl border border-[#222226] space-y-2">
                    <div className="font-bold text-white">أضف تقييمك لمشجعي الزعيم:</div>
                    {reviewSubmitted && (
                      <div className="text-emerald-400 font-bold bg-emerald-950/40 border border-emerald-500/30 p-2 rounded-lg">
                        شكراً لك! تم إضافة تقييمك بنجاح.
                      </div>
                    )}
                    <input
                      type="text"
                      placeholder="اسمك"
                      value={newReviewName}
                      onChange={(e) => setNewReviewName(e.target.value)}
                      className="w-full px-3 py-1.5 bg-[#1a1a1d] border border-[#2a2a2e] text-white rounded-lg text-xs"
                      required
                    />
                    <textarea
                      placeholder="اكتب انطباعك عن جودة المنتج..."
                      value={newReviewComment}
                      onChange={(e) => setNewReviewComment(e.target.value)}
                      className="w-full px-3 py-1.5 bg-[#1a1a1d] border border-[#2a2a2e] text-white rounded-lg text-xs h-16"
                      required
                    />
                    <button
                      type="submit"
                      className="w-full py-2 bg-[#0047AB] text-white font-bold rounded-lg hover:bg-blue-600"
                    >
                      إرسال التقييم
                    </button>
                  </form>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
