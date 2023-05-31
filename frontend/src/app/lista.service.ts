import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Lista } from './lista';
import {Item} from "./item";
//import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class ListaService {

  private listasUrl = 'api/listas';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }
  getListas(): Observable<Lista[]> {
    return this.http.get<Lista[]>(this.listasUrl)
      .pipe(
        tap(_ => this.log('fetched listas')),
        catchError(this.handleError<Lista[]>('getListas', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}
