import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonDetailsModalComponent } from './person-details-modal.component';

describe('PersonDetailsModalComponent', () => {
  let component: PersonDetailsModalComponent;
  let fixture: ComponentFixture<PersonDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonDetailsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
