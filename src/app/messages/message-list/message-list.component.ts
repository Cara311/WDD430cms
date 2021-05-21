import { Component, OnInit } from '@angular/core';
import { Message } from '../messages.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  messages: Message[] = [];

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messages = this.messageService.getMessages();
    //this.contactService.contactSelectedEvent.emit(contact);
  }
  onAddMessage(message: Message){
    this.messages.push(message);

  } 

}
