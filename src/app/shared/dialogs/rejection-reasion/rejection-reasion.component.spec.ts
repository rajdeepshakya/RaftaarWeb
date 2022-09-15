import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectionReasionComponent } from './rejection-reasion.component';

describe('RejectionReasionComponent', () => {
  let component: RejectionReasionComponent;
  let fixture: ComponentFixture<RejectionReasionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectionReasionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectionReasionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
