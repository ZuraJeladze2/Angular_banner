import { AfterViewInit, Component, ViewChild, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { BannerService } from '../../services/banner-service.service';
import { Subscription, catchError, map } from 'rxjs';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDrawer } from '@angular/material/sidenav';

export interface BannerData {
  img: string;
  name: string;
  active: boolean;
  labels: string[];
  zoneId: string;
  channelId: string;
  fileId: string;
  priority: number;
  url: string;
  language: string;
  startDate: string;
  endDate: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
})
export class TableComponent implements AfterViewInit {


  subscription: Subscription | any;


  findRB = {  //find Request Body
    includes: [],
    search: '', // Replace with your search query
    sortBy: '',
    // typeIds: null,
    sortDirection: '',
    pageIndex: 0,
    pageSize: 100,
  };

  //  სურათი, სათაური, სტატუსი, ზონა, დაწყება-დასრულების თარიღები, ლეიბლები.
  displayedColumns: string[] = ['img', 'name', 'active', 'labels', 'zone', 'dates'];
  dataSource: MatTableDataSource<BannerData> = new MatTableDataSource();

  @ViewChild(MatDrawer) drawer: MatDrawer;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private bannerService: BannerService) {

    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getBanners(requestBody: object) {
    this.subscription = this.bannerService.getBannersData(requestBody)
      .pipe(
        map(response => response.data.entities.map((element: any) => {   
                 console.log(element);
                 
          return {
            img: element.url,
            name: element.name,
            active: element.active,
            labels: [...element.labels],
            zoneId: element.zoneId,
            dates: `${element.startDate} - ${element.endDate}`,
          };
        })),
        catchError(error => {
          console.error('API Error:', error);
          throw error;
        })
      )
      .subscribe(async data => {
        this.dataSource.data = data;
      });
  }

  @Output() rowClicked = new EventEmitter<any>();
  onRowClicked(event: MouseEvent, row: any){
    this.rowClicked.emit({event, row});
  }


  ngOnInit(): void {
    // Example: Fetch a banner by ID
    // const bannerId = '3fa85f64-5717-4562-b3fc-2c963f66afa6';
    // this.subscription = this.bannerService.getBannerById(bannerId).subscribe(
    //   (response) => {
    //     console.log('Banner Data:', response);
    //     // Handle the API response here
    //   },
    //   (error) => {
    //     console.error('API Error:', error);
    //     // Handle errors here
    //   }
    // );

    this.getBanners(this.findRB);
  }



  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}