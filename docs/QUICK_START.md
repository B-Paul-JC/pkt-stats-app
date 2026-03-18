# Quick Start Guide - PKT Stats App

## 5-Minute Setup

### 1. Install and Run

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

### 2. First Login

- Navigate to `/login` page
- Enter credentials (configured in backend)
- Application checks authentication status
- Redirected to dashboard on success

### 3. Generate Statistics

1. Click "Generate Stats" or access `/generate-stats`
2. Select Faculty from dropdown
3. Select Department (if available)
4. Click "Generate Report"
5. View interactive charts and data
6. Export as PDF if needed

---

## Project Structure at a Glance

```
app/
├── routes/           → Page components (home, login, generator, etc.)
├── generator/        → Statistics generation & visualization
├── statistics/       → Dashboard components
├── store/           → Zustand state management
├── designs/         → Reusable UI components
├── welcome/         → Landing page components
└── pocketStats/     → Historical data
```

**Key Files:**

- `app/routes.ts` - All route definitions
- `app/store/useAppStore.ts` - Global state store
- `app/generator/main.tsx` - Stats app interface
- `vite.config.ts` - Backend proxy & Vite config

---

## Common Commands

```bash
# Development
npm run dev              # Start dev server with HMR
npm run typecheck       # Check TypeScript types

# Production
npm run build           # Build for production
npx netlify-cli serve   # Preview production locally

# Other
npm install             # Install dependencies
npm update              # Update dependencies
```

---

## Adding New Features

### Add a New Page/Route

1.**Create route component:**

```bash
# app/routes/newPage.tsx
export default function NewPage() {
  return <div>New Page Content</div>;
}
```

2. **Register route** in `app/routes.ts`:

   ```typescript
   route("/new-page", "routes/newPage.tsx"),
   ```

3. **Access** at `http://localhost:5173/new-page`

### Add a New Component

1. **Create component file**:

   ```bash
   # app/designs/MyComponent.tsx
   interface MyComponentProps {
     title: string;
     value: number;
   }

   export function MyComponent({ title, value }: MyComponentProps) {
     return <div>{title}: {value}</div>;
   }
   ```

2. **Use in other components**:

   ```typescript
   import { MyComponent } from "~/designs/MyComponent";

   <MyComponent title="Users" value={42} />
   ```

### Update Global State

1. **Add to store** in `app/store/useAppStore.ts`:

   ```typescript
   // Add to IAppStore interface
   myNewState: string;

   // Add to store creation
   myNewState: "initial value",
   setMyNewState: (value: string) => set({ myNewState: value }),
   ```

2. **Use in component**:
   ```typescript
   const myNewState = useAppStore((state) => state.myNewState);
   const setMyNewState = useAppStore((state) => state.setMyNewState);
   ```

---

## Styling with TailwindCSS

Utility-first CSS framework. Classes are composed directly in JSX:

```typescript
<div className="flex gap-4 p-6 bg-white rounded-lg shadow">
  <div className="text-lg font-bold text-slate-800">Title</div>
  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
    Click me
  </button>
</div>
```

**Common Patterns:**

- Spacing: `p-4` (padding), `m-4` (margin), `gap-4` (gap)
- Colors: `bg-blue-500`, `text-slate-800`, `border-slate-200`
- Responsive: `md:grid-cols-2` (tablet+), `lg:hidden` (hide on large)
- Flexbox: `flex items-center justify-between`

---

## Debugging Tips

### TypeScript Errors

```bash
npm run typecheck  # See all type errors
```

### API Connection Issues

1. Check `vite.config.ts` proxy URL
2. Verify backend is running at `http://192.168.3.83/exinsab`
3. Check browser DevTools Network tab
4. Enable CORS on backend if needed

### Build Failures

```bash
# Clear cache and rebuild
rm -rf .react-router node_modules
npm install
npm run build
```

### Hot Reload Not Working

- Restart dev server: `Ctrl+C` then `npm run dev`
- Ensure you're accessing `http://localhost:5173` (not IP address)

---

## Authentication Flow

1. **Login:** POST request with credentials
2. **Validation:** Backend verifies credentials
3. **Storage:** User data saved to localStorage
4. **Session:** Token/session maintained for API calls
5. **Protected Routes:** Wrapped with `ProtectedRoute` component
6. **Logout:** Clears localStorage and resets store

**Check Auth Status:**

```typescript
const user = useAppStore((state) => state.user);
const isLoggedIn = !!user;
```

---

## API Communication

All backend requests go through proxy configured in `vite.config.ts`:

```
Frontend Request → /api/endpoint
                ↓ (proxy rewrites)
Backend URL   → http://192.168.3.83/exinsab/endpoint
```

**Example Fetch:**

```typescript
const response = await fetch("/api/statistics", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
});
const data = await response.json();
```

---

## Performance Tips

1. **Lazy load heavy components:**

   ```typescript
   const HeavyComponent = lazy(() => import("./HeavyComponent"));
   ```

2. **Memoize expensive computations:**

   ```typescript
   const value = useMemo(() => expensiveCalculation(data), [data]);
   ```

3. **Avoid prop drilling** - use Zustand store instead

4. **Check bundle size:**
   ```bash
   npm run build -- --profile
   ```

---

## File Naming Conventions

- **Components:** PascalCase (`MyComponent.tsx`)
- **Utils/Hooks:** camelCase (`useMyHook.ts`)
- **Types:** PascalCase for types (`UserData.ts`)
- **Constants:** UPPER_SNAKE_CASE (`API_TIMEOUT`)
- **Styles:** Component name + `.css` if needed

---

## Deployment Checklist

- [ ] All TypeScript errors fixed: `npm run typecheck`
- [ ] Build succeeds: `npm run build`
- [ ] No console errors in browser
- [ ] API endpoints working in production
- [ ] Environment variables set (if using)
- [ ] Git changes committed: `git push`
- [ ] Netlify auto-deploy triggered

---

## Useful Links

- **Repository:** https://github.com/B-Paul-JC/pkt-stats-app
- **React Router:** https://reactrouter.com
- **TailwindCSS:** https://tailwindcss.com
- **Zustand:** https://zustand-demo.vercel.app
- **React Docs:** https://react.dev

---

## Need Help?

1. **Check existing code** - Look for similar implementations
2. **TypeScript errors** - Run `npm run typecheck`
3. **Browser console** - Check for errors/warnings
4. **Netlify logs** - Check deployment logs for errors
5. **GitHub issues** - Create issue for bugs

Good luck! 🚀
