# Component Architecture & API Reference

## Component Dependency Tree

```
root.tsx (Layout)
├── Authentication & Layout Setup
│
├── routes/
│   ├── home.tsx
│   │   └── welcome/
│   │       ├── welcome.tsx
│   │       ├── ButtonGrid.tsx
│   │       ├── CustomGrid.tsx
│   │       ├── Grid.tsx
│   │       └── SidePanel.tsx
│   │
│   ├── login.tsx
│   │   └── Authentication Form
│   │
│   ├── generator.tsx
│   │   └── generator/main.tsx (SchoolStatsApp)
│   │       ├── ReportGenerator
│   │       ├── DynamicWidget
│   │       ├── StudentListGenerator
│   │       ├── StudentListTable
│   │       │   └── designs/statsCard.tsx
│   │       └── facultiesAndDepartmentsMapper
│   │
│   ├── statistic.tsx (Dashboard)
│   │   ├── statistics/header.tsx
│   │   ├── statistics/imageCarousel.tsx
│   │   ├── statistics/carouselForMobile.tsx
│   │   ├── statistics/downloads.tsx
│   │   └── statistics/navigationButton.tsx
│   │
│   └── test.tsx
│
└── store/
    └── useAppStore (Zustand)
        ├── User State
        ├── Generated Widgets
        ├── UI State
        └── Helper Functions
```

---

## Core Components Reference

### Generator Module

#### `SchoolStatsApp` (in `generator/main.tsx`)

**Purpose:** Main statistics generation UI

**Props:** None (state from Zustand)

**State Used:**

```typescript
{
  generatedWidgets: WidgetData[];
  user: USER | null;
  role: Role;
  uid: string;
  department_id: string;
  faculty_id: string;
}
```

**Key Methods:**

```typescript
handleReportGenerated(newWidget: WidgetData) {
  // Adds new widget to generated list
  setGeneratedWidgets((prev) => [newWidget, ...prev]);
}

setCurrentView(view: "Analysis" | "Data Finder") {
  // Switches between different views
}
```

**Features:**

- View switching (Analysis ↔ Data Finder)
- Report generation interface
- Student data finder
- Widget management UI
- User profile display
- Logout functionality

**Related Components:**

- `ReportGenerator` - Generates statistical data
- `DynamicWidget` - Renders individual widgets
- `StudentListGenerator` - Student list interface
- `StudentListTable` - Student data display

---

#### `ReportGenerator` (in `generator/reportGenerator.tsx`)

**Purpose:** Handles report generation logic

**Key Responsibilities:**

1. Collect user inputs (faculty, department, filters)
2. Validate input data
3. Make API request to backend
4. Transform response to widget format
5. Emit generated widget to parent

**Critical Functions:**

```typescript
generateReport(filters: FilterOptions) {
  // 1. Validate filters
  // 2. Fetch from /api/statistics
  // 3. Transform data
  // 4. Return WidgetData
}

transformData(apiResponse: APIResponse) {
  // Convert API response to UI-friendly format
}
```

**API Integration:**

```
POST /api/statistics
Body: {
  faculty: string;
  department: string;
  hall?: string;
  filters?: Record<string, any>;
}
Response: Statistical data
```

---

#### `DynamicWidget` (in `generator/dynamicWidget.tsx`)

**Purpose:** Renders different widget types based on data

**Props:**

```typescript
interface DynamicWidgetProps {
  data: WidgetData;
  title?: string;
  onRemove?: () => void;
  editable?: boolean;
}
```

**Supported Widget Types:**

- `chart` - Recharts visualization
- `table` - Student list table
- `card` - Statistics card
- `pie_chart` - Pie chart visualization
- `custom` - Custom component

**Example Data Structure:**

```typescript
{
  id: string;
  type: "chart" | "table" | "card" | "pie_chart";
  title: string;
  data: any[];
  config?: {
    colors?: string[];
    labels?: string[];
    xAxis?: string;
    yAxis?: string;
  };
  generatedAt: Date;
}
```

---

#### `StudentListGenerator` (in `generator/studentListGenerator.tsx`)

**Purpose:** Interface for student data queries

