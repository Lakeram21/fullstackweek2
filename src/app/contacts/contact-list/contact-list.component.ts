import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { concat } from 'rxjs'
import { Contact } from '../contact.model'
import { ContactsService } from '../contacts.service'

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = []

  constructor(private contactService: ContactsService) {}

  ngOnInit(){
    this.contacts = this.contactService.getContacts()

     this.contactService.contactChangedEvent.subscribe(
      (contact:Contact[])=>{
        this.contacts=contact;
      })
  }
  
}
