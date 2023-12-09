import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)},
  {path: 'basket', loadChildren: () => import('./basket/basket.module').then(m => m.BasketModule)},
  { path: 'checkout', loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule)},
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