**Features:**

- Filter by faculty/department
- Search students
- Display results
- Bulk operations

**Emits:**

```typescript
onStudentsLoaded(students: StudentListResponse[])
```

---

#### `StudentListTable` (in `generator/studentListTable.tsx`)

**Purpose:** Display student data in table format

**Props:**

```typescript
interface StudentListTableProps {
  data: StudentListResponse[];
  title?: string;
  searchable?: boolean;
  sortable?: boolean;
  onExport?: () => void;
  pageSize?: number;
}
```

**Features:**

- Pagination
- Sorting
- Filtering
- CSV export
- Responsive columns

---

### Statistics Module

#### Statistics Components (in `app/statistics/`)

| Component               | Purpose                         |
| ----------------------- | ------------------------------- |
| `header.tsx`            | Page header with title, filters |
| `imageCarousel.tsx`     | Desktop carousel for images     |
| `carouselForMobile.tsx` | Mobile-optimized carousel       |
| `downloads.tsx`         | Download options (PDF, CSV)     |
| `navigationButton.tsx`  | Previous/Next navigation        |

---

### Store Architecture

#### `useAppStore.ts` - Global State Management

**Store Structure:**

```typescript
interface IAppStore {
  // User State
  user: USER | null;

  // UI State
  generatedWidgets: WidgetData[];
  isLoading: boolean;
  notification?: {
    message: string;
    type: "success" | "error" | "warning";
    duration: number;
  };

  // Filter State
  selectedFaculty: FACULTY;
  selectedDepartment: string;
  selectedHall?: string;

  // Actions
  checkAuth(): void;
  setUser(user: USER): void;
  clearUser(): void;
  setGeneratedWidgets(widgets: WidgetData[]): void;
  addGeneratedWidget(widget: WidgetData): void;
  removeGeneratedWidget(widgetId: string): void;
  logout(): void;
  setLoading(loading: boolean): void;
  setNotification(notification: Notification): void;
}
```

**Key Actions:**

```typescript
// Authentication
checkAuth() {
  // Loads user from localStorage
  // Validates session with backend
  // Sets user in store
}

// Widget Management
setGeneratedWidgets(widgets: WidgetData[]) {
  // Replaces entire widgets list
}

addGeneratedWidget(widget: WidgetData) {
  // Adds widget to beginning (prepend)
}

removeGeneratedWidget(widgetId: string) {
  // Removes widget by ID
}

// User Management
setUser(user: USER) {
  // Sets user in store + localStorage
}

logout() {
  // Clears user
  // Resets state
  // Clears localStorage
  // Redirects to login
}
```

**Persistence:**

- User data synced with localStorage
- Survives page refresh
- Cleared on logout

---

## Data Type Definitions

### User Type

```typescript
interface USER {
  uid: string;
  email: string;
  name: string;
  role: Role;
  faculty_id: string;
  department_id: string;
  profile_pic?: string;
  last_login?: Date;
}

type Role = "admin" | "staff" | "student" | "guest";
```

### Widget Data Type

```typescript
interface WidgetData {
  id: string;
  type: WidgetType;
  title: string;
  data: any[];
  config: WidgetConfig;
  metadata: {
    createdBy: string;
    createdAt: Date;
    filters: FilterState;
  };
}

type WidgetType = "chart" | "table" | "card" | "pie_chart" | "custom";

interface WidgetConfig {
  colors?: string[];
  labels?: string[];
  xAxis?: string;
  yAxis?: string;
  sortBy?: string;
  ascending?: boolean;
}
```

### Filter Type

```typescript
interface FilterState {
  faculty: FACULTY;
  department: Department;
  hall?: Hall;
  semester?: "fall" | "spring" | "summer";
  year?: number;
  customFilters?: Record<string, any>;
}

type FACULTY =
  | "Any"
  | "Agriculture"
  | "Arts"
  | "Basic Medical Sciences"
  | "Education"
  | "Law"
  | "Science"
  | "Social Sciences"
  | "Technology";
```

---

## API Endpoints

### Authentication

