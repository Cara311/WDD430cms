import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model'

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
 
  @Input() document: Document;
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document (1, 'doc1', 'This is the first document.', 'www.thisdoc1.com', null ),
    new Document (2, 'doc2', 'This is the second document.', 'www.thisdoc2.com', null ),
    new Document (3, 'doc3', 'This is the third document.', 'www.thisdoc3.com', null ),
    new Document (4, 'doc4', 'This is the fourth document.', 'www.thisdoc4.com', null ),
    new Document (5, 'doc5', 'This is the fifth document.', 'www.thisdoc5.com', null )
  ];

  constructor() { }


  ngOnInit(): void {
  }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

}








