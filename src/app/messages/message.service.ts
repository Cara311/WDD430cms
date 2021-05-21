import { Message } from './messages.model';
import {Injectable} from '@angular/core';
import {MOCKMESSAGES} from './MOCKMESSAGES';
import { EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class MessageService {
    messages: Message [] =[];
     constructor() {
        this.messages = MOCKMESSAGES;
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
}