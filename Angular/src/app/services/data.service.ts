import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchDataService {
  private data: any = {"results": ""};
  private param = new BehaviorSubject<string | null>(null);
  searchParam$ = this.param.asObservable();

  setParam(value: string): void{
    console.log('search-data.service setting param to', value);
    this.param.next(value);
    console.log('verifying service changed param, this.param.value:', this.param.value);
  }
  
  // ticker financial information
  async getTickerData(){
    try{
      // this api currently responds with a fake model payload to avoid api limitations
      let response = await fetch(`http://localhost:3000/ticker/${this.param}`);
      this.data = await response.json();
      console.log('data being returned by search-date.service:', this.data);
      return this.data
    } catch(error){
      console.log('Fetch error: ', error);
      return error;
    }
  }

  // ticker company information
  async getTickerInfo(){
    try{
      // this api currently responds with a fake model payload to avoid api limitations
      let response = await fetch(`http://localhost:3000/search/${this.param}`);
      this.data = await response.json();
      console.log('data being returned by search-date.service:', this.data);
      return this.data
    } catch(error){
      console.log('Fetch error: ', error);
      return error;
    }
  }
}



 /*
    /ticker/:ticker returns a JSON object in format:
    {
      "ticker": "The exchange symbol that this item is traded under",
      "queryCount": The number of aggregates (minute or day) used to generate the response,
      "resultsCount": The total number of results for this request,
      "adjusted": Whether or not this response was adjusted for splits,
      "results": [
        {
          "v": The trading volume of the symbol in the given time period,
          "vw": The volume weighted average price,
          "o": The open price for the symbol in the given time period,
          "c": The close price for the symbol in the given time period,
          "h": The open price for the symbol in the given time period.
          "l": 136.3, <-- ?
          "t": The Unix Msec timestamp for the start of the aggregate window,
          "n": The number of transactions in the aggregate window.
        }
      ],
      "status": "The status of this request's response",
      "request_id": "A request id assigned by the server",
      "count": quantity.
    }
  */