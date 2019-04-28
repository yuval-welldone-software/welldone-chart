import { Injectable } from '@angular/core';
import { Provider } from './provider';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  constructor( private http: HttpClient ) { }

  getProviders(): Provider[] {
    return [
      {
        tableTitle : 'alphavantage',
        url : `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=demo`,
        xTitle : 'Points',
        yTitle : 'Date',
        threshold : 121.2,
        dataPoint : -1,
        linesToggle : [true, true, true, true, false],
        googleChartDataFormat: [],
        lineTitle : [],
        getData : (url:string, threshold : number, provider : Provider) => this.getDataObservable(url).pipe(
            map( data => {
              const obj = data['Time Series (5min)'];
              provider.lineTitle = Object.keys(Object.entries(obj)[0][1]);
              provider.googleChartDataFormat = Object.entries(obj).map( ([k,v]) => [k, threshold, ...Object.values(v).map(x => +x)]);
              return provider;              
            })
          )
      },
      {
        tableTitle : 'worldbank',
        url : `https://climatedata.worldbank.org/climateweb/rest/v1/cru/country/pr/1991-2016/ISR`,
        xTitle : 'Tempeture',
        yTitle : 'Month',
        threshold : 40,
        dataPoint : -1,
        linesToggle : [true],
        googleChartDataFormat: [],
        lineTitle : [],
        getData : (url:string, threshold : number, provider : Provider) => this.getDataObservable(url).pipe(
          map( data => {
            provider.lineTitle = ['tempeture'];
            provider.googleChartDataFormat = data['monthVals'].map((x, index) => [`${index+1}`,threshold,+x]);            
            return provider;              
          })
        )
      },
      {
        tableTitle : 'Simulte Network Error',
        url : `http://simulte.network.error`,
        xTitle : '',
        yTitle : '',
        threshold : 0,
        dataPoint : -1,
        linesToggle : [false],
        googleChartDataFormat: [],
        lineTitle : [],
        getData : (url:string, threshold : number, provider : Provider) =>{
          return this.getDataObservable(url).pipe(
            map( data => {
              const obj = data['Time Series (5min)'];
              provider.lineTitle = Object.keys(Object.entries(obj)[0][1]);
              provider.googleChartDataFormat = Object.entries(obj).map( ([k,v]) => [k, threshold, ...Object.values(v).map(x => +x)]);
              return provider;              
            })
          )
        }
      }
    ]    
  }

  getDataObservable(url: string) {
    return this.http.get(url);
  }

 
}
