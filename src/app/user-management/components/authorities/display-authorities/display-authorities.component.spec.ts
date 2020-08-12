import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAuthoritiesComponent } from './display-authorities.component';

describe('DisplayAuthoritiesComponent', () => {
  let component: DisplayAuthoritiesComponent;
  let fixture: ComponentFixture<DisplayAuthoritiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayAuthoritiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayAuthoritiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
