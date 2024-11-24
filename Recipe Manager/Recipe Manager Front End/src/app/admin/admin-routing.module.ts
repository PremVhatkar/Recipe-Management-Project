import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { OrdersComponent } from './orders/orders.component';
import { ReportsComponent } from './reports/reports.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  {
    path:"", component: LandingComponent, children: [      
      { path: "dashboard", component: DashboardComponent },
      { path: "users", component: UsersComponent },
      { path: "orders", component: OrdersComponent },
      { path: "order", component: OrderComponent },
      { path: "order/:id", component: OrderComponent },
      { path: "reports", component: ReportsComponent }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
