import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchListViewComponent } from './search-list-view.component';

describe('SearchListViewComponent', () => {
  let component: SearchListViewComponent;
  let fixture: ComponentFixture<SearchListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchListViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
