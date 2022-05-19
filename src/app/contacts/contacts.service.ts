import { EventEmitter, Injectable } from '@angular/core';
import { concat } from 'rxjs';
import { Contact } from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';
@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  contactSelectedEvent = new EventEmitter<Contact>();
  private contacts: Contact[]=[];
  constructor() {
    this.contacts = MOCKCONTACTS;
   }

   getContacts(){
     return this.contacts.slice();

   }

   getContact(id:string)
   {
     for(let contact of this.contacts){
       if(contact.id == id)
       {
         return contact
       }
     }
     return null;
   }
   
}
