import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-person-details-modal',

  templateUrl: './person-details-modal.component.html',
  styleUrl: './person-details-modal.component.scss'
})
export class PersonDetailsModalComponent {

  @Input() details: any; // Pass details_dict from parent
  @Input() visible: boolean = false;
  @Output() close = new EventEmitter<void>();
  closeModal() {
    this.close.emit();
  }
    getFullName(): string {
    const ind = this.details?.INDIVIDUAL;
    if (!ind) return '';
    return [ind.FIRST_NAME, ind.SECOND_NAME, ind.THIRD_NAME, ind.FOURTH_NAME]
      .filter(Boolean)
      .join(' ');
  }

  getAliases(): any[] {
    const aliases = this.details?.INDIVIDUAL?.INDIVIDUAL_ALIAS;
    if (!aliases) return [];
    return Array.isArray(aliases) ? aliases : [aliases];
  }

  getLastUpdated(): string {
    const last = this.details?.INDIVIDUAL?.LAST_DAY_UPDATED?.VALUE;
    if (!last) return '';
    return Array.isArray(last) ? last.join(', ') : last;
  }
}
