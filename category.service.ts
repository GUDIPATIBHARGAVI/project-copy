import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'http://localhost:3000/categories';

  constructor(private http: HttpClient) {}

  addCategory(categoryData: { category: string }): Observable<any> {
    return this.http.post(this.apiUrl, categoryData);
  }

  getCategories(): Observable<string[]> {
    return this.http
      .get<any[]>(this.apiUrl)
      .pipe(
        map((categories) => categories.map((category) => category.category))
      );
  }
}
