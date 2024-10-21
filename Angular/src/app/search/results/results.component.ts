import { Component, OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { SearchDataService } from '../../services/data.service';
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

  tickerInfo: any = {
    ticker: '',
    name: '',
    type: '',
    tegion: '',
    marketOpen: '',
    marketClose: '',
    timezone: '',
    currency: '',
    matchScore: ''
  };

  tickerData: any = {
    ticker: '',
    queryCount: '',
    resultsCount: '',
    adjusted: '',
    results: {
      v: '',
      vw: '',
      o: '',
      c: '',
      h: '',
      l: '',
      t: '',
      n: '',
    },
    status: '',
    request_id: '',
    count: ''
    }

  constructor(private SearchDataService: SearchDataService){}

  ngOnInit() {
    this.subscription = this.SearchDataService.searchParam$.subscribe((param) => {
      if (param) {
        this.results();
      }
    });
  }

  async results(){
    let ticker = await this.SearchDataService.getTickerInfo();
    let tickerResults = ticker.results;
    this.tickerInfo.ticker = ticker.bestMatches[0].results;
    this.tickerInfo.name = Object.values(this.tickerInfo)[0];

    this.tickerData = await this.SearchDataService.getTickerData();
    this.tickerData = this.tickerData.results;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}