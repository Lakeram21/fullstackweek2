import { Component, OnInit } from '@angular/core'
import { Message } from '../message.model'

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message('1', 'Marco', 'Polo', 'Verbose'),
    new Message('2', 'Marcus', 'Polo', 'Verbose'),
  ]

  constructor() {}

  ngOnInit(): void {}

  onAddMessage(message: Message) {
    this.messages.push(message)
  }
}
