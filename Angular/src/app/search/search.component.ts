import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  data: any = {};
  
  async search(param: string){
    try{
      let response = await fetch(`http://localhost:3000/ticker/${param}`);
      let data = await response.json()
      console.log(data);
    } catch(error){
      console.log('Fetch error: ', error);
    }
  }
}
