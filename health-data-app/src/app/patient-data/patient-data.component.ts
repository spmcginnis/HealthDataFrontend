import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';
import { Hospitals } from '../dataClasses/hospitals';
import { Patients } from '../dataClasses/patients';
import { apiService } from '../services/api.service';

@Component({
  selector: 'app-patient-data',
  templateUrl: './patient-data.component.html',
  styleUrls: ['./patient-data.component.css']
})

export class PatientDataComponent implements OnInit {
  patientList: Patients[];
  hospitalList: Hospitals[];
  todayDate = new Date(Date.parse(Date()))
  searchFilter: string;



  public constructor(private _apiService: apiService) { }

  ngOnInit() {
    this._apiService.getPatients().subscribe(
      data => { this.patientList = data; }
    );

    this._apiService.getHospitals().subscribe(
      data => { this.hospitalList = data; }
    );
  }

  convertToAge(dateValue) {

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

  languageFromCode(langCode) {

    enum CodeMapping {
      vie = "Vietnamese",
      bos = "Bosnian",
      zho = "Chinese",
      spa = "Spanish",
      eng = "English"
    }

    //console.log(CodeMapping[langCode])
    return CodeMapping[langCode]
  }

  public hospitalNameFromCode(hospCode) {
    for (let hospital of this.hospitalList) {
      if (hospital.hospitalCode == hospCode) {
        return hospital.name;
      } 
    }
  }


}
