/**
 * Event Detail
 * 
 * Manages event details data
 */
import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/events/event.service';
import { NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
  pageTitle: any;
  eventDetail: any;
  modelSDate:NgbDateStruct;
  tmpSDate: any;
  sDate: any[] = [];
  eDate: any[] = [];
  createdById:any
  modelEDate:NgbDateStruct;
  tmpEDate: any;
  date: {year: number, month: number};
  constructor(private route: ActivatedRoute, private router: Router, private eventService: EventService, private titleService: Title,private calendar: NgbCalendar, private datePipe: DatePipe) { 
    this.setTitle(this.route.snapshot.data['title']);
    this.pageTitle = this.route.snapshot.data['title'];
  }
  /**
    * Sets the page title
    * 
    * @param (string)
    * @returns ()
   */
   public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
  /**********************************************************************************/
 /**********************************************************************************/
  ngOnInit(): void {
    this.getEventById(this.route.snapshot.params.id);
  }
  /**
    * Get event by id
    * 
    * @param (string)
    * @returns (array)
   */
   getEventById(id:any): void {
    this.eventService.fetchEventById(id).subscribe(
         data => {
           if(data.StartDate != '') {
            this.tmpSDate = this.datePipe.transform(data.StartDate,'yyyy-MM-dd');
            this.sDate = this.tmpSDate.split("-");
            if(this.sDate.length > 0) {
              this.modelSDate = {
                "year": Number(this.sDate[0]),
                "month": Number(this.sDate[1]),
                "day": Number(this.sDate[2])
              }
            }
           }
           if(data.EndDate != '') {
            this.tmpEDate = this.datePipe.transform(data.EndDate,'yyyy-MM-dd');
            this.eDate = this.tmpEDate.split("-");
            if(this.eDate.length > 0) {
              this.modelEDate = {
                "year": Number(this.eDate[0]),
                "month": Number(this.eDate[1]),
                "day": Number(this.eDate[2])
              }
            }
          }
          this.eventDetail = data;
          
         },
         error => {
           console.log(error);
         });
   }
   /**********************************************************************************/
   /**********************************************************************************/

}
