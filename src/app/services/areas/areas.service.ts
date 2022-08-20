import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';

import { areasNamesResponse, areas } from 'src/app/models/area.model';

@Injectable({
  providedIn: 'root',
})
export class AreasService {
  private areasList$: BehaviorSubject<areas[] | null> = new BehaviorSubject<
    areas[] | null
  >(null);

  constructor(private http: HttpClient) {}

  public getAreas$(): BehaviorSubject<areas[] | null> {
    if (!this.areasList$.getValue()) {
      this.getAreasAPI$()
        .pipe(
          map((response: areasNamesResponse): areas[] =>
            response.meals.map((area) => {
              return {
                title: area.strArea,
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

  private getAreasAPI$(): Observable<areasNamesResponse> {
    return this.http.get<areasNamesResponse>(`${env.BASE_URL}/list.php?a=list`);
  }
}
