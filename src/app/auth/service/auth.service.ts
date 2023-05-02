import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError, Observable, of} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  username:string = '';
  password:string = '';

  credentials!:string;

  constructor(private http:HttpClient) {
    this.username = localStorage.getItem('username') || '';
    this.password = localStorage.getItem('password') || '';
  }

  isAuth():Observable<boolean> {
    this.credentials = btoa(`${this.username}:${this.password}`);
    return this.http.get<boolean>(environment.api+'/login',{
      headers:this.getHeaders(this.credentials),
    } ).pipe(
      catchError( () => {
        return of(false);
      }),
    );
  }

  private getHeaders(credentials:string):HttpHeaders {
    return new HttpHeaders({
      Authorization: `Basic ${credentials}`
    });
  }

  login(username:string,password:string) {
    this.username = username;
    this.password = password;
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
  }

}
