import { Component, OnInit } from '@angular/core';
import { FranchiseManagerService } from 'src/app/services/franchise-manager/franchise-manager.service';
import { FranchiseManager } from 'src/app/interface/franchise-manager';
import { Router } from '@angular/router';

@Component({
  selector: 'app-franchise-manager',
  templateUrl: './franchise-manager.component.html',
  styleUrls: ['./franchise-manager.component.scss']
})
export class FranchiseManagerComponent implements OnInit {
  filterTerm: string;
  franchiseData: any;
  currentIndex = -1;
  title = '';
  page = 1;
  count = 0;
  pageSize  = 10;
  pageSizes  = [5, 10, 15];
  constructor(private franchiseManagerService: FranchiseManagerService, private router: Router) { }

  ngOnInit(): void {
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
    this.retrieveFranchiseManager();
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
    this.retrieveFranchiseManager();
  }
  /**********************************************************************************/
  /**********************************************************************************/
}
