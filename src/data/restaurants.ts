import { Restaurant } from '../types'

export const restaurants: Restaurant[] = [
  {
    id: 'r1',
    name: 'Nkoyo',
    tagline: 'Fine Nigerian dining. No compromises.',
    image: '/foods/jellof-rice-4.jpg',
    cuisine: ['Nigerian', 'Soups & Stews'],
    rating: 4.9, reviewCount: 1240,
    deliveryTime: { min: 25, max: 40 },
    deliveryFee: 800, minOrder: 3000,
    address: 'Victoria Island, Lagos',
    isOpen: true, isFeatured: true, isPopular: true,
    menu: [
      {
        id: 'mc1', name: 'Soups & Swallow', items: [
          { id: 'i1', name: 'Egusi Soup + Pounded Yam', description: 'Thick, well-ground egusi cooked with assorted meat, stockfish, and fresh ede. Comes with smooth pounded yam that holds its shape.', price: 4500, image: '/foods/egusi-pounded-yam.jpg', isPopular: true, tags: ['Bestseller'] },
          { id: 'i2', name: 'Efo Riro + Eba', description: 'Yoruba vegetable stew — shredded spinach, assorted meat, shrimp, and stockfish in a rich palm oil base. Smooth eba on the side.', price: 4200, image: '/foods/efo-riro.jpg', tags: ['Must Try'] },
          { id: 'i3', name: 'Amala + Gbegiri + Ewedu', description: 'The full Ibadan combination. Silky amala with gbegiri and ewedu — the real abula treatment. Comes with assorted meat.', price: 3800, image: '/foods/amala-abula.jpg' },
        ]
      },
      {
        id: 'mc2', name: 'Rice Dishes', items: [
          { id: 'i4', name: 'Party Jollof + Grilled Chicken', description: 'The smoky, well-seasoned jollof that only comes out right when cooked in a big pot. Grilled chicken and fried plantain on the side.', price: 4800, image: '/foods/jollof-chicken-1.jpg', isPopular: true, tags: ['Most Ordered'] },
          { id: 'i5', name: 'Full Party Platter', description: 'Party jollof, grilled chicken, fried plantain, sweet corn, and dinner rolls. For when you need to be fed properly.', price: 7500, image: '/foods/jollof-chicken-3.jpg', tags: ['Large Portion'] },
          { id: 'i6', name: 'Fried Rice + Chicken', description: 'Nigerian fried rice with carrots, green peas, and liver. Served with well-seasoned fried chicken.', price: 4200, image: '/foods/fried-rice-chicken.jpg' },
        ]
      },
    ],
  },
  {
    id: 'r2',
    name: 'Yellow Chilli',
    tagline: 'Where the pepper is never optional.',
    image: '/foods/chips-chicken.jpg',
    cuisine: ['Nigerian', 'Suya & Grills'],
    rating: 4.7, reviewCount: 3210,
    deliveryTime: { min: 20, max: 35 },
    deliveryFee: 600, minOrder: 2500,
    address: 'Victoria Island, Lagos',
    isOpen: true, isFeatured: true, isPopular: true,
    discount: '15% off orders above ₦5,000',
    menu: [
      {
        id: 'mc3', name: 'Grills & Sides', items: [
          { id: 'i7', name: 'Peppered Chicken + Yam + Plantain', description: 'Whole chicken pieces, crispy and coated in our house pepper mix. Yam fries, fried plantain, and a bowl of fresh pepper sauce for dipping.', price: 5500, image: '/foods/chips-chicken.jpg', isPopular: true, tags: ['Signature', 'Spicy'] },
          { id: 'i8', name: 'Beef Suya (500g)', description: 'Thin-sliced beef on skewers, heavily marinated in yaji spice mix, grilled over open flame. Sliced tomato and raw onion on the side.', price: 4500, image: '/foods/suya-1.jpg', isPopular: true, tags: ['Classic'] },
          { id: 'i9', name: 'Peppered Gizzard + Chips', description: 'Gizzard, well-cooked and then fried until the outside is slightly crispy. Tossed in pepper sauce, served with fries and dipping sauce.', price: 3200, image: '/foods/gizzard-chips.jpg' },
        ]
      },
    ],
  },
  {
    id: 'r3',
    name: 'Bukka Hut',
    tagline: 'Home food. Just not your home.',
    image: '/foods/efo-riro-eba.jpg',
    cuisine: ['Nigerian', 'Soups & Stews', 'Rice Dishes'],
    rating: 4.6, reviewCount: 5800,
    deliveryTime: { min: 15, max: 30 },
    deliveryFee: 500, minOrder: 1500,
    address: 'Multiple locations, Lagos',
    isOpen: true, isFeatured: false, isPopular: true,
    menu: [
      {
        id: 'mc4', name: "Today's Pot", items: [
          { id: 'i10', name: 'Efo Riro + Eba', description: 'Thick vegetable stew with assorted meat and stockfish. The eba is smooth enough to swallow without thinking too hard about it.', price: 2800, image: '/foods/efo-riro-eba.jpg', isPopular: true },
          { id: 'i11', name: 'Egusi + Pounded Yam', description: 'Classic egusi soup with cow meat, shaki, and dried fish. A generous portion of pounded yam on the side.', price: 3200, image: '/foods/egusi-pounded-yam.jpg' },
          { id: 'i12', name: 'Jollof Rice + Chicken', description: 'Everyday jollof — well-seasoned, properly cooked, no shortcuts. Comes with a piece of fried chicken.', price: 2500, image: '/foods/jellof-rice.jpg', tags: ['Quick'] },
          { id: 'i13', name: 'White Rice + Stew + Meat', description: 'Plain white rice with a well-seasoned Nigerian tomato stew and assorted meat. The reliable option.', price: 2200, image: '/foods/white-rice.jpg' },
        ]
      },
    ],
  },
  {
    id: 'r4',
    name: 'Suya Spot',
    tagline: 'Suya all day. No arguments.',
    image: '/foods/suya-3.jpg',
    cuisine: ['Suya & Grills', 'Nigerian'],
    rating: 4.8, reviewCount: 6400,
    deliveryTime: { min: 15, max: 25 },
    deliveryFee: 400, minOrder: 1500,
    address: 'Lekki Phase 1, Lagos',
    isOpen: true, isFeatured: true, isPopular: true,
    menu: [
      {
        id: 'mc5', name: 'Suya', items: [
          { id: 'i14', name: 'Beef Suya (300g)', description: 'The real thing — thin-sliced beef, coated in ground groundnuts and yaji, grilled on open coals. Sliced tomato, onion, and extra yaji on the side.', price: 3000, image: '/foods/suya-1.jpg', isPopular: true, tags: ['Bestseller'] },
          { id: 'i15', name: 'Suya Platter (500g)', description: 'A bigger order for sharing — or not. Same beef suya, double the portion, with extra garnish and yaji.', price: 4500, image: '/foods/suya-2.jpg', tags: ['Large'] },
          { id: 'i16', name: 'Chicken Suya', description: 'Chicken pieces marinated in yaji and grilled. Less common than beef suya, but just as good when done right.', price: 3500, image: '/foods/suya-4.jpg' },
          { id: 'i17', name: 'Mixed Suya (Beef + Chicken)', description: 'Half beef, half chicken suya on one plate. For when you cannot decide or simply need more.', price: 4000, image: '/foods/suya-5.jpg', isNew: true },
        ]
      },
    ],
  },
  {
    id: 'r5',
    name: 'The Place',
    tagline: 'Nigerian food done with intention.',
    image: '/foods/rice-meat-6.jpg',
    cuisine: ['Nigerian', 'Rice Dishes'],
    rating: 4.8, reviewCount: 2900,
    deliveryTime: { min: 30, max: 50 },
    deliveryFee: 900, minOrder: 4000,
    address: 'Gbagada, Lagos',
    isOpen: true, isFeatured: true, isPopular: false,
    menu: [
      {
        id: 'mc6', name: 'Rice & Mains', items: [
          { id: 'i18', name: 'Big Pot Jollof + Chicken', description: 'Large pot jollof rice with the smoky bottom crust everyone wants. Grilled chicken leg, no shortcuts.', price: 4500, image: '/foods/rice-meat-6.jpg', isPopular: true, tags: ['Fan Favourite'] },
          { id: 'i19', name: 'Fried Rice + Chicken + Coleslaw', description: 'Nigerian fried rice with carrots, green peas, green beans, and liver. Served with crispy chicken and fresh coleslaw.', price: 4200, image: '/foods/fried-rice-chicken.jpg' },
          { id: 'i20', name: 'Party Platter for 2', description: 'Jollof rice, grilled chicken, plantain, dinner rolls, and coleslaw. Enough for two people.', price: 8500, image: '/foods/jollof-chicken-3.jpg', tags: ['Sharing'] },
        ]
      },
    ],
  },
  {
    id: 'r6',
    name: 'Wrap & Roll',
    tagline: 'Shawarma the way Lagos makes it.',
    image: '/foods/shawama-3.jpg',
    cuisine: ['Shawarma', 'Fast Food'],
    rating: 4.5, reviewCount: 7600,
    deliveryTime: { min: 15, max: 30 },
    deliveryFee: 500, minOrder: 1500,
    address: 'Lekki Phase 1, Lagos',
    isOpen: true, isFeatured: false, isPopular: true,
    menu: [
      {
        id: 'mc7', name: 'Shawarma', items: [
          { id: 'i22', name: 'Chicken Shawarma (Large)', description: 'Properly loaded — grilled chicken, coleslaw, tomato, cucumber, onion, and garlic sauce in a warm toasted flatbread. The cheese pull is real.', price: 2800, image: '/foods/shawama-3.jpg', isPopular: true, tags: ['Cheesy'] },
          { id: 'i23', name: 'Beef Wrap (Large)', description: 'Seasoned minced beef with peppers, spring onions, tomatoes, and sauce wrapped tight in a toasted flatbread. Proper filling.', price: 3200, image: '/foods/shawama-2.jpg', isNew: true },
          { id: 'i24', name: 'Double Wrap Combo', description: 'One chicken shawarma and one beef wrap together. For when you cannot decide or simply need both.', price: 5500, image: '/foods/shawama.jpg', tags: ['Value', 'Combo'] },
        ]
      },
    ],
  },
  {
    id: 'r7',
    name: 'Noodles Tonight',
    tagline: 'Indomie grown up. Slightly.',
    image: '/foods/noodles-sausage.jpg',
    cuisine: ['Fast Food', 'Nigerian'],
    rating: 4.4, reviewCount: 4100,
    deliveryTime: { min: 10, max: 20 },
    deliveryFee: 350, minOrder: 1000,
    address: 'Yaba, Lagos',
    isOpen: true, isFeatured: false, isPopular: true,
    menu: [
      {
        id: 'mc8', name: 'Noodles', items: [
          { id: 'i25', name: 'Indomie + Sausage + Egg', description: 'Indomie stir-fried with sliced sausage, scrambled egg, carrots, peppers, and green vegetables. The kind that smells better than it has any right to.', price: 1800, image: '/foods/indomie-egg-2.jpg', isPopular: true, tags: ['Quick Fix'] },
          { id: 'i27', name: 'Nigerian Spaghetti + Meatballs', description: 'Stir-fried spaghetti with big seasoned meatballs, red and green bell peppers, carrots, and onions. Not Italian — Nigerian. Different thing entirely.', price: 2800, image: '/foods/assorted-1.jpg', isNew: true },
          { id: 'i28', name: 'Beef Noodles Stir Fry', description: 'Egg noodles tossed with tender beef chunks, sliced carrots, green and red pepper. Simple, filling, satisfying.', price: 2500, image: '/foods/noodles-beef.jpg' },
          { id: 'i29', name: 'Noodles + Sausage Special', description: 'Stir-fried noodles loaded with sausage slices, egg, spring onions, and peppers. A full meal in one bowl.', price: 2200, image: '/foods/noodles-sausage.jpg' },
        ]
      },
    ],
  },
  {
    id: 'r8',
    name: 'Burger Stack',
    tagline: 'No skimping. Ever.',
    image: '/foods/burger.jpg',
    cuisine: ['Fast Food'],
    rating: 4.6, reviewCount: 3200,
    deliveryTime: { min: 20, max: 35 },
    deliveryFee: 600, minOrder: 2000,
    address: 'Victoria Island, Lagos',
    isOpen: true, isFeatured: false, isPopular: true,
    menu: [
      {
        id: 'mc9', name: 'Burgers & Sides', items: [
          { id: 'i30', name: 'Double Smash Burger', description: 'Two smashed beef patties, melted cheddar dripping down the sides, caramelised onions, jalapeños, lettuce, tomato, and house sauce in a toasted sesame bun. Not a small burger.', price: 4500, image: '/foods/burger.jpg', isPopular: true, tags: ['Signature'] },
          { id: 'i31', name: 'Peppered Gizzard + Chips', description: 'Well-seasoned fried gizzard bites with a pile of crispy fries and a smoky pepper dipping sauce. The bar snack that became a meal.', price: 3000, image: '/foods/gizzard-chips.jpg', tags: ['Fan Favourite'] },
          { id: 'i32', name: 'Beef Shawarma', description: 'Seasoned minced beef with peppers, onions, spring onions, and sauce wrapped tight in a toasted flatbread. Heavier than the chicken — you will feel it.', price: 3000, image: '/foods/shawama-2.jpg' },
          { id: 'i33', name: 'Chicken Shawarma (Cheesy)', description: 'Grilled chicken, coleslaw, tomato, cucumber, onion, garlic sauce, and melted cheese pulled tight in a flatbread. The cheese pull is the best part.', price: 2800, image: '/foods/shawama-3.jpg' },
        ]
      },
    ],
  },
]

export const cuisineCategories = [
  { id: 'all',       label: 'All',           emoji: '🍽️' },
  { id: 'Nigerian',  label: 'Nigerian',       emoji: '🇳🇬' },
  { id: 'Suya',      label: 'Suya & Grills', emoji: '🔥' },
  { id: 'Rice',      label: 'Rice Dishes',   emoji: '🍚' },
  { id: 'Soups',     label: 'Soups',         emoji: '🥘' },
  { id: 'FastFood',  label: 'Fast Food',     emoji: '🍗' },
  { id: 'Shawarma',  label: 'Shawarma',      emoji: '🌯' },
  { id: 'Noodles',   label: 'Noodles',       emoji: '🍜' },
]
