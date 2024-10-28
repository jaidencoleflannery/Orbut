import { Component } from '@angular/core';
import { SearchComponent } from './search/search.component';
import { ResultsComponent } from './search/results/results.component'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SearchComponent, ResultsComponent],
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
