# First Physio Website - Project Structure Documentation

**Last Updated:** February 2, 2026  
**Project:** First Physio - Physiotherapy Clinic Website  
**Domain:** firstphysio.in (GoDaddy) → Deployed on Cloudflare Pages  
**Developer:** Full-stack Expert Documentation

---

## 📁 PROJECT STRUCTURE

```
First-Physio-/
├── index.html                  # Homepage with hero, services preview, body diagram
├── about.html                  # About Dr. Augustine Joseph, clinic story
├── services.html               # Comprehensive services listing
├── programs.html               # Treatment programs offered
├── conditions.html             # Conditions treated with body diagram
├── contact.html                # Contact form, map, info
├── blog.html                   # Blog listing page
├── blog-exercising-the-right-way.html
├── blog-physiotherapy-isnt-luxury.html
├── back-pain.html             # Condition-specific pages
├── neck-pain.html
├── shoulder-pain.html
├── knee-pain.html
├── hip-pain.html
├── sports-injuries.html
│
├── css/
│   ├── styles.css             # Main stylesheet (2299 lines)
│   └── pages.css              # Page-specific styles
│
├── js/
│   └── main.js                # All JavaScript functionality (579 lines)
│
├── images/
│   ├── logo.jpg               # Primary logo (used as favicon too)
│   ├── body-front.png         # Interactive diagram - front view
│   ├── body-back.png          # Interactive diagram - back view
│   ├── doc picture.avif       # Doctor photo
│   ├── dr-augustine-joseph-first-physio-*.avif
│   └── [condition]-pain-bg.png  # Hero backgrounds for each condition
│
├── robots.txt                 # SEO - search engine directives
├── sitemap.xml                # SEO - all pages indexed
├── wrangler.jsonc             # Cloudflare Pages configuration
├── llms.txt                   # AI context file
└── .git/                      # Version control
```

---

## 🎨 DESIGN SYSTEM

### **Color Palette**
- **Primary Blue:** `#1E4A8E` - Professional, medical trust
- **Primary Orange:** `#E85D04` - Energy, warmth, action
- **Dark Theme (Default):**
  - Background: `#0B1120`
  - Cards: `#1a2332`
  - Text: `#FFFFFF` / `#94A3B8` / `#64748B`
- **Light Theme:** Toggle-able via theme button

### **Typography**
- **Headings:** 'Playfair Display', serif (elegant, professional)
- **Body:** 'Inter', sans-serif (modern, readable)

### **Responsive Breakpoints**
- Desktop: > 1024px
- Tablet: 768px - 1024px
- Large Mobile: 640px - 768px
- Mobile: < 640px
- Small Mobile: < 480px

---

## 🧩 KEY FEATURES

### **1. Navigation**
- Fixed header with scroll effect
- Mobile hamburger menu (slide-in)
- Theme toggle (light/dark)
- "Book Appointment" button in nav

### **2. Interactive Body Diagram**
- Front & back views side-by-side
- Clickable pain points with hover tooltips
- Links to condition-specific pages
- Responsive: stacks vertically on mobile

### **3. Practo Booking Integration**
- **Widget ID:** `8d151b927b32437d`
- **How it works:**
  1. Hidden `<practo:abs_widget>` element at bottom of each page
  2. Practo script loads: `abs_widget_helper.js`
  3. Custom buttons (`.book-appointment-btn`) trigger widget via JS
  4. Opens modal overlay for booking
- **Implementation:** All "Book Appointment" buttons call `triggerPractoWidget()` function in main.js

### **4. Contact Form**
- Integration: Web3Forms API
- Success modal popup after submission
- Fields: Name, Email, Phone, Message
- Form ID: `contact-form`

### **5. Animations**
- Intersection Observer for scroll animations
- Counter animation for stats (15+, 80,000+, 20+)
- Parallax effect on gradient orbs background
- Smooth scroll for anchor links

### **6. SEO & Performance**
- **Meta Tags:** Full Open Graph, Twitter Cards
- **Schema.org:** LocalBusiness structured data
- **Canonical URLs:** All pages
- **Lazy Loading:** Images with IntersectionObserver
- **Font Preconnect:** Google Fonts optimization
- **AVIF Images:** Modern format for doctor photos

---

## 🔧 TECHNICAL IMPLEMENTATION

### **JavaScript Architecture (main.js)**

