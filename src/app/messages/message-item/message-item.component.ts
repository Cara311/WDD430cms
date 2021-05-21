import { Component, OnInit, Input, Output } from '@angular/core';
import { Message } from '../messages.model';
import { MessageService } from '../message.service';
import { ContactService } from '../../contacts/contact.service';
import { Contact } from '../../contacts/contact.model';
import { fromEventPattern } from 'rxjs';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})

export class MessageItemComponent implements OnInit{
  @Input() message: Message;
  messageSender: string;
  constructor(private contactService: ContactService) {}
  ngOnInit() {
     const contact: Contact = this.contactService.getContact(this.message.sender);
     this.messageSender = contact.name;
  }
}