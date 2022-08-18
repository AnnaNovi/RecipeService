import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { SwiperModule } from 'swiper/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';
import { HomeComponent } from './pages/home/home.component';
import { RecipeComponent } from './pages/recipe/recipe.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PageUnderConsrtructionComponent } from './pages/page-under-construction/page-under-consrtruction.component';
import { RecipesListComponent } from './pages/recipes-list/recipes-list.component';
import { VideoPipe } from './pipes/video/video.pipe';
import { FilterPanelComponent } from './components/filter-panel/filter-panel.component';
import { RecipeImageComponent } from './components/recipe-image/recipe-image.component';
import { RecipeSwiperComponent } from './components/recipe-swiper/recipe-swiper.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { LoopForNumberDirective } from './directives/loopForNumber/loop-for-number.directive';
import { LoaderComponent } from './components/loader/loader.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { HeaderBurgerComponent } from './components/header-burger/header-burger.component';
import { MaterialModule } from './modules/material/material.module';
import { SearchComponent } from './pages/search/search.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SVGComponent } from './components/svg/svg.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { RecipesSectionComponent } from './components/recipes-section/recipes-section.component';
import { ModalAuthComponent } from './components/modals/modal-auth/modal-auth.component';

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
    RecipeSwiperComponent,
    PaginationComponent,
    LoopForNumberDirective,
    LoaderComponent,
    CategoriesComponent,
    CategoryCardComponent,
    HeaderBurgerComponent,
    SearchComponent,
    SearchBarComponent,
    SVGComponent,
    FavoritesComponent,
    RecipesSectionComponent,
    ModalAuthComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SwiperModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
