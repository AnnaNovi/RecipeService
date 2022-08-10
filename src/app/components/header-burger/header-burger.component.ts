import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router, Event } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-header-burger',
  templateUrl: './header-burger.component.html',
  styleUrls: ['./header-burger.component.scss'],
})
export class HeaderBurgerComponent {
  public burgerState = false;
  public isActiveRecipe = this.router.events.pipe(
    filter(
      (event: Event): event is NavigationEnd => event instanceof NavigationEnd
    ),
    map((router: NavigationEnd) => {
      return router.url.includes('/recipes/');
    })
  );

  @Input() showHeaderBurger: boolean | null = false;

  constructor(private router: Router) {}

  public toggleSidenav(sidenav: MatSidenav): void {
    sidenav.toggle();
    this.burgerState = sidenav.opened;
  }
}
