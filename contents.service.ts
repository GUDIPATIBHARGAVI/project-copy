// content.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContentModel } from '../models/content.model';
@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private apiUrl = 'http://localhost:3000/contents'; // Assuming json-server is running on this URL

  constructor(private http: HttpClient) {}

  addContent(contentData: any): Observable<any> {
    console.log('Sending data to server:', contentData); // Log the data being sent
    return this.http.post(this.apiUrl, contentData);
  }
  // getAllContent(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiUrl}/contents`);
  // }
  getAllContent(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  deleteContent(contentId: number): Observable<void> {
    const url = `${this.apiUrl}/${contentId}`; // Fix the URL
    return this.http.delete<void>(url);
  }
  getContentById(contentId: number): Observable<ContentModel> {
    const url = `${this.apiUrl}/${contentId}`;
    return this.http.get<ContentModel>(url);
  }
  updateContent(contentData: any): Observable<any> {
    console.log('Updating data on the server:', contentData);
    const url = `${this.apiUrl}/${contentData.id}`;
    return this.http.put(url, contentData);
  }
}
