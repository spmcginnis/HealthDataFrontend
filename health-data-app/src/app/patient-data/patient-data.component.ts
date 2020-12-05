import { Component, OnInit } from '@angular/core';
import { Hospitals } from '../dataClasses/hospitals';
import { Patients } from '../dataClasses/patients';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-patient-data',
  templateUrl: './patient-data.component.html',
  styleUrls: ['./patient-data.component.css']
})

export class PatientDataComponent implements OnInit {
  todayDate = new Date(Date.parse(Date()))

  // Data Lists
  patientList: Patients[];
  hospitalList: Hospitals[];

  // Data for form processing.
  radios = [
    { value: 'name', display: 'Name (given or family)'},
    { value: 'zip', display: 'Zip Code'},
    { value: 'lang', display: 'Language'},
    { value: 'hospital', display: 'Hospital'}
  ]
  textInput: string; // for the test input text field
  outputList: Patients[]; // for storing the filtered list
  searchField:string; // for the radio filter

  public constructor(private apiService: ApiService, private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.apiService.getPatients().subscribe(
      data => { this.patientList = data; this.outputList = data; }
    );

    this.apiService.getHospitals().subscribe(
      data => { this.hospitalList = data; }
    );

    this.resetData();
    this.resetForm();
  }

  // Method to pass data to the edit component and load the edit view.
  public processEditButton(input:string, id:string) {
    // Get the id of the selected entry and pass it to the edit component.

    this.dataService.setID(id);

    console.log(input, " with ID: ", this.dataService.patientID);
    
    this.router.navigate(['/edit'])


  }

  // Method to process the form information
  public processForm(value, isValid: boolean) {
    this.resetData();

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

  // Form and Data Reset Methods
  public resetForm() {
    this.textInput = '';
    this.searchField = this.radios[0].value;
  }

  public resetData() {
    this.outputList = this.patientList;
  }



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
