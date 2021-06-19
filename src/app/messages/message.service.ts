import { Message } from './messages.model';
import {Injectable} from '@angular/core';
import {MOCKMESSAGES} from './MOCKMESSAGES';
import { EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class MessageService {
    messageChangedEvent = new EventEmitter<Message[]>();
    maxMessageId: number;


    messages: Message [] =[];
     constructor(private http: HttpClient) {
        this.messages = MOCKMESSAGES;
        this.maxMessageId = this.getMaxId();

        this.http.get('https://week9-bf3e9-default-rtdb.firebaseio.com/messages.json').subscribe((DBMessages: Message[]) => {
          this.messages = DBMessages;
          this.maxMessageId = this.getMaxId();
          this.messages= this.messages.sort((a, b) => a.id > b.id ? 1 : 0);
        
          this.messageChangedEvent.emit(this.messages.slice());
    
        }, (error: any) => {
          console.log('error');
        });
     }

     storeMessages() {
      const messages = this.getMessages();
      this.http
        .put(
          'https://week9-bf3e9-default-rtdb.firebaseio.com/messages.json',
          messages
        )
        .subscribe(response => {
          console.log(response);
        });
    }




     getMessages(): Message[] {
        return this.messages.slice(); //Returns a copy of array
    }  

  getMessage (id: string) {
    for (let message of this.messages) {
      if (message.id === id) {
        return message;
      } 
    }
    return null;
  }

  addMessage(message: Message) {
    this.messages.push(message);
    this.messageChangedEvent.emit(this.messages.slice());
}

getMaxId(): number {

  var maxId = 0;
  for (let message of this.messages) {
    let currentId = parseInt(message.id);
    if (currentId > maxId) {
      maxId = currentId;
    }
    return maxId;
  }
}

}