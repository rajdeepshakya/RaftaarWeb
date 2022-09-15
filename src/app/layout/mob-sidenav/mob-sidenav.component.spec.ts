import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobSidenavComponent } from './mob-sidenav.component';

describe('MobSidenavComponent', () => {
  let component: MobSidenavComponent;
  let fixture: ComponentFixture<MobSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobSidenavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
