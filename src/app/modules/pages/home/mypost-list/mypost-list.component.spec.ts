import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MypostListComponent } from './mypost-list.component';

describe('MypostListComponent', () => {
  let component: MypostListComponent;
  let fixture: ComponentFixture<MypostListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MypostListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MypostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
