<<<<<<< HEAD
import { Component} from '@angular/core';
import { JsonPipe } from '@angular/common';
import { NotificationService } from '@services/notification.service';
=======
import { Component } from '@angular/core';
>>>>>>> f85d36c5cea518e8f3fb0829ebfbe6fe9868720a

@Component({
  selector: 'app-dashboard',
  standalone: true,
<<<<<<< HEAD
  imports: [JsonPipe],
=======
  imports: [],
>>>>>>> f85d36c5cea518e8f3fb0829ebfbe6fe9868720a
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
<<<<<<< HEAD
  constructor(private NotificationService: NotificationService) {}

  notifications: any;

  getNotifications(value: string){
    this.notifications = this.NotificationService.getNotifications;
  }
}
=======

}
>>>>>>> f85d36c5cea518e8f3fb0829ebfbe6fe9868720a
