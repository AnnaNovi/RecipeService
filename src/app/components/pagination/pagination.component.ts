import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  constructor() {}

  @Input() activePage: number = 1;
  @Input() totalQuantityOfPages: number = 1;

  @Output() newActivePage = new EventEmitter<number>();

  isActivePage(page: number) {
    return page === this.activePage;
  }

  changePage(page: number) {
    this.newActivePage.emit(page);
  }
}
