import { Component, OnInit } from '@angular/core';
import { RiskService } from '../../../services/risk-matrix/risk.service';
import { RiskFactor, RiskFactorGroup } from '../../../models/risk.model';
import { ApiResponse } from '../../../models/shared';
import { RiskDataType } from '../../../models/sanction-list.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-risk-category-list',
  standalone: false,
  templateUrl: './risk-category-list.component.html',
  styleUrl: './risk-category-list.component.scss'
})
export class RiskCategoryListComponent implements OnInit {
  selectedCategory: RiskFactorGroup | null = null;
  selectedSubCategory: RiskFactor | null = null;

  categories: RiskFactorGroup[] = []
  dataTypes: RiskDataType[] = []
  dataTypesRec: Record<number, string> = {};
  expandedFactor: any = null;
  showCategoryModal = false;


  editingCategory: any = { name: '', description: '' };


  showFactorModal = false;
  editingFactor: RiskFactor | null = null;

  constructor(private riskService: RiskService, private toaster: ToastrService) {

  }
  ngOnInit(): void {
    this.loadRiskFactoDataTypes();
    this.loadRiskFactorGroups()

  }

  selectCategory(cat: RiskFactorGroup) {
    this.selectedCategory = cat;
    this.selectedSubCategory = null;
    this.expandedFactor = null;

  }
  selectSubCategory(sub: RiskFactor) {
    this.selectedSubCategory = sub;
  }

  addSubCategory() {
    if (!this.selectedCategory) return;
    // const newSub: RiskFactorGroup = {
    //   id: Date.now(),
    //   name: 'New Subcategory',
    // };
    // this.selectedCategory.subCategories.push(newSub);
    // this.selectedSubCategory = newSub;
  }

  updateSubCategory(name: string) {
    if (this.selectedSubCategory) {
      this.selectedSubCategory.name = name;
    }
  }

  deleteSubCategory(id: number | undefined) {
    // if (!this.selectedCategory) return;
    // this.selectedCategory.subCategories =
    //   this.selectedCategory.subCategories.filter(s => s.id !== id);
    // this.selectedSubCategory = null;
  }
  loadRiskFactorGroups() {
    this.riskService.getGroups().subscribe((resp: ApiResponse<RiskFactorGroup[]>) => {

      this.categories = resp.data;



    }
    );
  }

  loadRiskFactoDataTypes() {
    this.riskService.getDataTypes().subscribe((resp: ApiResponse<RiskDataType[]>) => {

      this.dataTypes = resp.data;

      this.dataTypesRec = resp.data.reduce((acc, dt) => {
        acc[dt.id] = dt.name;
        return acc;
      }, {} as Record<number, string>);

    }
    );
  }

  toggleValues(factorId: number | undefined) {
    if (this.expandedFactor?.id === factorId) {
      this.expandedFactor = null;
    } else {
      this.expandedFactor = this.selectedCategory?.factors?.find((f: any) => f.id === factorId);
    }
  }
  getDataTypeName(typeId: number): string {
    return this.dataTypesRec[typeId] || 'Unknown';
  }

  addParameterValue(factorId: number) { }
  editParameterValue(val: any) { }
  deleteParameterValue(valId: number) { }



  // open for ADD
  openAddEditCategory(cat: RiskFactorGroup | null) {
    if (cat) {
      this.editingCategory = { ...cat };
    }
    else {
      this.editingCategory = null;
    }

    this.showCategoryModal = true;
  }

  // close modal
  closeCategoryModal() {
    this.showCategoryModal = false;
  }

  // handle SAVE (from modal)
  saveCategory(category: any) {
    if (!category?.id) {
      this.riskService.create(category!).subscribe((res: ApiResponse<RiskFactorGroup>) => {
        if (res?.isSuccess) {
          this.loadRiskFactorGroups();
          this.closeCategoryModal();

          this.toaster.success("Category  Saved Succefully", "Success");
        }
        else {
          this.toaster.error("Error While Saving Category ", "Error");
        }

      });
    }
    else {
      this.riskService.update(category!).subscribe((res: ApiResponse<RiskFactorGroup>) => {
        if (res?.isSuccess) {
          this.loadRiskFactorGroups();
          this.closeCategoryModal();

          this.toaster.success("Category  Updated Succefully", "Success");
        }
        else {
          this.toaster.error("Error While Update Category ", "Error");
        }

      });
    }
  }

  openAddEditFactor(groupId: number|null, factor: RiskFactor | null) {
    if (groupId && !factor)  {
          this.editingFactor = { name: '', description: '', weight: 0, data_type: 1, is_active: true, is_deleted: false, group_id: groupId };
    }
    else if (factor){
       this.editingFactor ={...factor}
    }

    this.showFactorModal = true;
  }

  openEditFactor(factor: RiskFactor) {
    this.editingFactor = { ...factor };
    this.showFactorModal = true;
  }

  closeFactorModal() {
    this.showFactorModal = false;
  }

  saveFactor(factor: RiskFactor) {
    if (factor.id) {
      // this.factorService.update(factor).subscribe(...)
    } else {
      // this.factorService.create(factor).subscribe(...)
    }
    this.closeFactorModal();
  }
}
