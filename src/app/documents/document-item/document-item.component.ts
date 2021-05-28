import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-item',
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css']
})
export class DocumentItemComponent implements OnInit {

  @Input() document: Document;
  @Input() index: number;
  //@Output() documentSelected = new EventEmitter<void>();

  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {
  }

  /*onSelectedDocument() {
    //this.documentSelected.emit();
    this.documentService.documentSelectedEvent.emit(this.document);
  } */

}

