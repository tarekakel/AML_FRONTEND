import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { User } from '../../../models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-modal',

  templateUrl: './user-modal.component.html',
  styleUrl: './user-modal.component.scss'
})
export class UserModalComponent implements OnInit, OnChanges {
  @Input() user: User | null = null;
  @Input() show = false;
  @Output() save = new EventEmitter<User>();
  @Output() close = new EventEmitter<void>();
  form: FormGroup;
  //localUser: User = { id: 0, email: '', username: '', role: '' };
  /**
   *
   */
  constructor(private fb: FormBuilder,) {
    this.form = this.fb.group({
      id: [null],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      is_active: [true],
      is_blocked: [false],
      // role: ['', Validators.required],
    });

  }
  ngOnInit(): void {
    this.form.get('email')?.valueChanges.subscribe(email => {
      this.form.get('username')?.setValue(email, { emitEvent: false });
    });
  }


  ngOnChanges(changes: SimpleChanges) {
    // whenever `user` Input changes, update the form
    if (changes['user'] && this.user) {
      this.form.patchValue({
        id: this.user.id,
        username: this.user.username,
        email: this.user.email,
        is_active: this.user.is_active,
        is_blocked: this.user.is_blocked,
        is_deleted: this.user.is_deleted

      });

    }
    // optionally reset form when modal is closed
    if (changes['show'] && !this.show) {
      this.form.reset({ is_active: true, is_blocked: false, is_deleted: false });

    }

  }

  handleSubmit() {
    if (this.form.invalid) return;


    this.save.emit(this.form.value);
  }

  getControl(controlName: string) {
    return this.form.get(controlName);
  }
}
