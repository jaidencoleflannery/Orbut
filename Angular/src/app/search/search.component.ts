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
  data: any;
  results: any = {};

  constructor(private searchDataService: SearchDataService) {}

  async search(param: string) {
    try {
      this.data = await this.searchDataService.getData(param);
      this.results = this.data.results[0];
      console.log(this.data);
    } catch (error) {
      console.log('Error fetching data: ', error);
    }
  }
}
