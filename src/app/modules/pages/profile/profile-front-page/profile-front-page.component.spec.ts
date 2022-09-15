import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFrontPageComponent } from './profile-front-page.component';

describe('ProfileFrontPageComponent', () => {
  let component: ProfileFrontPageComponent;
  let fixture: ComponentFixture<ProfileFrontPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileFrontPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileFrontPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
