import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseInterestComponent } from './choose-interest.component';

describe('ChooseInterestComponent', () => {
  let component: ChooseInterestComponent;
  let fixture: ComponentFixture<ChooseInterestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseInterestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
