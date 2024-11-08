import { Component} from '@angular/core';
import { JsonPipe } from '@angular/common';
import { NotificationService } from '@services/notification.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private NotificationService: NotificationService) {}

  notifications: any;

  getNotifications(value: string){
    this.notifications = this.NotificationService.getNotifications;
  }
}