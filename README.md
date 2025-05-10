# 🛍️ FemmeLady

A fully featured multilingual e-commerce platform leveraging Directus for content management, Bunny CDN for optimized media delivery, and Google Cloud for scalable deployments. The app supports robust filtering, user authentication with anti-abuse mechanisms, simulated checkout, and dynamic localization across 7 languages.

## 🌟 Key Features

- **🌍 Multilingual Support**: English, Dutch, French, Arabic, Japanese, Korean, and Chinese
- **⚡ Modern Stack**: Remix, Directus, Redis, Bunny CDN, Brevo
- **☁️ Scalable Deployment**: Google Cloud Run + VM via Docker
- **🔒 Secure Auth**: Google login + Cloudflare Turnstile bot protection
- **🛒 Smart Shopping**: 
  - Advanced product filtering/sorting
  - Shareable URL filters
  - Full cart system with simulated payments
- **👑 Admin Controls**: 
  - Directus-powered dashboard
  - RBAC/PBAC role management
- **⚙️ Robust Infrastructure**:
  - Redis rate-limiting (password recovery)
  - Bunny CDN media delivery
  - Zod form validation
  - Always-on Cloud Run instance

## 🌍 Languages Supported

- English  
- Dutch  
- French  
- Arabic  
- Japanese  
- Korean  
- Chinese  

---

## 🔐 Authentication & Abuse Prevention

- Login & registration with **Google OAuth**  
- **Cloudflare Turnstile** protection on forms  
- Secure forgot password flow using **Redis** and **Brevo**

---

## 🔎 Product Discovery Features

- Advanced filtering (category, brand, rating, price)  
- Sorting (name, price, etc.)  
- Pagination with customizable product count  
- Sharable product pages using persistent **URL parameters**

---

## 🛍️ Product Details & Variations

- Average ratings and user reviews  
- Product variations: **size**, **color**, etc.

---

## 🧾 Cart & Payment Simulation

- Persistent cart  
- Simulated payment flows (ideal for staging/demos)

---

## ✅ Form Validation with Zod

- Type-safe validation  
- Friendly error messages  
- Shared schema across client & server  

---

## 🛠️ Admin Dashboard

- Real-time content management with **Directus**  
- **RBAC** and **ABAC** for granular role access  
- Multi-language content support  

---

## 🚀 Deployment Infrastructure

- Deployed to **Google Cloud Run** (with min instance of 1)  
- Also containerized & deployed via **Docker on GCP VM**

---

## ⚡ Performance & Media Optimization

- Images delivered via **Bunny CDN** for low latency and global availability  

---

## 🌐 Multilingual Architecture

- Translations loaded from JSON files dynamically  
- SEO-friendly URLs (`/en`, `/ar`, `/jp`, etc.)  
- Real-time language switching  

---

## 🖼️ Feature Image

