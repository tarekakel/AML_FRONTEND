import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-forget-password',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
    templateUrl: './forget-password.component.html',
    styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  form: FormGroup;
  message = '';
  constructor(private fb: FormBuilder, private auth: AuthService) {

    this.form = this.fb.group({ email: ['', [Validators.required, Validators.email]] });

  }




  onSubmit() {
    if (this.form.invalid) return;
    const { email } = this.form.value;
    this.auth.requestPasswordReset(email!).subscribe({
      next: () => {
        this.message = 'Reset link sent. Check your email.';
        this.form.reset();
      },
      error: () => {
        this.message = 'Email not found or server error.';
      },
    });
  }
  getControl(name: string) {
    return this.form.get(name);
  }


}
