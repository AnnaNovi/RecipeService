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
  private categoriesList$: BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(private http: HttpClient) {}

  private getCategoriesAPI$(): Observable<categoriesResponse> {
    return this.http.get<any>(`${env.BASE_URL}/categories.php`);
  }

  getCategories$(): BehaviorSubject<categories[]> {
    if (!this.categoriesList$.getValue().length) {
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
}
