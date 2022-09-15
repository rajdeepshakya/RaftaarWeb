import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteresteduserComponent } from './interesteduser.component';

describe('InteresteduserComponent', () => {
  let component: InteresteduserComponent;
  let fixture: ComponentFixture<InteresteduserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InteresteduserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InteresteduserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
