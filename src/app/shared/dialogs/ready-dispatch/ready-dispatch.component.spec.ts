import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadyDispatchComponent } from './ready-dispatch.component';

describe('ReadyDispatchComponent', () => {
  let component: ReadyDispatchComponent;
  let fixture: ComponentFixture<ReadyDispatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadyDispatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadyDispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
