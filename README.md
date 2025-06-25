Rugby Barnacle Front-End Markdown

<img src=“Rugly_Barncale_Logo” alt=“”/> 
# Rugly Barnacle 
## Start Date: May 20th 2025
## Projected End Date:

# ℹ️ About the Business

Rugby Barnacle is a LGBTQ+ business that sells custom and premade handcrafted tufted rugs.
Custom orders are made to order while premade rugs can be bought as long as stock is available.
It started in the small home of Emilie Cruz, during 2023. While wondering what to do she decided to begin the hobby of tufting handcrafted rugs.
She now makes a variety of tufted products from coasters, mirrors, bath rugs, wall rugs, and more.

**For the remainder of this markdown, Rugly Barnacle will be referred to as RB**

### **Client Needs**

- Site should include Cart, Checkout, Gallery, Shop, About, Landing, Custom Orders, Contact, Footer, and Nav.
- Site should contain a database that can access, edited, delete, and view products for owner.
- Site should be inviting and have plenty of CTA opportunities.
- Site will have a custom domain.

### **As A User**

- AAU I should be greeted with a landing page.
- AAU I should have the ability to navigate the website immediately, via a navigation system.
- AAU I should the ability to begin a custom order whenever.
- AAU I should be able to learn more about the business.
- AAU I would like to view past and current in stock rugs.
- AAU I want to have a place to view, edit, and delete my items.
- AAU I want to be able to purchase on the site.
- AAU I want to have access to several questions about the product, service and business.
- AAU I want to be able to contact the business for any inquiries

# ℹ️ Web App Details

### Tech Stack

- **Language**: Typescript
- **Framework**: React / Vite
- **Styling**: Tailwind and CSS
- **Payments**: Stripe

### Features

- API Fetching
- Dark/ Light Mode
- Mobile-first Design
- Checkout with Stripe
- State Management
- Custom Components
- Accessibility

### Routes

- “/” - Home
- “/about” - About
- “/gallery” - Gallery
- “/cart” - Cart
- “/checkout” - Checkout
- “/shop” - Shop
- “/shop/<item_id” - Individual Item Preview
- “/faq” - FAQ

<details>
  <summary><strong>📁 File Structure</strong></summary>

```bash
src/
├── app/
│   ├── (auth)/                     # Auth-related routes (login, signup)
│   │   ├── login/
│   │   │   └── page.js
│   │   └── signup/
│   │       └── page.js
│   ├── (marketing)/                # Public pages (home, about, contact)
│   │   ├── page.js                 # Homepage
│   │   ├── about/
│   │   │   └── page.js
│   │   └── contact/
│   │       └── page.js
│   ├── (shop)/                     # Product-related routes
│   │   ├── products/
│   │   │   ├── page.js             # Product listing
│   │   │   └── [slug]/
│   │   │       └── page.js         # Single product page
│   │   ├── categories/
│   │   │   └── [category]/
│   │   │       └── page.js         # Category filter
│   │   └── search/
│   │       └── page.js             # Search results
│   ├── cart/
│   │   └── page.js                 # Shopping cart
│   ├── checkout/
│   │   ├── page.js                 # Checkout steps
│   │   └── success/
│   │       └── page.js             # Order success
│   ├── account/                    # User dashboard
│   │   ├── orders/
│   │   │   └── page.js
│   │   └── settings/
│   │       └── page.js
│   ├── api/                        # API routes (Stripe, cart actions)
│   │   ├── cart/
│   │   │   └── route.js
│   │   └── checkout/
│   │       └── route.js
│   ├── layout.js                   # Root layout
│   └── template.js                 # Reusable templates (e.g., product grid)
├── components/
│   ├── ui/                         # Reusable UI (buttons, modals)
│   ├── product/                    # Product cards, gallery
│   ├── cart/                       # Cart components
│   └── checkout/                   # Checkout steps UI
├── lib/
│   ├── db.js                       # Database connection
│   ├── stripe.js                   # Stripe payment logic
│   └── utils.js                    # Helper functions
├── public/
│   ├── products/                   # Product images
│   └── assets/                     # Logos, icons
├── styles/
│   ├── globals.css                 # Global styles
│   └── components/                 # Component-specific CSS
├── middleware.js                   # Auth & route protection
└── package.json
```

</details>

## Design

### Overall Design

<img src=“Entire_Figma_map” alt=“”/>

### Color Pallette:

2. <span> #FEB5FF</span>
3. <span> #5652E7</span>
4. <span> #202254</span>
5. <span> #114C56</span>
6. <span> #00CEC5</span>
7. <span> #9EECE2</span>
8. <span> #F0F0F1</span>
9. <span> #F27B63</span>

### Components & Buttons

<img src=“Button_name” alt="" />
### Desktop
### Mobile

## Properties & Services

- All Logos used are not properties of Rugly Barnacle. This includes but not limited to…
  - Social Media Logos (Instagram, Tiktok and Facebook)
  - Payments Logo ( AMEX, Mastercard, VISA, Discover, etc)
- Stripe Payments
- SVG icons
