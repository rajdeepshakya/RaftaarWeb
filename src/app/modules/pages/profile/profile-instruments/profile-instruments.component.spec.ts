import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileInstrumentsComponent } from './profile-instruments.component';

describe('ProfileInstrumentsComponent', () => {
  let component: ProfileInstrumentsComponent;
  let fixture: ComponentFixture<ProfileInstrumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileInstrumentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileInstrumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
