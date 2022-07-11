import { Component } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { FilterCombineService } from 'src/app/services/filter-combine/filter-combine.service';

import { categories } from 'src/app/models';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss'],
})
export class FilterPanelComponent {
  activeType = new BehaviorSubject('category');
  filterResultList$: Observable<BehaviorSubject<categories[]>> = this.activeType.pipe(
    map((type: string) => this.filterCombineService.getFilterByType(type))
  )
    /* this.filterCombineService.getFilterByType(this.activeType.getValue()); */

  constructor(private filterCombineService: FilterCombineService) {}

  changeActiveType(event: Event) {
    const type = event.target as HTMLSelectElement;
    this.activeType.next(type.value.toLowerCase());
  }
}
