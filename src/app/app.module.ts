import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';

import { HomeComponent } from './pages/home/home.component';
import { RecipeComponent } from './pages/recipe/recipe.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageNotFoundComponent } from './pages/pageNotFound/page-not-found/page-not-found.component';
import { PageUnderConsrtructionComponent } from './pages/pageUnderConstruction/page-under-consrtruction/page-under-consrtruction.component';
import { RecipesListComponent } from './pages/recipesList/recipes-list/recipes-list.component';
import { VideoPipe } from './pipes/video/video.pipe';
import { FilterPanelComponent } from './components/filter-panel/filter-panel/filter-panel.component';
import { RecipeImageComponent } from './components/recipe-image/recipe-image/recipe-image.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipeCardComponent,
    HomeComponent,
    RecipeComponent,
    FooterComponent,
    PageNotFoundComponent,
    PageUnderConsrtructionComponent,
    RecipesListComponent,
    VideoPipe,
    FilterPanelComponent,
    RecipeImageComponent,
  ],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
