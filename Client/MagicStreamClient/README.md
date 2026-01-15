
# 🎬 MagicStream Frontend

Modern, production-ready **React frontend** for the **MagicStream** movie streaming platform with **AI-powered recommendations**.

---

## ✨ Features

- 🎨 **Glassmorphism Design** – Modern, futuristic UI with smooth animations  
- 🔐 **JWT Authentication** – Secure login with HTTP-only cookies  
- 🎭 **Role-Based Access** – Admin and User roles with protected routes  
- 🤖 **AI Recommendations** – Personalized movie suggestions  
- 📱 **Fully Responsive** – Mobile-first design with Tailwind CSS  
- ⚡ **Optimized Performance** – Code splitting, lazy loading, and caching  
- ♿ **Accessible** – WCAG 2.1 compliant with keyboard navigation  
- 🎬 **Video Player** – Embedded YouTube trailer support  

---

## 🚀 Quick Start

### 📦 Prerequisites

- **Node.js** `24.x` or higher  
- **Go backend** running on `http://localhost:8080`

---

## 📥 Installation

### 1️⃣ Install dependencies

```bash
npm install
````

### 2️⃣ Configure environment variables

```bash
cp .env.example .env
```

Edit `.env`:

```env
VITE_API_URL=http://localhost:8080
VITE_APP_NAME=MagicStream
VITE_ENV=development
```

### 3️⃣ Start development server

```bash
npm run dev
```

➡ Visit: **[http://localhost:3000](http://localhost:3000)**

---

## 🏗 Production Build

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```text
src/
├── components/       # Reusable UI components
│   ├── layout/       # Navbar, Footer, ProtectedRoute
│   ├── ui/           # Button, Input, Card, Modal, etc.
│   └── movie/        # MovieCard, MovieGrid, VideoPlayer
├── pages/            # Route pages
│   ├── admin/        # Admin-only pages
│   └── ...
├── context/          # React Context (Auth)
├── hooks/            # Custom hooks
├── services/         # API services
├── utils/            # Helper functions
└── App.jsx           # Main app component
```

---

## 🎯 Available Routes

### 🌍 Public Routes

* `/` – Home page
* `/movies` – Browse all movies
* `/movie/:imdb_id` – Movie details
* `/login` – User login
* `/register` – User registration

### 🔐 Protected Routes (Logged-in users)

* `/recommendations` – AI recommendations
* `/profile` – User profile

### 🛠 Admin Routes (Admin only)

* `/admin` – Admin dashboard
* `/admin/add-movie` – Add new movie
* `/admin/update-review/:imdb_id` – Update movie review

---

## 🔧 Configuration

### 🔗 Backend Integration

Update API URL in `.env`:

```env
VITE_API_URL=https://your-backend-url.com
```

### 🎨 Tailwind Customization

Edit `tailwind.config.js` to customize:

* Colors
* Fonts
* Animations

---

## 🎨 Design System

* **Colors:** Primary (Blue), Dark theme with glassmorphism
* **Typography:** Inter font family
* **Animations:** Fade-ins, scale effects, smooth transitions
* **Breakpoints:**

  * `sm` – 640px
  * `md` – 768px
  * `lg` – 1024px
  * `xl` – 1280px
  * `2xl` – 1536px

---

## 📦 Key Dependencies

* **React 18.3** – UI library
* **React Router 7** – Routing
* **Axios** – HTTP client
* **Framer Motion** – Animations
* **Tailwind CSS** – Styling
* **Zustand** – State management (optional)
* **Lucide React** – Icons
* **React YouTube** – Video player

---

## 🔐 Authentication Flow

1. User registers with **email, password, and favorite genres**
2. User logs in → JWT stored in **HTTP-only cookie**
3. Protected routes verify authentication
4. Admin routes validate user role
5. Automatic token refresh on expiry

---

## 🎬 Movie Features

* Browse all movies with filtering
* Search by title
* Filter by genre
* AI-powered recommendations
* Watch trailers (YouTube)
* Admin can add movies and update reviews

---

## 🚀 Deployment

### ▲ Vercel (Recommended)

```bash
npm run build
```

* Deploy `dist` folder
* Set environment variables in dashboard
* Enable automatic deployments

---

### 🌐 Netlify

```bash
npm run build
```

* Deploy `dist` folder or connect GitHub repo

---

### 🐳 Docker

```dockerfile
FROM node:24-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

---

## 📝 Environment Variables

| Variable      | Description      | Default                                        |
| ------------- | ---------------- | ---------------------------------------------- |
| VITE_API_URL  | Backend API URL  | [http://localhost:8080](http://localhost:8080) |
| VITE_APP_NAME | Application name | MagicStream                                    |
| VITE_ENV      | Environment      | development                                    |

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch

   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit changes

   ```bash
   git commit -m "Add AmazingFeature"
   ```
4. Push to branch

   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request


## 🐛 Troubleshooting

### ❌ CORS Issues

* Enable CORS in backend
* Ensure `withCredentials: true` in API config

### 🔐 Authentication Issues

* Clear cookies and `localStorage`
* Verify backend JWT secret
* Check cookie domain settings

### 🧱 Build Errors

```bash
rm -rf node_modules && npm install
rm -rf .vite
```

---

## ✅ Final Checklist

* ✅ Complete project structure
* ✅ 25+ components and pages
* ✅ JWT authentication (HTTP-only cookies)
* ✅ Admin & User role separation
* ✅ Glassmorphism UI
* ✅ Smooth animations
* ✅ Mobile responsive
* ✅ WCAG 2.1 accessible
* ✅ Production optimized
* ✅ Environment configuration
* ✅ Full documentation

---

## 🚀 Next Steps (Backend Enhancements)

```go
router.Use(cors.New(cors.Config{
    AllowOrigins:     []string{"http://localhost:3000"},
    AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
    AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
    AllowCredentials: true,
}))
```

### 🔮 Future Features

* Debounced search
* User ratings
* Watchlist / Favorites
* Watch history
* Advanced filters (year, rating range)
* Pagination
* Movie comments & discussions
* Social sharing
* Dark/Light theme toggle
* Multi-language support

---
