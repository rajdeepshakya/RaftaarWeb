import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewRequirementsComponent } from './add-new-requirements.component';

describe('AddNewRequirementsComponent', () => {
  let component: AddNewRequirementsComponent;
  let fixture: ComponentFixture<AddNewRequirementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewRequirementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewRequirementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
