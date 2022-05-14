import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { Document } from '../document.model'
@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent implements OnInit {
  @Output() documentWasSelected = new EventEmitter<Document>()

  documents: Document[] = [
    new Document(
      '1',
      'Document1',
      'This is document One for Testing',
      '../../assets/images/jacksonk.jpg',
      null,
    ),
    new Document(
      '2',
      'Document2',
      'This is document Two for testing',
      '../../assets/images/jacksonk.jpg',
      null,
    ),
  ]
  constructor() {}

  ngOnInit(): void {}
  onSelectedDocument(document: Document) {
    this.documentWasSelected.emit(document)
  }
}
