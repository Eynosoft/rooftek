import { Component, OnInit } from '@angular/core';
import { AbstractControl,FormBuilder,Validators } from '@angular/forms';
import Validation from 'src/app/utils/validation';
import { NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { EventService } from 'src/app/services/events/event.service';
import { EventCategoryService } from 'src/app/services/event-category/event-category.service';
import { Events } from 'src/app/interface/events';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {
  eventsCategoriesData: any;
  modelSDate:NgbDateStruct;
  tmpSDate: any;
  createdById:any
  modelEDate:NgbDateStruct;
  tmpEDate: any;
  date: {year: number, month: number};
  frmCreateEvent: any = {
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
  constructor(private formBuilder: FormBuilder, private eventCategoriesServices: EventCategoryService, private router: Router, private eventService: EventService,private calendar: NgbCalendar, private datePipe: DatePipe) { }
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
   * Initializes the instances
   * 
   * @param (instances)
   * @returns ()
  */
  ngOnInit(): void {
    this.selectToday();
    this.getEventCategories();
    this.frmCreateEvent = this.formBuilder.group(
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
    return this.frmCreateEvent.controls;
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
  createEvent():void {
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
    } = this.frmCreateEvent.value;
    this.submitted = true;
    if(this.frmCreateEvent.invalid) {
      return;
    }
    
    this.tmpSDate = new Date(startDate.year,(startDate.month - 1),startDate.day);
    this.tmpSDate = this.datePipe.transform(this.tmpSDate,'yyyy-MM-dd');
    this.tmpEDate = new Date(endDate.year,(endDate.month - 1), endDate.day);
    this.tmpEDate = this.datePipe.transform(this.tmpEDate,'yyyy-MM-dd');
    this.createdById = 'c02c737f-046c-4510-b937-694ad92f730a'; //will be changed later
    this.eventService.addEvent(categoryId,
      name,
      passportRequired,
      this.tmpSDate,
      this.tmpEDate,
      summary,
      description,
      pointCost,
      quantity,
      this.createdById).subscribe(
      data => {
        console.log(data);
        if(data) {
          Swal.fire('Success!','Event created successfully!','success');
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
    this.frmCreateEvent.reset();
  }
  /**********************************************************************************/
  /**********************************************************************************/
  
}
