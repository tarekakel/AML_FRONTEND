import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edit-category-modal',
  standalone: false,
  templateUrl: './add-edit-category-modal.component.html',
  styleUrl: './add-edit-category-modal.component.scss'
})
export class AddEditCategoryModalComponent implements OnChanges {
  @Input() show = false;                     // control visibility
  @Input() category: any = { name: '', description: '' };  // used for edit or new
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();


  categoryForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['']
    });
  }


  // When parent passes in category (edit mode), patch form values
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['category'] && this.category) {
      this.categoryForm.patchValue({
        name: this.category.name || '',
        description: this.category.description || ''
      });
    }
  }

  onClose() {
    this.close.emit();
    this.categoryForm.reset();
  }

  onSave() {
    if (this.categoryForm.invalid) return;

    const formData = {
      ...this.category,
      ...this.categoryForm.value
    };

    this.save.emit(formData);

    this.categoryForm.reset();
  }
}
