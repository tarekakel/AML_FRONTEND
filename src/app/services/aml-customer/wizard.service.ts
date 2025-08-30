import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuzzySearchResult, PersonMatch } from '../../models/aml-customer.model';

@Injectable({
  providedIn: 'root'
})
export class WizardService {

  wizardForm: FormGroup;
  private _personMatches!: FuzzySearchResult;


  constructor(private fb: FormBuilder) {

    this.wizardForm = this.fb.group({
      basicScreeningInfo: this.fb.group({
        customerType: [1, Validators.required],
        firstName: ['', Validators.required],
        middleName: [''],
        lastName: ['', Validators.required],
        dateOfBirth: ['', Validators.required],
        nationality: ['', Validators.required],
        names: this.fb.array([])
        // gender: ['', Validators.required],
        // idType: ['', Validators.required],
        // idNumber: ['', [Validators.required, Validators.minLength(4)]],
        // idIssueDate: [''],
        // idExpiryDate: ['', Validators.required],
        // email: ['', [Validators.required, Validators.email]],
        // phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9]{7,15}$/)]],
        // addressLine1: ['', Validators.required],
        // addressLine2: [''],
        // city: ['', Validators.required],
        // state: ['', Validators.required],
        // postalCode: ['', Validators.required],
        // country: ['', Validators.required]
      }),
    });
  }

  get basicScreeningInfo(): FormGroup {
    return this.wizardForm.get('basicScreeningInfo') as FormGroup;
  }

  get kycInfoForm(): FormGroup {
    return this.wizardForm.get('kycInfo') as FormGroup;
  }

  get reviewForm(): FormGroup {
    return this.wizardForm.get('review') as FormGroup;
  }

  setPersonMatches(matches: FuzzySearchResult) {
    this._personMatches = matches;
  }

  getPersonMatches(): FuzzySearchResult {
    return this._personMatches;
  }

}
