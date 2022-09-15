import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectronicProductSearchComponent } from './electronic-product-search.component';

describe('ElectronicProductSearchComponent', () => {
  let component: ElectronicProductSearchComponent;
  let fixture: ComponentFixture<ElectronicProductSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectronicProductSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectronicProductSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
