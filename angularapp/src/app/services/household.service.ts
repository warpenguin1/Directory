import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './util/message.service';
import { ObjectID } from 'bson';

import { Household } from './../model/Household';

@Injectable({
  providedIn: 'root'
})
export class HouseholdService {
  private containerUrl = 'http://localhost:3000/household';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getHouseholds(): Observable<Household[]>{
    return this.http.get<Household[]>(this.containerUrl)
    .pipe(
      tap(_ => this.messageService.log('fetched households')),
      catchError(this.messageService.handleError<Household[]>('getHouseholds', []))
    );
  }

  getHousehold(id: ObjectID): Observable<Household>{
    const url = `${this.containerUrl}/${id}`;
    return this.http.get<Household>(url)
    .pipe(
      tap(_ => this.messageService.log(`fetched household id=${id}`)),
      catchError(this.messageService.handleError<Household>('getHousehold', null))
    );
  }

  deleteHousehold(container: Household): Observable<Household> {
    const id =   container._id;
    const url = `${this.containerUrl}/${id}`;

    return this.http.delete<Household>(url, this.httpOptions).pipe(
      tap(_ => this.messageService.log(`deleted household id=${id}`)),
      catchError(this.messageService.handleError<Household>('deleteHousehold'))
    );
  }

  addHousehold(container: Household): Observable<Household> {
    return this.http.post<Household>(this.containerUrl, container, this.httpOptions).pipe(
      tap((newContainer: Household) => this.messageService.log(`added container w/ id=${newContainer._id}`)),
      catchError(this.messageService.handleError<Household>('addHousehold'))
    );
  }

  updateHousehold(container: Household): Observable<Household> {
    return this.http.put<Household>(this.containerUrl, container, this.httpOptions).pipe(
      tap(_ => this.messageService.log(`updated household id=${container._id}`)),
      catchError(this.messageService.handleError<Household>('updateHousehold'))
    );
  }

  constructor(private http: HttpClient, private messageService: MessageService) { }
}
