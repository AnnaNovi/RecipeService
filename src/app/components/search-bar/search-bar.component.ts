import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OutsideClickService } from 'src/app/services/outside-click/outside-click.service';
import { searchBarAnimation } from './search-bar.animation';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  animations: [searchBarAnimation],
})
export class SearchBarComponent implements AfterViewInit, OnDestroy {
  public isSearchBar = false;
  public searchBarForm = new FormGroup({
    searchValue: new FormControl(''),
  });

  @ViewChild('searchBarFormElement')
  searchBarFormElement: ElementRef<HTMLFormElement> | null = null;

  constructor(
    private outsideClickService: OutsideClickService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  public searchByValue() {
    const searchValue = this.searchBarForm.value.searchValue;
    if (this.isSearchBar && searchValue) {
      this.router.url === '/search'
        ? this.setSearchValue()
        : this.router.navigate(['/search'], {
            queryParams: {
              value: searchValue ? searchValue : 'default',
              page: 1,
            },
          });
    } else {
      this.isSearchBar = true;
    }
  }

  private setSearchValue(): Subscription {
    return this.activatedRoute.queryParamMap.subscribe(
      (queryParam: ParamMap) => {
        console.log(queryParam);
      }
    );
  }
  private changeElementVisionByWindowClick(): Subscription {
    return this.outsideClickService
      .isContainElement(this.searchBarFormElement)
      .subscribe((isContain: boolean) => {
        this.isSearchBar = isContain;
        if (!isContain) {
          this.searchBarForm.patchValue({ searchValue: '' });
        }
      });
  }

  ngAfterViewInit(): void {
    this.changeElementVisionByWindowClick();
  }
  ngOnDestroy(): void {
    this.changeElementVisionByWindowClick().unsubscribe();
    this.setSearchValue().unsubscribe();
  }
}
