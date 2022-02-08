import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeContentfulPageComponent } from './home-contentful-page.component';

describe('HomeContentfulPageComponent', () => {
  let component: HomeContentfulPageComponent;
  let fixture: ComponentFixture<HomeContentfulPageComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeContentfulPageComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeContentfulPageComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
    expect(element).toBeTruthy();
    expect(() => fixture.detectChanges()).not.toThrow();
  });
});
