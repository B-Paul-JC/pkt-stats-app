# Data Structures & Type Definitions Reference

## Complete Type Definitions

### User & Authentication

```typescript
// User Type
interface USER {
  uid: string; // Unique user identifier
  email: string; // User email
  name: string; // User full name
  role: Role; // User role/permissions
  faculty_id: string; // Primary faculty
  department_id: string; // Primary department
  profile_pic?: string; // Profile picture URL
  last_login?: Date; // Last login timestamp
  created_at?: Date; // Account creation date
  status?: "active" | "inactive" | "suspended";
}

// User Roles & Permissions
type Role = "admin" | "staff" | "student" | "guest";

interface RolePermissions {
  admin: ["read", "write", "delete", "manage_users"];
  staff: ["read", "write", "export"];
  student: ["read"];
  guest: ["read_limited"];
}
```

### Academic Structure

```typescript
// Faculty Type
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

// Faculties with Departments
const FACULTIES_DEPARTMENTS: Record<FACULTY, string[]> = {
  Any: ["Any"],
  Agriculture: [
    "Any",
    "Agricultural Economics",
    "Agricultural Extension and Rural Development",
    "Agronomy",
    "Animal Science",
    "Crop Protection and Environmental Biology",
    "Aquaculture and Fisheries Management",
    "Forest Production and Products",
    "Social and Environmental Forestry",
    "Wildlife and Ecotourism Management",
  ],
  Arts: [
    "Any",
    "Arabic and Islamic Studies",
    "Archaeology and Anthropology",
    "Classics",
    "Communication and Language Arts",
    "English Language and Literature",
    "European Studies",
    // ... more departments
  ],
  // ... other faculties
};

interface Department {
  id: string;
  name: string;
  faculty_id: string;
  faculty_name: FACULTY;
  code: string;
  head: string;
  email?: string;
  phone?: string;
}

interface Hall {
  id: string;
  name: string;
  department_id: string;
  capacity: number;
  location: string;
}
```

### Student Data

```typescript
// Student Information
interface Student {
  id: string; // Student ID/Matric Number
  name: string; // Full name
  email: string; // Email address
  phone?: string; // Contact number
  faculty_id: string; // Faculty
  department_id: string; // Department
  level: number; // Academic level (100-500)
  session: string; // Academic session (e.g., "2023/2024")
  status: "active" | "graduated" | "inactive";
  admission_date: Date;
  gender?: "M" | "F" | "Other";
  gpa?: number; // Current GPA
  profile_pic?: string;
}

// Student List Response (from API)
interface StudentListResponse {
  students: Student[];
  total: number;
  page: number;
  page_size: number;
  filters_applied?: FilterState;
  generated_at: Date;
}

// Student Query Filters
interface StudentQueryFilter {
  faculty?: string;
  department?: string;
  hall?: string;
  level?: number;
  session?: string;
  search?: string; // Search by name/ID
  limit?: number;
  offset?: number;
}
```

### Statistics Data

```typescript
// Statistics Query/Filter
interface StatisticsQuery {
  faculty: FACULTY;
  department: string;
  hall?: string;
  semester?: "fall" | "spring" | "summer";
  year?: number;
  metric: "enrollment" | "performance" | "attendance" | "demographics";
  group_by?: "department" | "level" | "gender" | "hall";
  filters?: Record<string, any>;
}

// Statistics Response
interface StatisticsData {
  query: StatisticsQuery;
  summary: {
    total_students: number;
    total_records: number;
    date_generated: Date;
    generated_by: string;
  };
  data: ChartDataPoint[];
  insights: string[];
  charts: ChartConfig[];
}

// Chart Data Point
interface ChartDataPoint {
  label: string;
  value: number;
  percentage?: number;
  change?: number; // Trend indicator
  metadata?: Record<string, any>;
}

// Chart Configuration
interface ChartConfig {
  id: string;
  title: string;
  type: ChartType;
  data: ChartDataPoint[];
  xAxis?: string;
  yAxis?: string;
  colors?: string[];
  legend?: boolean;
  tooltip?: boolean;
  animation?: boolean;
}

type ChartType =
  | "bar"
  | "line"
  | "pie"
  | "area"
  | "radar"
  | "scatter"
  | "composed";
```

### Widget & Report

