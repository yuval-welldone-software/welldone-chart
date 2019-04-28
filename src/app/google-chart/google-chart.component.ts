import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Provider } from '../provider/provider';

import { ChartOptions } from './chart-option';
import { ChartColumnOption } from './chart-column-option'
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';


declare var google: any;


@Component({
  selector: 'app-google-chart',
  templateUrl: './google-chart.component.html',
  styleUrls: ['./google-chart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class GoogleChartComponent implements OnInit {

  private googleLineChart: any;
  
  private _provider : Provider;
  @Input()
  set provider(provider: Provider) {
    this._provider = provider;
    this.drawChart()
  }
  get provider(): Provider { return this._provider; }

  constructor( ) {
    const windowSizeObs = fromEvent(window, 'resize').pipe(debounceTime(250));
    windowSizeObs.subscribe(() => {
      this.drawChart();
    });
  }

  ngOnInit() {
    this.initBeforeDraw()
  }

  
  initBeforeDraw() {
    google.charts.load('current', {packages: ['corechart', 'controls']});
    google.charts.setOnLoadCallback( () => {
        this.googleLineChart = new google.visualization.LineChart(document.getElementById('chartArea'));        
        this.drawChart();
    });    
  }

  drawChart() {
    if (this.googleLineChart && this.provider){
      const chartData = this.buildGoogleDataTable();    
      this.googleLineChart.draw(chartData, ChartOptions.create(this.provider.tableTitle, this.provider.xTitle, this.provider.yTitle));          
    }
  }

  buildGoogleDataTable(): any {

    const data = [
      ['X' , 'Thershold', ...this.provider.lineTitle],
      ...this.provider.dataPoint > 0 ? this.provider.googleChartDataFormat.slice(0, this.provider.dataPoint) : this.provider.googleChartDataFormat
    ]

    const lineOptions = [0, ChartColumnOption.create((data, row) => data.getValue(row, 1),'number', 'Thershold'), 
      ...this.provider.lineTitle.map( (x, index) => 
        (this.provider.linesToggle[index]) ? 
        ChartColumnOption.create((data, row) => data.getValue(row, index+2), 'number', x) :
        ChartColumnOption.create((data, row) => null, 'number', x)      
      )];
    
    const chartData = new google.visualization.arrayToDataTable(data);
    const view = new google.visualization.DataView(chartData);
    
    view.setColumns(lineOptions);
    return view;
  }
  
  


}
