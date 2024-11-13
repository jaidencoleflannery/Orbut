import { Component, OnInit } from '@angular/core';
import { NotificationService } from '@services/notification.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  constructor(private NotificationService: NotificationService, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.isAuthenticated().subscribe(
      response => {
        console.log('authenticated');
      },
      error => {
          this.router.navigate(['login']);
      }
    );
  };

  OnInit(): void {
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