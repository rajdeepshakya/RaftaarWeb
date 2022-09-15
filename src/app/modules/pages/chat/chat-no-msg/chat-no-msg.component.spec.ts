import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatNoMsgComponent } from './chat-no-msg.component';

describe('ChatNoMsgComponent', () => {
  let component: ChatNoMsgComponent;
  let fixture: ComponentFixture<ChatNoMsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatNoMsgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatNoMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
