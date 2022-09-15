import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileaboutComponent } from './profileabout.component';

describe('ProfileaboutComponent', () => {
  let component: ProfileaboutComponent;
  let fixture: ComponentFixture<ProfileaboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileaboutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileaboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
