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
      "request_id": '',
      "results": {
          "active": '',
          "address": {
          "address1": '',
          "city": '',
          "postal_code": '',
          "state": ''
          },
          "branding": {
          "icon_url": '',
          "logo_url": ''
          },
          "cik": '',
          "composite_figi": '',
          "currency_name": '',
          "description": '',
          "homepage_url": '',
          "list_date": '',
          "locale": '',
          "market": '',
          "market_cap": '',
          "name": '',
          "phone_number": '',
          "primary_exchange": '',
          "round_lot": '',
          "share_class_figi": '',
          "share_class_shares_outstanding": '',
          "sic_code": '',
          "sic_description": '',
          "ticker": '',
          "ticker_root": '',
          "total_employees": '',
          "type": '',
          "weighted_shares_outstanding": ''
      },
      "status": ''
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
        n: ''
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
    this.tickerInfo = await this.SearchDataService.getTickerInfo();

    this.tickerData = await this.SearchDataService.getTickerData();
    this.tickerData = this.tickerData.results;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}