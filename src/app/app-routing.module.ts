import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/pageNotFound/page-not-found/page-not-found.component';
import { PageUnderConsrtructionComponent } from './pages/pageUnderConstruction/page-under-consrtruction/page-under-consrtruction.component';
import { RecipeComponent } from './pages/recipe/recipe.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'recipe',
    component: RecipeComponent,
  },
  {
    path: 'categories',
    component: PageUnderConsrtructionComponent,
  },
  {
    path: 'recipe/:category',
    component: PageUnderConsrtructionComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
