# Portfolio Website - Next.js

Portfolio website modern dengan animasi canggih menggunakan **Next.js 14**, **Framer Motion**, dan **Tailwind CSS**.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm build

# Start production server
npm start
```

Server akan berjalan di **http://localhost:3000**

## ✨ Fitur

✅ **Hero Section** - Intro yang stunning dengan animasi floating elements
✅ **Skills Showcase** - Interactive skill cards dengan hover effects
✅ **Projects Gallery** - Portfolio projects dengan stats dan tags
✅ **Contact Form** - Form kontak interaktif dengan validasi
✅ **Smooth Animations** - Framer Motion animations di setiap elemen
✅ **Glass Morphism** - Modern glassmorphic UI design
✅ **Dark Mode** - Gradien background yang elegan
✅ **Responsive Design** - Mobile-first approach
✅ **Performance** - Optimized dengan Next.js best practices

## 🎨 Struktur Project

```
portfolio/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── Hero.tsx            # Hero section
│   ├── Skills.tsx          # Skills section
│   ├── Projects.tsx        # Projects gallery
│   └── Contact.tsx         # Contact section
├── styles/
│   └── globals.css         # Custom CSS
├── public/                 # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## 🎭 Animasi

- **Hero**: Fade in, slide up, floating elements
- **Skills**: Stagger cards, hover effects, glow
- **Projects**: Smooth transitions, scale on hover
- **Contact**: Form input focus effects, success message

## 🛠 Teknologi

- **Next.js 14** - React framework dengan SSR
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Advanced animations
- **React 18** - Latest React features

## 📝 Customization

### Edit Data
- **Skills**: Buka `components/Skills.tsx` → Edit `skillsData`
- **Projects**: Buka `components/Projects.tsx` → Edit `projectsData`
- **Hero**: Buka `components/Hero.tsx` → Edit text & links

### Edit Warna
- Buka `tailwind.config.ts`
- Ubah color palette di section `extend.colors`

### Edit Animasi
- Buka component mana pun
- Modify `variants` dan `transition` properties

## 📱 Sections

### 1. Hero Section
- Greeting dengan gradient text
- Call-to-action buttons
- Floating illustration dengan emoji
- Scroll indicator

### 2. Skills Section
- 4 kategori skills (Frontend, Backend, Tools, Soft Skills)
- Card dengan hover animation
- Dynamic skill list

### 3. Projects Section
- 4 featured projects
- Project stats (users, downloads, etc)
- Technology tags
- Hover reveal button

### 4. Contact Section
- Contact info cards
- Email form dengan validasi
- Success message animation

## 🚀 Deploy

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Deploy 'out' folder
```

### Docker
```bash
docker build -t portfolio .
docker run -p 3000:3000 portfolio
```

## 📊 Performance

- Lighthouse Score: 90+
- SEO Optimized
- Image Optimization
- Minimal Bundle Size

## 🔐 Security

- XSS Protection via React
- CSRF Protection ready
- Content Security Policy compatible

## 📧 Contact Form

Form mengirim ke console (untuk production, setup backend):
```javascript
// Di components/Contact.tsx
const handleSubmit = (e) => {
  e.preventDefault()
  // Setup backend API call here
  console.log(formData)
}
```

## 🎯 Roadmap

- [ ] Dark/Light mode toggle
- [ ] Blog section
- [ ] Case studies
- [ ] Client testimonials
- [ ] Analytics integration
- [ ] Multi-language support

## 📄 License

MIT License - Feel free to use this template!

## 🙏 Credits

- Framer Motion - Animation library
- Tailwind CSS - Styling
- Next.js - React framework

---

**Made with ❤️ using Next.js & Tailwind CSS**

Visit: **http://localhost:3000**
