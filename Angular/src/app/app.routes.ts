import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component'
import { CalculatorComponent } from './calculator/calculator.component'

export const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent},
    { path: 'calculator', component: CalculatorComponent},
    { path: '**', redirectTo: 'dashboard' }
  ];