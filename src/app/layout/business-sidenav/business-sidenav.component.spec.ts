import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessSidenavComponent } from './business-sidenav.component';

describe('BusinessSidenavComponent', () => {
  let component: BusinessSidenavComponent;
  let fixture: ComponentFixture<BusinessSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessSidenavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
