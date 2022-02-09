import { Component, OnInit } from '@angular/core';
import { AbstractControl,FormBuilder,Validators } from '@angular/forms';
import Validation from 'src/app/utils/validation';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpParams,HttpEventType, HttpResponse } from '@angular/common/http';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { EmployeesService } from 'src/app/services/employee/employees.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  modelHDate: NgbDateStruct;
  tmphireDate: any;
  date: {year: number, month: number};
  frmAddEmployee: any = {
    callToolsAgentId: null,
    jobNimbusContactId: null,
    referralId: null,
    managerId: null,
    firstName: null,
    lastName: null,
    primaryNumber:null,
    secondaryNumber: null,
    tertiaryNumber: null,
    workEmail: null,
    personalEmail: null,
    hireDate: null,
    companyName: null,
    franchiseId:null,
    roleId: null,
    priorityStatusId: null,
    address: null,
    city: null,
    state: null,
    zip: null
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
  constructor(private formBuilder: FormBuilder, private employeeService: EmployeesService, private router: Router,private calendar: NgbCalendar) { }
  /**********************************************************************************/
  /**********************************************************************************/
  /**
   * Initializes dates
   * 
   * @param ()
   * @returns ()
  */
  selectToday() {
    this.modelHDate = this.calendar.getToday();
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
    this.frmAddEmployee = this.formBuilder.group(
      {
        callToolsAgentId:[''],
        jobNimbusContactId:[''],
        referralId: [''],
        managerId: [''],
        firstName: ['',[Validators.required]],
        lastName: ['',[Validators.required]],
        primaryNumber: [''],
        secondaryNumber: [''],
        tertiaryNumber: [''],
        workEmail: [''],
        personalEmail:[''],
        hireDate:['',[Validators.required]],
        companyName: [''],
        franchiseId: ['',[Validators.required]],
        roleId: ['',[Validators.required]],
        priorityStatusId: [''],
        address: [''],
        city: [''],
        state: [''],
        zip: ['']
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
    return this.frmAddEmployee.controls;
  }
  /**********************************************************************************/
  /**********************************************************************************/
  /**
   * Calls on form submission
   * 
   * @param ()
   * @returns (json)
  */
  onSubmitEmployee():void {
    const {
          callToolsAgentId,
          jobNimbusContactId,
          referralId,
          managerId,
          firstName,
          lastName,
          primaryNumber,
          secondaryNumber,
          tertiaryNumber,
          workEmail,
          personalEmail,
          hireDate,
          companyName,
          franchiseId,
          roleId,
          priorityStatusId,
          address,
          city,
          state,
          zip
    } = this.frmAddEmployee.value;
    this.submitted = true;
    if(this.frmAddEmployee.invalid) {
      return;
    }
    this.tmphireDate = hireDate.year+'-'+ hireDate.month +'-'+ hireDate.day; 
    this.employeeService.addEmployee(callToolsAgentId,
      jobNimbusContactId,
      referralId,
      managerId,
      firstName,
      lastName,
      primaryNumber,
      secondaryNumber,
      tertiaryNumber,
      workEmail,
      personalEmail,
      this.tmphireDate,
      companyName,
      franchiseId,
      roleId,
      priorityStatusId,
      address,
      city,
      state,
      zip).subscribe(
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
    this.frmAddEmployee.reset();
  }
  /**********************************************************************************/
  /**********************************************************************************/
}
