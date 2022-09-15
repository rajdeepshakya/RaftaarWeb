import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharebyComponent } from './shareby.component';

describe('SharebyComponent', () => {
  let component: SharebyComponent;
  let fixture: ComponentFixture<SharebyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharebyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharebyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
