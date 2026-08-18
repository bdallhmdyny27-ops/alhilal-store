import React from 'react';
import { Product } from '../types';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onSelectProduct,
  onQuickAdd,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-start bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-[#161618] text-white h-full shadow-2xl flex flex-col justify-between overflow-hidden border-l border-[#222226]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#111113] text-white flex items-center justify-between shrink-0 border-b border-[#222226]">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
            <h2 className="font-extrabold text-lg">قائمة المفضلة ({wishlistProducts.length})</h2>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl bg-[#1a1a1d] hover:bg-[#222226] text-zinc-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {wishlistProducts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-zinc-500">
              <div className="w-20 h-20 rounded-full bg-[#1a1a1d] text-rose-500/60 flex items-center justify-center mb-4 border border-[#2a2a2e]">
                <Heart className="w-10 h-10" />
              </div>
              <p className="font-bold text-white text-base">لا توجد منتجات بالمفضلة بعد</p>
              <p className="text-xs text-zinc-400 mt-1">اضغط على القلب بجانب أي حذاء أو قميص أو شورت لحفظه هنا!</p>
            </div>
          ) : (
            wishlistProducts.map((p) => (
              <div
                key={p.id}
                className="flex gap-3 p-3 bg-[#1a1a1d] rounded-xl border border-[#2a2a2e] items-center relative group"
              >
                <div
                  onClick={() => {
                    onClose();
                    onSelectProduct(p);
                  }}
                  className="w-16 h-16 rounded-lg bg-[#111113] overflow-hidden shrink-0 border border-[#222226] cursor-pointer"
                >
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>

                <div className="flex-1 min-w-0">
                  <h4
                    onClick={() => {
                      onClose();
                      onSelectProduct(p);
                    }}
                    className="font-bold text-xs text-white truncate hover:text-blue-400 cursor-pointer"
                  >
                    {p.name}
                  </h4>
                  <div className="text-xs font-black text-[#0047AB] mt-1">{p.price} ر.س</div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onQuickAdd(p)}
                    className="p-2 bg-[#0047AB] hover:bg-blue-600 text-white rounded-xl text-xs font-bold shadow-xs"
                    title="أضف للسلة"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onRemoveFromWishlist(p)}
                    className="p-2 text-zinc-500 hover:text-rose-500 transition-colors"
                    title="إزالة من المفضلة"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
