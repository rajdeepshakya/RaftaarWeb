import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCreatePostComponent } from './profile-create-post.component';

describe('ProfileCreatePostComponent', () => {
  let component: ProfileCreatePostComponent;
  let fixture: ComponentFixture<ProfileCreatePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileCreatePostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCreatePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
