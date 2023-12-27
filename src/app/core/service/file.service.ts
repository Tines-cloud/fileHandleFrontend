import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceType } from '../enums/service-type';
import { ContentType } from '../enums/content-type';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private baseUrl = 'http://localhost:8080/file-handle';

  constructor(private http: HttpClient) { }

  uploadFile(file: File, serviceType: ServiceType, contentType: ContentType): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('serviceType', `${serviceType}`);
    formData.append('contentType', `${contentType}`);

    return this.http.post(`${this.baseUrl}/upload`, formData, { responseType: 'text' });
  }

  downloadFile(fileName: string, serviceType: ServiceType, contentType: ContentType): Observable<any> {
    return this.http.get(`${this.baseUrl}/download/${fileName}`, {
      params: { "serviceType": `${serviceType}`, "contentType": `${contentType}` }, responseType: 'blob'
    });

  }

  deleteFile(fileName: string, serviceType: ServiceType, contentType: ContentType): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${fileName}`,
      { params: { "serviceType": `${serviceType}`, "contentType": `${contentType}` }, responseType: 'blob' });
  }

  getFiles(serviceType: ServiceType): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/load`, {
      params: { "serviceType": `${serviceType}` }
    });
  }
}
