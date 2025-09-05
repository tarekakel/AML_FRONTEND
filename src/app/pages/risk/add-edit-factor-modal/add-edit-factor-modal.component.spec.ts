import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditFactorModalComponent } from './add-edit-factor-modal.component';

describe('AddEditFactorModalComponent', () => {
  let component: AddEditFactorModalComponent;
  let fixture: ComponentFixture<AddEditFactorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditFactorModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditFactorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
