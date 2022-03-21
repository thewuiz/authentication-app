import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private urlEndPoint = environment.base_url;
  public userUpdate: EventEmitter<User> = new EventEmitter<User>();

  constructor(private http: HttpClient) {}

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.urlEndPoint}/users/user/${id}`).pipe(
      map((response: any) => {
        return response.user as User;
      })
    );
  }

  updateUser(user: User): Observable<any> {
    return this.http
      .put<User>(`${this.urlEndPoint}/users/user/${user.uid}`, user)
      .pipe(
        map((response: any) => {
          return response.user as User;
        })
      );
  }
}
