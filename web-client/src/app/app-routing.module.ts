import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BeforeLoginComponent } from './layouts/before-login/before-login.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { AfterLoginComponent } from './layouts/after-login/after-login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ErrorComponent } from './pages/error/error.component';

const routes: Routes = [
  { path: '', component: AfterLoginComponent,
    children: [
      { path: '', component: HomeComponent},
      { path: 'shop', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'basket', loadChildren: () => import('./basket/basket.module').then(m => m.BasketModule) },
      { path: 'checkout', loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule) },
    ], canActivate: [AuthGuard] 
  },
  {
    path: 'login',
    component: BeforeLoginComponent, // this is the component with the <router-outlet> in the template
    children: [
      { path: '', component: LoginComponent },
      { path: 'error', component: ErrorComponent },
    ],
  },
  { path:'register',
    component: BeforeLoginComponent,
    children: [
      { path: '', component: RegisterComponent},
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
