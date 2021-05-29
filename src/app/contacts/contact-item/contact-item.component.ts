import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent implements OnInit {

  @Input() contact: Contact;
  @Input() index: number;
  //@Output() contactSelected = new EventEmitter<void>();

  //constructor(private contactService: ContactService) { }

  ngOnInit() {
  }

   /* onSelected() {
    //this.contactSelected.emit();
    //this.contactService.contactSelectedEvent.emit(this.contact);
  }  */

}
