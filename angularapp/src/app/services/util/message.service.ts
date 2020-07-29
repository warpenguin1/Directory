import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Message } from '../../model/Message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];

  remove(message: Message): void {
    let index = -1;
    this.messages.forEach((m, v) => {
      if (m === message){
        index = v;
        return false;
      }
    });
    if (index !== -1){
      this.messages.splice(index, 1);
    }
  }

  add(message: Message): void {
    this.messages.push(message);
    if (message.AutoClose){
        setTimeout(() => {
        this.remove(message);
      }, 3000);
    }
  }

  clear(): void  {
    this.messages = [];
  }

  log(message: string): void {
    const current = {
      Text: message,
      Class: 'info',
      AutoClose: true
    } as Message;
    this.add(current);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  // tslint:disable-next-line: typedef
  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      const current = {
        Text: `${operation} failed: ${error.message}`,
        Class: 'danger',
        AutoClose: false
      } as Message;
      this.add(current);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  constructor() { }
}
