import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from './message.model';
// import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
 messageChanged = new EventEmitter<Message[]>();
 messageChangedEvent = new Subject<Message[]>();
 private messages:Message[]=[];
 maxMessageId: number;
  constructor(private http: HttpClient) { 
    // this.messages = MOCKMESSAGES;
  }

  getMessages(){
    // return this.messages.slice();
     this.http.get("http://localhost:3000/messages")
    .subscribe((messages:Message[])=>{
      console.log(messages)
      this.messages = messages;
      this.maxMessageId = this.getMaxId()
      this.messageChangedEvent.next(this.messages.slice())

    }, (error) =>{
      console.log(error)
    })
  }

  getMessage(id:string){
    this.messages.forEach(message => {
      if(id == message.id)
      {
        return message;
      }
      else{
        return null;
      }
      
    });
  }

   addMessage(message:Message)
   {
      if (!message) {
      return;
    }

    // make sure id of the new Document is empty
    message.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ mess: string, message: Message }>('http://localhost:3000/messages/',
      message,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new document to documents
          this.messages.push(responseData.message);
          this.sortAndSend();
          // storeDocument()

        }
      );

   }

    /******************************************************
    * WILL GET THE MAXID FOR THE  ITEM IN THE COLLECTION SO 
    * AS TO PRODUCE A UNIQUE ID 
    * ******************** *********************************/
    getMaxId(){

    let maxid = 0;

    this.messages.forEach(contact => {
      let currId = parseInt(contact.id);
      if(currId > maxid)
      {
        maxid = currId;
      }
       
    });
    return maxid;
  }


   storeMessage()
  {
    const messages = JSON.stringify(this.messages);

    const headers = new HttpHeaders()
   .set('content-type', 'application/json')
   .set('Access-Control-Allow-Origin', '*');

   this.http.put('http://localhost:3000/messages/', messages, {headers:headers} )
        .subscribe(data => this.messageChanged.emit(this.messages.slice()) );
  }

  sortAndSend()
  {

    this.messageChangedEvent.next(this.messages.slice());
  }
}
