export interface Passenger {
  admin_id: number;
  email: string;
  password: boolean;
}

export interface CampaignStats {
  visits: number;
  clicks: number;
  leads: number;
  revenue: number;
  cvr: number;
  epc: number;
  ecpm: number;
  publisher_id: number;
  campaign_id: number;
  name: string;
}

export interface DailyStats {
  revenue: number;
  month: string;
}

export interface WeeklyStats {
  revenue: number;
  date: string;
}

export interface DashboardStats {
  daily: DailyStats[];
  weekly: WeeklyStats[];
  campaign: CampaignStats[];
}

export interface LineChart {
  name: string;
  series: {
    name: string;
    value: number;
  }[];
}

export interface WeekStats {
  date: string;
  revenue: number;
  paid: boolean;
}
