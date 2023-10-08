import { Component, OnInit, OnDestroy } from '@angular/core';
import { BannerService } from '../../services/banner-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit, OnDestroy {
  
  value = 'hello';
  
  subscription: Subscription | any;
  constructor(private bannerService: BannerService) { 

  }

  ngOnInit(): void {
    // Example: Fetch a banner by ID
    const bannerId = '3fa85f64-5717-4562-b3fc-2c963f66afa6';
    this.subscription = this.bannerService.getBannerById(bannerId).subscribe(
      (response) => {
        console.log('Banner Data:', response);
        // Handle the API response here
      },
      (error) => {
        console.error('API Error:', error);
        // Handle errors here
      }
    );
  }

  ngOnDestroy(): void {
    // Unsubscribe from the subscription to prevent memory leaks
    this.subscription.unsubscribe();
  }
}
