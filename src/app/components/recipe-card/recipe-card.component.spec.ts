import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { recipePreview } from 'src/app/models/recipe.model';
import { RouterTestingModule } from '@angular/router/testing';

import { RecipeCardComponent } from './recipe-card.component';

describe('RecipeCardComponent', () => {
  let component: RecipeCardComponent;
  let fixture: ComponentFixture<RecipeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [RecipeCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeCardComponent);
    component = fixture.componentInstance;

    const expectedRecipeAsInput: recipePreview = {
      id: '52767',
      title: 'Bakewell tart',
      tags: ['Tart', 'Baking', 'Alcoholic'],
      imageURL:
        'https://www.themealdb.com/images/media/meals/wyrqqq1468233628.jpg',
    };
    component.recipe = expectedRecipeAsInput;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render property recipe.title', () => {
    const recipeCardTitle: HTMLAnchorElement = fixture.debugElement.query(
      By.css('.recipeCard__title a')
    ).nativeElement;
    expect(recipeCardTitle.textContent).toContain('Bakewell tart');
  });
  it('should render div.recipeCard__tagsList if recipe.tags is not null', () => {
    const recipeCardTagsList: DebugElement = fixture.debugElement.query(
      By.css('.recipeCard__tagsList')
    );
    expect(recipeCardTagsList).toBeTruthy();
  });
  it("shouldn't render div.recipeCard__tagsList if recipe.tags is null", () => {
    component.recipe.tags = null;
    fixture.detectChanges();
    const recipeCardTagsList: DebugElement = fixture.debugElement.query(
      By.css('.recipeCard__tagsList')
    );
    expect(recipeCardTagsList).toBeNull();
  });
  it('should render small.recipeCard__tag for each tag', () => {
    const recipeCardTags: DebugElement[] = fixture.debugElement.queryAll(
      By.css('.recipeCard__tag')
    );
    const recipeTagsLength = component.recipe.tags!.length;

    expect(recipeCardTags.length)
      .withContext('should have 3 tags')
      .toEqual(recipeTagsLength);
    recipeCardTags.forEach((element: DebugElement, index: number) => {
      expect(element.nativeElement.textContent).toContain(
        component.recipe.tags![index]
      );
    });
  });
  it('should render title with recipe.id at routerLink', () => {
    const titleHref = fixture.debugElement
      .query(By.css('.recipeCard__title a'))
      .nativeElement.getAttribute('href');
    expect(titleHref).toEqual(`/recipe/${component.recipe.id}`);
  });
});
