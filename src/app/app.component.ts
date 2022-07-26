import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  loading = false;
  showHeaderBurger: Observable<boolean> = this.breakpointObserver
    .observe('(max-width: 768px)')
    .pipe(map((state: BreakpointState): boolean => {
      return state.matches;
    }));


  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {
    this.setLoaderState();
  }

  setLoaderState() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      }
      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.loading = false;
      }
    });
  }
}
