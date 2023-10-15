import { AfterViewInit, Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { BannerService } from '../../services/banner-service.service';
import { Subscription, catchError, map } from 'rxjs';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';


export interface BannerData {
  img: string;
  title: string;
  status: boolean;
  label: string;
  zone: string;
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

  value = '';

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
  displayedColumns: string[] = ['img', 'title', 'status', 'label', 'zone', 'dates'];
  dataSource: MatTableDataSource<BannerData> = new MatTableDataSource();

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

  getBannersData() {
    this.subscription = this.bannerService.getBanners(this.findRB)
      .pipe(
        map(response => response.data.entities.map((element: any) => {   
                 
          return {
            img: element.url,
            title: element.name,
            status: element.active,
            label: 'element.label',
            zone: element.zoneId,
            dates: `${element.startDate} - ${element.endDate}`,
          };
        })),
        catchError(error => {
          console.error('API Error:', error);
          throw error;
        })
      )
      .subscribe(async data => {
        console.log(data);
        this.dataSource.data = data;
      });
  }

  getRef(typeIds: ArrayLike<string>) {
    this.findRB['typeIds'] = typeIds;
    this.subscription = this.bannerService.getRefData(this.findRB)
      .pipe(
        map(async response => {
          let newArr = await response.data.entities.map((element: ArrayLike<unknown> | { [s: string]: unknown; }) => {
            return Object.values(element);
          });
          console.log(newArr);
          return response;
        }),
        catchError(error => {
          console.error('API Error:', error);
          throw error;
        })
      )
      .subscribe();
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

    this.getBannersData();
    // this.getRef(typeId);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}