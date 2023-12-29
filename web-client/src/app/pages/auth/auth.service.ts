import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {  ReplaySubject, map, of } from 'rxjs';
import { IUser } from 'src/app/models/user';
import { environment } from 'src/env/env.local';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.apiUrl; 
  private user = new ReplaySubject<IUser | null>(1);
  user$  = this.user.asObservable();

  constructor(private httpClient: HttpClient, private router: Router) { }

  login(formData: any){
    return this.httpClient.post<IUser>(`${this.baseUrl}auth/login`, formData).pipe(
      map((user: IUser) => {
        localStorage.setItem('token', user.token);
        this.user.next(user);
      })
    ); 
  }

  logout(){
    localStorage.removeItem('token');
    this.user.next(null);
    this.router.navigateByUrl('/');
  }

  getCurrentUser(token?: string){
    if (token == null || token == "") {
      this.user.next(null);
      return of(null);
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.httpClient.get<IUser>(this.baseUrl + "auth", { headers }).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.user.next(user);
          return user;
        } else {
          return null;
        }
      })
    )
  }

  isLoggedIn(){
    return this.user$.pipe(
      map(user => {
        if (user) {
          return true;
        } else {
          return false;
        }
      })
    )
  }

  //#region Register
  register(formData: any){
    return this.httpClient.post<IUser>(`${this.baseUrl}auth/register`, formData).pipe
    (
      map((user: IUser) => {
        localStorage.setItem('token', user.token);
        this.user.next(user);
      })
    );
  }
  //#endregion

  //#region HELPERS
  isEmailExists(email: string){
    ///auth/email?email=bob1@test.com
    return this.httpClient.get<IUser>(`${this.baseUrl}auth/email?email=${email}`).pipe(
      map((user: IUser) => {
        if (user) {
          return true;
        } else {
          return false;
        }
      })
    );
  }
  //#endregion
}
