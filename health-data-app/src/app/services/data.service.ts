import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
  public refID:string;

  constructor() { }

  setID(input:string) {
    this.refID = input;
  }

  getID() {
    return this.refID;
  }
}
