import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from '../contact.model'
import { ContactService } from '../contact.service';


@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  private subscription: Subscription;
  //@Input() contact: Contact;

  contacts: Contact[];
  term: string;


  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
    this.subscription = this.contactService.contactListChangedEvent.subscribe(
      (contact: Contact[]) => {
        this.contacts = contact;
      }
      );
    //this.contactService.contactSelectedEvent.emit(contact);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  search(value: string) {

    this.term = value;
    
    }
 

}

