import { TestBed } from '@angular/core/testing';

import { RecipeByFilterService } from './recipe-by-filter.service';

describe('RecipeByFilterService', () => {
  let service: RecipeByFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeByFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
