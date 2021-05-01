import { Component, OnInit } from '@angular/core';
import { Message } from '../messages.model';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  messages: Message[] = [
    new Message(1, 'hi','How are you?', 'Bob'),
    new Message(2, 'Happy','Are you happy?', 'Tupper'),
    new Message(3, 'Rush','Come now', 'Susan')
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onAddMessage(message: Message){
    this.messages.push(message);

  }

}
