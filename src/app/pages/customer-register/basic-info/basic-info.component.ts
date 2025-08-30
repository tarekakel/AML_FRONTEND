import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { WizardService } from '../../../services/aml-customer/wizard.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { SharedService } from '../../../shared/service/shared.service';
import { ApiResponse, LookupItem, LookupMaster } from '../../../models/shared';
import { CustomerType } from '../../../shared/constant';
import { startWith } from 'rxjs';

@Component({
    selector: 'app-basic-info',
    templateUrl: './basic-info.component.html',
    styleUrl: './basic-info.component.scss',
    standalone: false
})
export class BasicInfoComponent {
  basicInfoForm!: FormGroup;
  bsConfig: Partial<BsDatepickerConfig> = {
    containerClass: 'custom-datepicker',
    dateInputFormat: 'DD/MM/YYYY'
  };


  CustomerType = CustomerType;
  isResetLoading = false;
  showConfirmModal = false;
  genderOptions = ['Male', 'Female'];
  idTypeOptions: LookupItem[] = [];
  natOptions: LookupItem[] = [];
  customerOptions: LookupItem[] = [];
  corRoles: LookupItem[] = [];

   
  selectedIndex?: number;

  constructor(private fb: FormBuilder, public wizard: WizardService, private sharedService: SharedService) { }
  ngOnInit() {
    this.basicInfoForm = this.wizard.basicScreeningInfo;
    this.getMasters();
    this.onCustomerTypeChange();

  }

  getMasters() {
    this.sharedService.getMasters().subscribe((result: ApiResponse<LookupMaster>) => {
      this.idTypeOptions = result.data.id_types;
      this.natOptions = result.data.nationalities;
      this.customerOptions = result.data.customer_types;
      this.corRoles = result.data.cor_roles;
    });
  }


  getControl(name: string) {
    return this.basicInfoForm.get(name);
  }


  isInvalid(name: string, groupIndex?: number) {

    if (groupIndex != null) {
      const group = this.names.at(groupIndex) as FormGroup;
      return this.getControl(name)?.invalid && this.getControl(name)?.touched;
    }
    return this.getControl(name)?.invalid && this.getControl(name)?.touched



  }

  // Getter for easy access in template
  get names(): FormArray {
    return this.basicInfoForm.get('names') as FormArray;
  }
  // Subscribe to customerType changes

  private onCustomerTypeChange() {
    const customerTypeControl = this.basicInfoForm.get('customerType');

    customerTypeControl?.valueChanges
      .pipe(
        startWith(customerTypeControl.value)    // emit the initial type
      )
      .subscribe(type => {
        this.names.clear();                     // wipe out existing entries

        if (type == CustomerType.Corporate) {  // only add when corporate
          this.addNameGroup();
        }
      });
  }

  // Create a FormGroup for each name entry
  private createNameGroup(): FormGroup {
    return this.fb.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      role: ['', Validators.required]
    });
  }
  // Add one FormGroup to the FormArray
  addNameGroup() {
    this.names.push(this.createNameGroup());
  }

  // Remove a FormGroup at index
  removeNameGroup(index: number) {
    this.showConfirmModal = true;
    this.selectedIndex = index;
  }


  handleConfirm() {
    this.showConfirmModal = false;
    this.names.removeAt(this.selectedIndex!);
  }


  handleCancel() {
    this.showConfirmModal = false;
    this.selectedIndex = undefined;
  }
}
