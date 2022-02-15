import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AgentListingComponent } from "./components/admin/agent-listing/agent-listing.component";
import { AgentDetailComponent } from "./components/agent/agent-detail/agent-detail.component";
import { UserRoleComponent } from "./components/admin/user-role/user-role.component";
import { ViewPointsComponent } from "./components/admin/view-points/view-points.component";
import { AddPointsComponent } from "./components/admin/add-points/add-points.component";
import { EmployeeListingComponent } from "./components/admin/employee-listing/employee-listing.component";
import { EmployeeRewardStatusComponent } from "./components/admin/employee-reward-status/employee-reward-status.component";
import { EventListingComponent } from "./components/admin/event-listing/event-listing.component";
import { CreateEventComponent } from "./components/admin/create-event/create-event.component";
import { CreateEventCategoryComponent } from "./components/admin/create-event-category/create-event-category.component";
import { CreateProductComponent } from "./components/admin/create-product/create-product.component";
import { CreateProductCategoryComponent } from "./components/admin/create-product-category/create-product-category.component";
import { AddEmployeeComponent } from "./components/admin/add-employee/add-employee.component";
import { EditEmployeeComponent } from "./components/admin/edit-employee/edit-employee.component";
import { EventDetailComponent } from "./components/admin/event-detail/event-detail.component";
import { CartNotificationComponent } from "./components/admin/cart-notification/cart-notification.component";
import { CartAccessComponent } from "./components/admin/cart-access/cart-access.component";
import { FranchiseManagerComponent } from "./components/admin/franchise-manager/franchise-manager.component";
import { ProductsComponent } from "./components/admin/products/products.component";
import { ProductDetailComponent } from "./components/admin/product-detail/product-detail.component";
import { ProductCartComponent } from "./components/admin/product-cart/product-cart.component";

const routes: Routes = [
  { path: "", redirectTo: "/user-pages/login", pathMatch: "full" },
  { path: "dashboard", component: DashboardComponent },
  { path: "agent-listing", component: AgentListingComponent },
  { path: "user-role", component: UserRoleComponent },
  { path: "view-points", component: ViewPointsComponent },
  { path: "agent-detail", component: AgentDetailComponent },
  { path: "add-points", component: AddPointsComponent },
  { path: "employee-listing", component: EmployeeListingComponent },
  { path: "employee-reward-status", component: EmployeeRewardStatusComponent },
  { path: "add-employee", component: AddEmployeeComponent },
  { path: "edit-employee/:id", component: EditEmployeeComponent },
  { path: "event-listing", component: EventListingComponent },
  { path: "event-detail", component: EventDetailComponent },
  { path: "create-event", component: CreateEventComponent },
  { path: "create-event-category", component: CreateEventCategoryComponent },
  { path: "create-product", component: CreateProductComponent },
  { path: "create-product-category", component: CreateProductCategoryComponent },
  { path: "cart-notification", component: CartNotificationComponent },
  { path: "access-cart", component: CartAccessComponent },
  { path: "franchise-manager", component: FranchiseManagerComponent },
  { path: "products", component: ProductsComponent },
  { path: "product-detail", component: ProductDetailComponent },
  { path: "product-cart", component: ProductCartComponent },

  {
    path: "basic-ui",
    loadChildren: () =>
      import("./basic-ui/basic-ui.module").then((m) => m.BasicUiModule),
  },
  {
    path: "charts",
    loadChildren: () =>
      import("./charts/charts.module").then((m) => m.ChartsDemoModule),
  },
  {
    path: "forms",
    loadChildren: () => import("./forms/form.module").then((m) => m.FormModule),
  },
  {
    path: "tables",
    loadChildren: () =>
      import("./tables/tables.module").then((m) => m.TablesModule),
  },
  {
    path: "icons",
    loadChildren: () =>
      import("./icons/icons.module").then((m) => m.IconsModule),
  },
  {
    path: "general-pages",
    loadChildren: () =>
      import("./general-pages/general-pages.module").then(
        (m) => m.GeneralPagesModule
      ),
  },
  {
    path: "apps",
    loadChildren: () => import("./apps/apps.module").then((m) => m.AppsModule),
  },
  {
    path: "user-pages",
    loadChildren: () =>
      import("./user-pages/user-pages.module").then((m) => m.UserPagesModule),
  },
  {
    path: "error-pages",
    loadChildren: () =>
      import("./error-pages/error-pages.module").then(
        (m) => m.ErrorPagesModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
