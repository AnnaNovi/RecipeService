import { TestBed } from '@angular/core/testing';

import { RecipesListForHomePageResolver } from './recipes-list-for-home-page.resolver';

describe('RecipesListForHomePageResolver', () => {
  let resolver: RecipesListForHomePageResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(RecipesListForHomePageResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
