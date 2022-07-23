import { TestBed } from '@angular/core/testing';

import { RecipesListForRecipesListPageResolver } from './recipes-list-for-recipes-list-page.resolver';

describe('RecipesListForRecipesListPageResolver', () => {
  let resolver: RecipesListForRecipesListPageResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(RecipesListForRecipesListPageResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
