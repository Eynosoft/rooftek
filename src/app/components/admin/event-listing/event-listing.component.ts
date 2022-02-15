import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { EventService } from 'src/app/services/events/event.service';
import { Events } from 'src/app/interface/events';
import { Router } from '@angular/router';
//import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-event-listing',
  templateUrl: './event-listing.component.html',
  styleUrls: ['./event-listing.component.scss']
})
export class EventListingComponent implements OnInit {
  eventsData: any;
  dtOptions: DataTables.Settings = {};
  currentIndex = -1;
  title = '';
  page = 1;
  count = 0;
  //pageSize  = 10;
  pageSize  = 99999;
  constructor(private eventService: EventService, private router: Router) { }

  ngOnInit(): void {
    this.retrieveEvents();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
  }
  /**
   * Get request params
   * 
   * @param (any)
   * @returns (array)
  */
   getRequestParams(searchTitle: string, page: number, pageSize: number): any {
    let params: any = {};

    if (searchTitle) {
      params['title'] = searchTitle;
    }
    console.log()
    if (page) {
      params['page'] = page;
    }

    if (pageSize) {
      params['size'] = pageSize;
    }

    return params;
  }
  /**********************************************************************************/
  /**********************************************************************************/
  /**
   * Get request params
   * 
   * @param (any)
   * @returns (array)
  */
  retrieveEvents(): void {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);
    this.eventService.fetchEvents(params)
      .subscribe(
        res => {
          console.log(res);
          this.eventsData = res.rows;
          this.count = res.count;
          
        },
        err => {
          console.log(err);
        });
  }
  /**********************************************************************************/
  /**********************************************************************************/
  /**
   * View event by id
   * 
   * @param (any)
   * @returns (array)
  */
  viewEvent(id: number) :void {
    this.eventService.fetchEventById(id)
      .subscribe(
        res => {
          console.log(res);
          //this.employeeData = res.rows;
          //this.count = res.count;
        },
        err => {
          console.log(err);
        });
   }
  /**********************************************************************************/
  /**********************************************************************************/
}
