import * as Nano from 'nano';

export class Database{
    dbHelper: any; 
    db:any;
    dbAdress: string;
    dbPort: string;
    dbName: string;
    
    constructor(dbAdress:string, dbPort: string, dbName:string){
        this.dbHelper = Nano(dbAdress+':'+dbPort);
    }
    
    private connect(){
        this.db = this.dbHelper.use(this.dbName, this.onConnect);    
    }
    
    private saveData(data: any){
        
    }
    
    private onConnect(err:any,body:any,header:any){
        if (err) {
            console.log('Connection Error %s ', err.message);
        }else{
            console.log('Connection to %s succesful. Response: %s %s',this.dbName,body,header);    
        }
    }
}