#### Core Modules:
1. **Mobile Navigation** (lines 7-47)
   - Hamburger menu toggle
   - Close on outside click
   - Escape key to close

2. **Header Scroll Effect** (lines 49-68)
   - Adds `.scrolled` class at 50px
   - Changes background opacity

3. **Theme Toggle** (lines 70-87)
   - localStorage persistence
   - Data attribute: `[data-theme="light"]`

4. **Smooth Scroll** (lines 89-110)
   - All anchor links (#)
   - Offset for fixed header

5. **Practo Booking Handler** (lines 206-241)
   - `initPractoBooking()` - Attaches click listeners
   - `triggerPractoWidget()` - Finds and clicks hidden Practo widget
   - Selector: `.book-appointment-btn, .practo-trigger, [data-practo-trigger]`

6. **Form Handling** (lines 243-289)
   - Web3Forms API integration
   - Success modal display
   - Error handling with timeout

7. **Testimonials Carousel** (lines 454-525)
   - Prev/Next navigation
   - Dot pagination
   - Page-based display

8. **Animations & Observers** (lines 112-204)
   - IntersectionObserver for fade-ins
   - Counter animation for stats
   - Active nav link highlighting

### **CSS Architecture (styles.css)**

#### Major Sections (2299 lines):
- **CSS Variables** (1-50): Theme colors, spacing, transitions
- **Light Theme** (52-90): Overrides for light mode
- **Header & Navigation** (355-560): Fixed header, mobile menu
- **Hero Section** (561-831): Homepage hero with stats
- **Section Headers** (834-862): Consistent section styling
- **Services Grid** (863-1100): 3-column cards, hover effects
- **Body Diagram** (1300-1500): Interactive pain point map
- **Footer** (2100-2200): Multi-column layout
- **Media Queries** (scattered): Responsive breakpoints

---

## 📱 MOBILE RESPONSIVENESS

### **Current Mobile Implementations:**

#### Hero Section:
```css
@media screen and (max-width: 640px) {
  .hero {
    padding-top: 7rem;  /* Increased from 5rem to prevent badge cutoff */
  }
  .hero-subtitle {
    margin-top: 1rem;  /* Extra spacing for Welcome badge */
  }
}
```

#### Body Diagram:
- Stacks front/back views vertically
- Simplified pain point sizes
- Touch-optimized hit areas

#### Navigation:
- Full-screen mobile menu overlay
- Slide-in animation from right
- Close button (X) at top

---

## 🚀 DEPLOYMENT

### **Current Hosting:**
- **Platform:** Cloudflare Pages
- **Preview URL:** `first-physio.pages.dev`
- **Production Domain:** `firstphysio.in` (pending DNS connection)
- **Method:** GitHub integration (auto-deploy on push)

### **Configuration (wrangler.jsonc):**
```json
{
  "name": "first-physio",
  "compatibility_date": "2026-02-02",
  "assets": {
    "directory": "./"
  }
}
```

---

## 🩺 PRACTO INTEGRATION DETAILS

### **Widget Configuration:**
- **Type:** ABS (Appointment Booking System) Widget
- **Widget ID:** `8d151b927b32437d`
- **Doctor:** Dr. Augustine Joseph
- **Clinic:** First Physio, Ramanathapuram, Coimbatore

### **Integration Pattern:**
1. Hidden widget element: `<practo:abs_widget widget="8d151b927b32437d"></practo:abs_widget>`
2. Practo script loads and creates modal in DOM
3. Custom styled buttons trigger the widget
4. Widget opens as responsive modal overlay
5. **KNOWN ISSUE:** Mobile modal may not be properly sized

### **Files with Practo Widget:**
- ✅ index.html
- ✅ about.html
- ✅ services.html
- ✅ programs.html
- ✅ conditions.html
- ✅ contact.html
- ✅ blog.html
- ✅ All condition pages (back, neck, shoulder, knee, hip, sports)

---

## 🐛 KNOWN ISSUES

### **1. Practo Mobile Modal** ✅ **FIXED**
**Issue:** When clicking "Book Appointment" on mobile, the Practo booking modal was not properly adjusted for mobile screens.

**Cause:** Practo's widget script generates its own iframe/modal with inline styles that weren't responsive.

**Solution Implemented:** 
- Added comprehensive CSS overrides in styles.css (lines 1730-1837)
- Force full viewport sizing on mobile (max-width: 768px)
- Target Practo widget, iframes, and dynamically generated modals
- Ensure all Practo elements fit within mobile viewport
- Added fixes for very small screens (< 480px)

**CSS Added:**
- `practo\:abs_widget` mobile overrides
- iframe full-screen fixes
- Modal/overlay responsive targeting
- Generic class/ID selectors for Practo-generated elements

### **2. Elbow Pain Point**
**Status:** Linked to sports-injuries.html (no dedicated elbow-pain.html page)
**Reason:** Elbow conditions (tennis elbow, golfer's elbow) are covered under sports injuries

---

## 📝 CONTENT STRUCTURE

### **Homepage Sections:**
1. Hero with CTA buttons
2. Services preview grid
3. Interactive body diagram
4. Why Choose Us (values)
5. Testimonials carousel
6. Call-to-Action section
7. Footer with all links

### **Condition Pages Template:**
1. Hero with background image
2. Overview section
3. Symptoms list
4. Causes section
5. Treatment approach
6. Why Choose First Physio
7. CTA section
8. Practo widget

### **Blog Posts:**
- "Exercising the Right Way"
- "Physiotherapy Isn't a Luxury"
- Font size controls (decrease, reset, increase)
- Share buttons integration

---

## 🔌 THIRD-PARTY INTEGRATIONS

### **1. Practo Widget**
- Script: `https://www.practo.com/bundles/practopractoapp/js/abs_widget_helper.js`
- Purpose: Appointment booking

### **2. Web3Forms**
- Endpoint: `https://api.web3forms.com/submit`
- Purpose: Contact form submissions

### **3. Google Fonts**
- Playfair Display (headings)
- Inter (body text)

### **4. Schema.org**
- LocalBusiness markup
- Embedded JSON-LD in all pages

---

## 🎯 FUTURE ENHANCEMENTS

### **Potential Features:**
- [ ] Dedicated elbow-pain.html page
- [ ] Blog category filtering
- [ ] Patient testimonials submission form
- [ ] Before/after gallery
- [ ] Exercise video library
- [ ] Multi-language support (Tamil, English)

---

## 📊 ANALYTICS & TRACKING

### **Currently NOT Implemented:**
- Google Analytics
- Facebook Pixel
- Conversion tracking

**Recommendation:** Add GA4 for visitor insights.

---

## 🔐 SECURITY & PERFORMANCE

### **Current Status:**
- ✅ HTTPS via Cloudflare
- ✅ No sensitive data stored
- ✅ Form data sent to Web3Forms (encrypted)
- ✅ No backend/database
- ✅ Static site (fast, secure)

### **Performance Optimizations:**
- Lazy loading images
- Font preconnect
- AVIF image format
- Minified CSS/JS (production)
- CDN via Cloudflare

---

## 🧪 TESTING CHECKLIST

### **Desktop:**
- [x] All pages load correctly
- [x] Navigation works
- [x] Forms submit successfully
- [x] Practo widget triggers
- [x] Theme toggle works

### **Mobile:**
- [x] Responsive layout
- [x] Mobile menu works
- [x] **Practo modal fits screen** ✅ **FIXED (Feb 2, 2026)**
- [x] Touch interactions work
- [x] Images load properly

### **Cross-Browser:**
- [x] Chrome/Edge (tested)
- [ ] Safari (needs testing)
- [ ] Firefox (needs testing)

---

## 🚨 CRITICAL REMINDERS

1. **Always test Practo booking after CSS changes** - widget is third-party and fragile
2. **Mobile-first approach** - most users will be on mobile
3. **Keep logo.jpg** - it's used as both logo AND favicon
4. **Don't remove wrangler.jsonc** - required for Cloudflare deployment
5. **Practo widget ID is clinic-specific** - don't change `8d151b927b32437d`

---

## 📞 CONTACT INFORMATION

**Clinic:** First Physio  
**Doctor:** Dr. Augustine Joseph  
**Phone:** +91 88701 40001  
**Address:** 25, Srinath Lake View, Sungam Bypass Road, Coimbatore - 641045  
**Hours:** Mon-Sat, 8:00 AM - 8:00 PM  

**Social Media:**
- Facebook: @ourfirstphysio
- Instagram: @clinicfirstphysio  
- Twitter: @firstphysio1

---

**END OF DOCUMENTATION**

*This file should be read before making any changes to the project to maintain context and avoid breaking existing functionality.*
