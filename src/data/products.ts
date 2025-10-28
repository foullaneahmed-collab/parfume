import { Product } from "@/store/cartStore";

export const products: Product[] = [
  // Women's Perfumes
  {
    id: "w1",
    name: "Velvet Rose",
    description: "An elegant blend of rose petals and warm vanilla",
    price: 899,
    image:
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=500&q=80",
    category: "women",
    size: "50ml",
    sizes: [
      { ml: 50, price: 899 },
      { ml: 75, price: 1199 },
      { ml: 100, price: 1499 },
      { ml: 200, price: 2499 },
    ],
  },
  {
    id: "w2",
    name: "Midnight Jasmine",
    description: "Sensual jasmine with hints of sandalwood",
    price: 959,
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&q=80",
    category: "women",
    size: "50ml",
    sizes: [
      { ml: 50, price: 959 },
      { ml: 75, price: 1299 },
      { ml: 100, price: 1599 },
      { ml: 200, price: 2699 },
    ],
  },
  {
    id: "w3",
    name: "Silk Gardenia",
    description: "Fresh gardenia blooms with a touch of citrus",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=500&q=80",
    category: "women",
    size: "50ml",
    sizes: [
      { ml: 50, price: 799 },
      { ml: 75, price: 1099 },
      { ml: 100, price: 1399 },
      { ml: 200, price: 2299 },
    ],
  },
  {
    id: "w4",
    name: "Pearl Magnolia",
    description: "Delicate magnolia petals and white musk",
    price: 929,
    image:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500&q=80",
    category: "women",
    size: "50ml",
    sizes: [
      { ml: 50, price: 929 },
      { ml: 75, price: 1249 },
      { ml: 100, price: 1549 },
      { ml: 200, price: 2599 },
    ],
  },
  {
    id: "w5",
    name: "Crystal Peony",
    description: "Light and airy peony with soft amber",
    price: 879,
    image:
      "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=500&q=80",
    category: "women",
    size: "50ml",
    sizes: [
      { ml: 50, price: 879 },
      { ml: 75, price: 1179 },
      { ml: 100, price: 1479 },
      { ml: 200, price: 2449 },
    ],
  },
  {
    id: "w6",
    name: "Golden Orchid",
    description: "Exotic orchid with warm honey undertones",
    price: 999,
    image:
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=500&q=80",
    category: "women",
    size: "50ml",
    sizes: [
      { ml: 50, price: 999 },
      { ml: 75, price: 1349 },
      { ml: 100, price: 1699 },
      { ml: 200, price: 2849 },
    ],
  },

  // Men's Perfumes
  {
    id: "m1",
    name: "Noir Intense",
    description: "Bold and masculine with notes of leather and tobacco",
    price: 1059,
    image:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500&q=80",
    category: "men",
    size: "75ml",
    sizes: [
      { ml: 50, price: 959 },
      { ml: 75, price: 1259 },
      { ml: 100, price: 1559 },
      { ml: 200, price: 2699 },
    ],
  },
  {
    id: "m2",
    name: "Ocean Breeze",
    description: "Fresh aquatic scent with bergamot and sea salt",
    price: 859,
    image:
      "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=500&q=80",
    category: "men",
    size: "75ml",
    sizes: [
      { ml: 50, price: 759 },
      { ml: 75, price: 1059 },
      { ml: 100, price: 1359 },
      { ml: 200, price: 2299 },
    ],
  },
  {
    id: "m3",
    name: "Cedarwood Elite",
    description: "Warm cedarwood with spicy cardamom",
    price: 989,
    image:
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=500&q=80",
    category: "men",
    size: "75ml",
    sizes: [
      { ml: 50, price: 889 },
      { ml: 75, price: 1189 },
      { ml: 100, price: 1489 },
      { ml: 200, price: 2499 },
    ],
  },
  {
    id: "m4",
    name: "Amber Noir",
    description: "Rich amber and dark vanilla with leather",
    price: 1109,
    image:
      "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=500&q=80",
    category: "men",
    size: "75ml",
    sizes: [
      { ml: 50, price: 1009 },
      { ml: 75, price: 1309 },
      { ml: 100, price: 1609 },
      { ml: 200, price: 2799 },
    ],
  },
  {
    id: "m5",
    name: "Urban Legend",
    description: "Modern citrus blend with woody base notes",
    price: 899,
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&q=80",
    category: "men",
    size: "75ml",
    sizes: [
      { ml: 50, price: 799 },
      { ml: 75, price: 1099 },
      { ml: 100, price: 1399 },
      { ml: 200, price: 2349 },
    ],
  },
  {
    id: "m6",
    name: "Midnight Oak",
    description: "Deep oak wood with smoky vetiver",
    price: 1159,
    image:
      "https://images.unsplash.com/photo-1592428122543-367174fc6292?w=500&q=80",
    category: "men",
    size: "75ml",
    sizes: [
      { ml: 50, price: 1059 },
      { ml: 75, price: 1359 },
      { ml: 100, price: 1659 },
      { ml: 200, price: 2899 },
    ],
  },
];

export const featuredProducts = products.slice(0, 6);
