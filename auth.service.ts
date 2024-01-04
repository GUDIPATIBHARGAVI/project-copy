import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  users: any;
  constructor(private http: HttpClient) {
    lastValueFrom(this.http.get<any[]>(`${this.apiurl}`)).then(
      (user) => {
        this.users = user;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
  apiurl = 'http://localhost:3000/users';

  RegisterUser(inputdata: any) {
    return this.http.post(this.apiurl, inputdata);
  }
  GetUserbyCode(id: any) {
    return this.http.get(this.apiurl + '/' + id);
  }
  Getall() {
    return this.http.get(this.apiurl);
  }
  updateuser(id: any, inputdata: any) {
    return this.http.put(this.apiurl + '/' + id, inputdata);
  }
  getuserrole(): Observable<string> {
    return this.http.get<string>('http://localhost:3000/role');
  }
  isloggedin() {
    return sessionStorage.getItem('username') != null;
  }
  getrole() {
    return sessionStorage.getItem('role') != null
      ? sessionStorage.getItem('role')?.toString()
      : '';
  }

  Getaccessbyrole(role: any, menu: any) {
    return this.http.get(
      'http://localhost:3000/roleaccess?role=' + role + '&menu=' + menu
    );
  }
  GetAllRole() {
    return this.http.get('http://localhost:3000/role');
  }

  login(email: string, password: string): Observable<any> {
    const user = this.users.find(
      (u: { email: string; password: string }) =>
        u.email === email && u.password === password
    );

    if (user) {
      this.setCurrentUser(user);
      console.log('User found:', user);
      return of({ success: true, user });
    } else {
      console.log('User not found');
      return of({ success: false, message: 'Authentication failed' });
    }
  }

  logout(): Observable<any> {
    this.clearCurrentUser();
    return of(null);
  }

  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }

  getUsername(): string | null {
    const currentUser = this.getCurrentUser();
    return currentUser ? currentUser.email : null;
  }

  private setCurrentUser(user: any): void {
    sessionStorage.setItem('currentUser', JSON.stringify(user));
  }
  getUserId(): number | null {
    const currentUser = this.getCurrentUser();
    return currentUser ? currentUser.id : null;
  }

  private getCurrentUser(): any | null {
    const userString = sessionStorage.getItem('currentUser');
    return userString ? JSON.parse(userString) : null;
  }

  private clearCurrentUser(): void {
    sessionStorage.removeItem('currentUser');
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
