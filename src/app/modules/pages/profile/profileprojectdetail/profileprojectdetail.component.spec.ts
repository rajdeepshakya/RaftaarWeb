import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileprojectdetailComponent } from './profileprojectdetail.component';

describe('ProfileprojectdetailComponent', () => {
  let component: ProfileprojectdetailComponent;
  let fixture: ComponentFixture<ProfileprojectdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileprojectdetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileprojectdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
