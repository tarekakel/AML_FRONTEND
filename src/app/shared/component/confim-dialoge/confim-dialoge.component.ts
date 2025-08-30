import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-confim-dialoge',
    templateUrl: './confim-dialoge.component.html',
    styleUrl: './confim-dialoge.component.scss',
    standalone: false
})
export class ConfimDialogeComponent {


  @Input() show = false;
  @Input() title = 'Confirm Action';
  @Input() message = 'Are you sure you want to proceed?';
  @Input() isLoading = false;

  /** If true, show the Notes textarea */
  @Input() showNoteField = false;


  @Output() confirm = new EventEmitter<string>();
  @Output() cancel = new EventEmitter<void>();

  /** Bound to the textarea */
  note = '';

  onConfirm() {
    this.confirm.emit(this.note);
  }

  onCancel() {
    this.cancel.emit();
  }


}
