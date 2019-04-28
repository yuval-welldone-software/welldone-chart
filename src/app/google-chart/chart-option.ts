export class ChartOptions {
    
    constructor(title, vAxisTitle, hAxisTitle) {
        this.title = title;
        this.vAxis.title = vAxisTitle;
        this.hAxis.title = hAxisTitle;
    }
    static create (title, vAxisTitle, hAxisTitle) { return  new ChartOptions(title, vAxisTitle, hAxisTitle)};
    chartArea= {
        top: 38,
        height: '70%' 
     }
    title = '';
    height = 600;
    curveType = 'function';
    legend = {position: 'top'};
    vAxis =  {title: ''};
    lineWidth = 4;
    series = { 0: {lineDashStyle: [4, 4]}};
    colors = ['#e2431e', '#f1ca3a', '#6f9654', '#1c91c0',
              '#4374e0', '#5c3292', '#572a1a', '#999999', '#1a1a1a'];
    hAxis = { title: '', titleTextStyle: {color: '#333'}, format: 'Q#'}
   
} 


