import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { recipePreview } from 'src/app/models';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss'],
})
export class RecipesListComponent {
  recipesPreviewList$: Observable<recipePreview[]> = this.activatedRoute.data.pipe(map((data) => data['recipesList']));

  constructor(
    private activatedRoute: ActivatedRoute
  ) {
    
    /* this.activatedRoute.paramMap.subscribe(
      (params: ParamMap) => {
        const type = params.get('categoryType');
        const value = params.get('categoryValue');
        const page = this.recipeService.activePage$.getValue();
        this.recipesPreviewList$ =
          value !== 'default' && type && value
            ? this.getRecipesByCategory({ type, value }, page)
            : this.recipeService.getRandomRecipesList(16);
      }
    ) */
  }

  /* getRecipesByCategory(
    filter: { type: string; value: string },
    page: number = 1
  ): BehaviorSubject<recipePreview[]> {
    return (this.recipesPreviewList$ = this.recipeService.getFilterRecipesList(
      filter,
      16,
      page
    ));
  } */

}
