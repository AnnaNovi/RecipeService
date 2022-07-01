import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment as env } from 'src/environments/environment.prod';

import { categories, categoriesResponse, categoriesResponseData } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  private getCategoriesAPI(): Observable<categoriesResponse> {
    return this.http.get<any>(`${env.BASE_URL}/categories.php`);
  }

  getCategories(categoriesArray: categories[]) {
    this.getCategoriesAPI()
      .pipe(
        map((response: categoriesResponse): categories[] => {
          const categories = response.categories;
          const categoriesArray = categories.map(
            (item: categoriesResponseData) => {
              return {
                id: item.idCategory,
                title: item.strCategory,
                imageURL: item.strCategoryThumb,
                description: item.strCategoryDescription,
              };
            }
          );
          return [ ...categoriesArray ];
        })
      )
      .subscribe((categories: categories[]) => {
        return categoriesArray.push(...categories);
      });
  }
}
