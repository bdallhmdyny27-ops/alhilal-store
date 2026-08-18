import { Product } from '../types';

import heroBannerImg from '../assets/images/al_hilal_hero_banner_1786271739054.jpg';
import shoesImg from '../assets/images/al_hilal_shoes_1786271752632.jpg';
import jerseyImg from '../assets/images/al_hilal_jersey_1786271768323.jpg';
import shortsImg from '../assets/images/al_hilal_shorts_1786271781243.jpg';

export const HERO_BANNER_IMAGE = heroBannerImg;

export const PRODUCTS: Product[] = [
  {
    id: 'hl-shirt-01',
    name: 'قميص الهلال الأساسي 2026 (الرجالي)',
    category: 'tops',
    categoryLabel: 'بلايز وقمصان',
    price: 249,
    originalPrice: 299,
    rating: 4.9,
    reviewsCount: 342,
    isNew: true,
    isBestseller: true,
    gender: 'men',
    image: jerseyImg,
    galleryImages: [
      jerseyImg,
      'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'القميص الأساسي الرسمي لنادي الهلال لموسم 2026 بالقصة الرجالية الرياضية. مصمم بنسيج أزرق ملكي فاخر يحمل شعار الهلال الأصلي المطرز بحرفية فائقة.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL (44)', '5XL (46)'],
    colors: [
      { name: 'أزرق ملكي', hex: '#004899' },
      { name: 'أبيض ناصع', hex: '#FFFFFF' }
    ],
    isCustomizable: true,
    inStock: true,
    details: [
      'مزود بشعار نادي الهلال الرسمي المطرز بجودة عالية 100%',
      'قصة رجالية مريحة متوفرة بمقاسات كبيرة حتى مقاس 44 (4XL)',
      'خامة بوليستر 100% بتقنية المايكروفايبر سريعة الجفاف',
      'طباعة اسم ورقم اللاعب حسب اختيارك (مجاناً عند الطلب)'
    ],
    reviews: [
      {
        id: 'r1',
        userName: 'فهد العتيبي',
        rating: 5,
        date: 'قبل يومين',
        comment: 'الخامة ممتازة جداً والشعار بارز وفخم. وطبعت اسم ميتروفيتش الرقم واصل مضبوط!',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'hl-shirt-women-01',
    name: 'قميص الهلال الأساسي 2026 (النسائي الفاخر)',
    category: 'tops',
    categoryLabel: 'بلايز وقمصان',
    price: 249,
    originalPrice: 299,
    rating: 5.0,
    reviewsCount: 198,
    isNew: true,
    isBestseller: true,
    gender: 'women',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
      jerseyImg
    ],
    description: 'قميص نادي الهلال المخصص للنساء لموسم 2026 مزين بشعار الهلال الذهبي المطرز الأصلي. متوفر بمقاسات واسعة ومتنوعة تناسب الجميع.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL (44)', '3XL'],
    colors: [
      { name: 'أزرق ملكي', hex: '#004899' },
      { name: 'أبيض وأزرق', hex: '#FFFFFF' }
    ],
    isCustomizable: true,
    inStock: true,
    details: [
      'شعار نادي الهلال الذهبي الأصلي مطرز على الصدر',
      'قصة نسائية مخصصة (Women Slim Fit) متوفرة حتى مقاس 44 (EU 44)',
      'نسيج فائق النعومة ومضاد للتجعد والتعرق',
      'إمكانية الطباعة الحرارية المخصصة بالاسم والرقم'
    ],
    reviews: [
      {
        id: 'rw1',
        userName: 'سارة الدوسري',
        rating: 5,
        date: 'قبل 3 أيام',
        comment: 'ما شاء الله القصة النسائية تجنن ومريحة جداً بالمقاس، والطباعة ذهبية فخمة!',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'hl-shoes-01',
    name: 'حذاء الهلال الملكي للجري والتمارين (للجنسين)',
    category: 'shoes',
    categoryLabel: 'أحذية',
    price: 299,
    originalPrice: 350,
    rating: 4.9,
    reviewsCount: 185,
    isNew: true,
    isBestseller: true,
    gender: 'unisex',
    image: shoesImg,
    galleryImages: [
      shoesImg,
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'حذاء رياضي متطور بلون أزرق وأبيض مخصص لمشجعي ومشجعات الزعيم. يناسب الرجال والنساء بوسادة هوائية ممتصة للصدمات.',
    sizes: ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45'],
    colors: [
      { name: 'أزرق وأبيض', hex: '#004899' },
      { name: 'أسود ملكي', hex: '#1E293B' }
    ],
    inStock: true,
    details: [
      'تصميم مخصص للجنسين (رجال ونساء)',
      'نعل سفلي من المطاط المقاوم للانزلاق',
      'بطانة داخلية مريحة جداً للجري والمشي'
    ],
    reviews: []
  },
  {
    id: 'hl-shorts-01',
    name: 'شورت الهلال الرياضي الرجالي 2026',
    category: 'shorts',
    categoryLabel: 'شورتات',
    price: 119,
    originalPrice: 149,
    rating: 4.8,
    reviewsCount: 156,
    isNew: false,
    isBestseller: true,
    gender: 'men',
    image: shortsImg,
    galleryImages: [
      shortsImg
    ],
    description: 'شورت رياضي رجالي مرن ومريح باللون الأزرق الملكي، مزين بشعار نادي الهلال الأصلي البارز على الفخذ. متوفر بمقاسات كبيرة حتى 44.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL (44)'],
    colors: [
      { name: 'أزرق ملكي', hex: '#004899' },
      { name: 'أبيض', hex: '#FFFFFF' }
    ],
    inStock: true,
    details: [
      'شعار نادي الهلال بارز بجودة عالية على الفخذ',
      'مقاسات متنوعة من S وحتى مقاس 44 (4XL)',
      'حزام خصر مطاطي مع برباط سحب للتعديل',
      'جيوب جانبية بسحاب آمن للحفاظ على الأغراض'
    ],
    reviews: []
  },
  {
    id: 'hl-shorts-women-01',
    name: 'شورت الهلال الرياضي النسائي المرن',
    category: 'shorts',
    categoryLabel: 'شورتات',
    price: 119,
    originalPrice: 139,
    rating: 4.9,
    reviewsCount: 88,
    isNew: true,
    isBestseller: false,
    gender: 'women',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'شورت رياضي نسائي مريح بخصر مرتفع مزين بشعار الهلال المطرز الأصلي. متوفر بمقاسات حتى 44 (XXL).',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL (44)'],
    colors: [
      { name: 'أزرق ملكي', hex: '#004899' },
      { name: 'أسود', hex: '#0F172A' }
    ],
    inStock: true,
    details: [
      'شعار نادي الهلال المطرز الأصلي',
      'متوفر بمقاسات نسائية حتى مقاس 44 (EU 44)',
      'خصر مرتفع (High Waist) لمزيد من الراحة والدعم',
      'جيوب خفية للهاتف والمفاتيح'
    ],
    reviews: []
  },
  {
    id: 'hl-shirt-women-02',
    name: 'تيشيرت كاجوال نسائي بشعار الهلال الملكي',
    category: 'tops',
    categoryLabel: 'بلايز وقمصان',
    price: 139,
    rating: 4.9,
    reviewsCount: 115,
    isNew: true,
    isBestseller: true,
    gender: 'women',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'تيشيرت قطني نسائي كاجوال أنيق مع تطريز بارز لشعار الهلال الذهبي الأصلي على الصدر. متوفر حتى مقاس 44.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL (44)'],
    colors: [
      { name: 'أبيض ناصع', hex: '#FFFFFF' },
      { name: 'أزرق سماوي', hex: '#38BDF8' }
    ],
    inStock: true,
    details: [
      'تطريز ذهبي فاخر لشعار نادي الهلال الأصلي',
      'متوفر بمقاسات متعددة حتى مقاس 44 (EU 44)',
      'قطن طبيعي 100% فائق النعومة'
    ],
    reviews: []
  },
  {
    id: 'hl-shirt-03',
    name: 'هودي الهلال الملكي الشتوي (للجنسين)',
    category: 'tops',
    categoryLabel: 'بلايز وقمصان',
    price: 219,
    originalPrice: 259,
    rating: 4.9,
    reviewsCount: 140,
    isNew: true,
    isBestseller: true,
    gender: 'unisex',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'هودي دافئ ومريح جداً يناسب الرجال والنساء، يحمل شعار الهلال الأصلي المطرز 3D ثلاثي الأبعاد. متوفر بمقاسات كبيرة حتى مقاس 44 (4XL).',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL (44)', '5XL (46)'],
    colors: [
      { name: 'أزرق ملكي', hex: '#004899' },
      { name: 'أسود', hex: '#0F172A' }
    ],
    inStock: true,
    details: [
      'شعار نادي الهلال المطرز 3D الاصلي',
      'مقاسات واسعة متوفرة حتى مقاس 44 (4XL)',
      'مناسب للرجال والنساء (Unisex Design)',
      'بطانة داخلية ناعمة من الفليس للتدفئة المثالية'
    ],
    reviews: []
  },
  {
    id: 'hl-kit-01',
    name: 'طقم الهلال الكامل للأطفال والناشئين',
    category: 'kits',
    categoryLabel: 'أطقم كاملة',
    price: 269,
    originalPrice: 320,
    rating: 5.0,
    reviewsCount: 210,
    isNew: true,
    isBestseller: true,
    gender: 'kids',
    image: jerseyImg,
    galleryImages: [
      jerseyImg,
      shortsImg
    ],
    description: 'طقم كامل للأطفال والناشئين (قميص + شورت + جوارب رياضية) بشعار نادي الهلال الأصلي. يتوفر لجميع الأعمار حتى 16 سنة (عمر 4 إلى 16 سنة / مقاس 44 للناشئين).',
    sizes: ['4-5 سنوات', '6-7 سنوات', '8-9 سنوات', '10-11 سنة', '12-13 سنة', '14-16 سنة (مقاس 44 ناشئين)'],
    colors: [
      { name: 'أزرق ملكي كامل', hex: '#004899' }
    ],
    isCustomizable: true,
    inStock: true,
    details: [
      'شعار نادي الهلال الأصلي المنسوج بجودة عالية',
      'متوفر لجميع الفئات والناشئين حتى عمر 16 سنة / مقاس 44',
      'طقم كامل (بلوزة + شورت + شراب)',
      'إمكانية طباعة اسم الطفل ورقمه المفضل مجاناً'
    ],
    reviews: []
  },
  {
    id: 'hl-acc-01',
    name: 'كاب الهلال الملكي المطرز (للجنسين)',
    category: 'accessories',
    categoryLabel: 'إكسسوارات',
    price: 79,
    rating: 4.8,
    reviewsCount: 95,
    isNew: false,
    isBestseller: false,
    gender: 'unisex',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'قبعة رياضية قابلة للتعديل تناسب الرجال والنساء مع تطريز ثلاثي الأبعاد لشعار نادي الهلال.',
    sizes: ['مقاس موحد (قابل للتعديل)'],
    colors: [
      { name: 'أزرق ملكي', hex: '#004899' },
      { name: 'أسود', hex: '#0F172A' }
    ],
    inStock: true,
    details: [
      'مشبك خلفي معدني متين للتعديل',
      'تطريز بارز وفاخر لشعار الهلال'
    ],
    reviews: []
  },
  {
    id: 'hl-acc-02',
    name: 'حقيبة الهلال الرياضية (للجنسين)',
    category: 'accessories',
    categoryLabel: 'إكسسوارات',
    price: 149,
    originalPrice: 180,
    rating: 4.9,
    reviewsCount: 67,
    isNew: true,
    isBestseller: false,
    gender: 'unisex',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'حقيبة ظهر واسعة ومقاومة للماء تتسع لجميع ملابسك الرياضية، تناسب الرجال والنساء والنادي والسفر.',
    sizes: ['مقاس موحد (30 لتر)'],
    colors: [
      { name: 'أزرق وأسود', hex: '#004899' }
    ],
    inStock: true,
    details: [
      'جيب سفلي منفصل للأحذية المبللة',
      'أحزمة كتف مبطنة ومريحة جداً'
    ],
    reviews: []
  }
];

export const FAMOUS_PLAYERS = [
  { name: 'ميتروفيتش', number: '9', role: 'مهاجم' },
  { name: 'سالم الدوسري', number: '29', role: 'جناح' },
  { name: 'مالكوم', number: '10', role: 'صانع لعب' },
  { name: 'روبن نيفيز', number: '8', role: 'وسط' },
  { name: 'ياسين بونو', number: '37', role: 'حارس مرمى' },
  { name: 'كانسيلو', number: '20', role: 'مدافع' },
  { name: 'سافيتش', number: '22', role: 'وسط' }
];

export const SAUDI_CITIES = [
  'الرياض',
  'جدة',
  'مكة المكرمة',
  'المدينة المنورة',
  'الدمام',
  'الخبر',
  'الظهران',
  'القصيم (بريدة)',
  'حائل',
  'أبها',
  'تبوك',
  'الطائف',
  'الأحساء',
  'جازان',
  'نجران'
];
