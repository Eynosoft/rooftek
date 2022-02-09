import { Component, OnInit } from '@angular/core';
import { AbstractControl,FormBuilder,Validators } from '@angular/forms';
import Validation from 'src/app/utils/validation';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpParams,HttpEventType, HttpResponse } from '@angular/common/http';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { EmployeesService } from 'src/app/services/employee/employees.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {
  modelHDate: NgbDateStruct;
  tmphireDate: any;
  hireDate: any[] = [];
  date: {year: number, month: number};
  frmEditEmployee: any = {
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
  constructor(private formBuilder: FormBuilder, private employeeService: EmployeesService,private route: ActivatedRoute, private router: Router,private calendar: NgbCalendar) { }
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
    this.frmEditEmployee = this.formBuilder.group(
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
    this.getEmployeeById(this.route.snapshot.params.id);
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
    return this.frmEditEmployee.controls;
  }
  /**********************************************************************************/
  /**********************************************************************************/
  getEmployeeById(id:any): void {
   this.employeeService.fetchEmployeeById(id).subscribe(
        data => {
          if(data.HireDate != '') {
            this.tmphireDate = data.HireDate;
            this.hireDate = this.tmphireDate.split("-");
            if(this.hireDate.length > 0) {
              this.modelHDate = {
                "year": Number(this.hireDate[0]),
                "month": Number(this.hireDate[1]),
                "day": Number(this.hireDate[2])
              }
            }
          }
          
          this.frmEditEmployee.setValue({
            callToolsAgentId: data.CallToolsAgentId,
            jobNimbusContactId: data.JobNimbusEmployeeId,
            referralId: data.ReferralId,
            managerId: data.ManagerId,
            firstName: data.FirstName,
            lastName: data.LastName,
            primaryNumber: data.MobileNumber,
            secondaryNumber: data.HomeNumber,
            tertiaryNumber: data.OfficeNumber,
            workEmail: data.WorkEmail,
            personalEmail: data.PersonalEmail,
            hireDate: this.modelHDate,
            companyName: data.CompanyName,
            franchiseId: data.FranchiseId,
            roleId: data.RoleId,
            priorityStatusId: data.PriorityStatusId,
            address: data.Address,
            city: data.City,
            state: data.State,
            zip: data.Zip
          })
        },
        error => {
          console.log(error);
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
    } = this.frmEditEmployee.value;
    this.submitted = true;
    if(this.frmEditEmployee.invalid) {
      return;
    }
    console.log(hireDate);
    this.tmphireDate = hireDate.year+'-'+ hireDate.month +'-'+ hireDate.day;
    console.log(this.tmphireDate);
    this.employeeService.editEmployee(this.route.snapshot.params.id,callToolsAgentId,
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
        Swal.fire('Success!','Record Updated Successfully!','success');
        this.router.navigateByUrl('/employee-listing');
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
    this.frmEditEmployee.reset();
  }
  /**********************************************************************************/
  /**********************************************************************************/
}
