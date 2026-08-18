import React from 'react';
import { Product } from '../types';
import { Heart, Star, ShoppingBag, Eye, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isFavorite,
  onToggleFavorite,
  onSelectProduct,
  onQuickAdd,
}) => {
  return (
    <div className="group bg-[#161618] rounded-xl border border-[#222226] hover:border-[#0047AB]/60 hover:shadow-xl hover:shadow-[#0047AB]/10 transition-all duration-300 overflow-hidden flex flex-col justify-between relative">
      {/* Upper Thumbnail Container */}
      <div className="relative aspect-square w-full bg-[#111113] overflow-hidden cursor-pointer" onClick={() => onSelectProduct(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
          referrerPolicy="no-referrer"
        />

        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
          {product.isBestseller && (
            <span className="bg-[#0047AB] text-white font-black text-[10px] px-2.5 py-1 rounded-md shadow-md border border-white/20 flex items-center gap-1">
              الأكثر مبيعاً
            </span>
          )}
          {product.isNew && (
            <span className="bg-[#1a1a1d] text-blue-400 font-bold text-[10px] px-2.5 py-1 rounded-md border border-[#0047AB]/40">
              جديد 2026
            </span>
          )}
          {product.originalPrice && (
            <span className="bg-rose-600 text-white font-black text-[10px] px-2.5 py-1 rounded-md shadow-xs">
              خصم {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(product);
          }}
          className={`absolute top-3 left-3 p-2 rounded-lg backdrop-blur-md transition-all z-10 ${
            isFavorite
              ? 'bg-rose-600 text-white border border-rose-500'
              : 'bg-[#0a0a0b]/80 text-zinc-400 hover:text-rose-500 hover:bg-[#0a0a0b] border border-[#222226]'
          }`}
          aria-label="إضافة للمفضلة"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
        </button>

        {/* Customization Badge */}
        {product.isCustomizable && (
          <div className="absolute bottom-3 right-3 bg-[#0a0a0b]/90 text-zinc-300 text-[10px] font-bold px-2 py-1 rounded-md border border-[#0047AB]/40 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>طباعة الاسم والرقم</span>
          </div>
        )}

        {/* Quick View Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectProduct(product);
            }}
            className="px-4 py-2 bg-white text-zinc-900 font-bold text-xs rounded-lg shadow-lg hover:bg-zinc-200 flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-all"
          >
            <Eye className="w-4 h-4 text-[#0047AB]" />
            <span>معاينة التفاصيل</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between bg-[#161618]">
        <div>
          {/* Category & Gender & Rating */}
          <div className="flex items-center justify-between text-xs text-zinc-400 font-medium mb-1.5 gap-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="bg-[#1f1f23] text-zinc-300 px-2 py-0.5 rounded text-[11px] font-bold border border-[#222226]">
                {product.categoryLabel}
              </span>
              {product.gender && (
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-extrabold border ${
                  product.gender === 'women'
                    ? 'bg-rose-950/60 text-rose-300 border-rose-800/40'
                    : product.gender === 'men'
                    ? 'bg-blue-950/60 text-blue-300 border-blue-800/40'
                    : product.gender === 'kids'
                    ? 'bg-amber-950/60 text-amber-300 border-amber-800/40'
                    : 'bg-zinc-800 text-zinc-300 border-zinc-700'
                }`}>
                  {product.gender === 'women' ? 'نسائي 👩' : product.gender === 'men' ? 'رجالي 👨' : product.gender === 'kids' ? 'أطفال 👶' : 'للجنسين 👥'}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 text-amber-400 font-bold shrink-0">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{product.rating}</span>
              <span className="text-zinc-500 font-normal">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Name */}
          <h3
            onClick={() => onSelectProduct(product)}
            className="font-bold text-base text-white group-hover:text-blue-400 transition-colors line-clamp-2 cursor-pointer leading-snug"
          >
            {product.name}
          </h3>
        </div>

        {/* Price & Action */}
        <div className="mt-4 pt-3 border-t border-[#222226] flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black text-[#0047AB]">{product.price}</span>
              <span className="text-xs font-bold text-zinc-400">ر.س</span>
            </div>
            {product.originalPrice && (
              <span className="text-xs text-zinc-500 line-through">
                {product.originalPrice} ر.س
              </span>
            )}
          </div>

          <button
            onClick={() => onQuickAdd(product)}
            className="p-2.5 bg-[#0047AB] hover:bg-blue-600 text-white rounded-lg transition-all active:scale-95 shrink-0"
            title="إضافة للسلة"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
