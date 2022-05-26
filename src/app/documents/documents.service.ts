import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
documentSelected = new EventEmitter<Document>();
documentChangedEvent = new EventEmitter<Document[]>();
private documents: Document[]=[];
  
constructor() { 
    this.documents=MOCKDOCUMENTS;
  }

  getDocuments(){
    return this.documents.slice();
  }

  getDocument(id:string)
  {
    for(let contact of this.documents){
       if(contact.id == id)
       {
         return contact
       }
     }
     return null;
   }
  

   deleteDocument(document: Document) {
   if (!document) {
      return;
   }
   const pos = this.documents.indexOf(document);
   if (pos < 0) {
      return;
   }
   this.documents.splice(pos, 1);
   this.documentChangedEvent.emit(this.documents.slice());
}
}
