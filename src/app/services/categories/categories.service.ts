import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, BehaviorSubject } from 'rxjs';
import { environment as env } from 'src/environments/environment.prod';

import {
  categories,
  categoriesResponse,
  categoriesResponseData,
} from '../../models';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private categoriesList$: BehaviorSubject<null | categories[]> =
    new BehaviorSubject<null | categories[]>(null);

  constructor(private http: HttpClient) {}

  public getCategories$(): BehaviorSubject<categories[] | null> {
    if (!this.categoriesList$.getValue()) {
      this.getCategoriesAPI$()
        .pipe(
          map(
            (response: categoriesResponse): categoriesResponseData[] =>
              response.categories
          ),
          map((response: categoriesResponseData[]): categories[] =>
            response.map((item: categoriesResponseData) => {
              return {
                id: item.idCategory,
                title: item.strCategory,
                imageURL: item.strCategoryThumb,
                description: item.strCategoryDescription,
              };
            })
          )
        )
        .subscribe((categories: categories[]) => {
          this.categoriesList$.next(categories);
        });
    }
    return this.categoriesList$;
  }

  private getCategoriesAPI$(): Observable<categoriesResponse> {
    return this.http.get<categoriesResponse>(`${env.BASE_URL}/categories.php`);
  }
}
