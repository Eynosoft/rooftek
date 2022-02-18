import { Component, OnInit } from '@angular/core';
import { AbstractControl,FormBuilder,Validators } from '@angular/forms';
import Validation from 'src/app/utils/validation';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { EventService } from 'src/app/services/events/event.service';
import { EventCategoryService } from 'src/app/services/event-category/event-category.service';
import { Events } from 'src/app/interface/events';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {
  eventsCategoriesData: any;
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
  constructor(private formBuilder: FormBuilder, private eventCategoriesServices: EventCategoryService, private router: Router, private eventService: EventService) { }
  /**********************************************************************************/
  /**********************************************************************************/
  ngOnInit(): void {
    this.getEventCategories();
    this.frmCreateEvent = this.formBuilder.group(
      {
        categoryId:[''],
        name:['',[Validators.required]],
        passportRequired: [''],
        startDate: [''],
        endDate: [''],
        summary: [''],
        description: [''],
        pointCost: [''],
        quantity: [''],
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
        console.log(res);
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
    //this.tmphireDate = hireDate.year+'-'+ hireDate.month +'-'+ hireDate.day; 
    this.eventService.addEvent(categoryId,
      name,
      passportRequired,
      startDate,
      endDate,
      summary,
      description,
      pointCost,
      quantity,
      createdBy).subscribe(
      data => {
        console.log('data='+data.message);
        console.log('data='+data.status_code);
        if(data.status_code == 200) {
          Swal.fire('Success!',data.message,'success');
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
