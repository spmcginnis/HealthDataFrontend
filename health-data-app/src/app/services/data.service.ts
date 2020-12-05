import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
  public patientID:string;

  constructor() { }

  setID(input:string) {
    this.patientID = input;
  }

  getID() {
    return this.patientID;
  }
}
