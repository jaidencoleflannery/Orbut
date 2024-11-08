import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent {
  startingAmount: any;
  timeRange: any; //in years
  returnRate: any;
  compoundRate: any;
  addContributions: any;

  calculateInvestment(){
    console.log('calculating', this.startingAmount);

    let total = (this.startingAmount * ( 1 + ((this.returnRate * 0.01) / this.compoundRate)) ** (this.timeRange * this.compoundRate));
    console.log(total);
  }
}
