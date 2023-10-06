import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  private apiUrl = 'https://development.api.optio.ai/api/v2/banners/find-one';

  constructor(private http: HttpClient) { }

  getBannerById(bannerId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImludGVybnNoaXBAb3B0aW8uYWkiLCJzdWIiOiJpbnRlcm5zaGlwIiwiaW50ZXJuc2hpcElkIjoienVyYWplbGFkemUyQGdtYWlsLmNvbSIsImlhdCI6MTY5NjUyODQxNywiZXhwIjoxNjk3MzkyNDE3fQ.H4i2JxaryS7eqBvTpOmgZCyGwFZAaiDe0yztCIs3lFqkoIqRm9dk1CAXPq7TnlgRKU2yeE8W5nCW91DQuVIATg'
    });

    // API request
    return this.http.post(this.apiUrl, { id: bannerId }, { headers: headers });
  }
}