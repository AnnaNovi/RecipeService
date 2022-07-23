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
import { PageNotFoundComponent } from './pages/pageNotFound/page-not-found/page-not-found.component';
import { PageUnderConsrtructionComponent } from './pages/pageUnderConstruction/page-under-consrtruction/page-under-consrtruction.component';
import { RecipesListComponent } from './pages/recipesList/recipes-list/recipes-list.component';
import { VideoPipe } from './pipes/video/video.pipe';
import { FilterPanelComponent } from './components/filter-panel/filter-panel/filter-panel.component';
import { RecipeImageComponent } from './components/recipe-image/recipe-image/recipe-image.component';
import { RecipeSwiperComponent } from './components/recipe-swiper/recipe-swiper/recipe-swiper.component';
import { PaginationComponent } from './components/pagination/pagination/pagination.component';
import { LoopForNumberDirective } from './directives/loopForNumber/loop-for-number.directive';
import { LoaderComponent } from './components/loader/loader/loader.component';

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
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SwiperModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
