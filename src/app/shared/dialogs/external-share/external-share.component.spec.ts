import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalShareComponent } from './external-share.component';

describe('ExternalShareComponent', () => {
  let component: ExternalShareComponent;
  let fixture: ComponentFixture<ExternalShareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExternalShareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
