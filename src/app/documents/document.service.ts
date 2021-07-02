import { Injectable } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentListChangedEvent = new Subject<Document[]>();
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();

  documents: Document[] = [];
  maxDocumentId: number;

  /*constructor(private http: HttpClient) {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();

    this.http.get('https://week9-bf3e9-default-rtdb.firebaseio.com/documents.json').subscribe((DBDocs: Document[]) => {
      this.documents = DBDocs;
      this.maxDocumentId = this.getMaxId();
      this.documents.sort((a, b) => a.name < b.name ? -1 : 0);
      //this.documents = this.documents.sort((a, b) => a.name > b.name ? 1 : 0);
      this.documentListChangedEvent.next(this.documents.slice());

    }, (error: any) => {
      console.log('error');
    });
  } */

  constructor(private http: HttpClient) {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();

    this.http.get('http://localhost:3000/documents').subscribe((DBDocs: Document[]) => {
      this.documents = DBDocs;
      this.maxDocumentId = this.getMaxId();
      this.documents.sort((a, b) => a.name < b.name ? -1 : 0);
      //this.documents = this.documents.sort((a, b) => a.name > b.name ? 1 : 0);
      this.documentListChangedEvent.next(this.documents.slice());

    }, (error: any) => {
      console.log('error');
    });
  }


  storeDocuments() {
    const documents = this.getDocuments();
    this.http
      .put(
        'https://week9-bf3e9-default-rtdb.firebaseio.com/documents.json',
        documents
      )
      .subscribe(response => {
        console.log(response);
        this.documentListChangedEvent.next(documents.slice());
      });
  }


  getDocuments(): Document[] {
    return this.documents.slice(); //Returns a copy of array
  }


  getDocument(index: string) {
    return this.documents[index];
  }


  /*deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    //this.documentListChangedEvent.next(this.documents.slice());
    this.storeDocuments();
  } */
  deleteDocument(document: Document) {

    if (!document) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === document.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:3000/documents/' + document.id)
      .subscribe(
        (response: Response) => {
          this.documents.splice(pos, 1);
          //this.sortAndSend();
        }
      );
  }


  getMaxId(): number {

    var maxId = 0;
    for (let document of this.documents) {
      let currentId = parseInt(document.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
      return maxId;
    }
  }


 /* addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }
    this.maxDocumentId++
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    let documentsListClone = this.documents.slice();
    //this.documentListChangedEvent.next(documentsListClone);
    this.storeDocuments();
  } */

addDocument(document: Document) {
  if (!document) {
    return;
  }

  // make sure id of the new Document is empty
  document.id = '';

  const headers = new HttpHeaders({'Content-Type': 'application/json'});

  // add to database
  this.http.post<{ message: string, document: Document }>('http://localhost:3000/documents',
    document,
    { headers: headers })
    .subscribe(
      (responseData) => {
        // add new document to documents
        this.documents.push(responseData.document);
        let documentsListClone = this.documents.slice();
      }
    );
}



  /*updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }
    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }
    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    let documentsListClone = this.documents.slice();
    //this.documentListChangedEvent.next(documentsListClone);
    this.storeDocuments();
  }
*/
updateDocument(originalDocument: Document, newDocument: Document) {
  if (!originalDocument || !newDocument) {
    return;
  }

  const pos = this.documents.findIndex(d => d.id === originalDocument.id);

  if (pos < 0) {
    return;
  }

  // set the id of the new Document to the id of the old Document
  newDocument.id = originalDocument.id;

  const headers = new HttpHeaders({'Content-Type': 'application/json'});

  // update database
  this.http.put('http://localhost:3000/documents/' + originalDocument.id,
    newDocument, { headers: headers })
    .subscribe(
      (response: Response) => {
        this.documents[pos] = newDocument;
        //this.sortAndSend();
      }
    );
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
