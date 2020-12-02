import { Component, OnInit } from '@angular/core';
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
  searchField; // for the radio filter
  textInput: string; // for the test input text field
  outputList: Patients[];

  public constructor(private _apiService: apiService) { }

  ngOnInit() {
    this._apiService.getPatients().subscribe(
      data => { this.patientList = data; this.outputList = data; }
    );

    this._apiService.getHospitals().subscribe(
      data => { this.hospitalList = data; }
    );

    //initialize search data model?
    this.searchField = this.radios[0].value; // Is this necessary anymore?
  }

  // Method to process the form information
  // This happens when the submit button is pressed
  // It needs to drive the filtering of the table.
  public processForm(value, isValid: boolean) {
    this.resetData("soft");

    console.log("output list test: ", this.outputList[0]);

    if (!this.patientList) {
      return [];
    }
    if (!this.textInput || !this.searchField) {
      return this.patientList
    }

    this.textInput = this.textInput.toLowerCase();

    console.log("text input: ", this.textInput);
    console.log("search field radio test: ", this.searchField)

    this.outputList = this.outputList.filter(item => {
      let language = this.languageFromCode(item.languageCode);
      let values: string;
      if (this.searchField == "name") {
        values = `${item.familyName} ${item.givenName}`;  
      }
      if (this.searchField == "zip") {
        values = String(item.zip)
      }
      if (this.searchField == "lang") {
        values = language
      }
      if (this.searchField == "hospital") {
        values = this.hospitalNameFromCode(item.hospitalCode)
      }
      if (values.toLowerCase().includes(this.textInput)) {
        return item;
      }
    })

    return this.outputList

  }

  public resetData(soft?:string) {
    this.outputList = this.patientList;
    if (!soft) {this.textInput = ''}
  }

  // "Standing Data" for form processing.
  public radios = [
    { value: 'name', display: 'Name (given or family)'},
    { value: 'zip', display: 'Zip Code'},
    { value: 'lang', display: 'Language'},
    { value: 'hospital', display: 'Hospital'}
  ]

  convertToAge(dateValue) {

    let birthYYYY:number = +String(dateValue).slice(0,4);
    let birthMMDD:number = +String(dateValue).slice(4,8);

    let nowYYYY:number = this.todayDate.getFullYear();
    let nowMMDD:number =
      (this.todayDate.getMonth()+1) *100 
      + this.todayDate.getDate();
      // I had to add one to the month.  This seems like a bug in the getMonth() function.
    
    let age:number = nowYYYY - birthYYYY ;
    if (nowMMDD >= birthMMDD){
      //console.log("birth: " + dateValue + " not adjusted, age " +age)
    } else {
      age -= 1;
      //console.log("birth: " + dateValue + " adjusted to " +age)
    }
    
    return age
  }


  // Methods for processing the data
  languageFromCode(langCode) {
    enum CodeMapping {
      vie = "Vietnamese",
      bos = "Bosnian",
      zho = "Chinese",
      spa = "Spanish",
      eng = "English"
    }
    return CodeMapping[langCode]
  }

  hospitalNameFromCode(hospCode) {
    for (let hospital of this.hospitalList) {
      if (hospital.hospitalCode == hospCode) {
        return hospital.name;
      } 
    }
  }


}
