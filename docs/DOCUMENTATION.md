# PKT Stats App - Complete Documentation

## Table of Contents

1. [Overview](#overview)
2. [Project Structure](#project-structure)
3. [Architecture](#architecture)
4. [Getting Started](#getting-started)
5. [Features](#features)
6. [Key Components](#key-components)
7. [State Management](#state-management)
8. [Styling](#styling)
9. [API Integration](#api-integration)
10. [Deployment](#deployment)
11. [Development Guidelines](#development-guidelines)

---

## Overview

**PKT Stats App** is a modern, full-stack React application designed to generate and visualize statistical analysis for educational institutions. It enables users to:

- Analyze student data across faculties and departments
- Generate customized statistical reports
- Export data to PDF format
- View interactive dashboards with visualizations
- Manage different user roles and access levels

**Tech Stack:**

- **Frontend Framework:** React 19.1.1 with TypeScript 5.9.2
- **Router:** React Router 7.9.2
- **Build Tool:** Vite 7.1.7
- **Styling:** TailwindCSS 4.1.14
- **State Management:** Zustand 5.0.8
- **Data Visualization:** Recharts 3.3.0, Framer Motion 12.23.24
- **PDF Export:** React-PDF 10.2.0, @react-pdf/renderer 4.3.1
- **Deployment:** Netlify

---

## Project Structure

```
pkt-stats-app/
├── app/                              # Application source code
│   ├── app.css                       # Global styles
│   ├── interfaces.d.ts               # Type definitions
│   ├── ProtectedRoute.tsx            # Authentication wrapper
│   ├── root.tsx                      # Root layout component
│   ├── routes.ts                     # Route configuration
│   │
│   ├── designs/                      # Reusable UI components
│   │   ├── LoadingScreen.tsx         # Loading indicator
│   │   ├── RandomGrid.tsx            # Grid layout component
│   │   ├── statsCard.tsx             # Statistics card component
│   │
│   ├── generator/                    # Statistics generation engine
│   │   ├── main.tsx                  # Main stats app component
│   │   ├── dynamicWidget.tsx         # Dynamic widget renderer
│   │   ├── reportGenerator.tsx       # Report generation logic
│   │   ├── studentListGenerator.tsx  # Student list generation
│   │   ├── studentListTable.tsx      # Student table display
│   │   ├── statCard.tsx              # Stat card component
│   │   ├── responsivePieChart.tsx    # Pie chart component
│   │   ├── selfDestructMessageBox.tsx # Auto-dismissing messages
│   │   ├── hallMapper.ts             # Hall mapping utilities
│   │   ├── facultiesAndDepartmentsMapper.ts # Faculty/dept mapping
│   │   ├── types_interfaces.ts       # Type definitions
│   │   └── types.tsx                 # Component types
│   │
│   ├── pocketStats/                  # Historical statistics
│   │   ├── 2023/                     # 2023 statistics data
│   │   ├── 2024/                     # 2024 statistics data
│   │   ├── 2025/                     # 2025 statistics data
│   │   └── InfoStats/                # Statistics info
│   │
│   ├── routes/                       # Page routes
│   │   ├── home.tsx                  # Home page
│   │   ├── login.tsx                 # Login page
│   │   ├── generator.tsx             # Statistics generator page
│   │   ├── statistic.tsx             # Statistics dashboard
│   │   ├── test.tsx                  # Testing page
│   │   └── underConstruction.tsx     # Placeholder page
│   │
│   ├── statistics/                   # Statistics display components
│   │   ├── header.tsx                # Statistics header
│   │   ├── downloads.tsx             # Download functionality
│   │   ├── imageCarousel.tsx         # Image carousel
│   │   ├── carouselForMobile.tsx     # Mobile carousel
│   │   ├── navigationButton.tsx      # Navigation controls
│   │   ├── images.tsx                # Image utilities
│   │
│   ├── store/                        # Zustand state management
│   │   ├── useAppStore.ts            # Main app store
│   │   ├── appStoreTypes.ts          # Store type definitions
│   │   └── storeFunctions.ts         # Store helper functions
│   │
│   └── welcome/                      # Welcome/landing components
│       ├── welcome.tsx               # Welcome page
│       ├── ButtonGrid.tsx            # Button grid layout
│       ├── CustomGrid.tsx            # Custom grid component
│       ├── Grid.tsx                  # Grid component
│       └── SidePanel.tsx             # Side panel component
│
├── public/                           # Static assets
│   └── favicon.ico                   # Application icon
│
├── Configuration Files
│   ├── vite.config.ts                # Vite build configuration
│   ├── react-router.config.ts        # React Router configuration
│   ├── tailwind.config.ts            # TailwindCSS configuration
│   ├── tsconfig.json                 # TypeScript configuration
│   ├── netlify.toml                  # Netlify deployment config
│   └── package.json                  # Project dependencies
```

---

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (React)                     │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Page Routes                            │  │
│  │  (home, login, generator, statistics)              │  │
│  └──────────────────────────────────────────────────────┘  │
│                           │                                 │
│  ┌────────────────────────┴─────────────────────────────┐  │
│  │                                                      │  │
│  ▼                                                      ▼  │
│ ┌──────────────┐                          ┌─────────────┐ │
│ │ Generator    │                          │ Statistics  │ │
│ │ (Report Gen) │                          │ (Dashboard) │ │
│ └──────────────┘                          └─────────────┘ │
│        │                                         │         │
│        └──────────────────┬──────────────────────┘         │
│                           │                                │
│        ┌──────────────────┴──────────────────────┐         │
│        ▼                                         ▼         │
│  ┌─────────────────┐               ┌──────────────────┐   │
│  │ Zustand Store   │◄─────────────►│ UI Components    │   │
│  │ (AppStore)      │               │ (Cards, Charts)  │   │
│  └─────────────────┘               └──────────────────┘   │
│        │                                                   │
│        ▼                                                   │
│  ┌─────────────────┐                                       │
│  │ Local Storage   │                                       │
│  └─────────────────┘                                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
            │
            │ HTTP Requests (CORS-enabled)
            ▼
┌─────────────────────────────────────────────────────────────┐
│                  Backend API Server                         │
│                (PHP - http://192.168.3.83)                 │
│                                                             │
│  Proxied via: /api/* → backend server                      │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **User Authentication:**
   - User logs in via `/login` route
   - Credentials are validated against backend
   - User data stored in Zustand store and localStorage
   - Token/session maintained for subsequent requests

2. **Statistics Generation:**
   - User selects faculty/department filters
   - Request sent to backend API
   - Data processed by `ReportGenerator` component
   - Dynamic widgets created based on response
   - Widgets rendered via `DynamicWidget` component

3. **Report Export:**
   - User triggers export action
   - React-PDF renderer generates PDF
   - PDF downloaded to user's device

4. **State Persistence:**
   - User data persists in localStorage
   - Generated widgets cached in Zustand store
   - Allows offline viewing of previously generated reports

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm 9+
- Git

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/B-Paul-JC/pkt-stats-app.git
   cd pkt-stats-app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment:**
   - No `.env` file needed currently
   - API proxy configured in `vite.config.ts` pointing to `http://192.168.3.83/exinsab`

### Development

**Start development server:**

```bash
npm run dev
```

Application runs at `http://localhost:5173` with Hot Module Replacement (HMR)

**Type checking:**

```bash
npm run typecheck
```

### Production Build

**Build for production:**

```bash
npm run build
```

**Preview production build locally:**

```bash
npx netlify-cli serve
```

---

## Features

### 1. **Authentication & Role-Based Access**

- Login system with role-based access control
- User credentials validation
- Protected routes using `ProtectedRoute` component
- Session persistence via localStorage

### 2. **Statistics Generation**

- Dynamic report generation based on filters
- Faculty and department selection
- Multiple data visualization options
- Real-time data updates

### 3. **Data Visualization**

- Interactive charts using Recharts
- Pie charts for categorical data
- Responsive grid layouts
- Mobile-optimized carousel views
- Animated transitions with Framer Motion

### 4. **Report Export**

- PDF generation and download
- Formatted reports with styling
- Multi-page support for large datasets
- Student list export functionality

### 5. **Student Management**

- Student list display with filters
- Data finder functionality
- Bulk data operations
- Responsive table layouts

### 6. **Responsive Design**

- Mobile-first approach using TailwindCSS
- Adaptive layouts for all screen sizes
- Touch-friendly interfaces
- Dark/Light mode support (via TailwindCSS)

---

## Key Components

### Generator Module (`app/generator/`)

#### `main.tsx` - SchoolStatsApp

Main statistics generation interface

- **Props:** None (uses Zustand store)
- **Features:**
  - Analysis and Data Finder views
  - Widget management
  - User profile display
  - Report generation interface

#### `reportGenerator.tsx` - ReportGenerator

Handles report generation logic

- **Purpose:** Processes user selections and generates statistical data
- **Key Functions:**
  - Validate user inputs
  - Fetch data from backend
  - Transform data for visualization
  - Trigger widget creation

#### `dynamicWidget.tsx` - DynamicWidget

Renders widgets based on data type

- **Props:**
  - `data: WidgetData` - Data to visualize
  - `onRemove?: () => void` - Delete callback
- **Supports:** Charts, tables, cards, custom visualizations

#### `studentListTable.tsx` - StudentListTable

Displays student data in table format

- **Props:**
  - `data: StudentListResponse[]`
  - `title?: string`
  - `onExport?: () => void`

#### `responsivePieChart.tsx`

Customized pie chart with responsiveness

- **Libraries Used:** Recharts
- **Features:** Legends, custom colors, animations

### Store Management (`app/store/`)

#### `useAppStore.ts`

Central Zustand store for application state

- **State Properties:**
  - `user` - Current user data
  - `generatedWidgets` - List of generated statistical widgets
  - `isLoading` - Loading state
  - `selectedFaculty` - Currently selected faculty
  - `selectedDepartment` - Currently selected department
- **Actions:**
  - `checkAuth()` - Validate user authentication
  - `setUser()` - Update user information
  - `setGeneratedWidgets()` - Update widgets list
  - `logout()` - Clear user session

#### `appStoreTypes.ts`

Type definitions for the store

- Interfaces:
  - `IAppStore` - Store structure
  - `IAppStoreVariables` - Store variables
  - `USER` - User data structure
  - `FACULTY` - Faculty types

### UI Components (`app/designs/`)

#### `statsCard.tsx`

Displays individual statistic cards

- **Props:**
  - `title: string` - Card title
  - `value: number | string` - Displayed value
  - `icon?: React.ReactNode`
  - `trend?: number` - Optional trend indicator

#### `LoadingScreen.tsx`

Loading state indicator

- Placeholder during data fetch
- Smooth animations

---

## State Management

### Zustand Store Architecture

**Location:** [app/store/useAppStore.ts](app/store/useAppStore.ts)

**Store Structure:**

```typescript
interface IAppStore {
  user: USER | null;
  generatedWidgets: WidgetData[];
  isLoading: boolean;
  selectedFaculty: FACULTY;
  selectedDepartment: string;

  // Actions
  checkAuth: () => void;
  setUser: (user: USER) => void;
  setGeneratedWidgets: (widgets: WidgetData[]) => void;
  logout: () => void;
}
```

**Usage Example:**

```typescript
import { useAppStore } from "~/store/useAppStore";

function MyComponent() {
  const user = useAppStore((state) => state.user);
  const setUser = useAppStore((state) => state.setUser);

  return <div>{user?.name}</div>;
}
```

**Key Features:**

- Persistent state across page navigation
- localStorage integration for offline support
- Computed selectors for efficient re-renders
- No external API calls in store initialization

---

## Styling

### TailwindCSS Configuration

**File:** [tailwind.config.ts](tailwind.config.ts)

**Customizations:**

- Extended color palette with custom variants
- Custom spacing scale
- Responsive breakpoints (mobile-first)
- Dark mode support

**Utility Classes Used:**

- Layout: `flex`, `grid`, `container`, `space-*`
- Colors: `bg-*`, `text-*`, `border-*`
- Typography: `text-*`, `font-*`, `leading-*`
- Spacing: `p-*`, `m-*`, `gap-*`
- Responsiveness: `sm:`, `md:`, `lg:`, `xl:`

### CSS Architecture

**Global Styles:** [app/app.css](app/app.css)

**Component Patterns:**

- Utility-first approach with TailwindCSS
- PostCSS for vendor prefixing
- Autoprefixer for browser compatibility

---

## API Integration

### Backend Connection

**Base URL:** `http://192.168.3.83/exinsab`

**Proxy Configuration** (in `vite.config.ts`):

```typescript
server: {
  proxy: {
    "/api": {
      target: "http://192.168.3.83/exinsab",
      changeOrigin: true,
      secure: false,
      rewrite: (path) => path.replace(/^\/api/, ""),
    },
  },
}
```

**Request Format:**

- Frontend request: `/api/endpoint`
- Proxied to: `http://192.168.3.83/exinsab/endpoint`

### API Endpoints (Inferred)

| Endpoint       | Method | Purpose                |
| -------------- | ------ | ---------------------- |
| `/login`       | POST   | User authentication    |
| `/statistics`  | GET    | Fetch statistics data  |
| `/students`    | GET    | Student list retrieval |
| `/faculties`   | GET    | Faculty information    |
| `/departments` | GET    | Department information |

**Note:** Specific endpoints should be documented based on backend implementation.

---

## Deployment

### Netlify Configuration

**File:** [netlify.toml](netlify.toml)

**Deployment Process:**

1. **Environment Setup:**
   - Node.js runtime configured
   - Build command: `npm run build`

2. **Build Output:**
   - Static files: `.react-router/server` (server bundle)
   - Client assets: `.react-router/public` (client bundle)

3. **Deploy Command:**
   ```bash
   npm run build  # Creates optimized production build
   ```

### Deployment Steps

1. **Push to repository:**

   ```bash
   git push origin master
   ```

2. **Netlify auto-deploy:**
   - GitHub webhook triggers build
   - `npm run build` executes
   - Built files deployed to CDN
   - Live at: `https://pkt-stats-app.netlify.app` (or custom domain)

### Environment Variables (if needed)

Currently using proxy configuration. Add to `.env` if backend URL changes:

```
VITE_API_URL=http://your-backend-url:port
```

Update `vite.config.ts` to use environment variable.

---

## Development Guidelines

### Code Organization

1. **Component Structure:**

   ```
   ComponentName.tsx
   ├── Imports
   ├── Type/Interface definitions
   ├── Component function
   ├── Internal helper functions
   └── Export
   ```

2. **File Naming:**
   - Components: PascalCase (e.g., `UserCard.tsx`)
   - Utilities: camelCase (e.g., `userHelpers.ts`)
   - Types: `types.ts`, `interfaces.ts`, `types_interfaces.ts`

3. **Module Organization:**
   - One main component per file
   - Related utilities grouped in same folder
   - Shared utilities in `utils/` or `helpers/`

### TypeScript Best Practices

1. **Type Definitions:**
   - Define interfaces at top of file
   - Use `interface` for object shapes
   - Use `type` for unions/aliases
   - Export reusable types

2. **Component Typing:**

   ```typescript
   interface ComponentProps {
     title: string;
     value: number;
     onAction?: () => void;
   }

   export function Component({ title, value, onAction }: ComponentProps) {
     // Implementation
   }
   ```

3. **Store Typing:**
   - Define complete store interface
   - Use discriminated unions for actions
   - Export action types separately

### React Patterns

1. **Hooks Usage:**
   - Use hooks at top level only
   - Custom hooks for reusable logic
   - Zustand for global state
   - useState for local component state

2. **Performance Optimization:**
   - Memoize expensive computations
   - Use React.memo for expensive components
   - Avoid unnecessary re-renders with proper selectors

3. **Component Composition:**
   - Keep components small and focused
   - Prop drilling minimized via Zustand
   - Compose complex UIs from simpler components

### Testing Strategy

1. **Unit Tests:**
   - Test utility functions
   - Test component rendering
   - Test event handlers

2. **Integration Tests:**
   - Test component interactions
   - Test store updates
   - Test API calls

3. **E2E Tests:**
   - Test complete user flows
   - Test authentication
   - Test report generation

### Git Workflow

1. **Branch Naming:**
   - `feature/feature-name` - New features
   - `bugfix/bug-name` - Bug fixes
   - `refactor/refactor-name` - Code refactoring
   - `docs/change-description` - Documentation

2. **Commit Messages:**

   ```
   Type: Brief description

   Optional detailed explanation of changes

   - Bullet point changes
   - Impact assessment
   ```

3. **Pull Request Process:**
   - Descriptive PR title
   - Reference related issues
   - Include screenshots for UI changes
   - Request code review

### Common Development Tasks

#### Debugging

1. **Browser DevTools:**
   - React Developer Tools extension
   - Network tab for API calls
   - Console for errors/warnings

2. **Console Logging:**

   ```typescript
   console.log("Component state:", state);
   console.error("API Error:", error);
   ```

3. **Zustand DevTools:**
   - View store state changes
   - Time-travel debugging

#### Adding New Features

1. **Create new route** in `app/routes.ts`
2. **Create route component** in `app/routes/`
3. **Add store state** if needed in `useAppStore.ts`
4. **Create UI components** in appropriate subdirectory
5. **Add types** to relevant `types_interfaces.ts`
6. **Test locally** with `npm run dev`

#### Performance Optimization

1. **Bundle Analysis:**

   ```bash
   npm run build -- --profile
   ```

2. **React Profiler:**
   - Chrome DevTools React tab
   - Identify slow renders
   - Check unnecessary re-renders

3. **Code Splitting:**
   - React Router handles route-based splitting
   - Lazy load heavy charts/components

### Troubleshooting

| Issue                           | Solution                                        |
| ------------------------------- | ----------------------------------------------- |
| API not connecting              | Check `vite.config.ts` proxy configuration      |
| TypeScript errors               | Run `npm run typecheck` and fix reported issues |
| Styles not applying             | Clear `.react-router/` cache and rebuild        |
| Development server not starting | Delete `node_modules`, run `npm install`        |
| Hot reload not working          | Check that `npm run dev` is running             |
| Build failures                  | Check API endpoint accessibility                |

---

## Additional Resources

### Documentation Links

- [React Router Documentation](https://reactrouter.com/)
- [Zustand Documentation](https://zustand-demo.vercel.app/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/)
- [Recharts Documentation](https://recharts.org/)
- [React-PDF Documentation](https://react-pdf.org/)

### Important Files

- [Package Configuration](package.json)
- [TypeScript Configuration](tsconfig.json)
- [Vite Configuration](vite.config.ts)
- [Router Configuration](react-router.config.ts)
- [Main Store](app/store/useAppStore.ts)

### Team Contacts

- Repository: https://github.com/B-Paul-JC/pkt-stats-app
- Issues: https://github.com/B-Paul-JC/pkt-stats-app/issues

---

## Version History

| Version | Date    | Changes               |
| ------- | ------- | --------------------- |
| 1.0.0   | Current | Initial documentation |

---

**Last Updated:** March 18, 2026
**Documentation Version:** 1.0
**React Router Version:** 7.9.2
**React Version:** 19.1.1
