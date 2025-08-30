import { TestBed } from '@angular/core/testing';
import { SanctionSearchResultService } from './sanction-search-result.service';

 
describe('SanctionSearchResultService', () => {
  let service: SanctionSearchResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SanctionSearchResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
