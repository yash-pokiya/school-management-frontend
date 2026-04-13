# 🎓 EduAdmin — School Management System (Frontend)

A modern, responsive frontend for the **EduAdmin School Management System**, built with React, Vite, and Tailwind CSS v4. Features JWT-based authentication with a clean glassmorphism UI.

---

## ✨ Features

- 🔐 **JWT Authentication** — Secure login with token stored in `localStorage`
- 🛡️ **Protected Routes** — Private route guard redirects unauthenticated users to login
- 🎨 **Glassmorphism UI** — Frosted glass cards, gradient blobs, and smooth animations
- ⚡ **Vite-powered** — Blazing-fast dev server and HMR
- 📱 **Fully Responsive** — Works seamlessly on all screen sizes
- ✅ **Form Validation** — Client-side email and password validation with animated error banners

---

## 🖥️ Pages

| Route | Component | Access |
|---|---|---|
| `/login` | `Login.jsx` | Public |
| `/dashboard` | `Dashboard.jsx` | Protected (requires JWT) |
| `*` | Redirect | → `/login` |

---

## 🛠️ Tech Stack

| Tool | Version |
|---|---|
| [React](https://react.dev/) | ^19.2 |
| [Vite](https://vite.dev/) | ^8.0 |
| [React Router DOM](https://reactrouter.com/) | ^7.14 |
| [Tailwind CSS](https://tailwindcss.com/) | ^4.2 |
| [@tailwindcss/vite](https://tailwindcss.com/docs/installation/using-vite) | ^4.2 |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/yash-pokiya/school-management-frontend.git
cd school-management-frontend

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
# Backend API base URL (leave empty if frontend & backend share the same origin)
# Example:
VITE_API_BASE=http://localhost:5000
```

> If `VITE_API_BASE` is left empty, API calls will be made relative to the current origin.

### Running Locally

```bash
npm run dev
```

The app will be available at **http://localhost:5173**

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

---

## 🔑 Authentication Flow

1. User submits credentials on the `/login` page
2. A `POST` request is sent to `{VITE_API_BASE}/api/auth/login`
3. On success, the JWT token and user object are stored in `localStorage`
4. User is redirected to `/dashboard`
5. All protected routes check for the token on every render
6. Clicking **Sign Out** clears `localStorage` and redirects back to `/login`

---

## 📁 Project Structure

```
school-management-frontend/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   ├── pages/
│   │   ├── Login.jsx       # Login page with JWT auth
│   │   └── Dashboard.jsx   # Protected dashboard page
│   ├── App.jsx             # Routes & PrivateRoute guard
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── .env                    # Environment variables
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
└── vite.config.js
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
