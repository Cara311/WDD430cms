import {Injectable} from '@angular/core';
import {Contact} from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';
import { EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
  export class ContactService {

    contactSelectedEvent = new EventEmitter<Contact>();

     contacts: Contact [] =[];
     constructor() {
        this.contacts = MOCKCONTACTS;
     }
     getContacts(): Contact[] {
        return this.contacts.slice(); //Returns a copy of array
    }  

  getContact(index:string) {
    /* for (let contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      } 
    }
    return null;  */
    return this.contacts[index];
   
  }

  


  }