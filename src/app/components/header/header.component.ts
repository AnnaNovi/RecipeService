import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router, Event } from '@angular/router';
import { filter, map } from 'rxjs';
import { ModalAuthComponent } from '../modals/modal-auth/modal-auth.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public isActiveRecipe = this.router.events.pipe(
    filter(
      (event: Event): event is NavigationEnd => event instanceof NavigationEnd
    ),
    map((router: NavigationEnd) => {
      return router.url.includes('/recipes/');
    })
  );

  constructor(private router: Router, private matDialog: MatDialog) {}

  public openAuthModal() {
    this.matDialog.open(ModalAuthComponent, {
      width: '300px',
    });
  }
}
