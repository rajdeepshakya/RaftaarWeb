import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirementdetailComponent } from './requirementdetail.component';

describe('RequirementdetailComponent', () => {
  let component: RequirementdetailComponent;
  let fixture: ComponentFixture<RequirementdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequirementdetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequirementdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
