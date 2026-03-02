import { Product } from '../types';

// Fashion
export const fashionSubs = [
  { id: 'women', name: 'Women', icon: '👗' },
  { id: 'men', name: 'Men', icon: '👔' },
  { id: 'kids', name: 'Kids', icon: '🧸' },
  { id: 'accessories', name: 'Accessories', icon: '🧣' },
];

export const productsByFashionSubCategory: Record<string, Product[]> = {
  women: [
    {
      id: 101,
      name: 'Yoga Leggings',
      price: 9.99,
      image: '/women/shangpin1/0_2.jpg',
      images: ['/women/shangpin1/0_2.jpg', '/women/shangpin1/0_3.jpg'],
      description: 'High-waist sculpt fit with seamless comfort.',
      detailedDescription: 'Designed for everyday movement with contour support and a flattering silhouette.',
    },
    { id: 102, name: 'Midi Skirt', price: 39.99, image: '/fashion/women/skirt.jpg' },
  ],
  men: [
    { id: 201, name: 'T-Shirt', price: 29.99, image: '/fashion/men/tshirt.jpg' },
    { id: 202, name: 'Jeans', price: 59.99, image: '/fashion/men/jeans.jpg' },

  ],
  kids: [
    { id: 301, name: 'Kids Coat', price: 35.99, image: '/fashion/kids/coat.jpg' },
  ],
  accessories: [
    { id: 401, name: 'Scarf', price: 15.99, image: '/fashion/accessories/scarf.jpg' },
  ],
};

// Auto
export const autoSubs = [
  { id: 'cleaners', name: 'Cleaners', icon: '🧼' },
  { id: 'electronics', name: 'Electronics', icon: '📡' },
  { id: 'interior', name: 'Interior', icon: '🪑' },
];

export const productsByAutoSubCategory: Record<string, Product[]> = {
  cleaners: [
    { id: 501, name: 'All-Purpose Cleaner', price: 12.99, image: '/auto/cleaner.jpg' },
    { id: 502, name: 'Foam Interior Cleaner', price: 9.99, image: '/auto/interior-cleaner.jpg' },
  ],
  electronics: [
    { id: 601, name: 'Car Charger', price: 19.99, image: '/auto/charger.jpg' },
    { id: 602, name: 'Dash Cam', price: 89.99, image: '/auto/dashcam.jpg' },
  ],
  interior: [
    { id: 701, name: 'Memory Foam Lumbar Pillow', price: 29.99, image: '/auto/backrest.jpg' },
    { id: 702, name: 'Car Air Freshener', price: 14.99, image: '/auto/airfreshener.jpg' },
  ],
};

// Pet
export const petSubs = [
  { id: 'dogs', name: 'Dogs', icon: '🐶' },
  { id: 'cats', name: 'Cats', icon: '🐱' },
  { id: 'fish', name: 'Aquatic', icon: '🐠' },
  { id: 'smallpets', name: 'Small Pets', icon: '🐹' },
];

export const productsByPetSubCategory: Record<string, Product[]> = {
  dogs: [
    {
      id: 8,
      name: 'Rope Knot Toy',
      price: 9.99,
      image: '/1_2.jpg',
      images: ['/1_2.jpg', '/1_3.jpg'],
      description: 'Cute cherry-themed rope toy.',
      detailedDescription: 'Durable braided tug toy designed for medium and large dogs.',
    },
    { id: 802, name: 'Dog Food (Chicken)', price: 29.99, image: '/pet/dogfood.jpg' },
  ],
  cats: [
    { id: 901, name: 'Cat Scratcher', price: 15.99, image: '/pet/catscratch.jpg' },
    { id: 902, name: 'Cat Wand Toy', price: 5.99, image: '/pet/catwand.jpg' },
  ],
  fish: [{ id: 1001, name: 'Fish Food', price: 8.99, image: '/pet/fishfood.jpg' }],
  smallpets: [{ id: 1101, name: 'Hamster Wheel', price: 19.99, image: '/pet/hamsterwheel.jpg' }],
};

// Shoes
export const shoesSubs = [
  { id: 'sneakers', name: 'Sneakers', icon: '👟' },
  { id: 'boots', name: 'Boots', icon: '👢' },
  { id: 'sandals', name: 'Sandals', icon: '👡' },
  { id: 'formal', name: 'Formal', icon: '👞' },
];

export const productsByShoesSubCategory: Record<string, Product[]> = {
  sneakers: [
    { id: 1201, name: 'Lightweight Running Shoes', price: 79.99, image: '/shoes/running.jpg' },
    { id: 1202, name: 'Retro Skate Shoes', price: 69.99, image: '/shoes/skate.jpg' },
  ],
  boots: [
    { id: 1301, name: 'Martin Boots', price: 99.99, image: '/shoes/martin.jpg' },
    { id: 1302, name: 'Snow Boots', price: 89.99, image: '/shoes/uggs.jpg' },
  ],
  sandals: [{ id: 1401, name: 'Flip-Flops', price: 19.99, image: '/shoes/flipflop.jpg' }],
  formal: [{ id: 1501, name: 'Business Oxfords', price: 129.99, image: '/shoes/oxford.jpg' }],
};

