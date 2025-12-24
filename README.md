# 🛍️ NexCart - Modern E-Commerce Platform

A feature-rich, responsive e-commerce web application built with React, TypeScript, and PatternFly, featuring user authentication, dynamic product catalog, and stunning animated UI.

![NexCart Banner](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![PatternFly](https://img.shields.io/badge/PatternFly-6.4.0-06C?style=for-the-badge)
![Vite](https://img.shields.io/badge/Vite-7.2.5-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## ✨ Features

### 🔐 User Authentication
- **Login & Registration System** with form validation
- **Persistent Sessions** using localStorage
- **User Profile Management** with avatar display
- **Secure Logout** functionality
- Password visibility toggle and strength validation

### 🛒 E-Commerce Functionality
- **Product Catalog** with search and category filtering
- **Shopping Cart** with add/remove/update quantity
- **Product Details Modal** with full descriptions
- **Featured Products** section
- **Real-time Cart Badge** showing item count
- **Responsive Product Grid** layout

### 🎨 Stunning UI/UX
- **Animated Navigation Bar** with:
  - Gradient shifting background (8s infinite animation)
  - Rotating glow overlay effect
  - Brand hover effects with animated underline
  - Cart button rotation and pulse animation
  - Ripple effects on authentication buttons
  - Enhanced search focus states with glow
- **Modern Design** with gradient backgrounds and glassmorphism
- **Smooth Transitions** using cubic-bezier easing
- **Responsive Design** optimized for all screen sizes
- **Premium Color Palette** with vibrant gradients

### 📱 Pages & Routes
- **Home Page** (`/`) - Product catalog with hero section
- **Login Page** (`/login`) - User authentication
- **Registration Page** (`/register`) - New user signup
- **Cart Page** (`/cart`) - Shopping cart management

## 🚀 Tech Stack

### Frontend Framework
- **React 19.2.0** - Modern UI library
- **TypeScript 5.9.3** - Type-safe development
- **Vite** - Lightning-fast build tool
- **React Router DOM 7.11.0** - Client-side routing

### UI Components
- **PatternFly React 6.4.0** - Enterprise-grade component library
- **PatternFly Icons** - Comprehensive icon set
- **Custom CSS Animations** - Advanced keyframe animations

### Development Tools
- **ESLint** - Code quality and consistency
- **TypeScript ESLint** - TypeScript-specific linting
- **Vite Plugin React** - Fast refresh and JSX support

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/nexcart.git
cd nexcart
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:5173
```

## 🛠️ Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Preview production build
npm run preview
```

## 📁 Project Structure

```
nexcart/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ProductCard.tsx
│   │   ├── ProductModal.tsx
│   │   └── ShoppingCart.tsx
│   ├── pages/              # Page components
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   └── CartPage.tsx
│   ├── context/            # React Context providers
│   │   └── AuthContext.tsx
│   ├── data/               # Static data and types
│   │   └── products.ts
│   ├── App.tsx             # Main application component
│   ├── App.css             # Global styles and animations
│   └── main.tsx            # Application entry point
├── public/                 # Static assets
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite configuration
```

## 🎯 Key Highlights

### Advanced Animations
- **Gradient Shift**: Smooth color transitions across the navbar
- **Rotating Glow**: Subtle radial gradient overlay for depth
- **Slide-in Effects**: Staggered entrance animations for navbar elements
- **Hover Interactions**: Scale, rotate, and glow effects on all interactive elements
- **Pulse Animation**: Continuous badge pulsing for visual feedback

### Authentication Flow
1. User registers with name, email, and password
2. Credentials stored in localStorage (simulated backend)
3. Auto-login after successful registration
4. User data persists across page refreshes
5. Logout clears user session

### Responsive Design
- Mobile-first approach
- Breakpoints for tablets and desktops
- Flexible grid system
- Touch-friendly interface

## 🎨 Design Philosophy

NexCart follows modern web design principles:
- **Visual Hierarchy** - Clear information structure
- **Micro-interactions** - Delightful user feedback
- **Accessibility** - WCAG compliant components
- **Performance** - Optimized animations and rendering
- **Consistency** - Unified design language

## 🔮 Future Enhancements

- [ ] Backend API integration
- [ ] Payment gateway integration
- [ ] Order history and tracking
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Advanced search with filters
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Multi-language support
- [ ] Dark mode toggle

## 👨‍💻 Developer

**Developed by Sasidharan**

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 🙏 Acknowledgments

- [PatternFly](https://www.patternfly.org/) - For the amazing component library
- [React](https://react.dev/) - For the powerful UI framework
- [Vite](https://vitejs.dev/) - For the blazing-fast build tool

---

⭐ **Star this repository if you find it helpful!**

Made with ❤️ by Sasidharan
