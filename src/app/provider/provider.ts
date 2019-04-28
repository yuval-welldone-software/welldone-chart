import { Observable } from 'rxjs';

export interface Provider {
    tableTitle: string;
    url: string;
    xTitle: string;
    yTitle: string;
    threshold: number;
    dataPoint : number;
    linesToggle: boolean[];
    googleChartDataFormat: (number|string)[][];
    lineTitle : string[];
    getData : (url:string, threshold : number, provider : Provider) => Observable<Provider>;
}
