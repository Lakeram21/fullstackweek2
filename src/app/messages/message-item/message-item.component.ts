import { Component, Input, OnInit, Output } from '@angular/core'
import { Contact } from 'src/app/contacts/contact.model';
import { ContactsService } from 'src/app/contacts/contacts.service'
import { Message } from '../message.model'

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css'],
})
export class MessageItemComponent implements OnInit{
   @Input() message: Message;
   messageSender: Contact;
   id:string;
   
   constructor(private contactService: ContactsService) {}
   ngOnInit(){
   console.log("here")
     this.id = this.message.sender.toString()
      this.contactService.getContact(this.id).subscribe((contact:Contact)=>{

          this.messageSender = contact;
          console.log(this.messageSender)         
          
      });
       
      
    
   }
}

