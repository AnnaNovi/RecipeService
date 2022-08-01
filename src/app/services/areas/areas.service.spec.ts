import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { environment as env } from 'src/environments/environment';

import { AreasService } from './areas.service';

import { areasNamesResponse, areas } from '../../models';

describe('AreasService', () => {
  let areasService: AreasService;
  let httpClientTestingModule: HttpClientTestingModule;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    areasService = TestBed.get(AreasService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(areasService).toBeTruthy();
  });

  it('should call private method getAreasAPI$ and return an object type of areasNamesResponse', () => {
    const areasResponse: areasNamesResponse = {
      meals: [{ strArea: 'American' }],
    };

    areasService['getAreasAPI$']().subscribe((response: areasNamesResponse) => {
      expect(response).toEqual(areasResponse);
    });

    const req = httpTestingController.expectOne({
      method: 'GET',
      url: `${env.BASE_URL}/list.php?a=list`,
    });

    req.flush(areasResponse);
  });

  it('should call method getAreas$ and return a private property areasList$', () => {
    const areasResponse: areasNamesResponse = {
      meals: [{ strArea: 'American' }],
    };
    expect(areasService.getAreas$()).toEqual(areasService['areasList$']);

    const req = httpTestingController.expectOne({
      method: 'GET',
      url: `${env.BASE_URL}/list.php?a=list`,
    });

    req.flush(areasResponse);
  });

  it('should equal initial value of private property areasList$ to null', () => {
    areasService['areasList$'].subscribe((areas: null) => {
      expect(areas).toBeNull();
    });
  });

  it('should equal value of private property areasList$ to type areas[] after next(areas[])', () => {
    const areasResult: areas[] = [{ title: 'American' }];
    areasService['areasList$'].next(areasResult);
    expect(areasService['areasList$'].getValue()).toEqual(areasResult);
  });

});
