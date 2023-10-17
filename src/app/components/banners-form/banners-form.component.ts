import { Component } from '@angular/core';
import { DrawerComponent } from '../drawer/drawer.component';
import { Subscription, catchError, map } from 'rxjs';
import { BannerService } from '../../services/banner-service.service';

@Component({
  selector: 'app-banners-form',
  templateUrl: './banners-form.component.html',
  styleUrls: ['./banners-form.component.css'],
})
export class BannersFormComponent {


  constructor(private http: BannerService) { }

  //image, title, zone, active, dates, labels
  formValues = {
    title: '',
    zone: '',
    active: null,
    startDate: '',
    endDate: '',
    label: ''
  }

  blobRB = {  //find Request Body
    blobIds: ['2'],
  };
  refRB = {
    includes: [],
    search: '', // Replace with your search query
    sortBy: '',
    // typeIds: null,
    sortDirection: '',
    pageIndex: 0,
    pageSize: 100,
  }

  options = {
    zone: [],
    label: []
  }

  logForm() {
    console.log(this.formValues);
  }

  getBlobs() {
    this.http.getBlobsData(this.blobRB)
      .pipe(
        map(response => {
          return response; // You might want to return the response
        }),
        catchError(error => {
          console.error('API Error:', error);
          throw error;
        })
      )
      .subscribe(data => {
        console.log(data);
      });
  }

  getRef(typeId: string, opts: string[]) {
    this.refRB['typeId'] = typeId;
    this.http.getRefData(this.refRB).pipe(
      map(response => {
        console.log(response);
        return response.data.entities.map(item => item.name);
      }),
      catchError(error => {
        console.log(error);
        throw error;
      })
    ).subscribe(data => {
      console.log(data);
      data.forEach((el) => {
        opts.push(el);
      });
    });
  }

  ngOnInit(): void {
    this.getRef('1700', this.options.zone)
    this.getRef('1900', this.options.label)
  }
}
