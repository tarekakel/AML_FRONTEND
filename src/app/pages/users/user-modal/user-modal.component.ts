import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../models/user';

@Component({
  selector: 'app-user-modal',

  templateUrl: './user-modal.component.html',
  styleUrl: './user-modal.component.scss'
})
export class UserModalComponent {
  @Input() user: User | null = null;
  @Input() show = false;
  @Output() save = new EventEmitter<User>();
  @Output() close = new EventEmitter<void>();

  localUser: User = { id: 0, email: '', username: '', role: '' };

  ngOnChanges() {
    this.localUser = this.user ? { ...this.user } : { id: 0, email: '', username: '', role: '' };
  }

  handleSubmit() {
    this.save.emit(this.localUser);
  }
}
