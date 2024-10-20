import { Component, OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { SearchDataService } from '../../services/search-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent implements OnInit {
  subscription!: Subscription;
  tickerInfo: any = "No results";
  tickerData: any = "No results";

  constructor(private searchDataService: SearchDataService){}

  ngOnInit() {
    this.subscription = this.searchDataService.searchParam$.subscribe((param) => {
      if (param) {
        this.results();
      }
    });
  }

  async results(){
    this.tickerInfo = await this.searchDataService.getTickerInfo();
    console.log('info fetching:', this.tickerInfo);
    this.tickerData = await this.searchDataService.getTickerData();
    console.log('results fetching:', this.tickerData);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}