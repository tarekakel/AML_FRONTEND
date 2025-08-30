import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';
import { ApiResponse } from '../../models/shared';
import { ToastrService } from 'ngx-toastr';
import { matchEmailAndPassword } from '../../validators/match-fields.validator';
import { complexPasswordValidator } from '../../validators/password.validator';
@Component({
    selector: 'app-register',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  error: any[] = [];

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private toastr: ToastrService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, complexPasswordValidator]],
      re_password: ['', Validators.required]
    }, { validators: matchEmailAndPassword });
  }

  ngOnInit() {
    // Sync username with email
    this.form.get('email')?.valueChanges.subscribe(email => {
      this.form.get('username')?.setValue(email, { emitEvent: false });
    });
  
  }

  onSubmit() {

    if (this.form.invalid) return;
    this.auth.register(this.form.value).subscribe({
      next: (response) => {
        const apiResponse: ApiResponse<any> = response;
        if (apiResponse.isSuccess) {
          this.toastr.success('Registration successful!', 'Success');
        }
      },
      error: (err) => {

        const apiResponse: ApiResponse<any> = err.error;
        if (apiResponse?.errors?.length) {
          this.error = apiResponse.errors.map(msg => `*${msg}`);
        } else {
          this.toastr.error('Unexpected error occurred.', 'Error');
        }

      }
    });
  }

  getControl(name: string) {
    return this.form.get(name);
  }


}
