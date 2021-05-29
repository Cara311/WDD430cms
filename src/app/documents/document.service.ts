import {Injectable} from '@angular/core';
import {MOCKDOCUMENTS} from './MOCKDOCUMENTS';
import { EventEmitter } from '@angular/core';
import { Document } from './document.model';

@Injectable({
    providedIn: 'root'
})
  export class DocumentService {
    documentSelectedEvent = new EventEmitter<Document>();
    documentChangedEvent = new EventEmitter<Document[]>();

     documents: Document [] = [];

     constructor() {
        this.documents = MOCKDOCUMENTS;
     }

     getDocuments(): Document[] {
        return this.documents.slice(); //Returns a copy of array
    }  

  getDocument(index: string) {
    return this.documents[index];
  }


  deleteDocument(document: Document) {
    if (!document) {
       return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
       return;
    }
    this.documents.splice(pos, 1);
    this.documentChangedEvent.emit(this.documents.slice());
 }

    /*for (let document of this.documents) {
      if (document.id === id) {
        return document;
      } 
    }
    return null;
  }*/
}