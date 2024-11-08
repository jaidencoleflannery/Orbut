import { Component, OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { GraphComponent } from './graph/graph.component';
import { SearchDataService } from '@services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [JsonPipe, GraphComponent],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent implements OnInit {
  subscription!: Subscription;

  tickerFound: boolean = false;
  dataFound: boolean = false;

  tickerInfo: any;
  tickerData: any;

  constructor(private SearchDataService: SearchDataService){}

  ngOnInit() {
    this.subscription = this.SearchDataService.searchParam$.subscribe((param) => {
      if (param) {
        this.results();
      }
    });
  }

  async results(){
    const info = await this.SearchDataService.getTickerInfo();
    if(info){
      this.tickerFound = true;
    }
    this.tickerInfo = info.results;
    console.log(this.tickerInfo.ticker_root);

    this.tickerData = await this.SearchDataService.getTickerData();
    if(this.tickerData){
      this.dataFound = true;
    }
    this.tickerData = this.tickerData.results;
    this.tickerData.lastElement = (this.tickerData.length - 1);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}