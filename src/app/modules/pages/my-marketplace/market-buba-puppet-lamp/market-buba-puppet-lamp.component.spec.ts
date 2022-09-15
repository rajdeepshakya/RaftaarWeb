import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketBubaPuppetLampComponent } from './market-buba-puppet-lamp.component';

describe('MarketBubaPuppetLampComponent', () => {
  let component: MarketBubaPuppetLampComponent;
  let fixture: ComponentFixture<MarketBubaPuppetLampComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketBubaPuppetLampComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketBubaPuppetLampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
