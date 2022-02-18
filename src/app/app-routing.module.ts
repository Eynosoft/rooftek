import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./services/auth.guard";
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
import { LoginComponent } from "./user-pages/login/login.component";
const routes: Routes = [
  { path: "", redirectTo: "/user-pages/login", pathMatch: "full" },
  { path: "dashboard", component: DashboardComponent,canActivate: [AuthGuard],data:{title:'Advanced Idx Mls Solution'}},
  { path: "agent-listing", component: AgentListingComponent,canActivate: [AuthGuard] },
  { path: "user-role", component: UserRoleComponent,canActivate: [AuthGuard] },
  { path: "view-points", component: ViewPointsComponent,canActivate: [AuthGuard] },
  { path: "agent-detail", component: AgentDetailComponent,canActivate: [AuthGuard] },
  { path: "add-points", component: AddPointsComponent,canActivate: [AuthGuard] },
  { path: "employee-listing", component: EmployeeListingComponent,canActivate: [AuthGuard] },
  { path: "employee-reward-status", component: EmployeeRewardStatusComponent,canActivate: [AuthGuard] },
  { path: "add-employee", component: AddEmployeeComponent,canActivate: [AuthGuard] },
  { path: "edit-employee/:id", component: EditEmployeeComponent,canActivate: [AuthGuard] },
  { path: "event-listing", component: EventListingComponent,canActivate: [AuthGuard] },
  { path: "event-detail", component: EventDetailComponent,canActivate: [AuthGuard] },
  { path: "create-event", component: CreateEventComponent,canActivate: [AuthGuard] },
  { path: "create-event-category", component: CreateEventCategoryComponent,canActivate: [AuthGuard] },
  { path: "create-product", component: CreateProductComponent,canActivate: [AuthGuard] },
  { path: "create-product-category", component: CreateProductCategoryComponent,canActivate: [AuthGuard] },
  { path: "cart-notification", component: CartNotificationComponent,canActivate: [AuthGuard] },
  { path: "access-cart", component: CartAccessComponent,canActivate: [AuthGuard] },
  { path: "franchise-manager", component: FranchiseManagerComponent,canActivate: [AuthGuard] },
  { path: "products", component: ProductsComponent,canActivate: [AuthGuard] },
  { path: "product-detail", component: ProductDetailComponent,canActivate: [AuthGuard] },
  { path: "product-cart", component: ProductCartComponent,canActivate: [AuthGuard] },

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
