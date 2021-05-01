import { Component, OnInit, Input, Output } from '@angular/core';
import { Message } from '../messages.model';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message;

  constructor() { }

  ngOnInit(): void {
  }

}
