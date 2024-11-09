import { Component, OnInit } from '@angular/core';
import { NotificationService } from '@services/notification.service';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  constructor(private NotificationService: NotificationService, public auth: AuthService) {}

  ngOnInit(): void {
    this.getNotifications(); // Call your method here
  }

  notifications: any;

  async getNotifications() {
    try {
      const response = await this.NotificationService.getNotifications();
      this.notifications = response; // Adjust according to the structure of your JSON
      console.log(this.notifications);
      console.log(this.notifications);
      console.log(this.notifications);
      console.log(this.notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
    console.log('endnoti');
  }
  
}