# PKT Stats App

A modern, full-stack React application for generating and visualizing statistical analysis for educational institutions. Built with React Router, TypeScript, TailwindCSS, and deployed on Netlify.

## 📋 Overview

PKT Stats App enables educational institutions to:

- Generate customized statistical reports
- Visualize student data with interactive charts
- Export reports to PDF/CSV formats
- Manage role-based access control
- Track statistics across multiple faculties and departments

**Tech Stack:** React 19.1.1 • React Router 7.9.2 • TypeScript 5.9.2 • TailwindCSS 4.1.14 • Zustand 5.0.8 • Vite 7.1.7

---

## 🚀 Quick Start

### Installation

```bash
# Clone repository
git clone https://github.com/B-Paul-JC/pkt-stats-app.git
cd pkt-stats-app

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Available Scripts

```bash
npm run dev          # Start development server with HMR
npm run build        # Build for production
npm run typecheck    # Check TypeScript types
npm start            # Alias for npm run dev
```

---

## 📚 Documentation

This project has comprehensive documentation. **Start here based on your role:**

### 🎯 For Different Roles

| Role                     | Start Here                                                               |
| ------------------------ | ------------------------------------------------------------------------ |
| **New Developer**        | [QUICK_START.md](QUICK_START.md) - 5-minute setup guide                  |
| **Frontend Developer**   | [DOCUMENTATION.md](DOCUMENTATION.md) - Complete reference                |
| **Full-Stack Developer** | [ARCHITECTURE.md](ARCHITECTURE.md) - Technical deep-dive                 |
| **DevOps/Deployment**    | [QUICK_START.md](QUICK_START.md#deployment-checklist) - Deployment guide |
| **Project Lead**         | [DOCS_INDEX.md](DOCS_INDEX.md) - Navigation guide                        |

### 📖 Documentation Files

1. **[DOCS_INDEX.md](DOCS_INDEX.md)** ⭐ START HERE
   - Navigation guide for all documentation
   - Search by topic
   - Documents indexed by role

2. **[QUICK_START.md](QUICK_START.md)**
   - 5-minute setup
   - Common development tasks
   - Debugging tips
   - Deployment checklist

3. **[DOCUMENTATION.md](DOCUMENTATION.md)**
   - Complete project reference
   - Project structure
   - System architecture
   - Development guidelines
   - Complete feature list

4. **[ARCHITECTURE.md](ARCHITECTURE.md)**
   - Component architecture
   - Component dependency tree
   - API endpoints reference
   - State management patterns
   - Common coding patterns

5. **[DATA_STRUCTURES.md](DATA_STRUCTURES.md)**
   - TypeScript type definitions
   - Database schema
   - API request/response examples
   - Error codes
   - Configuration constants

---

## ✨ Key Features

- ✅ **Authentication & Authorization** - Role-based access control
- ✅ **Statistics Generation** - Dynamic report creation with filters
- ✅ **Data Visualization** - Interactive charts and dashboards
- ✅ **PDF Export** - Generate downloadable reports
- ✅ **Responsive Design** - Mobile-first using TailwindCSS
- ✅ **Real-time Updates** - Hot module replacement in development
- ✅ **Type Safe** - Full TypeScript support
- ✅ **State Management** - Zustand for global state
- ✅ **Component Library** - Reusable UI components

---

## 🏗️ Project Structure

```
pkt-stats-app/
├── app/
│   ├── routes/              # Page components
│   ├── generator/           # Statistics generation engine
│   ├── statistics/          # Dashboard components
│   ├── store/              # Zustand state management
│   ├── designs/            # UI components
│   ├── welcome/            # Landing page
│   └── root.tsx            # Root layout
├── public/                 # Static assets
├── docs/                   # Documentation (legacy)
├── Configuration files    # vite, tailwind, tsconfig, etc.
└── README.md              # This file
```

For detailed project structure, see [DOCUMENTATION.md](DOCUMENTATION.md#project-structure).

---

## 🔧 Development

### Development Server

```bash
npm run dev
```

Runs on `http://localhost:5173` with Hot Module Replacement enabled.

### Type Checking

```bash
npm run typecheck
```

Validates TypeScript types across the project.

### Code Organization

