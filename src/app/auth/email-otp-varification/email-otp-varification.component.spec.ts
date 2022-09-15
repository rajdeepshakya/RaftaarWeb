import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailOtpVarificationComponent } from './email-otp-varification.component';

describe('EmailOtpVarificationComponent', () => {
  let component: EmailOtpVarificationComponent;
  let fixture: ComponentFixture<EmailOtpVarificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailOtpVarificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailOtpVarificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
