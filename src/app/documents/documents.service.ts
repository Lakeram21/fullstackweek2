import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
documentSelected = new EventEmitter<Document>();
private documents: Document[]=[];
  
constructor() { 
    this.documents=MOCKDOCUMENTS;
  }

  getDocuments(){
    return this.documents.slice();
  }

  getDocument(id:string)
  {
    this.documents.forEach(document => {
      if(id == document.id)
      {
        return document;
      }
      else{
        return null;
      } 
    });
  }
}
