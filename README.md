# Wiston Group E-Commerce Platform

A modern, full-featured e-commerce platform for selling premium computer components and hardware. Built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**.

## Overview

Wiston Group is a B2B e-commerce solution specializing in high-quality computer components at competitive prices. The platform features a comprehensive product catalog, interactive shopping cart, secure checkout process, and an admin dashboard for business management.

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) - React 19
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) with custom shadcn/ui components
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) validation
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Authentication**: Custom auth provider with session management
- **Icons**: [Lucide React](https://lucide.dev/)
- **Utilities**: clsx, tailwind-merge, date-fns, recharts

## Features

### Customer-Facing Features

- **Product Catalog**
  - Browse all computer components and hardware
  - Filter by category, subcategory, and brand
  - Search products with real-time results
  - Product detail pages with specifications and related items
  - Featured products and weekly specials on homepage

- **Shopping Experience**
  - Interactive shopping cart with real-time updates
  - Add/remove items and adjust quantities
  - Quick cart view in header dropdown
  - Authentication-based pricing visibility
  - Shopping cart sidebar for mobile

- **User Authentication**
  - Customer registration and login
  - User profile management
  - Persistent session management
  - Company information and billing address storage
  - Password management

- **Checkout & Orders**
  - Secure checkout process
  - Order form with customer information
  - Tax calculation (8% default)
  - Order history and tracking
  - Customer service contact options

- **Information Pages**
  - About Us - Company mission and values
  - Contact Us - Multiple contact methods and embedded Google Map
  - Privacy Policy - GDPR and data protection information
  - Terms of Use - Legal terms and conditions
  - New Customer Sign Up - Account creation requirements

- **Brand & Community**
  - Brand showcase and partner logos
  - Customer testimonials
  - Weekly promotions and deals

### Admin Features

- **Admin Dashboard**
  - Secure admin authentication (`@admin.com` email required)
  - Automatic logout after 20 minutes of inactivity
  - Complete CRUD operations for:
    - Products (add, edit, delete, manage inventory)
    - Customers (manage accounts and information)
    - Sales (view orders and transaction history)
    - RMA (Return Merchandise Authorization) management

- **Data Management**
  - Real-time product inventory tracking
  - Customer relationship management
  - Sales analytics and reporting
  - RMA tracking and processing

## Project Structure

```
├── app/
│   ├── (admin)/           # Admin routes with authentication
│   │   ├── admin/
│   │   │   ├── customers/
│   │   │   ├── products/
│   │   │   ├── sales/
│   │   │   ├── rmas/
│   │   │   └── dashboard/
│   │   └── login/
│   ├── (site)/            # Public site routes
│   │   ├── products/      # Product listing and search
│   │   ├── product/[id]/  # Product details
│   │   ├── cart/          # Shopping cart
│   │   ├── checkout/      # Order checkout
│   │   ├── profile/       # User profile
│   │   ├── about/         # About page
│   │   ├── contact/       # Contact page
│   │   ├── privacy/       # Privacy policy
│   │   ├── terms/         # Terms of use
│   │   └── newsignup/     # New customer signup
│   └── page.tsx           # Homepage
├── components/
│   ├── ui/                # Reusable Radix UI components
│   ├── site/              # Site-specific components
│   ├── cart/              # Shopping cart components
│   ├── auth-provider.tsx  # Authentication context
│   ├── cart-provider.tsx  # Cart state management
│   ├── category-sidebar.tsx
│   ├── product-card.tsx
│   ├── product-detail-content.tsx
│   └── related-products.tsx
├── lib/
│   ├── products.ts        # Product utilities and categories
│   └── utils.ts           # Common utilities
├── types/
│   ├── customer.ts
│   ├── products.ts
│   ├── sales.ts
│   ├── rma.ts
│   └── rmaitems.ts
├── utils/
│   ├── supabase/          # Database utilities
│   └── general.ts
├── data/
│   └── products.ts        # Product data
├── styles/
│   └── globals.css
└── public/                # Static assets
```

## Key Components

### Authentication

- **AuthProvider**: Manages user session, login/logout, profile updates
- **Session persistence**: Stores user data in localStorage
- **Protected routes**: Checkout and profile pages require authentication

### Shopping Cart

- **CartProvider**: Global state management using React Context
- **Persistent cart**: Maintains items across sessions
- **Real-time calculations**: Auto-calculates subtotal, tax, and total

### Product Management

- **Category filtering**: Browse by category and subcategory
- **Product search**: Full-text search across product names and descriptions
- **Related products**: Automatically shows similar items based on category
- **Product specifications**: Detailed specs displayed on product pages

### Layout

- **Responsive sidebar**: Category navigation on desktop, mobile-friendly menu on small screens
- **Header with search**: Integrated search bar with dropdown results
- **Dynamic footer**: Contact information and social links

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn or pnpm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd next15-wistongroup

# Install dependencies
pnpm install
# or
npm install
# or
yarn install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Running Locally

```bash
# Start development server
pnpm dev
# or
npm run dev

# Open http://localhost:3000
```

### Building for Production

```bash
# Build optimized bundle
pnpm build

# Start production server
pnpm start
```

## Database Schema

The project uses Supabase with the following main tables:

- **products**: Computer components catalog
- **customers**: Customer accounts and information
- **sales**: Order records
- **rma**: Return merchandise authorization requests
- **rma_items**: Individual items in RMA requests

## Styling

- **Framework**: Tailwind CSS 4 with custom configuration
- **UI Library**: shadcn/ui (Radix UI based components)
- **Animation**: Tailwind CSS animations with custom extensions
- **Responsive Design**: Mobile-first approach with breakpoints
- **Dark Mode**: Theme provider with next-themes support

## Performance Optimizations

- **Image optimization**: Next.js Image component with lazy loading
- **Code splitting**: Automatic route-based code splitting
- **Server components**: Strategic use of Server/Client components
- **Suspense boundaries**: Loading states for async operations
- **CSS-in-JS**: Tailwind CSS for minimal runtime overhead

## Authentication Flow

1. User registers or logs in through the login interface
2. Session token stored in localStorage
3. AuthProvider manages user state globally
4. Protected routes check authentication before rendering
5. Automatic session management with configurable timeout
6. Admin routes require `@admin.com` email pattern

## Shopping Flow

1. User browses products via categories or search
2. Adds items to cart
3. Reviews cart with real-time price calculations
4. Proceeds to checkout (requires login)
5. Fills customer information
6. Completes order
7. Order history available in user profile

## Development Guidelines

### Component Conventions

- Use TypeScript for type safety
- Functional components with hooks
- Client components marked with `'use client'`
- Props interfaces defined in component files
- Shadcn/ui components for consistent styling

### Form Handling

- React Hook Form for form state
- Zod for schema validation
- Error messages and validation feedback
- Loading states during submission

### Code Organization

- Components grouped by feature
- Utilities separated from business logic
- Types defined in dedicated type files
- Reusable logic in custom hooks

## Support & Contact

- **Email**: info@wistongroup.com
- **Phone**: (888) 822-0008
- **Address**: 713 Brea Canyon Road, Walnut, CA 91789
- **Hours**: Mon-Fri, 9:00 AM - 6:00 PM EST

## License

Private project for Wiston Group, Inc.

---

**Built with ❤️ for Wiston Group**
