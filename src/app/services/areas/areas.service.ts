import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';

import {
  areasNamesResponse,
  areasNamesResponseData,
  areas,
} from 'src/app/models';

@Injectable({
  providedIn: 'root',
})
export class AreasService {
  private areasList$: BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(private http: HttpClient) {}

  private getAreasAPI$(): Observable<areasNamesResponse> {
    return this.http.get<any>(`${env.BASE_URL}/list.php?a=list`);
  }

  getAreas$(): BehaviorSubject<areasNamesResponseData[]> {
    if (!this.areasList$.getValue().length) {
      this.getAreasAPI$()
        .pipe(
          map((response: areasNamesResponse): areas[] =>
            response.meals.map((area: areasNamesResponseData) => {
              return {
                title: area.strArea
              };
            })
          )
        )
        .subscribe((areas: areas[]) => {
          this.areasList$.next(areas);
        });
    }
    return this.areasList$;
  }
}
