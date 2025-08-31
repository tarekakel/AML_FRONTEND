import { Component, OnInit } from '@angular/core';
import { RiskService } from '../../../services/risk-matrix/risk.service';
import { RiskFactorGroup } from '../../../models/risk.model';
import { ApiResponse } from '../../../models/shared';

@Component({
  selector: 'app-risk-category-list',
  standalone: false,
  templateUrl: './risk-category-list.component.html',
  styleUrl: './risk-category-list.component.scss'
})
export class RiskCategoryListComponent implements OnInit {

  categoryResult: RiskFactorGroup[] = []
  constructor(private riskService: RiskService) {

  }
  ngOnInit(): void {
    this.loadRiskFactorGroups()
  }

  loadRiskFactorGroups(){
    this.riskService.getGroups().subscribe((resp: ApiResponse<RiskFactorGroup[]>) => {

        this.categoryResult=resp.data;

        console.log(this.categoryResult);
        
      
    }
  );
  }
}
