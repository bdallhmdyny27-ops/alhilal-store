import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Sparkles, Truck, ShieldCheck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onOpenCheckout: () => void;
  appliedDiscountCode: string;
  onApplyDiscountCode: (code: string) => boolean;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onOpenCheckout,
  appliedDiscountCode,
  onApplyDiscountCode,
}) => {
  if (!isOpen) return null;

  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const isDiscountApplied = appliedDiscountCode === 'HILAL1957';
  const discountAmount = isDiscountApplied ? Math.round(subtotal * 0.15) : 0;
  const shippingFee = subtotal >= 200 || cartItems.length === 0 ? 0 : 25;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const freeShippingThreshold = 200;
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCodeInput.trim()) return;

    const success = onApplyDiscountCode(promoCodeInput.trim().toUpperCase());
    if (success) {
      setPromoMessage({ type: 'success', text: 'تم تطبيق خصم 15% بنجاح! 🎉' });
    } else {
      setPromoMessage({ type: 'error', text: 'كود الخصم غير صحيح. جرب HILAL1957' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-start bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-[#161618] text-white h-full shadow-2xl flex flex-col justify-between overflow-hidden border-l border-[#222226]">
        
        {/* Cart Header */}
        <div className="p-4 sm:p-5 bg-[#111113] text-white flex items-center justify-between shrink-0 border-b border-[#222226]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#0047AB]" />
            <h2 className="font-extrabold text-lg">سلة الشراء ({cartItems.length})</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-[#1a1a1d] hover:bg-[#222226] text-zinc-400 hover:text-white transition-colors"
            aria-label="إغلاق السلة"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#111113] p-3 border-b border-[#222226] text-xs">
          <div className="flex items-center justify-between text-zinc-300 font-bold mb-1">
            <span className="flex items-center gap-1">
              <Truck className="w-4 h-4 text-[#0047AB]" />
              <span>
                {remainingForFreeShipping === 0
                  ? 'تهانينا! حصلت على توصيل مجاني 🚚'
                  : `أضف بـ ${remainingForFreeShipping} ر.س إضافية للتوصيل المجاني`}
              </span>
            </span>
          </div>
          <div className="w-full bg-[#1a1a1d] h-2 rounded-full overflow-hidden border border-[#2a2a2e]">
            <div
              className="bg-[#0047AB] h-full transition-all duration-300"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-zinc-500">
              <div className="w-20 h-20 rounded-full bg-[#1a1a1d] flex items-center justify-center mb-4 text-zinc-400 border border-[#2a2a2e]">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <p className="font-bold text-white text-base">سلتك فارغة حالياً</p>
              <p className="text-xs text-zinc-400 mt-1">تصفح تشكيلة أحذية وبلايز وشورتات الهلال واستمتع بالتسوق!</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.cartItemId}
                className="flex gap-3 p-3 bg-[#1a1a1d] rounded-xl border border-[#2a2a2e] items-center relative"
              >
                {/* Thumbnail */}
                <div className="w-20 h-20 rounded-lg bg-[#111113] overflow-hidden shrink-0 border border-[#222226]">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-xs text-white truncate">{item.product.name}</h4>
                  
                  <div className="text-[11px] text-zinc-400 mt-0.5 flex flex-wrap gap-2">
                    <span>المقاس: <strong className="text-zinc-200">{item.selectedSize}</strong></span>
                    {item.selectedColor && (
                      <span>اللون: <strong className="text-zinc-200">{item.selectedColor}</strong></span>
                    )}
                  </div>

                  {/* Jersey Custom Name/Number badge if set */}
                  {(item.customName || item.customNumber) && (
                    <div className="mt-1 inline-flex items-center gap-1 bg-[#0047AB]/20 text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded border border-[#0047AB]/40">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      <span>طباعة: #{item.customNumber || ''} {item.customName || ''}</span>
                    </div>
                  )}

                  {/* Price & Quantity */}
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-black text-sm text-[#0047AB]">
                      {item.product.price * item.quantity} ر.س
                    </span>

                    <div className="flex items-center border border-[#2a2a2e] rounded-lg bg-[#111113]">
                      <button
                        onClick={() => onUpdateQuantity(item.cartItemId, -1)}
                        className="px-2 py-0.5 text-zinc-400 hover:text-white font-bold"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-bold text-white">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.cartItemId, 1)}
                        className="px-2 py-0.5 text-zinc-400 hover:text-white font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => onRemoveItem(item.cartItemId)}
                  className="p-1.5 text-zinc-500 hover:text-rose-500 transition-colors"
                  aria-label="حذف المنتج"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer & Summary */}
        {cartItems.length > 0 && (
          <div className="p-4 bg-[#111113] border-t border-[#222226] space-y-3 shrink-0">
            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="كود الخصم (مثال: HILAL1957)"
                  value={promoCodeInput}
                  onChange={(e) => setPromoCodeInput(e.target.value)}
                  className="w-full pl-3 pr-8 py-2 bg-[#1a1a1d] border border-[#2a2a2e] text-white placeholder-zinc-500 rounded-xl text-xs uppercase font-bold focus:ring-2 focus:ring-[#0047AB]"
                />
                <Tag className="w-4 h-4 text-zinc-500 absolute right-2.5 top-1/2 -translate-y-1/2" />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-[#0047AB] hover:bg-blue-600 text-white font-bold text-xs rounded-xl"
              >
                تطبيق
              </button>
            </form>

            {promoMessage && (
              <p
                className={`text-[11px] font-bold ${
                  promoMessage.type === 'success' ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {promoMessage.text}
              </p>
            )}

            {/* Price Calculations */}
            <div className="space-y-1 text-xs text-zinc-400 pt-2 border-t border-[#222226]">
              <div className="flex justify-between">
                <span>المجموع الفرعي:</span>
                <span className="font-bold text-white">{subtotal} ر.س</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400 font-bold">
                  <span>خصم كود الهلال (15%):</span>
                  <span>-{discountAmount} ر.س</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>رسوم التوصيل:</span>
                <span className="font-bold text-white">
                  {shippingFee === 0 ? 'مجاني 🎉' : `${shippingFee} ر.س`}
                </span>
              </div>
              <div className="flex justify-between text-base font-black text-[#0047AB] pt-2 border-t border-[#222226]">
                <span>المجموع الكلي:</span>
                <span>{grandTotal} ر.س</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={() => {
                onClose();
                onOpenCheckout();
              }}
              className="w-full py-3.5 bg-[#0047AB] hover:bg-blue-600 text-white font-extrabold rounded-xl shadow-lg shadow-[#0047AB]/30 flex items-center justify-center gap-2 text-sm active:scale-98 transition-all"
            >
              <span>إتمام الطلب والدفع</span>
              <ArrowRight className="w-4 h-4 rotate-180" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
