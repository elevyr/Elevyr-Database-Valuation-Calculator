
export enum LeadSourceType {
  INTERNET = 'INTERNET',
  MIXED = 'MIXED',
  REFERRAL = 'REFERRAL'
}

export enum StrategyType {
  MANUAL = 'MANUAL',
  AUTOMATED = 'AUTOMATED',
  NONE = 'NONE'
}

export interface LeadSourceOption {
  id: LeadSourceType;
  label: string;
  rate: number;
}

export interface StrategyOption {
  id: StrategyType;
  label: string;
}

export interface CalculatorState {
  leads: number;
  commission: number;
  leadSource: LeadSourceType;
}

export const LEAD_SOURCES: LeadSourceOption[] = [
  {
    id: LeadSourceType.INTERNET,
    label: "Mostly Internet/Facebook Leads",
    rate: 0.015 // 1.5%
  },
  {
    id: LeadSourceType.MIXED,
    label: "Mixed / Data Scrapes",
    rate: 0.025 // 2.5%
  },
  {
    id: LeadSourceType.REFERRAL,
    label: "Referrals / Direct Mail",
    rate: 0.04 // 4.0%
  }
];

export const STRATEGIES: StrategyOption[] = [
  {
    id: StrategyType.NONE,
    label: "No Consistent Strategy"
  },
  {
    id: StrategyType.MANUAL,
    label: "Manual Follow-up"
  },
  {
    id: StrategyType.AUTOMATED,
    label: "Automated Drip Campaigns"
  }
];
