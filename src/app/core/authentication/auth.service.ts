import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlEndPoint = environment.base_url;
  private _token: string = '';
  private _userId: string = '';

  constructor(private http: HttpClient) {}

  public get token(): string {
    if (this._token !== '') {
      return this._token;
    } else if (this._token == '' && sessionStorage.getItem('token')) {
      this._token = sessionStorage.getItem('token') || '';
      return this._token;
    }
    return '';
  }

  public get userId(): string {
    if (this._userId !== '') {
      return this._userId;
    } else if (this._userId == '' && sessionStorage.getItem('userId')) {
      this._userId = sessionStorage.getItem('userId') || '';
      return this._userId;
    }
    return '';
  }

  signIn(user: User): Observable<any> {
    return this.http.post<any>(`${this.urlEndPoint}/login`, user).pipe(
      map((response) => {
        return response;
      })
    );
  }

  signUp(user: User): Observable<any> {
    return this.http.post(`${this.urlEndPoint}/users/create`, user);
  }

  logout(): void {
    sessionStorage.removeItem('token');
    this._token = '';
    this.isAuthenticated();
  }

  getPayload(accessToken: string): any {
    if (accessToken !== '') {
      return JSON.parse(atob(accessToken.split('.')[1]));
    } else return '';
  }

  isAuthenticated(): boolean {
    let payload = this.getPayload(this.token);
    if (payload !== '' && payload.uid) {
      return true;
    }
    return false;
  }

  saveToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }

  saveUserId(userId: string): void {
    this._userId = userId;
    sessionStorage.setItem('userId', userId);
  }

  // ===============================================================================================
  // ================================= GITHUD METHODS =================================================
  getAuthPageGithud(): Observable<any> {
    return this.http.get(`${this.urlEndPoint}/login/github`);
  }

  loginGithud(code: string): Observable<any> {
    return this.http.get(`${this.urlEndPoint}/login/github/${code}`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}
