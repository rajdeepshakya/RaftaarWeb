import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCriteriaComponent } from './display-criteria.component';

describe('DisplayCriteriaComponent', () => {
  let component: DisplayCriteriaComponent;
  let fixture: ComponentFixture<DisplayCriteriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayCriteriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
