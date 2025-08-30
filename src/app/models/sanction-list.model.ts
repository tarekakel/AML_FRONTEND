export interface ResultItem {
  id: number;
  detail: string;
  status: string;
  first_name: string;
  last_name: string;
  auto_reject: boolean;
  date_of_birth: Date;
  nationality:string;
  create_dt:Date;
  total_score:number  ;
  action_by:string  ;
  notes:string  ;


  // add more fields here…
}

export interface RequestItem {
  id: number;
  first_name: string;
  last_name: string;
  created_by: string;
  create_dt: Date;
  nationality: string;
  result_count: string;
  results: ResultItem[];
}

