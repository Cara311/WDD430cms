import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Contact } from '../contact.model'
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  @Input() contact: Contact;
  @Output() selectedContactEvent = new EventEmitter<Contact>();

  contacts: Contact[];

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
  }

  onSelected(contact: Contact) {
    this.selectedContactEvent.emit(contact);
  }
 

}

