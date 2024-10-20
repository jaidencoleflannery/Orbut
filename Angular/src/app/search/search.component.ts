import { Component} from '@angular/core';
import { JsonPipe } from '@angular/common';
import { SearchDataService } from '../services/search-data.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  constructor(private SearchDataService: SearchDataService) {}

  setParam(value: string){
    console.log('search.component sending', value, 'to searchDataService');
    this.SearchDataService.setParam(value);
  }
}