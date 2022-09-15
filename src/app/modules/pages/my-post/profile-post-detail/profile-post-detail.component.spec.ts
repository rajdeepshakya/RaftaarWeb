import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePostDetailComponent } from './profile-post-detail.component';

describe('ProfilePostDetailComponent', () => {
  let component: ProfilePostDetailComponent;
  let fixture: ComponentFixture<ProfilePostDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilePostDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePostDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
