import { Component } from '@angular/core';
import { Provider } from './provider/provider';
import { NotificationService } from './error/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  provider : Provider;
  notification = '';
  showNotification = false;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService
    .notification$
    .subscribe(message => {
      if (message) {
        this.notification = message;
        this.showNotification = true;
        setTimeout(() => {
           this.notification = '';
           this.showNotification = false;
        }, 5000);
      }
    });    
  }

  onProviderChanged(provider : Provider){
    this.provider = provider;
  }

}
