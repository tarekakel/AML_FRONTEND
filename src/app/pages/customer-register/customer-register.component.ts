import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { EMPTY, Subscription } from 'rxjs';
import { catchError, filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { WizardService } from '../../services/aml-customer/wizard.service';
import { AmlCustomerService } from '../../services/aml-customer/aml-customer.service';
import { FuzzySearchResult, PersonMatch } from '../../models/aml-customer.model';
import { ToastrService } from 'ngx-toastr';
import {extractErrorMessage} from '../../shared/helper/helper';
import { formatDate } from '@angular/common';
@Component({
    selector: 'app-customer-register',
    templateUrl: './customer-register.component.html',
    styleUrl: './customer-register.component.scss',
    standalone: false
})
export class CustomerRegisterComponent implements OnInit {
  steps = [1, 2, 3];
  currentStep = 1;
  stepTitles: { [key: number]: string } = {
    1: 'Basic Screnning Information',
    2: 'Match List',
    3: 'Review & Submit'
  };

  maxStep = 3;


  fuzzyResmatches!: FuzzySearchResult;
  constructor(
    public wizard: WizardService,
    private router: Router,
    private route: ActivatedRoute,
    private amlService: AmlCustomerService,
    private toaster: ToastrService,
  ) { }





  ngOnInit() {
    this.getStep();
  }
  getStep() {
    this.route.firstChild!.url
      .pipe(
        map(segments => segments.map(s => s.path)), // ["step","2"]
        map(paths => +paths[1] || 1),            // coerce "2" → 2

      )
      .subscribe(stepNum => {
        console.log('stepNum', stepNum);

        ; this.currentStep = stepNum
      });

  }
  get currentForm(): FormGroup {
    switch (this.currentStep) {
      case 1: return this.wizard.basicScreeningInfo;
      case 2: return this.wizard.kycInfoForm;
      case 3: return this.wizard.reviewForm;
      default: return this.wizard.basicScreeningInfo;
    }
  }
  next() {
    if (!this.currentForm) {
      this.getStep();
    }
    this.currentForm.markAllAsTouched();

    if (this.currentForm.valid && this.currentStep < this.maxStep) {
      if (this.currentStep == 1) {
        const first_name = this.getControl('firstName')?.value?.trim();
        const last_name = this.getControl('lastName')?.value?.trim();
        // IMPORTANT: nationality should be the PK (id), not a label string
        const nationality = this.getControl('nationality')?.value; // ensure this is an ID
        const dob = this.getControl('dateOfBirth')?.value;
        const mid_name = this.getControl('middleName')?.value;

        const searchPayload = { first_name, last_name, nationality };

        // If using idempotency:
        // customerPayload.draft_key = this.draftKey;


        // this.amlService.search(searchPayload).subscribe({
        //   next: (res) => {
        //     if (res?.isSuccess) {
        //       this.fuzzyResmatches = res.data;

        //       this.wizard.setPersonMatches(this.fuzzyResmatches);

        //       this.currentStep += 1;
        //       this.router.navigate(['../wizard/step', this.currentStep], { relativeTo: this.route });
        //     }
        //     else {
        //       // this.toaster.error(res?.,'Error');
        //     }

        //   },
        //   error: (err) => {
        //     this.toaster.error(err?.statusText, 'Error');
        //     // console.error('Search failed', err);
        //   },

        // });


        this.amlService.search(searchPayload).pipe(
          switchMap((res) => {
            if (!res?.isSuccess) return EMPTY;
            const customerPayload: any = {
              first_name, last_name, nationality, status: 'PENDING', date_of_birth: formatDate(dob, 'yyyy-MM-dd', 'en-GB'), middle_name: mid_name, audit_id: res.data.audit_id
            };
            this.fuzzyResmatches = res.data;
            this.wizard.setPersonMatches(this.fuzzyResmatches);

            return this.amlService.createNewCustomer(customerPayload);
          }),
          tap((created) => {
            // Optionally store the ID if needed later for audit
            //    console.log('Created customer with ID:', created?.id);
            if (created.isSuccess) {
              this.toaster.success("Customer Details Saved Succefully", "Success");
              this.currentStep += 1;
              this.router.navigate(['../wizard/step', this.currentStep], { relativeTo: this.route });
            }
            else {
              const msg = extractErrorMessage(created);
              this.toaster.error(msg, 'Error');
            }

          }),
          catchError((err) => {
            const msg = extractErrorMessage(err?.error);
            this.toaster.error(msg, 'Error');
            return EMPTY;
          })
        ).subscribe();


      }
    }
  }

  back() {
    if (this.currentStep > 1) {
      this.currentStep -= 1;
      this.router.navigate(['../wizard/step', this.currentStep], { relativeTo: this.route });
    }
  }


  getControl(name: string) {
    return this.currentForm.get(name);
  }

  // submit() {
  //   alert('submited')
  //   if (this.currentForm.valid) {
  //     console.log(this.wizard.wizardForm.value);
  //     // send to API…
  //   }
  // }


}
