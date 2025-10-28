# 🚀 Quick Setup Guide

Follow these steps to get your Essence perfume store up and running:

## 1️⃣ Install Dependencies

```bash
npm install
```

## 2️⃣ Configure WhatsApp

Open `src/app/cart/page.tsx` and find line 29:

```typescript
const phoneNumber = "1234567890"; // Replace with your WhatsApp number
```

Replace `1234567890` with your WhatsApp number in international format:

- **Format**: Country code + number (no + or spaces)
- **Example for US**: `12025551234`
- **Example for UK**: `447700900123`
- **Example for Pakistan**: `923001234567`

## 3️⃣ Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 4️⃣ Customize Your Store

### Add Products

Edit `src/data/products.ts` to add/modify products:

```typescript
{
  id: 'unique-id',
  name: 'Product Name',
  description: 'Product description',
  price: 99.99,
  image: 'https://images.unsplash.com/photo-...',
  category: 'women', // or 'men'
  size: '50ml'
}
```

### Change Colors

Edit `tailwind.config.ts` to customize the color scheme:

```typescript
colors: {
  primary: {
    50: '#fdf8f6',
    // ... add your colors
  }
}
```

### Update Brand Name

Replace "Essence" throughout the codebase with your brand name:

- `src/components/Navbar.tsx`
- `src/components/Footer.tsx`
- `src/components/LoadingScreen.tsx`
- `src/app/layout.tsx` (metadata)

## 5️⃣ Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Click "Deploy"

Your site will be live in minutes! 🎉

## 📱 Testing WhatsApp Integration

1. Add products to cart
2. Go to cart page
3. Click "Order via WhatsApp"
4. Should open WhatsApp with pre-filled message
5. Verify the message format and details

## 🎨 Design Customization Tips

- **Logo**: Add your logo image to `public/` folder
- **Fonts**: Change in `src/app/layout.tsx`
- **Images**: Use Unsplash or your own product images
- **Animations**: Adjust Framer Motion settings in components

## 🐛 Troubleshooting

### Dark mode not working

- Clear browser cache
- Check if system preferences are overriding

### Cart not persisting

- Check browser local storage
- Try incognito mode to test fresh

### WhatsApp not opening

- Verify phone number format (no spaces, + or -)
- Test on different devices/browsers

## 📞 Need Help?

- Check README.md for detailed documentation
- Open an issue on GitHub
- Review component files for inline comments

---

Happy selling! 🌸✨
