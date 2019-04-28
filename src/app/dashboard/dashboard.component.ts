import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Provider } from '../provider/provider';
import { ProviderService } from '../provider/provider.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

  selectedProviderIndex  = 0;
  providers: Provider[];
  provider: Provider;
  thresholdChanged = new Subject<number>();

  dataPoints = [
    {value : 25, text: '25'},
    {value : 50, text: '50'},
    {value : 75, text: '75'},
    {value : 100, text: '100'},
    {value : -1, text: 'All'}
  ];

  @Output() providerChanged = new EventEmitter<Provider>();

  constructor(private providerService: ProviderService) {
    this.thresholdChanged.pipe(
      debounceTime(800),
      distinctUntilChanged())
      .subscribe(value => {
        this.onThresholdChange(value);
      });
   }

  ngOnInit() {
    this.providers = this.providerService.getProviders();
    this.getProviderData(this.selectedProviderIndex); 
  }

  getProviderData(providerIndex = 0) {
    this.provider = {...this.providers[providerIndex]};
    this.provider.getData(this.provider.url, this.provider.threshold, this.provider).subscribe( provider => {
      this.provider = {...provider};
      this.providerChanged.emit(this.provider);   
    });    
  }

  onProviderChanged(){
    this.providerChanged.emit({...this.provider});
  }

  onLineToggle(index){
    this.provider.linesToggle[index] = !this.provider.linesToggle[index];
    this.onProviderChanged();
  }

  onThresholdChange(threshold) {
    this.provider.googleChartDataFormat.map((row) => {row[1] = this.provider.threshold; }); 
    this.onProviderChanged();
  }


}
