import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { RiskFactor } from '../../../models/risk.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edit-factor-modal',
  standalone: false,
  templateUrl: './add-edit-factor-modal.component.html',
  styleUrl: './add-edit-factor-modal.component.scss'
})
export class AddEditFactorModalComponent {
  @Input() show = false;
  @Input() factor: RiskFactor | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<RiskFactor>();
  factorForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.buildForm();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['factor'] && this.factor) {
      this.factorForm.patchValue(this.factor);
    } else if (changes['factor'] && !this.factor) {
      this.factorForm.reset({ name: '', description: '', weight: 0, data_type: 1 });
    }
  }

  private buildForm() {
    this.factorForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      description: [''],
      weight: [0, Validators.required],
      data_type: [1, Validators.required],
      is_active: [true],
      is_deleted: [false],
      group_id: [null, Validators.required]
    });
  }
  onSave() {
    if (this.factorForm.valid) {
      this.save.emit(this.factorForm.value);
    }
  }
}
