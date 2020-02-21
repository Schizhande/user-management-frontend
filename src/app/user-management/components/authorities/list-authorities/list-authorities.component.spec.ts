import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAuthoritiesComponent } from './list-authorities.component';

describe('ListAuthoritiesComponent', () => {
  let component: ListAuthoritiesComponent;
  let fixture: ComponentFixture<ListAuthoritiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAuthoritiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAuthoritiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
