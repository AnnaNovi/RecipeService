import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, Subscription } from 'rxjs';
import { recipePreview } from 'src/app/models/recipe.model';
import { RecipeByFilterService } from 'src/app/services/recipe-by-filter/recipe-by-filter.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss'],
})
export class RecipesListComponent implements OnInit, OnDestroy {
  public recipesPreviewList$: Observable<recipePreview[]> =
    this.activatedRoute.data.pipe(map((data) => data['recipesList']));
  public activePage: number = 1;
  public totalQuantityOfPages: number = 1;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private recipeByFilterService: RecipeByFilterService
  ) {}

  public changePage(page: number) {
    this.recipeByFilterService.activePage$.next(page);
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { page },
      queryParamsHandling: 'merge',
    });
  }

  private setActivePage(): Subscription {
    return this.recipeByFilterService.activePage$.subscribe((page: number) => {
      this.activePage = page;
    });
  }
  private setTotalQuantityOfPages(): Subscription {
    return this.recipeByFilterService.totalQuantityOfPages$.subscribe(
      (page: number) => {
        this.totalQuantityOfPages = page;
      }
    );
  }

  ngOnInit(): void {
    this.setActivePage();
    this.setTotalQuantityOfPages();
  }

  ngOnDestroy(): void {
    this.setActivePage().unsubscribe();
    this.setTotalQuantityOfPages().unsubscribe();
  }
}
