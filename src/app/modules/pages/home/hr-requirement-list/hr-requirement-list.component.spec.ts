import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrRequirementListComponent } from './hr-requirement-list.component';

describe('HrRequirementListComponent', () => {
  let component: HrRequirementListComponent;
  let fixture: ComponentFixture<HrRequirementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrRequirementListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HrRequirementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
