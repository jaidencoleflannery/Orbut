import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  exists = 'hidden';
  nav(){
    console.log("HOVERING");
    this.exists = 'absolute';
    console.log(this.exists);
  }
}
