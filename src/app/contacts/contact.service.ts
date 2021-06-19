import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contactListChangedEvent = new Subject<Contact[]>();
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();

  contacts: Contact[] = [];
  maxContactId: number;


  constructor(private http: HttpClient) {

    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();

    this.http.get('https://week9-bf3e9-default-rtdb.firebaseio.com/contacts.json').subscribe((DBContacts: Contact[]) => {
      this.contacts = DBContacts;
      this.maxContactId = this.getMaxId();
      this.contacts = this.contacts.sort((a, b) => a.name > b.name ? 1 : 0);
      this.contactListChangedEvent.next(this.contacts.slice());

    }, (error: any) => {
      console.log('error');
    });
  }

  storeContacts() {
    const contacts = this.getContacts();
    this.http
      .put(
        'https://week9-bf3e9-default-rtdb.firebaseio.com/contacts.json',
        contacts
      )
      .subscribe(response => {
        console.log(response);
        this.contactListChangedEvent.next(contacts.slice());
      });
  }

  getContacts(): Contact[] {
    return this.contacts.slice(); //Returns a copy of array
  }

  getContact(index: string) {
    /* for (let contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      } 
    }
    return null;  */
    return this.contacts[index];

  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    //this.contactListChangedEvent.next(this.contacts.slice());
    this.storeContacts();
  }

  getMaxId(): number {

    var maxId = 0;
    for (let contact of this.contacts) {
      let currentId = parseInt(contact.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
      return maxId;
    }
  }


  addContact(newContact: Contact) {
   /* if (newContact === undefined || newContact === null) {
      return;
    } */
    if (!newContact) {
      return;
    }
    this.maxContactId++
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    let documentsListClone = this.contacts.slice();
    //this.contactListChangedEvent.next(documentsListClone);
    this.storeContacts();
  }



  updateDocument(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }
    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    let documentsListClone = this.contacts.slice();
    //this.contactListChangedEvent.next(documentsListClone);
    this.storeContacts();
  }



}