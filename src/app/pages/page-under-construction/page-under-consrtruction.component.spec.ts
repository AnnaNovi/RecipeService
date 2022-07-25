import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageUnderConsrtructionComponent } from './page-under-consrtruction.component';

describe('PageUnderConsrtructionComponent', () => {
  let component: PageUnderConsrtructionComponent;
  let fixture: ComponentFixture<PageUnderConsrtructionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageUnderConsrtructionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageUnderConsrtructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
