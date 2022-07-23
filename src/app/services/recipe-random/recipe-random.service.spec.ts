import { TestBed } from '@angular/core/testing';

import { RecipeRandomService } from './recipe-random.service';

describe('RecipeRandomService', () => {
  let service: RecipeRandomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeRandomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
