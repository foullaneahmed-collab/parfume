# 🌸 Essence - Luxury Perfume E-Commerce

A modern, elegant, and fully responsive e-commerce website for luxury perfumes built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.0-ff0055)

## ✨ Features

### 🎨 Design & UI

- **Modern & Elegant Design** - Minimalist luxury aesthetic inspired by premium brands like Dior and Chanel
- **Fully Responsive** - Optimized for mobile, tablet, and desktop devices
- **Dark Mode** - Seamless theme switching with persistent preferences
- **Smooth Animations** - Beautiful Framer Motion animations throughout the site
- **Micro-interactions** - Hover effects, transitions, and delightful user feedback

### 🛍️ E-Commerce Features

- **Product Catalog** - Browse men's and women's perfumes
- **Category Filtering** - Filter products by gender category
- **Product Sorting** - Sort by price (low to high, high to low) or featured
- **Shopping Cart** - Full cart management with Zustand state management
- **Quantity Controls** - Add, remove, and adjust product quantities
- **WhatsApp Integration** - Send orders directly via WhatsApp

### 🚀 Technical Features

- **Next.js 14 App Router** - Latest Next.js features with optimized routing
- **TypeScript** - Full type safety throughout the application
- **Zustand State Management** - Lightweight and efficient global state
- **Persistent Cart** - Cart data persists across sessions
- **SEO Optimized** - Meta tags and semantic HTML for better search rankings
- **Loading Screen** - Animated brand reveal on initial load
- **Next/Image Optimization** - Automatic image optimization and lazy loading

## 📦 Installation

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Setup Steps

1. **Clone or download the project**

```bash
cd parfume
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Configure WhatsApp Number**

   Open `src/app/cart/page.tsx` and replace the phone number on line 29:

   ```typescript
   const phoneNumber = "1234567890"; // Replace with your WhatsApp number
   ```

   Format: Country code + number (no + or spaces)
   Example: `923001234567` for Pakistan

4. **Run the development server**

```bash
npm run dev
# or
yarn dev
```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
parfume/
├── src/
│   ├── app/
│   │   ├── cart/
│   │   │   └── page.tsx          # Cart page with WhatsApp integration
│   │   ├── products/
│   │   │   └── page.tsx          # Products listing with filters
│   │   ├── globals.css           # Global styles
│   │   ├── layout.tsx            # Root layout with fonts and theme
│   │   ├── page.tsx              # Home page
│   │   └── providers.tsx         # Theme provider wrapper
│   ├── components/
│   │   ├── CategorySection.tsx   # Men/Women category cards
│   │   ├── FeaturedProducts.tsx  # Featured products section
│   │   ├── Footer.tsx            # Site footer
│   │   ├── HeroSection.tsx       # Homepage hero
│   │   ├── LoadingScreen.tsx     # Initial loading animation
│   │   ├── Navbar.tsx            # Navigation with cart count
│   │   ├── Newsletter.tsx        # Newsletter subscription
│   │   └── ProductCard.tsx       # Reusable product card
│   ├── data/
│   │   └── products.ts           # Product data
│   └── store/
│       └── cartStore.ts          # Zustand cart state management
├── public/                       # Static assets
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

## 🎯 Key Components

### Cart Management (Zustand)

The cart uses Zustand for state management with local storage persistence:

- Add/remove items
- Update quantities
- Calculate totals
- Persist across sessions

### WhatsApp Integration

Orders are sent via WhatsApp Web API with pre-formatted messages containing:

- Product names and quantities
- Individual prices
- Total amount
- Professional formatting

### Responsive Navigation

- Desktop: Full horizontal menu with dark mode toggle
- Mobile: Hamburger menu with smooth animations
- Cart icon with live item count badge

## 🎨 Customization

### Colors

Edit `tailwind.config.ts` to change the color scheme:

```typescript
colors: {
  primary: {
    // Your custom colors
  }
}
```

### Products

Add/edit products in `src/data/products.ts`:

```typescript
{
  id: 'unique-id',
  name: 'Product Name',
  description: 'Product description',
  price: 99.99,
  image: 'image-url',
  category: 'men' | 'women',
  size: '50ml'
}
```

### Fonts

The project uses:

- **Inter** - Body text
- **Playfair Display** - Headings and display text

Change fonts in `src/app/layout.tsx`

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project to [Vercel](https://vercel.com)
3. Deploy automatically

### Build for Production

```bash
npm run build
npm start
```

## 📱 Features by Page

### Home Page (`/`)

- Animated hero section with CTA buttons
- Category showcase (Men/Women)
- Featured products grid
- Newsletter subscription

### Products Page (`/products`)

- All products with filtering
- Category filter buttons (All/Women/Men)
- Sort by price functionality
- Add to cart with animation feedback

### Cart Page (`/cart`)

- Cart items with images and details
- Quantity adjustment controls
- Order summary with totals
- WhatsApp order button
- Empty state with CTA

## 🛠️ Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Zustand** - State management
- **next-themes** - Dark mode implementation
- **React Hook Form** - Form validation

## 📄 License

This project is open source and available for personal and commercial use.

## 🤝 Support

For issues or questions, please open an issue in the repository.

---

**Built with ❤️ using Next.js 14**

Enjoy building your perfume store! 🌸✨
