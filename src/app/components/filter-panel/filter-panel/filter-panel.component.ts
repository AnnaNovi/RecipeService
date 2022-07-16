import { Component } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { FilterCombineService } from 'src/app/services/filter-combine/filter-combine.service';

import { categories } from 'src/app/models';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss'],
})
export class FilterPanelComponent {
  activeType = new BehaviorSubject('category');
  filterResultList$: Observable<categories[]> =
    this.activeType.pipe(
      switchMap((type: string) =>
        this.filterCombineService.getFilterByType(type)
      )
    );

  constructor(private filterCombineService: FilterCombineService) {}

  changeActiveType(event: Event) {
    const type = event.target as HTMLSelectElement;
    this.activeType.next(type.value.toLowerCase());
  }
}
