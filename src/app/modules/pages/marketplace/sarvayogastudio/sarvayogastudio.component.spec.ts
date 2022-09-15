import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SarvayogastudioComponent } from './sarvayogastudio.component';

describe('SarvayogastudioComponent', () => {
  let component: SarvayogastudioComponent;
  let fixture: ComponentFixture<SarvayogastudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SarvayogastudioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SarvayogastudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
