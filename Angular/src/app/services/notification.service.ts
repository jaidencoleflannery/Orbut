import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private data: any = {"results": ""};

  async getNotifications(){
    try{
      // this api currently responds with a fake model payload to avoid limitations
      let response = await fetch(`http://localhost:3000/notifications`);
      this.data = await response.json();
      console.log('data being returned by notification.service:', this.data);
      return this.data
    } catch(error){
      console.log('Fetch error: ', error);
      return error;
    }
  }
}
