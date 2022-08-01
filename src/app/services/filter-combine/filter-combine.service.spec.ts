import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AreasService } from '../areas/areas.service';
import { CategoriesService } from '../categories/categories.service';
import { IngredientsService } from '../ingredients/ingredients.service';

import { FilterCombineService } from './filter-combine.service';


describe('FilterCombineService', () => {
  let filterCombineService: FilterCombineService;
  let categoriesService: CategoriesService;
  let areasService: AreasService;
  let ingredientsService: IngredientsService;
  let httpClientTestingModule: HttpClientTestingModule;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoriesService, AreasService, IngredientsService],
    });
    filterCombineService = TestBed.inject(FilterCombineService);
    categoriesService = TestBed.inject(CategoriesService);
    areasService = TestBed.inject(AreasService);
    ingredientsService = TestBed.inject(IngredientsService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {
    expect(filterCombineService).toBeTruthy();
  });

  it('should call method getFilterByType and return correct method by type', () => {
    const expectedAreas = filterCombineService.getFilterByType('area');
    const areas = areasService.getAreas$();
    const expectedCategories = filterCombineService.getFilterByType('category');
    const categories = categoriesService.getCategories$();
    const expectedIngredients = filterCombineService.getFilterByType('ingredient');
    const ingredients = ingredientsService.getIngredients$();

    expect(expectedAreas)
      .withContext('when type is "area"')
      .toBe(areas);
    expect(expectedCategories)
      .withContext('when type is "category"')
      .toBe(categories);
    expect(expectedIngredients)
      .withContext('when type is "ingredient"')
      .toBe(ingredients);
  });
});
