import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { FilterCombineService } from 'src/app/services/filter-combine/filter-combine.service';

import { categories } from 'src/app/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss'],
})
export class FilterPanelComponent {
  activeType = new BehaviorSubject('category');
  filterResultList$: Observable<categories[]> = this.activeType.pipe(
    switchMap((type: string) => this.filterCombineService.getFilterByType(type))
  );

  @Output() onFilter = new EventEmitter<{ type: string; value: string }>();
  @ViewChild('selectedByDefault') selectedByDefault!: ElementRef;

  constructor(
    private filterCombineService: FilterCombineService,
    private router: Router
  ) {}

  changeActiveType(event: Event) {
    const type = (<HTMLSelectElement>event.target).value;
    this.activeType.next(type);
    this.router.navigate(['/recipes', type, 'default'], {
      queryParams: { page: 1 },
    });
  }

  changeActiveCategory(event: Event) {
    const type = this.activeType.getValue();
    const value = (<HTMLSelectElement>event.target).value;
    this.onFilter.emit({
      type,
      value,
    });
    this.router.navigate(['/recipes', type, value], {
      queryParams: { page: 1 },
    });
  }

}
