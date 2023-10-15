import { Component } from '@angular/core';

@Component({
  selector: 'app-banners-form',
  templateUrl: './banners-form.component.html',
  styleUrls: ['./banners-form.component.css'],
})
export class BannersFormComponent {
  //image, title, zone, active, dates, labels
  formValues = {
    title: '',
    zone: '',
    active: '',
    startDate: '',
    endDate: '',
    label: ''

  }
}
