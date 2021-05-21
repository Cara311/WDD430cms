import { Component, OnInit, ElementRef, Output, ViewChild, EventEmitter } from '@angular/core';
import { Message } from '../messages.model';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject') subjectInputRef: ElementRef;
  @ViewChild('msgText') msgTextInputRef: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  currentSender = 'Cara';

  constructor() { }

  ngOnInit(): void {
  }

  onSendMessage() {
    const subjectin = this.subjectInputRef.nativeElement.value;
    const msgTextin = this.msgTextInputRef.nativeElement.value;
    const newMessage = new Message('1', subjectin, msgTextin, this.currentSender);
    this.addMessageEvent.emit(newMessage);

  }

  onClear() {
    this.subjectInputRef.nativeElement.value = '';
    this.msgTextInputRef.nativeElement.value = '';
  }

}




