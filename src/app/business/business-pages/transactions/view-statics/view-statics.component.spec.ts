import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStaticsComponent } from './view-statics.component';

describe('ViewStaticsComponent', () => {
  let component: ViewStaticsComponent;
  let fixture: ComponentFixture<ViewStaticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewStaticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStaticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
