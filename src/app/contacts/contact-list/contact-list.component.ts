import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { concat } from 'rxjs'
import { Contact } from '../contact.model'

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit {
  @Output() contactWasSelected = new EventEmitter<Contact>()
  contacts: Contact[] = [
    new Contact(
      '1',
      'R. Kent Jonhsson',
      'jackson@byui.edu',
      '208-496-3771',
      '../../assets/images/jacksonk.jpg',
      null,
    ),
    new Contact(
      '2',
      'Rex Barzee',
      'barzeer@byui.edu',
      '2068934859',
      '../../assets/images/barzeer.jpg',
      null,
    ),
  ]

  constructor() {}

  ngOnInit(): void {}
  onContactSelected(contact: Contact) {
    this.contactWasSelected.emit(contact)
  }
}
