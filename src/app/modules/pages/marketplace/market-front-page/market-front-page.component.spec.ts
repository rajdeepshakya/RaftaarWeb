import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketFrontPageComponent } from './market-front-page.component';

describe('MarketFrontPageComponent', () => {
  let component: MarketFrontPageComponent;
  let fixture: ComponentFixture<MarketFrontPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketFrontPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketFrontPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
