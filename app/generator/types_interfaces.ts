export type Role =
  | "HOD"
  | "Dean Of Students"
  | "Vice Chancellor"
  | "Faculty Officer"
  | "Dean Of Faculty";
export type WidgetType =
  | "bar"
  | "line"
  | "area"
  | "pie"
  | "scatter"
  | "restricted";

export interface ChartConfig {
  xKey: string;
  bars?: Array<{ key: string; color?: string; colorKey?: string }>;
  lines?: Array<{ key: string; color: string }>;
  areas?: Array<{
    key: string;
    color: string;
    fill?: boolean;
    strokeDash?: string;
  }>;
  pies?: Array<{ key: string; nameKey: string; colors?: string[] }>;
  scatters?: Array<{ key: string; color: string; name?: string }>;
}

export interface PrintMeta {
  school_name: string;
  school_logo: string;
  address: string;
  generated_by: string;
  generated_at: string;
  disclaimer: string;
}

export interface WidgetData {
  id: string;
  type: WidgetType;
  title: string;
  subtitle?: string;
  tag?: string;
  message?: string;
  width?: "half" | "full";
  data?: any[];
  config?: ChartConfig;
  print_meta?: PrintMeta;
  is_chart?: boolean;
}

export interface SummaryStats {
  revenue?: number;
  total_students?: number;
}

export interface ApiResponse {
  user_role: Role;
  summary_stats: SummaryStats;
  widgets: WidgetData[];
  error?: string;
}

// --- Student List Interfaces ---
export interface Student {
  id: string;
  full_name: string;
  matric_number: string;
  gender: string;
  level_id: string;
  state_of_origin: string;
  department_id: string;
  email: string;
}

export interface StudentListResponse {
  id: string;
  success: boolean;
  count: number;
  data: Student[];
  print_meta: PrintMeta;
  error?: string;
  is_chart?: boolean;
  title?: string;
}

// --- Report Configuration ---
export type Domain = "students" | "staff" | "financials" | "academics";

export interface FilterOption {
  value: string;
  label: string;
}

export interface BreakdownOption {
  id: string;
  label: string;
}

export interface ReportConfig {
  id: Domain;
  label: string;
  breakdowns: BreakdownOption[];
  filters?: {
    label: string;
    options: FilterOption[];
  }[];
}
