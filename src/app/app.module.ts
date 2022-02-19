import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule, ThemeService } from 'ng2-charts';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DataTablesModule } from 'angular-datatables';
import { DatePipe } from '@angular/common';
import { AuthInterceptor } from './helpers/auth.interceptor';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { TodoComponent } from './apps/todo-list/todo/todo.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { ContentAnimateDirective } from './shared/directives/content-animate.directive';
import { TodoListComponent } from './apps/todo-list/todo-list.component';
import { AgentListingComponent } from './components/admin/agent-listing/agent-listing.component';
import { UserRoleComponent } from './components/admin/user-role/user-role.component';
import { ViewPointsComponent } from './components/admin/view-points/view-points.component';
import { AgentDetailComponent } from './components/agent/agent-detail/agent-detail.component';
import { AddPointsComponent } from './components/admin/add-points/add-points.component';
import { EmployeeListingComponent } from './components/admin/employee-listing/employee-listing.component';
import { EmployeeRewardStatusComponent } from './components/admin/employee-reward-status/employee-reward-status.component';
import { EventListingComponent } from './components/admin/event-listing/event-listing.component';
import { CreateEventComponent } from './components/admin/create-event/create-event.component';
import { CreateEventCategoryComponent } from './components/admin/create-event-category/create-event-category.component';
import { CreateProductComponent } from './components/admin/create-product/create-product.component';
import { CreateProductCategoryComponent } from './components/admin/create-product-category/create-product-category.component';
import { ValuesPipe } from './pipes/values.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddEmployeeComponent } from './components/admin/add-employee/add-employee.component'; 
import { EditEmployeeComponent } from './components/admin/edit-employee/edit-employee.component';
import { FranchiseManagerComponent } from './components/admin/franchise-manager/franchise-manager.component';
import { CustomDatePipe } from './pipes/custom-date.pipe';
import { ListFilterPipe } from './pipes/list-filter.pipe';
import { ProductsComponent } from './components/admin/products/products.component';
import { ProductDetailComponent } from './components/admin/product-detail/product-detail.component';
import { ProductCartComponent } from './components/admin/product-cart/product-cart.component';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { EditEventComponent } from './components/admin/edit-event/edit-event.component';
import { EventDetailComponent } from './components/admin/event-detail/event-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    TodoListComponent,
    TodoComponent,
    SpinnerComponent,
    ContentAnimateDirective,
    AgentListingComponent,
    UserRoleComponent,
    ViewPointsComponent,
    AgentDetailComponent,
    AddPointsComponent,
    EmployeeListingComponent,
    EmployeeRewardStatusComponent,
    EventListingComponent,
    CreateEventComponent,
    CreateEventCategoryComponent,
    CreateProductComponent,
    CreateProductCategoryComponent,
    ValuesPipe,
    AddEmployeeComponent,
    EditEmployeeComponent,
    FranchiseManagerComponent,
    CustomDatePipe,
    ListFilterPipe,
    ProductsComponent,
    ProductDetailComponent,
    ProductCartComponent,
    SearchFilterPipe,
    EditEventComponent,
    EventDetailComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    DataTablesModule,
    
  ],
  providers: [ThemeService,DatePipe,Title,{
    provide : HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi   : true,
  }],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
