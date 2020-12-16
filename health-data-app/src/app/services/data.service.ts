import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';

@Injectable()
export class DataService {
  private refID:string;
    setID(input:string) {
      this.refID = input;
    }
    getID():string {
      return this.refID;
    }

  private message;
    setMessage(input:string) {
        this.message = input;
    }
    getMessage(): string {
      return this.message
    }
}
