import {
  Component,
} from '@angular/core';
import { Observable } from 'rxjs';
import { FilterCombineService } from 'src/app/services/filter-combine/filter-combine.service';
import { RecipeByFilterService } from 'src/app/services/recipe-by-filter/recipe-by-filter.service';

import { categories } from 'src/app/models';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss'],
})
export class FilterPanelComponent {
  filterResultList$!: Observable<categories[]>;
  filterForm!: FormGroup;
  filterTypes: string[] = ['Default', 'Category', 'Area', 'Ingredient'];

  constructor(
    private filterCombineService: FilterCombineService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private recipeByFilterService: RecipeByFilterService
  ) {
    this.setFilter();
  }

  changeFilter(filterType: 'filter' | 'value'): void {
    const filter = this.filterForm.get('filter')?.value;
    const value = this.filterForm.get('value')?.value;
    if (filterType === 'filter') {
      this.filterResultList$ =
        this.filterCombineService.getFilterByType(filter);
      this.filterForm.patchValue({ value: 'default' });
    }
    if (value !== 'default') {
      this.recipeByFilterService.activePage$.next(1);
      this.router.navigate(['/recipes', filter, value], {
        queryParams: { page: 1 },
      });
    }
  }
  setFilter(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      const filter = params.get('categoryType');
      const value = params.get('categoryValue');
      if (filter && filter !== 'default') {
        this.filterResultList$ =
          this.filterCombineService.getFilterByType(filter);
      }
      this.filterForm = new FormGroup({
        filter: new FormControl(filter),
        value: new FormControl(value),
      });
    });
  }

  isDefault(string: string) {
    return string.toLowerCase() === 'default';
  }
}
