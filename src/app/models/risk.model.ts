// risk.model.ts
export interface RiskFactor {
  id?: number;
  name: string;
  description: string;
  weight: number;
  data_type: number;
  is_active: boolean;
  is_deleted: boolean;
  group_id?: number;
}

export interface RiskFactorGroup {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
  is_deleted: boolean;
  factors?: RiskFactor[];
}