![Feature](https://res.cloudinary.com/dalqx198y/image/upload/v1746345181/femmelady/Screenshot_21_xovsls.png)

---

## 💻 Tech Stack

<table>
  <tr>
    <td><img src="https://i.imgur.com/xlZs9ow.jpeg" height="50"/><br/>Remix JS</td>
    <td><img src="https://i.imgur.com/YNPoTZi.jpeg" height="50"/><br/>React Router 7</td>
    <td><img src="https://i.imgur.com/Eyib50Q.jpeg" height="50"/><br/>Directus</td>
    <td><img src="https://i.imgur.com/F9eRNHm.png" height="50"/><br/>GCP</td>
  </tr>
  <tr>
    <td><img src="https://i.imgur.com/ESUFWFc.jpeg" height="50"/><br/>Docker</td>
    <td><img src="https://i.imgur.com/AAO0WIM.png" height="50"/><br/>Cloudflare</td>
    <td><img src="https://res.cloudinary.com/dalqx198y/image/upload/v1746352810/images_4_gfgksj.jpg" height="50"/><br/>Bunny CDN</td>
    <td><img src="https://res.cloudinary.com/dalqx198y/image/upload/v1746352597/redis-ar21_oe5usd.png" height="50"/><br/>Redis</td>
  </tr>
  <tr>
    <td><img src="https://i.imgur.com/TCpbKzk.png" height="50"/><br/>Mantine UI</td>
    <td><img src="https://i.imgur.com/mQR0hGj.png" height="50"/><br/>React</td>
    <td><img src="https://i.imgur.com/J159u3t.png" height="50"/><br/>TypeScript</td>
    <td><img src="https://i.imgur.com/jfkdTJ5.png" height="50"/><br/>CSS</td>
  </tr>
</table>

---

## 📸 Screenshots

### 🏠 Home Page
![FemmeLady homepage layout with top categories and featured products](https://res.cloudinary.com/dalqx198y/image/upload/v1746345181/femmelady/Screenshot_21_xovsls.png)

![Homepage grid showcasing products and promotional sections](https://res.cloudinary.com/dalqx198y/image/upload/v1746345172/femmelady/Screenshot_49_bjv9on.png)

### 🔝 Header
![Main navigation bar with categories and language switcher](https://res.cloudinary.com/dalqx198y/image/upload/v1746345172/femmelady/Screenshot_48_few4qn.png)

![Search input area in the website header with dropdown suggestions](https://res.cloudinary.com/dalqx198y/image/upload/v1746345175/femmelady/Screenshot_34_uboe4i.png)

### 🌐 Languages
![Language selector showing supported translations including Arabic, Dutch, French, and Japanese](https://res.cloudinary.com/dalqx198y/image/upload/v1746346691/femmelady/Screenshot_2025-05-04_134800_nrzbx6.png)

### 🔻 Footer
![Website footer with quick links, social media icons, and newsletter signup](https://res.cloudinary.com/dalqx198y/image/upload/v1746346730/femmelady/Screenshot_2025-05-04_134842_r3fq4h.png)

### 🔐 Authentication
![Login form with Cloudflare Turnstile captcha for bot protection](https://res.cloudinary.com/dalqx198y/image/upload/v1746345171/femmelady/Screenshot_50_im9sjv.png)

![Registration form with Cloudflare Turnstile security verification](https://res.cloudinary.com/dalqx198y/image/upload/v1746345170/femmelady/Screenshot_52_zuorxz.png)

![Registration page showing real-time validation errors using Zod](https://res.cloudinary.com/dalqx198y/image/upload/v1746345170/femmelady/Screenshot_53_ujw5d0.png)

![Forgot password interface with email input, Turnstile verification, and Redis rate limiting](https://res.cloudinary.com/dalqx198y/image/upload/v1746345170/femmelady/Screenshot_51_bzq6i8.png)

### 🛍️ Products Overview
![All products listing with filter and sort options](https://res.cloudinary.com/dalqx198y/image/upload/v1746345175/femmelady/Screenshot_33_wdgxox.png)

![Detailed view of a single product including title, description, and full-width image](https://res.cloudinary.com/dalqx198y/image/upload/v1746345180/femmelady/Screenshot_32_io5jge.png)

### 🌍 Multilingual Product Listings
![Arabic version of product listing page with RTL layout](https://res.cloudinary.com/dalqx198y/image/upload/v1746345175/femmelady/Screenshot_37_qqmkvn.png)

![French version of product listing page with localized content](https://res.cloudinary.com/dalqx198y/image/upload/v1746345175/femmelady/Screenshot_36_zuuwsr.png)

![Dutch version of product listing page with translated UI](https://res.cloudinary.com/dalqx198y/image/upload/v1746345174/femmelady/Screenshot_35_f3w55u.png)

### 🔍 Individual Product Views
![Individual product page in English showing product details and specifications](https://res.cloudinary.com/dalqx198y/image/upload/v1746345172/femmelady/Screenshot_45_imk98g.png)

![Individual product page in Arabic with RTL layout and Arabic translations](https://res.cloudinary.com/dalqx198y/image/upload/v1746345184/femmelady/Screenshot_24_gk4ncd.png)

![Individual product page in Japanese with localized interface](https://res.cloudinary.com/dalqx198y/image/upload/v1746345181/femmelady/Screenshot_25_vmyfcc.png)

---

## 🧪 Upcoming Features

- 📄 **Order PDF Downloads**  
  Users will be able to download order summaries as PDFs.

- 🌐 **CDN Integration**  
  Faster image fetching via a global content delivery network.

- 🔐 **Google Login**  
  Streamlined authentication using Google accounts.

- 🤝 **Customer Relationship Management (CRM)**  
  A CRM module for enhanced user management.

- 📝 **SEO Blogs**  
  Blogs to improve search engine visibility.

- 📧 **Email Features**  
  - Account verification and password reset emails  
  - Reminder emails for out-of-stock products

- 📊 **Admin Insights**  
  Advanced analytics and insights in the admin dashboard

---
