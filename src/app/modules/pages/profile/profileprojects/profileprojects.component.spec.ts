import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileprojectsComponent } from './profileprojects.component';

describe('ProfileprojectsComponent', () => {
  let component: ProfileprojectsComponent;
  let fixture: ComponentFixture<ProfileprojectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileprojectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileprojectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
