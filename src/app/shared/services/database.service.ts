import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  hasStarted:boolean = false;

  constructor() { 
    this.hasStarted = true
  }

  created() { 
    return this.hasStarted;
  }
}
