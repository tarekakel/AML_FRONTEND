import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfimDialogeComponent } from './confim-dialoge.component';

describe('ConfimDialogeComponent', () => {
  let component: ConfimDialogeComponent;
  let fixture: ComponentFixture<ConfimDialogeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfimDialogeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfimDialogeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
