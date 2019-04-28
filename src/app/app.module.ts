import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GoogleChartComponent } from './google-chart/google-chart.component';
import { NotificationService } from './error/notification.service';
import { ErrorsHandler } from './error/error';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    GoogleChartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    
  ],
  providers: [
    NotificationService,
    {
      provide: ErrorHandler,
      useClass: ErrorsHandler,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
