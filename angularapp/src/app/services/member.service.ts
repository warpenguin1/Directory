import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './util/message.service';
import { ObjectID } from 'bson';

import { Member, MemberDetail } from './../model/Member';
import { ENETUNREACH } from 'constants';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private containerUrl = 'http://localhost:3000/member';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  getMembers(): Observable<MemberDetail[]>{
    return this.http.get<MemberDetail[]>(this.containerUrl)
    .pipe(
      tap(_ => this.messageService.log('fetched members')),
      catchError(this.messageService.handleError<MemberDetail[]>('getMembers', [])),
      map(values => {
        for (const m of values){
          m._id = new ObjectID(m._id);
          m.HouseholdId = new ObjectID(m.HouseholdId);
        }
        return values;
      })
    );
  }

  getMember(id: ObjectID): Observable<MemberDetail>{
    const url = `${this.containerUrl}/${id}`;
    return this.http.get<MemberDetail>(url)
    .pipe(
      tap(_ => this.messageService.log(`fetched member id=${id}`)),
      catchError(this.messageService.handleError<MemberDetail>('getMember', null)),
      map(value => {
        value._id = new ObjectID(value._id);
        value.HouseholdId = new ObjectID(value.HouseholdId);
        return value;
      })
    );
  }

  deleteMember(container: Member): Observable<Member> {
    const id =   container._id;
    const url = `${this.containerUrl}/${id}`;

    return this.http.delete<Member>(url, this.httpOptions).pipe(
      tap(_ => this.messageService.log(`deleted member id=${id}`)),
      catchError(this.messageService.handleError<Member>('deleteMember'))
    );
  }

  addMember(container: Member): Observable<Member> {
    return this.http.post<Member>(this.containerUrl, container, this.httpOptions).pipe(
      tap((newContainer: Member) => this.messageService.log(`added member w/ id=${newContainer._id}`)),
      catchError(this.messageService.handleError<Member>('addMember'))
    );
  }

  updateMember(container: Member): Observable<Member> {
    return this.http.put<Member>(this.containerUrl, container, this.httpOptions).pipe(
      tap(_ => this.messageService.log(`updated member id=${container._id}`)),
      catchError(this.messageService.handleError<Member>('updateMember'))
    );
  }

  constructor(private http: HttpClient, private messageService: MessageService) { }
}
