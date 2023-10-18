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


  constructor(private httpBanner: BannerService) { }

  //image, title, zone, active, dates, labels
  formValues = {
    name: '',
    zoneId: '',
    active: null,
    startDate: '',
    endDate: '',
    labels: [],
    fileId: '',
    channelId: '',
    language: '',
    url: '',
    priority: null,
  }

  blobRB = {  //find Request Body
    blobIds: [''],
  };

  
  refRB = {
    includes: [],
    search: '', 
    sortBy: '',
    // typeIds: null,
    sortDirection: '',
    pageIndex: 0,
    pageSize: 100,
  }

  options = {
    zoneId: [],
    labels: [],
    language:[],
    channelId:[]
  }

  saveBanner() {
    if(this.formValues.active === 'Active'){
      this.formValues.active = true;
    } else if(this.formValues.active === 'Inactive'){
      this.formValues.active = false;
    }
    this.formValues.priority = Number(this.formValues.priority)

    console.log(this.formValues);
    this.httpBanner.saveBannersData(this.formValues)
    .pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        console.log(error);
        throw error;
      })
    ).subscribe(data => {
      console.log(data);
    });
  }

  // getBlobs() {
  //   this.httpBanner.getBlobsData(this.blobRB)
  //     .pipe(
  //       map(response => {
  //         return response;
  //       }),
  //       catchError(error => {
  //         console.error('API Error:', error);
  //         throw error;
  //       })
  //     )
  //     .subscribe(data => {
  //       console.log(data);
  //     });
  // }

  uploadBlobs(image: File) {
    const formData = new FormData();
    formData.set('blob', image);
    // console.log(formData);
  
    this.httpBanner.uploadBlobsData(formData).subscribe(
      response => {
        // console.log(response);
      },
      error => {
        // console.error(error);
      }
    );
  }
  

  getRef(typeId: string, opts: string[]) {
    this.refRB['typeId'] = typeId;
    this.httpBanner.getRefData(this.refRB).pipe(
      map(response => {
        // console.log(response);
        return response.data.entities.map(item => item.name);
      }),
      catchError(error => {
        // console.log(error);
        throw error;
      })
    ).subscribe(data => {
      data.forEach((el) => {
        opts.push(el);
      });
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      // this.formValues.img = file; // Set the selected file to the img property
      console.log('Selected file:', file);
      this.uploadBlobs(file);
    }
  }

  ngOnInit(): void {
    this.getRef('1700', this.options.zoneId)
    this.getRef('1900', this.options.labels)
    this.getRef('1600', this.options.channelId)
    this.getRef('2900', this.options.language)
  }


}
