import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { Document } from '../document.model'
import { DocumentsService } from '../documents.service'
@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent implements OnInit {
  documents: Document[] = []
  constructor(private docService:DocumentsService) {}

  ngOnInit(){
    this.documents= this.docService.getDocuments();
    
    this.docService.documentChangedEvent.subscribe(
      (document:Document[])=>{
        this.documents=document;
      })
  }

}
