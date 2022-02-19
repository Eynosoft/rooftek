/**
 * Edit Event
 * 
 * Manages event edit operations
 */
import { Component, OnInit } from '@angular/core';
import { AbstractControl,FormBuilder,Validators } from '@angular/forms';
import Validation from 'src/app/utils/validation';
import { NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { EventService } from 'src/app/services/events/event.service';
import { EventCategoryService } from 'src/app/services/event-category/event-category.service';
import { Events } from 'src/app/interface/events';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss']
})
export class EditEventComponent implements OnInit {
  pageTitle: any;
  eventsCategoriesData: any;
  modelSDate:NgbDateStruct;
  tmpSDate: any;
  sDate: any[] = [];
  eDate: any[] = [];
  createdById:any
  modelEDate:NgbDateStruct;
  tmpEDate: any;
  date: {year: number, month: number};
  frmEditEvent: any = {
    categoryId:null,
    name: null,
    passportRequired: null,
    startDate: null,
    endDate: null,
    summary: null,
    description: null,
    pointCost:null,
    quantity: null,
    createdBy: null
  };
  errorMessages: string;
  errorMessage = '';
  submitted = false;
  /**
   * Initializes the instances
   * 
   * @param (instances)
   * @returns ()
  */
   constructor(private formBuilder: FormBuilder, private eventCategoriesServices: EventCategoryService, private route: ActivatedRoute, private router: Router, private eventService: EventService,private calendar: NgbCalendar, private datePipe: DatePipe, private titleService: Title) { 
    this.setTitle(this.route.snapshot.data['title']);
    this.pageTitle = this.route.snapshot.data['title'];
    
   }
   /**********************************************************************************/
   /**********************************************************************************/
   /**
    * Initializes dates
    * 
    * @param ()
    * @returns ()
   */
    selectToday() {
     this.modelSDate = this.calendar.getToday();
     this.modelEDate = this.calendar.getToday();
   }
   /**********************************************************************************/
   /**********************************************************************************/
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
   /**
    * Initializes the instances
    * 
    * @param (instances)
    * @returns ()
   */
   ngOnInit(): void {
    
    this.selectToday();
    this.getEventCategories();
    this.frmEditEvent = this.formBuilder.group(
      {
        categoryId:['',[Validators.required]],
        name:['',[Validators.required]],
        passportRequired: ['',[Validators.required]],
        startDate: ['',[Validators.required]],
        endDate: ['',[Validators.required]],
        summary: ['',[Validators.required]],
        description: ['',[Validators.required]],
        pointCost: ['',[Validators.required]],
        quantity: ['',[Validators.required]],
        createdBy: [''],
       }
    )
    this.getEventById(this.route.snapshot.params.id);
   }
   /**********************************************************************************/
   /**********************************************************************************/
   /**
    * Get form controls
    * 
    * @param (string)
    * @returns (object)
   */
    get f():{[key:string]:AbstractControl} {
     return this.frmEditEvent.controls;
   }
   /**********************************************************************************/
   /**********************************************************************************/
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
          
          this.frmEditEvent.setValue({
            categoryId: data.CategoryId,
            name: data.Name,
            passportRequired: data.PassportRequired,
            startDate: this.modelSDate,
            endDate: this.modelEDate,
            summary: data.Summary,
            description: data.Description,
            pointCost: data.PointCost,
            quantity: data.Quantity,
            createdBy: data.CreatedBy
           })
         },
         error => {
           console.log(error);
         });
   }
   /**********************************************************************************/
   /**********************************************************************************/
   /**
    * Get event categories
    * 
    * @param ()
    * @returns (array)
   */
   getEventCategories(): void {
     this.eventCategoriesServices.fetchEventCategory().subscribe(
       res => {
         //console.log(res);
         this.eventsCategoriesData = res;
       },
       err => {
         console.log(err);
       });
   }
   /**********************************************************************************/
   /**********************************************************************************/
   /**
    * Calls on form submission
    * 
    * @param ()
    * @returns (json)
   */
   editEvent():void {
     const {
           categoryId,
           name,
           passportRequired,
           startDate,
           endDate,
           summary,
           description,
           pointCost,
           quantity,
           createdBy
     } = this.frmEditEvent.value;
     this.submitted = true;
     if(this.frmEditEvent.invalid) {
       return;
     }
     
     this.tmpSDate = new Date(startDate.year,(startDate.month - 1),startDate.day);
     this.tmpSDate = this.datePipe.transform(this.tmpSDate,'yyyy-MM-dd');
     this.tmpEDate = new Date(endDate.year,(endDate.month - 1), endDate.day);
     this.tmpEDate = this.datePipe.transform(this.tmpEDate,'yyyy-MM-dd');
     //this.createdById = 'c02c737f-046c-4510-b937-694ad92f730a'; //will be changed later
     this.eventService.editEvent(this.route.snapshot.params.id,categoryId,
       name,
       passportRequired,
       this.tmpSDate,
       this.tmpEDate,
       summary,
       description,
       pointCost,
       quantity,
       createdBy).subscribe(
       data => {
         console.log(data);
         if(data) {
           Swal.fire('Success!','Event Updated successfully!','success');
           this.onReset();
           
         } else {
           Swal.fire({
             icon: 'error',
             title: 'Oops...',
             text: data.message
           })
         }
         
         //Swal.fire('Success!', 'Listing Added Successfully.!', 'success');
         
       },
       err => {
         Swal.fire({
           icon: 'error',
           title: 'Oops...',
           text: err.statusText
         })
         this.errorMessage = err.error.message;
       }
     )
   }
   /**********************************************************************************/
   /**********************************************************************************/
   /**
    * Reset form after submission
    * 
    * @param ()
    * @returns ()
   */
    onReset(): void {
     this.submitted = false;
     this.frmEditEvent.reset();
   }
   /**********************************************************************************/
   /**********************************************************************************/
}
