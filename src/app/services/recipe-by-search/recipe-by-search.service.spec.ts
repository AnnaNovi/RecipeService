import { TestBed } from '@angular/core/testing';

import { RecipeBySearchService } from './recipe-by-search.service';

describe('RecipeBySearchService', () => {
  let service: RecipeBySearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeBySearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