```
POST /api/login
Body: { email: string; password: string }
Response: { user: USER; token: string }

POST /api/logout
Headers: { Authorization: "Bearer token" }
Response: { success: boolean }

GET /api/auth/check
Headers: { Authorization: "Bearer token" }
Response: { user: USER; valid: boolean }
```

### Statistics

```
POST /api/statistics
Body: FilterState
Response: {
  data: any[];
  summary: StatisticsSummary;
  charts: ChartData[];
}

GET /api/statistics/:id
Response: WidgetData
```

### Student Management

```
GET /api/students
Query: { faculty?: string; department?: string; search?: string }
Response: StudentListResponse[]

GET /api/students/:id
Response: StudentData

POST /api/students/export
Body: { format: "csv" | "pdf"; data: any[] }
Response: binary file
```

### Faculty & Department

```
GET /api/faculties
Response: FACULTY[]

GET /api/departments/:faculty
Response: Department[]

GET /api/halls/:department
Response: Hall[]
```

---

## State Flow Diagram

```
User Action (e.g., Generate Report)
        ↓
ReportGenerator Component
        ↓
Collect Inputs (Faculty, Department)
        ↓
API Request to Backend
        ↓
Transform Response to WidgetData
        ↓
Emit to SchoolStatsApp Parent
        ↓
setGeneratedWidgets() → Zustand Store
        ↓
DynamicWidget Components Re-render
        ↓
Display to User
```

---

## Common Patterns

### Using Store Selectors

```typescript
// Single value selector
const user = useAppStore((state) => state.user);

// Multiple values (creates new object on each render)
const { user, generatedWidgets } = useAppStore((state) => ({
  user: state.user,
  generatedWidgets: state.generatedWidgets,
}));

// Action use
const setUser = useAppStore((state) => state.setUser);

// All state (not recommended)
const store = useAppStore();
```

### Conditional Rendering Based on Auth

```typescript
const user = useAppStore((state) => state.user);

if (!user) {
  return <Navigate to="/login" />;
}

return <Dashboard user={user} />;
```

### Adding Widgets

```typescript
const handleReportGenerated = (widget: WidgetData) => {
  setGeneratedWidgets((prev) => [widget, ...prev]);
  // Or using addGeneratedWidget
  // addGeneratedWidget(widget);
};
```

---

## Performance Considerations

### Rendering Optimization

1. **Memoize expensive components:**

   ```typescript
   const MemoizedChart = memo(Chart);
   ```

2. **Use proper selectors:**

   ```typescript
   // ✅ Good - selector creates consistent reference
   const user = useAppStore((state) => state.user);

   // ❌ Bad - creates new object every render
   const userData = useAppStore((state) => ({
     user: state.user,
   }));
   ```

3. **Lazy load components:**

   ```typescript
   const HeavyChart = lazy(() => import('./HeavyChart'));

   <Suspense fallback={<Loading />}>
     <HeavyChart />
   </Suspense>
   ```

### Bundle Size

- React Router handles code splitting automatically
- Each route is a separate chunk
- Heavy libraries (Recharts) only loaded when needed

### State Updates

- Zustand batches updates automatically
- Avoid creating new objects unnecessarily
- Use immutable patterns for updates

---

## Debug Utilities

### Check Store State

```typescript
// In browser console
import { useAppStore } from "~/store/useAppStore";
const store = useAppStore.getState();
console.log(store);
```

### Monitor API Calls

```typescript
// In Network tab of DevTools
// Filter by /api/ to see backend calls
```

### React DevTools

- Install React Developer Tools extension
- View component hierarchy
- Check prop values
- Inspect Zustand store

---

## Common Issues & Solutions

| Issue               | Cause                | Solution                               |
| ------------------- | -------------------- | -------------------------------------- |
| Widgets not loading | API error            | Check network tab, verify backend URL  |
| User not persisting | localStorage cleared | Check localStorage permissions         |
| Styles flickering   | CSS loading async    | Add preload link in HTML head          |
| Slow rendering      | Too many re-renders  | Memoize components, optimize selectors |
| API CORS error      | Backend CORS config  | Add Access-Control headers in backend  |

---

**Last Updated:** March 18, 2026
