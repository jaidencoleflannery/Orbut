import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { SearchDataService } from '../../services/search-data.service';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent {
  data: any;

  constructor(private searchDataService: SearchDataService){}

  async results(){
    this.data = await this.searchDataService.getData(param);
  }

}
