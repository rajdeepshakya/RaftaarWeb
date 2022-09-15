import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalScreenComponent } from './proposal-screen.component';

describe('ProposalScreenComponent', () => {
  let component: ProposalScreenComponent;
  let fixture: ComponentFixture<ProposalScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProposalScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
