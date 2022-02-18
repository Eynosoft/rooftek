import { Component, OnInit } from '@angular/core';
import { AgentsService } from 'src/app/services/agent/agents.service';
import { Router } from '@angular/router';
import { RolesService } from 'src/app/services/roles/roles.service';

@Component({
  selector: 'app-agent-listing',
  templateUrl: './agent-listing.component.html',
  styleUrls: ['./agent-listing.component.scss']
})
export class AgentListingComponent implements OnInit {
  filterTerm: string;
  agentsData: any;
  currentIndex = -1;
  title = '';
  page = 1;
  count = 0;
  pageSize  = 10;
  pageSizes  = [5, 10, 15];

  constructor(private agentService: AgentsService, private router: Router, private rolesService: RolesService) { }

  ngOnInit(): void {
    this.retrieveRoles();
    
    //this.retrieveAgents(); 
  }
  
  /**********************************************************************************/
  /**********************************************************************************/
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
     retrieveAgents(agentId: any): void {
      const params = this.getRequestParams(this.title, this.page, this.pageSize);
      
      this.agentService.fetchAgents(params,agentId)
        .subscribe(
          res => {
            console.log(res);
            this.agentsData = res;
            console.log(Object.keys(this.agentsData).length);
            
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
      this.retrieveRoles();
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
      this.retrieveRoles();
    }
    /**********************************************************************************/
    /**********************************************************************************/
    /**
     * Get all the user roles
     * 
     * @param (any)
     * @returns (array)
    */
     retrieveRoles(): void {
      this.rolesService.fetchRoles()
        .subscribe(
          res => {
            if(res.length) {
              for (var val of res) {
                if(val.Name == "Agent") {
                  this.retrieveAgents(val.Id);
                  
                }
              }
            }
            console.log(res);
            
          },
          err => {
            console.log(err);
          });
    }
    /**********************************************************************************/
    /**********************************************************************************/
    
} 
