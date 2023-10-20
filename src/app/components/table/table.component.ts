import { AfterViewInit, Component, ViewChild, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { BannerService } from '../../services/banner-service.service';
import { Observable, Subscription, catchError, map } from 'rxjs';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDrawer } from '@angular/material/sidenav';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AsyncPipe } from '@angular/common';

export interface BannerData {
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
  blobUrl: string = 'https://development.api.optio.ai/api/v2/blob/'

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

  getBlobs(id: string, action: string) {
    this.bannerService.getBlobsData(id, action)
      .pipe(
        map(response => {
          return response;
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

  
  getBanners(requestBody: object) {
    this.subscription = this.bannerService.getBannersData(requestBody)
      .pipe(
        map(response => response.data.entities.map((element: any) => {   
          return {
            fileId: element.fileId,
            url: element.url,
            name: element.name,
            active: element.active,
            labels: [...element.labels],
            language: element.language,
            priority: element.priority,
            zoneId: element.zoneId,
            channelId: element.channelId,
            startDate: element.startDate,
            endDate: element.endDate,
          };
        })),
        catchError(error => {
          console.error('API Error:', error);
          throw error;
        })
      )
      .subscribe(async data => {
        this.dataSource.data = data;
        console.log(this.dataSource.data)
      });
  }



  getBannerImage(fileId: string){
    return this.blobUrl + fileId;
  }
  
  

  
  @Output() rowClicked = new EventEmitter<any>();
  onRowClicked(event: MouseEvent, row: any){
    event.preventDefault();
    this.rowClicked.emit({event, row});
  }


  ngOnInit(): void {
    // this.getBlobs("4760455682525861", 'download')
    // console.warn(this.getBannerImage('4760455682525861'))
    // this.getBannerImage('4760455682525861');
    this.getBanners(this.findRB);

  }



  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}