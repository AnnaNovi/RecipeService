import { TestBed } from '@angular/core/testing';

import { RecipeBySearchResolver } from './recipe-by-search.resolver';

describe('RecipeBySearchResolver', () => {
  let resolver: RecipeBySearchResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(RecipeBySearchResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
