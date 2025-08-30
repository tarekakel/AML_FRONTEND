import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendBadgeComponent } from './trend-badge.component';

describe('TrendBadgeComponent', () => {
  let component: TrendBadgeComponent;
  let fixture: ComponentFixture<TrendBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrendBadgeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrendBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