// Muslim
export const muslimSubs = [
  { id: 'prayer', name: 'Prayer', icon: '🕌' },
  { id: 'clothing', name: 'Clothing', icon: '🧕' },
  { id: 'books', name: 'Books', icon: '📖' },
  { id: 'food', name: 'Halal Food', icon: '🥘' },
];

export const productsByMuslimSubCategory: Record<string, Product[]> = {
  prayer: [
    { id: 1601, name: 'Prayer Mat', price: 29.99, image: '/muslim/prayermat.jpg' },
    { id: 1602, name: 'Tasbih Beads', price: 12.99, image: '/muslim/tasbih.jpg' },
  ],
  clothing: [
    { id: 1701, name: 'Hijab', price: 24.99, image: '/muslim/hijab.jpg' },
    { id: 1702, name: 'Abaya', price: 49.99, image: '/muslim/abaya.jpg' },
  ],
  books: [{ id: 1801, name: 'Quran', price: 39.99, image: '/muslim/quran.jpg' }],
  food: [{ id: 1901, name: 'Halal Beef Sausage', price: 6.99, image: '/muslim/halalsausage.jpg' }],
};

// Cosmetics
export const cosmeticsSubs = [
  { id: 'face', name: 'Face', icon: '💄' },
  { id: 'eyes', name: 'Eyes', icon: '👁️' },
  { id: 'lips', name: 'Lips', icon: '💋' },
  { id: 'sets', name: 'Sets', icon: '🎁' },
];

export const productsByCosmeticsSubCategory: Record<string, Product[]> = {
  face: [
    { id: 2001, name: 'Foundation', price: 35.99, image: '/cosmetics/foundation.jpg' },
    { id: 2002, name: 'Concealer', price: 19.99, image: '/cosmetics/concealer.jpg' },
  ],
  eyes: [
    { id: 2101, name: 'Eyeshadow Palette', price: 45.99, image: '/cosmetics/eyeshadow.jpg' },
    { id: 2102, name: 'Eyeliner', price: 15.99, image: '/cosmetics/eyeliner.jpg' },
  ],
  lips: [
    { id: 2201, name: 'Lipstick', price: 29.99, image: '/cosmetics/lipstick.jpg' },
    { id: 2202, name: 'Lip Gloss', price: 24.99, image: '/cosmetics/lipgloss.jpg' },
  ],
  sets: [{ id: 2301, name: 'Makeup Set', price: 89.99, image: '/cosmetics/set.jpg' }],
};

// Skincare
export const skincareSubs = [
  { id: 'cleanser', name: 'Cleanser', icon: '🧼' },
  { id: 'toner', name: 'Toner', icon: '💧' },
  { id: 'moisturizer', name: 'Moisturizer', icon: '🧴' },
  { id: 'mask', name: 'Mask', icon: '🎭' },
];

export const productsBySkincareSubCategory: Record<string, Product[]> = {
  cleanser: [
    { id: 2401, name: 'Amino Acid Cleanser', price: 18.99, image: '/skincare/cleanser.jpg' },
    { id: 2402, name: 'Makeup Remover', price: 14.99, image: '/skincare/makeupremover.jpg' },
  ],
  toner: [
    { id: 2501, name: 'Hydrating Toner', price: 22.99, image: '/skincare/toner.jpg' },
    { id: 2502, name: 'Acne Care Toner', price: 19.99, image: '/skincare/acnetoner.jpg' },
  ],
  moisturizer: [
    { id: 2601, name: 'Moisturizing Cream', price: 32.99, image: '/skincare/moisturizer.jpg' },
    { id: 2602, name: 'Eye Cream', price: 27.99, image: '/skincare/eycream.jpg' },
  ],
  mask: [{ id: 2701, name: 'Sheet Mask (10 pcs)', price: 15.99, image: '/skincare/sheetmask.jpg' }],
};

// Unified map: sub categories by main category
export const subsMap: Record<string, { id: string; name: string; icon: string }[]> = {
  fashion: fashionSubs,
  auto: autoSubs,
  pet: petSubs,
  shoes: shoesSubs,
  muslim: muslimSubs,
  cosmetics: cosmeticsSubs,
  skincare: skincareSubs,
};

// Unified map: products by main category
export const productsMapByCategory: Record<string, Record<string, Product[]>> = {
  fashion: productsByFashionSubCategory,
  auto: productsByAutoSubCategory,
  pet: productsByPetSubCategory,
  shoes: productsByShoesSubCategory,
  muslim: productsByMuslimSubCategory,
  cosmetics: productsByCosmeticsSubCategory,
  skincare: productsBySkincareSubCategory,
};
