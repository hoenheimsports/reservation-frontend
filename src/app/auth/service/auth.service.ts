import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError, Observable, of} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  credentials!: string | undefined;

  constructor(private http: HttpClient) {
    this.credentials = localStorage.getItem('credentials') || undefined;
  }

  isAuth(): Observable<boolean> {
    let rtr: Observable<boolean> = of(false);
    if (this.credentials) {
      rtr = this.http.get<boolean>(environment.api + '/login', {
        headers: this.getCredentials(this.credentials),
      }).pipe(
        catchError(() => {
          return of(false);
        }),
      );
    }
    return rtr;
  }

  public getHeaders() {
    if (this.credentials) {
      return {
        headers: this.getCredentials(this.credentials),
      };
    } else {
      return {};
    }
  }

  private getCredentials(credentials: string): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Basic ${credentials}`
    });
  }

  login(username: string, password: string) {
    this.credentials = btoa(`${username}:${password}`);
    localStorage.setItem('credentials', this.credentials);
  }

}

