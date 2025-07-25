import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form: FormGroup;
  error = '';


  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {


    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  onSubmit() {
    if (this.form.invalid) return;

    const { username, password } = this.form.value;

    this.auth.login({ username, password }).subscribe({
      next: () => this.router.navigate(['/']),
      error: () => this.error = 'Invalid credentials',
    });
  }

  getControl(name: string) {
    return this.form.get(name);
  }
}