- **Components:** PascalCase (e.g., `UserCard.tsx`)
- **Utilities:** camelCase (e.g., `userHelpers.ts`)
- **Types:** Named exports in `types.ts` or `types_interfaces.ts`

See [QUICK_START.md](QUICK_START.md#file-naming-conventions) for naming conventions.

---

## 🚀 Deployment

### Production Build

```bash
npm run build
```

Optimized build output in `.react-router/` directory.

### Netlify Deployment

The project is pre-configured for Netlify deployment:

```bash
npx netlify-cli serve  # Preview production build
```

**Deployment checklist:** See [QUICK_START.md](QUICK_START.md#deployment-checklist)

For detailed deployment instructions, see [DOCUMENTATION.md](DOCUMENTATION.md#deployment).

---

## 📡 API Integration

Backend API is proxied through Vite configuration:

- **Proxy Route:** `/api/*` → `http://192.168.3.83/exinsab/`
- **JWT Authentication:** Token stored in localStorage
- **CORS:** Configured for development

For API endpoints reference, see [ARCHITECTURE.md](ARCHITECTURE.md#api-endpoints).

For data types and request/response formats, see [DATA_STRUCTURES.md](DATA_STRUCTURES.md#api-response-types).

---

## 🐛 Debugging

### Common Issues

1. **"API not connected"** → Check `vite.config.ts` proxy configuration
2. **"TypeScript errors"** → Run `npm run typecheck`
3. **"Styles not applying"** → Clear cache: `rm -rf .react-router`
4. **"Hot reload not working"** → Restart dev server

For more debugging tips, see [QUICK_START.md](QUICK_START.md#debugging-tips).

For technical debugging utilities, see [ARCHITECTURE.md](ARCHITECTURE.md#debug-utilities).

---

## 📚 Learning Resources

### Official Documentation

- [React Router v7 Docs](https://reactrouter.com)
- [React Documentation](https://react.dev)
- [Zustand State Management](https://zustand-demo.vercel.app)
- [TailwindCSS Styling](https://tailwindcss.com)
- [Vite Build Tool](https://vitejs.dev)
- [Recharts Visualization](https://recharts.org)
- [React-PDF Export](https://react-pdf.org)

### Project Documentation

- **Getting Started:** [QUICK_START.md](QUICK_START.md)
- **Architecture:** [ARCHITECTURE.md](ARCHITECTURE.md)
- **Types & Data:** [DATA_STRUCTURES.md](DATA_STRUCTURES.md)
- **Full Reference:** [DOCUMENTATION.md](DOCUMENTATION.md)
- **Navigation:** [DOCS_INDEX.md](DOCS_INDEX.md)

---

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Commit with clear messages
4. Push and create a pull request
5. Ensure all tests pass and TypeScript checks out

---

## 📝 License

MIT License - See [LICENSE](LICENSE)

---

## 🔗 Links

- **Repository:** https://github.com/B-Paul-JC/pkt-stats-app
- **Issues:** https://github.com/B-Paul-JC/pkt-stats-app/issues
- **Netlify Deploy:** Automatic on push to `master`

---

## 📞 Need Help?

1. **Quick questions?** → Check [QUICK_START.md](QUICK_START.md)
2. **Technical details?** → See [ARCHITECTURE.md](ARCHITECTURE.md)
3. **Data structures?** → Reference [DATA_STRUCTURES.md](DATA_STRUCTURES.md)
4. **Full reference?** → Read [DOCUMENTATION.md](DOCUMENTATION.md)
5. **Navigation help?** → Use [DOCS_INDEX.md](DOCS_INDEX.md)
6. **Found a bug?** → [Open an issue](https://github.com/B-Paul-JC/pkt-stats-app/issues)

---

**Last Updated:** March 18, 2026
**Version:** 1.0.0
**React Router:** 7.9.2 | **React:** 19.1.1 | **TypeScript:** 5.9.2

Follow <https://docs.netlify.com/welcome/add-new-site/> to add this project as a site
in your Netlify account.

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

## See also

[Guide: how to deploy a React Router 7 site to Netlify](https://developers.netlify.com/guides/how-to-deploy-a-react-router-7-site-to-netlify/)

---

Built with ❤️ using React Router.
