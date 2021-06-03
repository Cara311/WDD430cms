import {Injectable} from '@angular/core';
import {MOCKDOCUMENTS} from './MOCKDOCUMENTS';
import { EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
  export class DocumentService {
    documentListChangedEvent = new Subject<Document[]>();
    documentSelectedEvent = new EventEmitter<Document>();
    documentChangedEvent = new EventEmitter<Document[]>();

     documents: Document [] = [];
     maxDocumentId: number; 

     constructor() {
        this.documents = MOCKDOCUMENTS;
        this.maxDocumentId = this.getMaxId();
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
    this.documentListChangedEvent.next(this.documents.slice());
 }


getMaxId(): number {

  var maxId = 0;
   for (let document of this.documents) {
     let currentId = parseInt(document.id);
     if (currentId > maxId ) {
       maxId = currentId;
     } 
     return maxId;
   }
}


addDocument(newDocument: Document) {
  if (newDocument === undefined || newDocument === null) {
    return;
  }
  this.maxDocumentId++
  newDocument.id = this.maxDocumentId.toString();
  this.documents.push(newDocument);
  let documentsListClone = this.documents.slice();
  this.documentListChangedEvent.next(documentsListClone);
}



updateDocument(originalDocument: Document, newDocument: Document) {
  if (originalDocument || newDocument === null) {
    return;
  }
  const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
       return;
    }
  newDocument.id = originalDocument.id;
  this.documents[pos] = newDocument;  
  let documentsListClone = this.documents.slice();
  this.documentListChangedEvent.next(documentsListClone);
}








}

/*getContact(id: string) {
  for (let contact of this.contacts) {
    if (contact.id === id) {
      return contact;
    } 
  }
  return null;
} */

    /*for (let document of this.documents) {
      if (document.id === id) {
        return document;
      } 
    }
    return null;
  }*/
