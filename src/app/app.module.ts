import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'; 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule, ThemeService } from 'ng2-charts';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoComponent } from './apps/todo-list/todo/todo.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { ContentAnimateDirective } from './shared/directives/content-animate.directive';
import { TodoListComponent } from './apps/todo-list/todo-list.component';
import { AgentListingComponent } from './components/agent/agent-listing/agent-listing.component';
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
    ValuesPipe
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
    NgxPaginationModule
  ],
  providers: [ThemeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
