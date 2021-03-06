import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import { RecipeByFilterService } from 'src/app/services/recipe-by-filter/recipe-by-filter.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  public filterListPages: BehaviorSubject<number>;

  constructor(
    private recipeByFilterService: RecipeByFilterService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.filterListPages = this.recipeByFilterService.filterListPages$;
  }

  isActivePage(page: number) {
    return page === this.recipeByFilterService.activePage$.getValue();
  }

  changePage(page: number) {
    this.recipeByFilterService.activePage$.next(page);
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { page },
      queryParamsHandling: 'merge',
    });
  }

}
