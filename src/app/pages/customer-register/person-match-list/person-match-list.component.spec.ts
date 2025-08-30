import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonMatchListComponent } from './person-match-list.component';

describe('PersonMatchListComponent', () => {
  let component: PersonMatchListComponent;
  let fixture: ComponentFixture<PersonMatchListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonMatchListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonMatchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
