import { Component } from '@angular/core';
import { SearchComponent } from './search/search.component';
import { ResultsComponent } from './search/results/results.component'
import { NavComponent } from './nav/nav.component'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SearchComponent, ResultsComponent, NavComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  exists = 'hidden';
}
