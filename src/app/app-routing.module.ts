import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './pages/categories/categories.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';

import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PageUnderConsrtructionComponent } from './pages/page-under-construction/page-under-consrtruction.component';
import { RecipeComponent } from './pages/recipe/recipe.component';
import { RecipesListComponent } from './pages/recipes-list/recipes-list.component';
import { SearchComponent } from './pages/search/search.component';
import { RecipeByIdResolver } from './resolvers/recipe-by-id/recipe-by-id.resolver';
import { RecipeBySearchResolver } from './resolvers/recipe-by-search/recipe-by-search.resolver';
import { RecipesListForHomePageResolver } from './resolvers/recipes-list-for-home-page/recipes-list-for-home-page.resolver';
import { RecipesListForRecipesListPageResolver } from './resolvers/recipes-list-for-recipeslist-page/recipes-list-for-recipes-list-page.resolver';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    resolve: {
      recipesList: RecipesListForHomePageResolver,
    },
  },
  {
    path: 'recipes/:categoryType/:categoryValue',
    component: RecipesListComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: {
      recipesList: RecipesListForRecipesListPageResolver,
    },
  },
  {
    path: 'categories',
    component: CategoriesComponent,
  },
  {
    path: 'recipe/:id',
    component: RecipeComponent,
    resolve: {
      recipeById: RecipeByIdResolver,
    },
  },
  {
    path: 'search',
    component: SearchComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: {
      recipesList: RecipeBySearchResolver,
    },
  },
  {
    path: 'favorites',
    component: FavoritesComponent,
  },
  {
    path: 'notFound',
    component: PageNotFoundComponent,
  },
  {
    path: '**',
    redirectTo: '/notFound',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
