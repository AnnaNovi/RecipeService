import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { environment as env } from 'src/environments/environment';

import { IngredientsService } from './ingredients.service';

import { ingredientsNamesResponse, ingredients } from '../../models';

describe('IngredientsService', () => {
  let ingredientsService: IngredientsService;
  let httpClientTestingModule: HttpClientTestingModule;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let ingredientsResponse: ingredientsNamesResponse;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    ingredientsService = TestBed.inject(IngredientsService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);

    ingredientsResponse = {
      meals: [
        {
          idIngredient: '1',
          strIngredient: 'Chicken',
          strDescription: 'The chicken is a type of domesticated...',
          strType: null,
        },
        {
          idIngredient: '33',
          strIngredient: 'Bramley Apples',
          strDescription: null,
          strType: null,
        },
      ],
    };
  });
  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(ingredientsService).toBeTruthy();
  });

  it('should call private method getIngredientsAPI$ and return an object type of ingredientsNamesResponse', () => {
    ingredientsService['getIngredientsAPI$']().subscribe(
      (response: ingredientsNamesResponse) => {
        expect(response).toEqual(ingredientsResponse);
      }
    );

    const req = httpTestingController.expectOne({
      method: 'GET',
      url: `${env.BASE_URL}/list.php?i=list`,
    });
    req.flush(ingredientsResponse);
  });

  it('should call method getIngredients$ and return a private property ingredientsList$', () => {
    expect(ingredientsService.getIngredients$()).toEqual(
      ingredientsService['ingredientsList$']
    );

    const req = httpTestingController.expectOne({
      method: 'GET',
      url: `${env.BASE_URL}/list.php?i=list`,
    });
    req.flush(ingredientsResponse);
  });

  it('should equal initial value of private property ingredientsList$ to null', () => {
    ingredientsService['ingredientsList$'].subscribe((response: null) => {
      expect(response).toBeNull();
    });
  });

  it('should equal value of private property ingredientsList$ to type ingredients[] after next(ingredients[])', () => {
    const expectedIngredients: ingredients[] = [
      {
        id: '1',
        title: 'Chicken',
        description: 'The chicken is a type of domesticated...',
      },
      {
        id: '33',
        title: 'Bramley Apples',
        description: null,
      },
    ];
    ingredientsService['ingredientsList$'].next(expectedIngredients);
    expect(ingredientsService['ingredientsList$'].getValue()).toEqual(
      expectedIngredients
    );
  });
});

