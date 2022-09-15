import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketInterestedUserComponent } from './market-interested-user.component';

describe('MarketInterestedUserComponent', () => {
  let component: MarketInterestedUserComponent;
  let fixture: ComponentFixture<MarketInterestedUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketInterestedUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketInterestedUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
