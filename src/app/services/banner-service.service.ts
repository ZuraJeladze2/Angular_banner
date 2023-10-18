import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  accessToken: string = 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImludGVybnNoaXBAb3B0aW8uYWkiLCJzdWIiOiJpbnRlcm5zaGlwIiwiaW50ZXJuc2hpcElkIjoienVyYWplbGFkemUyQGdtYWlsLmNvbSIsImlhdCI6MTY5NzQzMDI4MCwiZXhwIjoxNjk4Mjk0MjgwfQ.kDIqXNIAzEoMAcQrZn59dhpVk22n3I5fuGc5gBf6HNTeWLN1fzG3NTfCSqf920lQBZ3LtkputYkJEa009y1rLA'
  
  //#region  bannersAPI
  private findOneBanner = 'https://development.api.optio.ai/api/v2/banners/find-one';
  private findBanner = 'https://development.api.optio.ai/api/v2/banners/find';
  private saveBanner = 'https://development.api.optio.ai/api/v2/banners/save';
  //#endregion

  //#region blobAPI
  private findBlob = 'https://development.api.optio.ai/api/v2/blob/find' 
  private uploadBlob = 'https://development.api.optio.ai/api/v2/blob/upload' 
  //#endregion
  
  //#region refAPI
  private findRef = 'https://development.api.optio.ai/api/v2/reference-data/find';
  //#endregion
  constructor(private http: HttpClient) { }

  getBannerById(bannerId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.accessToken
    });
    return this.http.post(this.findOneBanner, { id: bannerId }, { headers: headers });
  }

  getBannersData(queryString: any): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.accessToken
    });
    return this.http.post(this.findBanner, queryString, { headers: headers })
  }

  saveBannersData(queryString: any): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.accessToken
    });
    return this.http.post(this.saveBanner, queryString, { headers: headers })
  }

  getRefData(queryString: any): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.accessToken
    });
    return this.http.post(this.findRef, queryString, { headers: headers })
  }

  getBlobsData(queryString: any): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.accessToken
    });
    return this.http.post(this.findBlob, queryString, { headers: headers })
  }

  uploadBlobsData(queryString: any): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.accessToken
    });
    return this.http.post(this.uploadBlob, queryString, { headers: headers })
  }
}