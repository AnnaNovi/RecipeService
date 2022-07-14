import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeSwiperComponent } from './recipe-swiper.component';

describe('RecipeSwiperComponent', () => {
  let component: RecipeSwiperComponent;
  let fixture: ComponentFixture<RecipeSwiperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeSwiperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeSwiperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
