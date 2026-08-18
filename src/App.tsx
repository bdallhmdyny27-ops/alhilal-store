import React, { useState, useMemo } from 'react';
import { PRODUCTS } from './data/products';
import { Product, ProductCategory, GenderFilter, CartItem, Order } from './types';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { JerseyCustomizerModal } from './components/JerseyCustomizerModal';
import { JerseySection } from './components/JerseySection';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SizeGuideModal } from './components/SizeGuideModal';
import { InvoiceModal } from './components/InvoiceModal';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';

import { Filter, SlidersHorizontal, ArrowUpDown, Sparkles, Trophy, Users } from 'lucide-react';

export default function App() {
  // Navigation & Category filter state
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [selectedGender, setSelectedGender] = useState<GenderFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'price-low' | 'price-high' | 'rating'>('default');

  // Favorites state
  const [wishlistIds, setWishlistIds] = useState<string[]>(['hl-shirt-01', 'hl-shoes-01']);
  const [wishlistDrawerOpen, setWishlistDrawerOpen] = useState(false);

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      cartItemId: 'init-1',
      product: PRODUCTS[0],
      selectedSize: 'L',
      selectedColor: 'أزرق ملكي',
      quantity: 1,
      customName: 'MITROVIĆ',
      customNumber: '9',
    },
  ]);
  const [appliedDiscountCode, setAppliedDiscountCode] = useState('');
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  // Modals state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [jerseyCustomizerOpen, setJerseyCustomizerOpen] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [trackingModalOpen, setTrackingModalOpen] = useState(false);
  const [sizeGuideModalOpen, setSizeGuideModalOpen] = useState(false);
  const [invoiceModalOrder, setInvoiceModalOrder] = useState<Order | null>(null);

  // Invoice view handler
  const handleOpenInvoice = (order?: Order) => {
    if (order) {
      setInvoiceModalOrder(order);
    } else {
      // Default sample order if clicked directly from navbar/footer
      const sub = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
      const sampleOrder: Order = {
        id: 'HL-INV-2026-984',
        date: '9 أغسطس 2026',
        items: cartItems.length > 0 ? cartItems : [
          {
            cartItemId: 'inv-sample-1',
            product: PRODUCTS[0],
            selectedSize: 'L',
            selectedColor: 'أزرق ملكي',
            quantity: 1,
            customName: 'MITROVIĆ',
            customNumber: '9',
          },
        ],
        subtotal: sub || 299,
        discount: appliedDiscountCode === 'HILAL1957' ? Math.round((sub || 299) * 0.15) : 0,
        shipping: sub >= 200 || cartItems.length === 0 ? 0 : 25,
        total: Math.max(0, (sub || 299) - (appliedDiscountCode === 'HILAL1957' ? Math.round((sub || 299) * 0.15) : 0)),
        status: 'received',
        customerInfo: {
          fullName: 'عميل متجر الهلال المميز',
          phone: '0551234567',
          city: 'الرياض',
          address: 'حي الملك فهد - شارع العليا العام',
          paymentMethod: ' Apple Pay',
        },
        trackingCode: 'HL-948120',
      };
      setInvoiceModalOrder(sampleOrder);
    }
  };

  // Toast notification state
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setToastVisible(true);
  };

  // Favorite toggle handler
  const handleToggleFavorite = (product: Product) => {
    if (wishlistIds.includes(product.id)) {
      setWishlistIds(wishlistIds.filter((id) => id !== product.id));
      showToast(`تم إزالة "${product.name}" من المفضلة`);
    } else {
      setWishlistIds([...wishlistIds, product.id]);
      showToast(`تمت إضافة "${product.name}" للمفضلة ❤️`);
    }
  };

  // Add to cart handler
  const handleAddToCart = (
    product: Product,
    size: string,
    color: string,
    quantity: number,
    customName?: string,
    customNumber?: string
  ) => {
    const newItem: CartItem = {
      cartItemId: `${product.id}-${size}-${color}-${customName || ''}-${customNumber || ''}-${Date.now()}`,
      product,
      selectedSize: size,
      selectedColor: color,
      quantity,
      customName,
      customNumber,
    };

    setCartItems((prev) => [newItem, ...prev]);
    showToast(`تم إضافة "${product.name}" إلى سلة الشراء 🛍️`);
  };

  const handleQuickAdd = (product: Product) => {
    handleAddToCart(
      product,
      product.sizes[0] || 'M',
      product.colors[0]?.name || 'أزرق',
      1
    );
  };

  // Cart Quantity Updates
  const handleUpdateQuantity = (cartItemId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((it) => it.cartItemId !== cartItemId));
    showToast('تم حذف المنتج من السلة');
  };

  const handleApplyDiscountCode = (code: string) => {
    if (code === 'HILAL1957') {
      setAppliedDiscountCode('HILAL1957');
      return true;
    }
    return false;
  };

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Gender filter
    if (selectedGender !== 'all') {
      result = result.filter(
        (p) => !p.gender || p.gender === selectedGender || p.gender === 'unisex'
      );
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q)
      );
    }

    // Sort order
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedCategory, selectedGender, searchQuery, sortBy]);

  const wishlistProducts = useMemo(() => {
    return PRODUCTS.filter((p) => wishlistIds.includes(p.id));
  }, [wishlistIds]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0b] text-zinc-100 font-['Cairo',sans-serif]">
      {/* Top Navigation */}
      <Navbar
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setCartDrawerOpen(true)}
        onOpenWishlist={() => setWishlistDrawerOpen(true)}
        onOpenTracking={() => setTrackingModalOpen(true)}
        onOpenJerseyCustomizer={() => setJerseyCustomizerOpen(true)}
        onOpenInvoice={() => handleOpenInvoice()}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        selectedGender={selectedGender}
        onSelectGender={setSelectedGender}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onSelectCategory={setSelectedCategory}
          onOpenJerseyCustomizer={() => setJerseyCustomizerOpen(true)}
        />

        {/* Dedicated Jersey Customizer Banner Section */}
        <JerseySection onOpenCustomizer={() => setJerseyCustomizerOpen(true)} />

        {/* Catalog Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Header Controls (Title, Filter Pills, Sort) */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2">
                <Trophy className="w-6 h-6 text-[#0047AB]" />
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {selectedCategory === 'all'
                    ? 'تشكيلة منتجات الهلال المعتمدة'
                    : selectedCategory === 'tops'
                    ? 'بلايز وقمصان نادي الهلال'
                    : selectedCategory === 'shoes'
                    ? 'أحذية وجزم الهلال الرياضية'
                    : selectedCategory === 'shorts'
                    ? 'شورتات الهلال للمباريات والتمارين'
                    : selectedCategory === 'kits'
                    ? 'أطقم الناشئين والأطفال الكاملة'
                    : 'إكسسوارات ومستلزمات الهلال'}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1 font-medium">
                عرض {filteredProducts.length} من أصل {PRODUCTS.length} منتج متوفر مع الضمان الأصلي
              </p>

              {/* Gender Filter Quick Pills */}
              <div className="flex items-center gap-1.5 mt-3 flex-wrap">
                {[
                  { id: 'all', label: 'جميع الأقسام 👥' },
                  { id: 'men', label: 'تشكيلة الرجال 👨' },
                  { id: 'women', label: 'تشكيلة النساء 👩' },
                  { id: 'kids', label: 'الأطفال والولادي 👶' },
                ].map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setSelectedGender(g.id as GenderFilter)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all border ${
                      selectedGender === g.id
                        ? 'bg-[#0047AB] text-white border-blue-400 shadow-md shadow-[#0047AB]/20 scale-105'
                        : 'bg-[#161618] text-zinc-400 hover:text-white border-[#222226] hover:bg-[#1f1f23]'
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort & Filter Options */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 bg-[#161618] border border-[#222226] px-3.5 py-2 rounded-xl text-xs font-bold text-zinc-300">
                <ArrowUpDown className="w-4 h-4 text-zinc-500" />
                <span>الترتيب:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent font-bold text-white focus:outline-none cursor-pointer"
                >
                  <option value="default" className="bg-[#161618] text-white">الافتراضي (الموصى به)</option>
                  <option value="price-low" className="bg-[#161618] text-white">السعر: من الأقل للأعلى</option>
                  <option value="price-high" className="bg-[#161618] text-white">السعر: من الأعلى للأقل</option>
                  <option value="rating" className="bg-[#161618] text-white">الأعلى تقييماً</option>
                </select>
              </div>

              {/* Jersey Customizer Fast Button */}
              <button
                onClick={() => setJerseyCustomizerOpen(true)}
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-[#0047AB] hover:bg-blue-600 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-[#0047AB]/20 transition-transform active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>طباعة اسم ورقم</span>
              </button>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-[#161618] rounded-3xl p-12 text-center border border-[#222226] max-w-md mx-auto my-8">
              <div className="w-16 h-16 bg-[#1f1f23] rounded-2xl flex items-center justify-center mx-auto mb-3 text-zinc-500">
                <Filter className="w-8 h-8" />
              </div>
              <h3 className="font-extrabold text-lg text-white">لم نجد منتجات تطابق بحثك</h3>
              <p className="text-xs text-zinc-400 mt-1 mb-4">
                جرب تغيير البحث أو اختيار قسم آخر مثل الأحذية أو القمصان أو الشورتات.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="px-5 py-2.5 bg-[#0047AB] text-white text-xs font-bold rounded-xl hover:bg-blue-600"
              >
                عرض كل منتجات الهلال
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isFavorite={wishlistIds.includes(product.id)}
                  onToggleFavorite={handleToggleFavorite}
                  onSelectProduct={(p) => setSelectedProduct(p)}
                  onQuickAdd={handleQuickAdd}
                />
              ))}
            </div>
          )}

        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Product Details Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        isFavorite={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onAddToCart={handleAddToCart}
        onOpenSizeGuide={() => setSizeGuideModalOpen(true)}
      />

      {/* Interactive Jersey Customizer Modal */}
      {jerseyCustomizerOpen && (
        <JerseyCustomizerModal
          onClose={() => setJerseyCustomizerOpen(false)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onOpenCheckout={() => setCheckoutModalOpen(true)}
        appliedDiscountCode={appliedDiscountCode}
        onApplyDiscountCode={handleApplyDiscountCode}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        cartItems={cartItems}
        appliedDiscountCode={appliedDiscountCode}
        onClearCart={() => setCartItems([])}
        onViewInvoice={handleOpenInvoice}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={wishlistDrawerOpen}
        onClose={() => setWishlistDrawerOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={handleToggleFavorite}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onQuickAdd={handleQuickAdd}
      />

      {/* Order Tracking Modal */}
      <OrderTrackingModal
        isOpen={trackingModalOpen}
        onClose={() => setTrackingModalOpen(false)}
        onViewInvoice={handleOpenInvoice}
      />

      {/* Official Tax Invoice Modal */}
      {invoiceModalOrder && (
        <InvoiceModal
          order={invoiceModalOrder}
          onClose={() => setInvoiceModalOrder(null)}
        />
      )}

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={sizeGuideModalOpen}
        onClose={() => setSizeGuideModalOpen(false)}
      />

      {/* Toast Notification */}
      <Toast
        message={toastMessage}
        isVisible={toastVisible}
        onClose={() => setToastVisible(false)}
      />
    </div>
  );
}
