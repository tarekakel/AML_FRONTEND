// Each query result block
export interface QueryResult<T> {
  code: string;
  description: string;
  data: T[];
}



// Simple count-based queries
export interface CountData {
  count: number;
}

// Time-series data (e.g., trends per day)
export interface HighScoreAlertData {
  day: string;                 // ISO date string
  total_decisions: number;
  high_score_accepted: number;
}

// Status breakdown per action type
export interface ActionTypeStatusData {
  action_type: string;         // e.g. "Auto-Rejected", "Manual Review"
  act_status: string;          // e.g. "accepted", "pending", "rejected"
  total: number;
}


// =========================
// Union Type for All Data
// =========================
export interface DashboardData {
  code: string  ;                // query identifier
  title: string;               // human readable label
  type: "kpi" | "trend" | "donut" | "table"; // what UI component should render
  data: any[];                 // chart/table data payload

}