import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component'
import { CalculatorComponent } from './calculator/calculator.component'
import { AuthGuard } from '@auth0/auth0-angular';

export const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'calculator', component: CalculatorComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: 'dashboard' }
  ];