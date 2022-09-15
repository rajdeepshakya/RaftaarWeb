import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareTestimonialComponent } from './share-testimonial.component';

describe('ShareTestimonialComponent', () => {
  let component: ShareTestimonialComponent;
  let fixture: ComponentFixture<ShareTestimonialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareTestimonialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareTestimonialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
