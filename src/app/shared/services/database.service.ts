import { Injectable } from '@angular/core';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite/ngx'

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  hasStarted:boolean = false;

  constructor(private sqlite: SQLite) { 
    this.sqlite.echoTest()
      .then((res) => {
        console.log(res);
        this.hasStarted = true;
    })
      .catch((err) => {
        console.log(err)
      });
  }

  created() { 
    return this.hasStarted;
  }
}
