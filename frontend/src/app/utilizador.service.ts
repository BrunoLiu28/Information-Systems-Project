import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

import {Observable, of, throwError} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Utilizador } from './utilizador';
import { Router } from '@angular/router';
import {ObjectId} from "bson";
import {Item} from "./item";


@Injectable({ providedIn: 'root' })
export class UtilizadorService {

  private utilizadoresUrl = 'api/utilizadores';  // URL to web api
  private loginUrl = 'api/login';
  private registoUrlPostAdd = 'api/register';
  private addCarrinhoUrl = 'api/utilizador';
  private removerItemWishlistUrl = 'api/wishlist';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private _router:Router,
    private http: HttpClient
    //, private messageService: MessageService
  ) { }

  /** GET heroes from the server */
  getUtilizadores(): Observable<Utilizador[]> {
    return this.http.get<Utilizador[]>(this.utilizadoresUrl)
      .pipe(
        tap(_ => this.log('fetched utilizadores')),
        catchError(this.handleError<Utilizador[]>('getUtilizadores', []))
      );
  }

  /* GET heroes whose name contains search term */
  searchUtilizadores(term: string): Observable<Utilizador[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Utilizador[]>(`${this.utilizadoresUrl}/?nome=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found utilizadores matching "${term}"`) :
        this.log(`no utilizadores matching "${term}"`)),
      catchError(this.handleError<Utilizador[]>('searchUtilizadores', []))
    );
  }

  addUtilizador(utilizador: Utilizador): Observable<Utilizador> {
    return this.http.post<Utilizador>(this.registoUrlPostAdd, utilizador, this.httpOptions).pipe(
      tap((newUtilizador: Utilizador) => {
        console.log(`registado in utilizador w/ id=${newUtilizador.userId}`);
        window.alert('Utilizador registado com sucesso');
        this.redirectToMainPage(newUtilizador.userId);
      }),
      catchError((error: HttpErrorResponse) => {
        window.alert(`The user already exists!`);
        return throwError(error);
      })
    );
  }


  loginUtilizador(utilizador: Utilizador): Observable<any> {
    return this.http.post<Utilizador>(this.loginUrl, utilizador, this.httpOptions).pipe(
      tap((utilizador: Utilizador) => {
        console.log(`logged in utilizador w/ id=${utilizador.userId}`);
        this.redirectToMainPage(utilizador.userId);
      }),
      catchError((error) => {
        console.error('Error:', error);
        window.alert('Error, certifique-se a conta que inseriu existe, ou se nao inseriu mal a password');
        return throwError(error); // <-- rethrow the error
      })
    );

  }

  redirectToMainPage(id: string): void {
    // console.log(id);
    this._router.navigate([`${id}/main-page`]);
  }

  getUtilizador(id: string): Observable<Utilizador> {
    const url = `api/${id}/main-page`;
    return this.http.get<Utilizador>(url).pipe(
      tap(_ => this.log(`fetched utilizador id=${id}`)),
      catchError(this.handleError<Utilizador>(`getUtilizador id=${id}`))
    );

  }
  updateUser(utilizador: Utilizador, userId: string, pass: string, imagemDePerfil: string){
    if(userId == ''){
      userId = utilizador.userId;
    }
    if(pass == ''){
      pass = utilizador.pass;
    }
    if(imagemDePerfil == ''){

        imagemDePerfil = utilizador.imagemDePerfil;
    }
    const tosend = {
      id: utilizador._id,
      userId: userId,
      pass: pass,
      imagemDePerfil: imagemDePerfil,
    }
    console.log(`Id: ${tosend.id}, Username: ${tosend.userId}, Password: ${tosend.pass}`);
    return this.http.put('api/prof-sets', tosend, this.httpOptions).pipe(
      tap(_ => window.alert(`User updated!`),),
      catchError((error: HttpErrorResponse) => {
        window.alert(`The user already exists!`);
        return throwError(error);
      })
      );
  }

  addCarrinho(utilizador: Utilizador, item: Item): Observable<any> {
    return this.http.put(`${this.addCarrinhoUrl}/${utilizador._id}/item/${item._id}`, item, this.httpOptions).pipe(
      tap(_ => {
          this.log(`item adicionado ao carrinho id=${item._id}`);
          window.alert("Item adicionado ao carrinho com sucesso")
      }),
      catchError((error) => {
          console.error('Error:', error);
          window.alert('Erro: Esse item ja esta no seu carrinho!');
          return throwError(error); // <-- rethrow the error
      })

    );
  }


  addItemWishlist(utilizador: Utilizador, item: Item): Observable<any> {
    return this.http.put(`${this.addCarrinhoUrl}/${utilizador._id}/wishlist/${item._id}`, item, this.httpOptions).pipe(
      tap(_ => {
        this.log(`item adicionado a wishlist id=${item._id}`);
        window.alert("Item adicionado a wishlist com sucesso")
      }),
      catchError((error) => {
        console.error('Error:', error);
        window.alert('Erro: Esse item ja esta na sua wishlist!');
        return throwError(error); // <-- rethrow the error
      })

    );

  }


  removerItemWishlist(utilizador: Utilizador, item: Item): Observable<any> {
    console.log(`${this.removerItemWishlistUrl}/${utilizador._id}/${item._id}`);
    return this.http.put(`${this.removerItemWishlistUrl}/${utilizador._id}/${item._id}`, this.httpOptions).pipe(
      tap(_ => {
        this.log(`item removido da wishlist id=${item}`);
        window.alert("Item removido da wishlist com sucesso")
      }),
      catchError((error) => {
        console.error('Error:', error);
        window.alert('Erro: Esse item não se encontra na wishlist!');
        return throwError(error); // <-- rethrow the error
      })

  );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }


}