```typescript
// Widget Data
interface WidgetData {
  id: string; // Unique widget ID
  type: WidgetType; // Widget type
  title: string; // Display title
  description?: string; // Optional description
  data: any[]; // Widget data
  config: WidgetConfig; // Rendering config
  metadata: {
    createdBy: string; // User who created it
    createdAt: Date; // Creation timestamp
    updatedAt?: Date; // Last update time
    filters: FilterState; // Applied filters
    exportable: boolean; // Can be exported
  };
}

type WidgetType =
  | "chart"
  | "table"
  | "card"
  | "pie_chart"
  | "bar_chart"
  | "line_chart"
  | "custom";

interface WidgetConfig {
  // Display
  height?: number; // Widget height in pixels
  width?: number; // Widget width in pixels
  fullWidth?: boolean; // Stretch to full width

  // Chart-specific
  colors?: string[]; // Color palette
  labels?: string[]; // Axis/Legend labels
  xAxis?: string; // X-axis key
  yAxis?: string; // Y-axis key

  // Table-specific
  columns?: TableColumn[];
  sortBy?: string;
  ascending?: boolean;
  pageSize?: number;

  // General
  showLegend?: boolean;
  showTooltip?: boolean;
  animation?: boolean;
  responsive?: boolean;
}

interface TableColumn {
  key: string; // Data key
  label: string; // Display label
  type: "text" | "number" | "date" | "percentage";
  sortable?: boolean;
  width?: number;
  format?: (value: any) => string;
}

// Report (Multiple Widgets)
interface Report {
  id: string;
  title: string;
  description?: string;
  widgets: WidgetData[];
  metadata: {
    createdBy: string;
    createdAt: Date;
    last_modified: Date;
    is_template: boolean;
  };
}
```

### Filter & Query State

```typescript
// Filter State
interface FilterState {
  // Core filters
  faculty: FACULTY;
  department: string;

  // Optional filters
  hall?: string;
  semester?: "fall" | "spring" | "summer";
  year?: number;
  level?: number;

  // Search
  search?: string;

  // Date range
  startDate?: Date;
  endDate?: Date;

  // Custom filters
  customFilters?: Record<string, any>;

  // Pagination
  page?: number;
  pageSize?: number;
}

// Query Result
interface QueryResult<T> {
  data: T[];
  total: number;
  page: number;
  page_size: number;
  has_next: boolean;
  has_previous: boolean;
  filters_applied: FilterState;
}
```

### API Response Types

```typescript
// Generic API Response
interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: APIError;
  timestamp: Date;
}

interface APIError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

// Authentication Response
interface LoginResponse {
  user: USER;
  token: string;
  refresh_token?: string;
  expires_in: number;
}

// Statistics Response
interface StatsResponse {
  statistics: StatisticsData;
  cached: boolean;
  cache_expires: Date;
}

// Batch Response
interface BatchResponse<T> {
  items: T[];
  total: number;
  returned: number;
  timestamp: Date;
}
```

### Store & State

```typescript
// App Store Interface
interface IAppStore {
  // State
  user: USER | null;
  generatedWidgets: WidgetData[];
  isLoading: boolean;
  error?: string;
  notification?: Notification;
  selectedFaculty: FACULTY;
  selectedDepartment: string;
  selectedHall?: string;

  // Actions
  checkAuth: () => void;
  setUser: (user: USER) => void;
  clearUser: () => void;
  setGeneratedWidgets: (widgets: WidgetData[]) => void;
  addGeneratedWidget: (widget: WidgetData) => void;
  removeGeneratedWidget: (widgetId: string) => void;
  updateWidget: (widgetId: string, updates: Partial<WidgetData>) => void;

  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setNotification: (notification: Notification) => void;
  clearNotification: () => void;

  setSelectedFaculty: (faculty: FACULTY) => void;
  setSelectedDepartment: (department: string) => void;
  setSelectedHall: (hall: string) => void;

  logout: () => void;
  reset: () => void;
}

interface Notification {
  id: string;
  message: string;
  type: "success" | "error" | "warning" | "info";
  duration?: number;
  closeable?: boolean;
}
```

### Utility Types

```typescript
// Pagination
interface Pagination {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

// Sort Options
interface SortOptions {
  key: string;
  direction: "asc" | "desc";
}

// Date Range
interface DateRange {
  startDate: Date;
  endDate: Date;
}

// Cache Entry
interface CacheEntry<T> {
  data: T;
  timestamp: Date;
  expiresAt: Date;
  valid: boolean;
}

// Export Options
interface ExportOptions {
  format: "pdf" | "csv" | "xlsx" | "json";
  filename?: string;
  includeHeaders?: boolean;
  includeTimestamp?: boolean;
}
```

---

## Database Schema (Inferred)

Based on the application structure, the backend likely has:

### Users Table

```sql
CREATE TABLE users (
  uid VARCHAR(255) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255),
  role ENUM('admin', 'staff', 'student', 'guest'),
  faculty_id VARCHAR(255),
  department_id VARCHAR(255),
  profile_pic URL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  last_login TIMESTAMP,
  status ENUM('active', 'inactive', 'suspended')
);
```

