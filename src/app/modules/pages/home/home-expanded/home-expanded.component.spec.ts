import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeExpandedComponent } from './home-expanded.component';

describe('HomeExpandedComponent', () => {
  let component: HomeExpandedComponent;
  let fixture: ComponentFixture<HomeExpandedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeExpandedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeExpandedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
