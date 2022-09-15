import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEditPostComponent } from './profile-edit-post.component';

describe('ProfileEditPostComponent', () => {
  let component: ProfileEditPostComponent;
  let fixture: ComponentFixture<ProfileEditPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileEditPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileEditPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
