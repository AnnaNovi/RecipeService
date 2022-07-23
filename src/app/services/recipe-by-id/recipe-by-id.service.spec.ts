import { TestBed } from '@angular/core/testing';

import { RecipeByIdService } from './recipe-by-id.service';

describe('RecipeByIdService', () => {
  let service: RecipeByIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeByIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
