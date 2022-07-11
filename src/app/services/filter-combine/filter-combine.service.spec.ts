import { TestBed } from '@angular/core/testing';

import { FilterCombineService } from './filter-combine.service';

describe('FilterCombineService', () => {
  let service: FilterCombineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterCombineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
