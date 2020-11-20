import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';
import { Patients } from '../dataClasses/patients';
import { apiService } from '../services/api.service';

@Component({
  selector: 'app-patient-data',
  templateUrl: './patient-data.component.html',
  styleUrls: ['./patient-data.component.css']
})
export class PatientDataComponent implements OnInit {
  patientList: Patients[];
  todayDate = new Date(Date.parse(Date()))

  public constructor(private _apiService: apiService) { }

  ngOnInit() {
    this._apiService.getPatients().subscribe(
      data => { this.patientList = data; }
    );
  }

  private convertDate(dateValue) {

    let birthYYYY:number = +String(dateValue).slice(0,4);
    let birthMMDD:number = +String(dateValue).slice(4,8);

    let nowYYYY:number = this.todayDate.getFullYear();
    let nowMMDD:number =
      (this.todayDate.getMonth()+1) *100 
      + this.todayDate.getDate();
      // I had to add one to the month because it was not returning an ordinal number.  This seems like a bug.
    
    let age:number = nowYYYY - birthYYYY ;
    if (nowMMDD >= birthMMDD){
      //console.log("birth: " + dateValue + " not adjusted, age " +age)
    } else {
      age -= 1;
      //console.log("birth: " + dateValue + " adjusted to " +age)
    }
    
    return age
  }

  private languageFromCode(langCode) {

    enum CodeMapping {
      vie = "Vietnamese",
      bos = "Bosnian",
      zho = "Chinese",
      spa = "Spanish",
      eng = "English"
    }

    console.log(CodeMapping[langCode])
    return CodeMapping[langCode]
  }

}
