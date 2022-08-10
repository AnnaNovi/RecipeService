import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';

import { recipePreview } from 'src/app/models';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public recipesPreviewList$: Observable<recipePreview[]> =
    this.activatedRoute.data.pipe(map((data) => data['recipesList']));

  constructor(private activatedRoute: ActivatedRoute) {}
}
