export class ChartColumnOption {
    constructor (calc : any , type : string, label : string){
        this.calc = calc;
        this.type = type;
        this.label = label;
    }
    static create (calc : any , type : string, label : string) { return  new ChartColumnOption(calc, type, label)};
    calc: any;
    type: string; 
    label: string; 
}
 
