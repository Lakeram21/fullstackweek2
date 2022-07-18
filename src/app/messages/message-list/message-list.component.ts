import { Component, OnInit } from '@angular/core'
import { Subscription } from 'rxjs';
import { Message } from '../message.model'
import { MessageService } from '../message.service'

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];
 private subscription: Subscription
  constructor(private messageService:MessageService) {}

   ngOnInit(){
     this.messageService.getMessages();
    
     this.subscription = this.messageService.messageChangedEvent.subscribe(
      (document:Message[])=>{
        this.messages=document;
         console.log(this.messages)
      })
  }


  onAddMessage(message: Message) {
    this.messages.push(message)
  }
}
