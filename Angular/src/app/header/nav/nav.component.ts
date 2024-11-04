import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  exists = 'None';
  mouseOutTimer: any;

  nav(input: string){
    if(input == 'in'){
      clearTimeout(this.mouseOutTimer);
      this.exists = 'block';
    } else {
      this.mouseOutTimer = setTimeout(() => {
        this.exists = 'none';
      }, 1000);
    }
  }
}
