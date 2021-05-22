import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Contact } from '../contact.model'
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  //@Input() contact: Contact;

  contacts: Contact[];

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
    //this.contactService.contactSelectedEvent.emit(contact);
  }
 

}


