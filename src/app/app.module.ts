import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';

import { HomeComponent } from './pages/home/home.component';
import { RecipeComponent } from './pages/recipe/recipe.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageNotFoundComponent } from './pages/pageNotFound/page-not-found/page-not-found.component';
import { PageUnderConsrtructionComponent } from './pages/pageUnderConstruction/page-under-consrtruction/page-under-consrtruction.component'

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
  ],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
