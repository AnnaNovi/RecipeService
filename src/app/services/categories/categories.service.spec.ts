import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { environment as env } from 'src/environments/environment';

import { CategoriesService } from './categories.service';

import { categoriesResponse, categories } from '../../models';

describe('CategoriesService', () => {
  let categoriesService: CategoriesService;
  let httpClientTestingModule: HttpClientTestingModule;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  const categoriesResponse: categoriesResponse = {
    categories: [
      {
        idCategory: '1',
        strCategory: 'Beef',
        strCategoryThumb: 'https://www.themealdb.com/images/category/beef.png',
        strCategoryDescription:
          'Beef is the culinary name for meat from cattle, particularly skeletal muscle. Humans have been eating beef since prehistoric times.[1] Beef is a source of high-quality protein and essential nutrients.[2]',
      },
    ],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    categoriesService = TestBed.get(CategoriesService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);

  });
  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(categoriesService).toBeTruthy();
  });

  it('should call private method getCategoriesAPI$ and return an object type of categoriesResponse', () => {

    categoriesService['getCategoriesAPI$']().subscribe(
      (response: categoriesResponse) => {
        expect(response).toEqual(categoriesResponse);
      }
    );

    const req = httpTestingController.expectOne({
      method: 'GET',
      url: `${env.BASE_URL}/categories.php`,
    });
    req.flush(categoriesResponse);
  });

  it('should call method getCategories$ and return a private property categoriesList$', () => {

    expect(categoriesService.getCategories$()).toEqual(
      categoriesService['categoriesList$']
    );

    const req = httpTestingController.expectOne({
      method: 'GET',
      url: `${env.BASE_URL}/categories.php`,
    });
    req.flush(categoriesResponse);
  });

  it('should equal initial value of private property categoriesList$ to null', () => {
    categoriesService['categoriesList$'].subscribe((categories: null) => {
      expect(categories).toBeNull();
    });
  });

  it('should equal value of private property categoriesList$ to type categories[] after next(categories[])', () => {
    const categoriesResult: categories[] = [
    {
      id: '1',
      title: 'Beef',
      imageURL:
        'https://www.themealdb.com/images/category/beef.png',
      description:
        'Beef is the culinary name for meat from cattle, particularly skeletal muscle. Humans have been eating beef since prehistoric times.[1] Beef is a source of high-quality protein and essential nutrients.[2]',
    }];
    categoriesService['categoriesList$'].next(categoriesResult);
    expect(categoriesService['categoriesList$'].getValue()).toEqual(
      categoriesResult
    );
  });
});

