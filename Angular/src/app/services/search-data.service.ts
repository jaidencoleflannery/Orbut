import { Injectable } from '@angular/core';
import { SearchComponent } from '../search/search.component';

@Injectable({
  providedIn: 'root'
})
export class SearchDataService {
  getData(){
    return SearchComponent.data;
  }
}
