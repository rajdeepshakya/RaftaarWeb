import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewRequirementTabComponent } from './add-new-requirement-tab.component';

describe('AddNewRequirementTabComponent', () => {
  let component: AddNewRequirementTabComponent;
  let fixture: ComponentFixture<AddNewRequirementTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewRequirementTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewRequirementTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
