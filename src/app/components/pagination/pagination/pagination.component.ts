import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import { RecipeService } from 'src/app/services/recipe/recipe.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  private activePage: BehaviorSubject<number>;
  public filterListPages: BehaviorSubject<number>;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.filterListPages = this.recipeService.filterListPages$;
    this.activePage = this.recipeService.activePage$;
  }

  isActivePage(page: number) {
    return page === this.activePage.getValue();
  }

  changePage(page: number) {
    this.recipeService.activePage$.next(page);
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { page: this.activePage.getValue() },
      queryParamsHandling: 'merge',
    });
  }
}
