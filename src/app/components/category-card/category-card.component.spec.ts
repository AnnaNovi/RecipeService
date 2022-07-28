import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { CategoryCardComponent } from './category-card.component';

describe('CategoryCardComponent', () => {
  let component: CategoryCardComponent;
  let fixture: ComponentFixture<CategoryCardComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      declarations: [CategoryCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryCardComponent);
    component = fixture.componentInstance;

    const expectedCategoryAsInput = {
      id: '1',
      title: 'Beef',
      imageURL: 'https:\/\/www.themealdb.com\/images\/category\/beef.png',
      description: 'Beef is the culinary name for meat from cattle, particularly skeletal muscle. Humans have been eating beef since prehistoric times.[1] Beef is a source of high-quality protein and essential nutrients.[2]',
    };
    component.category = expectedCategoryAsInput;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should show div.categoryCard__image and hide div.categoryCard__description if property backOfCard is false', () => {
    component.backOfCard = false;
    fixture.detectChanges();
    const elementShow = fixture.debugElement.query(
      By.css('.categoryCard__image')
    );
    const elementHide = fixture.debugElement.query(
      By.css('.categoryCard__description')
    );
    expect(elementShow).toBeTruthy();
    expect(elementHide).toBeNull();
  });
  it('should hide div.categoryCard__image and show div.categoryCard__description if property backOfCard is true', () => {
    component.backOfCard = true;
    fixture.detectChanges();
    const elementShow = fixture.debugElement.query(
      By.css('.categoryCard__description')
    );
    const elementHide = fixture.debugElement.query(
      By.css('.categoryCard__image')
    );
    expect(elementShow).toBeTruthy();
    expect(elementHide).toBeNull();
  });
  it('should change property backOfCard to opposite value when button.categoryCard__info was clicked', () => {
    const button = fixture.debugElement.query(By.css('.categoryCard__info'));
    button.triggerEventHandler('click', {});
    expect(component.backOfCard).toBeTrue();
  });
  it('should add style.height.px for div.categoryCard__turnBlock if property imageHeight is truthy', () => {
    const heigth = '200';
    component.imageHeight = +heigth;
    fixture.detectChanges();
    const element: HTMLDivElement = fixture.debugElement.query(
      By.css('.categoryCard__turnBlock')
    ).nativeElement;
    expect(element.style.height).toContain(heigth);
  });
});
