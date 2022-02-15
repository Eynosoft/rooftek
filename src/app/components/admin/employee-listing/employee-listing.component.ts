import { Component, OnInit } from '@angular/core';
import { EmployeesService } from 'src/app/services/employee/employees.service';
import { FranchiseManagerService } from 'src/app/services/franchise-manager/franchise-manager.service';
import { Employee } from 'src/app/interface/employee';
import { FranchiseManager } from 'src/app/interface/franchise-manager';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-listing',
  templateUrl: './employee-listing.component.html',
  styleUrls: ['./employee-listing.component.scss']
})
export class EmployeeListingComponent implements OnInit {
  searchFilter: any = '';
  employeeData: any;
  dtOptions: DataTables.Settings = {};
  franchiseData: any;
  filterTerm: string;
  currentIndex = -1;
  title = '';
  page = 1;
  count = 0;
  pageSize  = 10;
  pageSizes  = [5, 10, 15];
  constructor(private employeeService: EmployeesService, private router: Router, private franchiseManagerService: FranchiseManagerService) { }

  ngOnInit(): void {
    
    this.retrieveEmployees();
    this.retrieveFranchiseManager();
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
   retrieveEmployees(): void {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);
    this.employeeService.fetchEmployee(params)
      .subscribe(
        res => {
          this.employeeData = res.rows;
          this.count = res.count;
        },
        err => {
          console.log(err);
        });
  }
  /**********************************************************************************/
  /**********************************************************************************/
  /**
   * Get all the records of franchise manager
   * 
   * @param (any)
   * @returns (array)
  */
   retrieveFranchiseManager(): void {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);
    this.franchiseManagerService.fetchFranchiseManager(params)
      .subscribe(
        res => {
          this.franchiseData = res;
          console.log(Object.keys(this.franchiseData).length);
          this.count = Object.keys(this.franchiseData).length;
        },
        err => {
          console.log(err);
        });
  }
  /**********************************************************************************/
  /**********************************************************************************/
  /**
   * Calls on page change
   * 
   * @param (number)
   * @returns (json)
  */
  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveEmployees();
  }
  /**********************************************************************************/
  /**********************************************************************************/
  /**
   * Calls on page size change
   * 
   * @param (any)
   * @returns (json)
  */
  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveEmployees();
  }
  /**********************************************************************************/
  /**********************************************************************************/
  /**
   * Calls on page size change
   * 
   * @param (any)
   * @returns (json)
  */
   handleFranchiseChange(event: any): void {
    this.title = event.target.value;
    this.page = 1;
    this.retrieveEmployees();
  }
  /**********************************************************************************/
  /**********************************************************************************/
  /**
   * search by title
   * 
   * @param ()
   * @returns (json)
  */
  searchTitle(): void {
    this.page = 1;
    this.retrieveEmployees();
  }
  /**********************************************************************************/
  /**********************************************************************************/
  /**
   * Delete employee by id
   * 
   * @param (number)
   * @returns (json)
  */
   deleteEmployee(id:number) :void {
    this.employeeService.deleteEmployeeById(id)
      .subscribe(
        res => {
          this.employeeData = res.rows;
          this.count = res.count;
        },
        err => {
          console.log(err);
        });
   }
  /**********************************************************************************/
  /**********************************************************************************/
}
