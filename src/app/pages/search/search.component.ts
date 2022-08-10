import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';
import { recipePreview } from 'src/app/models';
import { RecipeBySearchService } from 'src/app/services/recipe-by-search/recipe-by-search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  public recipesPreviewList$: Observable<recipePreview[]> | Observable<null> =
    this.activatedRoute.data.pipe(map((data) => data['recipesList']));
  public searchValue: string | null = null;
  public activePage: number = 1;
  public totalQuantityOfPages: number = 1;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private recipeBySearchService: RecipeBySearchService
  ) {}

  public changePage(page: number) {
    this.recipeBySearchService.activePage$.next(page);
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { page },
      queryParamsHandling: 'merge',
    });
  }

  private setSearchValue() {
    return this.activatedRoute.queryParamMap.subscribe(
      (queryParam: ParamMap) => {
        this.searchValue = queryParam.get('value');
      }
    );
  }
  private setActivePage(): Subscription {
    return this.recipeBySearchService.activePage$.subscribe((page: number) => {
      this.activePage = page;
    });
  }
  private setTotalQuantityOfPages(): Subscription {
    return this.recipeBySearchService.totalQuantityOfPages$.subscribe(
      (page: number) => {
        this.totalQuantityOfPages = page;
      }
    );
  }

  ngOnInit() {
    this.setSearchValue();
    this.setActivePage();
    this.setTotalQuantityOfPages();
  }

  ngOnDestroy(): void {
    this.setSearchValue().unsubscribe();
    this.setActivePage().unsubscribe();
    this.setTotalQuantityOfPages().unsubscribe();
  }
}
