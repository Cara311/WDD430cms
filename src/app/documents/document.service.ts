import {Injectable} from '@angular/core';
import {MOCKDOCUMENTS} from './MOCKDOCUMENTS';
import { EventEmitter } from '@angular/core';
import { Document } from './document.model';

@Injectable({
    providedIn: 'root'
})
  export class DocumentService {
    documentSelectedEvent = new EventEmitter<Document>();

     documents: Document [] =[];
     constructor() {
        this.documents = MOCKDOCUMENTS;
     }

     getDocuments(): Document[] {
        return this.documents.slice(); //Returns a copy of array
    }  

  getDocument(index: string) {
    return this.documents[index];
  }


    /*for (let document of this.documents) {
      if (document.id === id) {
        return document;
      } 
    }
    return null;
  }*/
}