### Students Table

```sql
CREATE TABLE students (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  faculty_id VARCHAR(255) FOREIGN KEY,
  department_id VARCHAR(255) FOREIGN KEY,
  level INT,
  session VARCHAR(20),
  admission_date DATE,
  status ENUM('active', 'graduated', 'inactive'),
  created_at TIMESTAMP
);
```

### Statistics Table

```sql
CREATE TABLE statistics (
  id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255) FOREIGN KEY,
  faculty_id VARCHAR(255),
  department_id VARCHAR(255),
  metric_type VARCHAR(255),
  data JSON,
  created_at TIMESTAMP,
  expires_at TIMESTAMP
);
```

### Reports Table

```sql
CREATE TABLE reports (
  id VARCHAR(255) PRIMARY KEY,
  title VARCHAR(255),
  user_id VARCHAR(255) FOREIGN KEY,
  widgets JSON,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

---

## API Response Examples

### Login Request

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Login Response

```json
{
  "success": true,
  "data": {
    "user": {
      "uid": "user-123",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "staff",
      "faculty_id": "fac-001",
      "department_id": "dept-001"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expires_in": 86400
  },
  "timestamp": "2024-03-18T10:30:00Z"
}
```

### Statistics Request

```json
{
  "faculty": "Agriculture",
  "department": "Agronomy",
  "metric": "enrollment",
  "group_by": "level",
  "year": 2024
}
```

### Statistics Response

```json
{
  "success": true,
  "data": {
    "summary": {
      "total_students": 450,
      "total_records": 450,
      "date_generated": "2024-03-18T10:30:00Z"
    },
    "data": [
      {
        "label": "Level 100",
        "value": 120,
        "percentage": 26.67
      },
      {
        "label": "Level 200",
        "value": 110,
        "percentage": 24.44
      }
    ],
    "charts": [
      {
        "id": "chart-1",
        "title": "Student Enrollment by Level",
        "type": "bar",
        "data": []
      }
    ]
  },
  "timestamp": "2024-03-18T10:30:00Z"
}
```

---

## Error Codes

```typescript
// HTTP Status Codes
200 OK              // Successful request
201 CREATED         // Resource created
204 NO CONTENT      // Successful, no response body
400 BAD REQUEST     // Invalid input
401 UNAUTHORIZED    // Authentication failed
403 FORBIDDEN       // Permission denied
404 NOT FOUND       // Resource not found
409 CONFLICT        // Resource conflict
429 TOO MANY REQUESTS // Rate limit exceeded
500 INTERNAL SERVER ERROR
503 SERVICE UNAVAILABLE

// Custom Error Codes
AUTH_001 - Invalid credentials
AUTH_002 - Session expired
AUTH_003 - Token invalid
DATA_001 - Invalid filter
DATA_002 - Resource not found
DATA_003 - Permission denied
SYSTEM_001 - Database error
SYSTEM_002 - File operation error
```

---

## Enum Values Reference

```typescript
// Roles
"admin" | "staff" | "student" | "guest";

// Statuses
"active" | "inactive" | "suspended" | "graduated";

// Semesters
"fall" | "spring" | "summer";

// Genders
"M" | "F" | "Other";

// Notification Types
"success" | "error" | "warning" | "info";

// Widget Types
"chart" |
  "table" |
  "card" |
  "pie_chart" |
  "bar_chart" |
  "line_chart" |
  "custom";

// Export Formats
"pdf" | "csv" | "xlsx" | "json";

// Sort Direction
"asc" | "desc";
```

---

## Constants & Configuration

```typescript
// API Configuration
const API_CONFIG = {
  BASE_URL: "http://192.168.3.83/exinsab",
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
};

// Pagination Defaults
const PAGINATION_DEFAULTS = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  MIN_PAGE_SIZE: 5,
};

// Cache Configuration
const CACHE_CONFIG = {
  STATISTICS_CACHE_TIME: 3600000, // 1 hour
  USER_CACHE_TIME: 1800000, // 30 minutes
  WIDGET_CACHE_TIME: 1800000, // 30 minutes
};

// UI Configuration
const UI_CONFIG = {
  NOTIFICATION_DURATION: 4000, // 4 seconds
  ANIMATION_DURATION: 300, // 300ms
  DEBOUNCE_DELAY: 300,
  TOAST_POSITION: "bottom-right",
};

// Validation Rules
const VALIDATION_RULES = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 255,
};
```

---

**Last Updated:** March 18, 2026
**Version:** 1.0
