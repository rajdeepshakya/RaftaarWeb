import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatSayHelloComponent } from './chat-say-hello.component';

describe('ChatSayHelloComponent', () => {
  let component: ChatSayHelloComponent;
  let fixture: ComponentFixture<ChatSayHelloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatSayHelloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatSayHelloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
