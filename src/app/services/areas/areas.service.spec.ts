import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { environment as env } from 'src/environments/environment';

import { AreasService } from './areas.service';

import { areasNamesResponse, areasNamesResponseData, areas } from '../../models';
import { BehaviorSubject } from 'rxjs';

describe('AreasService', () => {
  let areasService: AreasService;
  let httpClientTestingModule: HttpClientTestingModule;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    areasService = TestBed.inject(AreasService);
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

    //@ts-expect-error - private method
    areasService.getAreasAPI$().subscribe((response): areasNamesResponse => {
      expect(response).toEqual(areasResponse);
    });

    const req = httpTestingController.expectOne({
      method: 'GET',
      url: `${env.BASE_URL}/list.php?a=list`,
    });

    req.flush(areasResponse);
  });

  it('should call method getAreas$ and return a BehaviorSubject<areas[]>', () => {
    //@ts-expect-error - private property
    const areas: BehaviorSubject<areas[]> = areasService.areasList$;

    const result = areasService.getAreas$();
    expect(result).toEqual(areas);

    const req = httpTestingController.expectOne({
      method: 'GET',
      url: `${env.BASE_URL}/list.php?a=list`,
    });

    req.flush(areas);
  });

});
