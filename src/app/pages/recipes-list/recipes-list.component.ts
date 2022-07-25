import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { recipePreview } from 'src/app/models';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss'],
})
export class RecipesListComponent {
  recipesPreviewList$: Observable<recipePreview[]> = this.activatedRoute.data.pipe(map((data) => data['recipesList']));

  constructor(
    private activatedRoute: ActivatedRoute) {}


}
