import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { complexPasswordValidator } from '../../validators/password.validator';
import { matchEmailAndPassword } from '../../validators/match-fields.validator';
import { ApiResponse } from '../../models/shared';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-reset-password',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
    templateUrl: './reset-password.component.html',
    styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {

  uid = '';
  token = '';

  message = '';
  form: FormGroup;
  error: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      password: ['', [Validators.required, complexPasswordValidator]],
      re_password: ['', Validators.required]
    }, { validators: matchEmailAndPassword });


  }

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('uid') || '';
    this.token = this.route.snapshot.paramMap.get('token') || '';
  }
  onSubmit() {
    if (this.form.invalid) return;
    const password = this.form.value.password!;
    this.auth.confirmPasswordReset({ uid: this.uid, token: this.token, password }).subscribe({
      next: (response) => {


        const apiResponse: ApiResponse<any> = response;
        if (apiResponse.isSuccess) {
          this.toastr.success(apiResponse?.data?.msg, 'Success');
        }
        else {
          this.error = apiResponse.errors.map(msg => `*${msg}`);
        }

        // setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        const apiResponse: ApiResponse<any> = err.error;
        if (apiResponse?.errors?.length) {
          this.error = apiResponse.errors.map(msg => `*${msg}`);
        } else {
          this.toastr.error('Unexpected error occurred.', 'Error');
        }

      },
    });


  }

  getControl(name: string) {
    return this.form.get(name);
  }
}
