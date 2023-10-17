import { Component, ViewChild } from '@angular/core';
import { BannerService } from '../../services/banner-service.service';
import { MatDrawer } from '@angular/material/sidenav';
import { Subscription, catchError, map } from 'rxjs';
import { BannerData } from '../table/table.component';
import { BannersFormComponent } from '../banners-form/banners-form.component';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css']
})
export class DrawerComponent {
  showFiller = false;
  subscription: Subscription | any;

  
  
  @ViewChild(MatDrawer) drawer: MatDrawer;
  @ViewChild(BannersFormComponent) bannerForm: BannersFormComponent;
  constructor(private bannerService: BannerService) {}

  
  openDrawer(event?: MouseEvent): void {
    if(event)
    event.stopPropagation();
    this.drawer.toggle();
  }

  findRB = {  //find Request Body
    includes: [],
    search: '', // Replace with your search query
    sortBy: '',
    // typeIds: null,
    sortDirection: '',
    pageIndex: 0,
    pageSize: 100,
  };

  
  getRef(typeIds: ArrayLike<string>) {
    this.findRB['typeIds'] = [typeIds];
    
    this.subscription = this.bannerService.getRefData(this.findRB)
      .pipe(
        map(response => {
          console.log(response);
        }),
        catchError(error => {
          console.error('API Error:', error);
          throw error;
        })
      )
      .subscribe();
  }

  getRefClick(){
    let chooseTypeId = prompt('pass type id:');
    this.getRef(chooseTypeId);
  }

  handleRowClick(obj: {event: MouseEvent, row: BannerData}){
    console.log(obj.row);
    this.bannerForm.formValues = obj.row;
    console.log(this.bannerForm.formValues);
    
    this.openDrawer(obj.event);
  }
}
