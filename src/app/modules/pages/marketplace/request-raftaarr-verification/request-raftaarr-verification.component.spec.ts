import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestRaftaarrVerificationComponent } from './request-raftaarr-verification.component';

describe('RequestRaftaarrVerificationComponent', () => {
  let component: RequestRaftaarrVerificationComponent;
  let fixture: ComponentFixture<RequestRaftaarrVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestRaftaarrVerificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestRaftaarrVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
