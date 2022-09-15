import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawMaterailListComponent } from './raw-materail-list.component';

describe('RawMaterailListComponent', () => {
  let component: RawMaterailListComponent;
  let fixture: ComponentFixture<RawMaterailListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RawMaterailListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RawMaterailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
