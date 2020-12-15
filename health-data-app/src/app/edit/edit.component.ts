import { Component, OnInit } from '@angular/core';
import { Hospitals } from '../dataClasses/hospitals';
import { Patients } from '../dataClasses/patients';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit {
  // ngModel properties
  id;
  givenName;
  familyName;
  street;
  city;
  state;
  zip;
  dob;
  gender;
  languageCode;
  hospitalCode;

  
  // TODO: refactor class and references from 'edit' to 'view'
  // TODO: refactor the html to generate the form and data procedurally
  // TODO: language code and hospital code should be dropdown with keys and values
  // TODO: process DOB
  public refID:string;

  patientToEdit: Patients;

  constructor(private apiService: ApiService, private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    // Uses localStorage to ensure a browser reset maintains the data. If the local storage value is undefined, then it sends the user back to the patient list.
    // This happens when the browser is reset or the page URL is used instead of the edit button.
    if (!this.dataService.getID() && !this.refID) {
      if (localStorage.getItem('id')!="undefined") {
        this.refID = localStorage.getItem('id');
      } else {
        this.returnToList();
      }
    }

    // Get the ID from the data service if there is no refID. This happens when the edit button is clicked in patient-data.component
    if (this.dataService.getID() && !this.refID) {
      this.refID = this.dataService.getID();
    }
    
    // Get the data from the API
    if (this.refID) {
      this.apiService.getPatientById(this.refID).subscribe(
        data => { this.patientToEdit = data; }
      );
    }

    // Clear and reset the local storage based on the current refID
    localStorage.removeItem('id');
    localStorage.setItem('id', this.refID)

  }

  public resetData(form: NgForm): void {
    form.reset(
      {id: this.patientToEdit.id,
      givenName: this.patientToEdit.givenName,
      familyName: this.patientToEdit.familyName,
      street: this.patientToEdit.street,
      city: this.patientToEdit.city,
      state: this.patientToEdit.state,
      zip: this.patientToEdit.zip,
      dob: this.patientToEdit.dob,
      gender: this.patientToEdit.gender,
      languageCode: this.patientToEdit.languageCode,
      hospitalCode: this.patientToEdit.hospitalCode}
    );
  }


  public returnToList() {
    this.router.navigate(['/patientList'])
  }

  public saveForm(form: NgForm): void {
    this.patientToEdit.givenName = this.storeChange(form.value.givenName, this.patientToEdit.givenName);
    this.patientToEdit.familyName = this.storeChange(form.value.familyName, this.patientToEdit.familyName);
    this.patientToEdit.street = this.storeChange(form.value.street, this.patientToEdit.street);
    this.patientToEdit.city = this.storeChange(form.value.city, this.patientToEdit.city);
    this.patientToEdit.state = this.storeChange(form.value.state, this.patientToEdit.state);
    this.patientToEdit.zip = this.storeChange(form.value.zip, this.patientToEdit.zip);
    this.patientToEdit.dob = this.storeChange(form.value.dob, this.patientToEdit.dob);
    this.patientToEdit.gender = this.storeChange(form.value.gender, this.patientToEdit.gender);
    this.patientToEdit.languageCode = this.storeChange(form.value.languageCode, this.patientToEdit.languageCode);
    this.patientToEdit.hospitalCode = this.storeChange(form.value.hospitalCode, this.patientToEdit.hospitalCode);

    this.apiService.updatePatientById(this.patientToEdit).subscribe();
  }

  // checks to see if there is a difference between the form value and the component value
  private isValueChanged(formValue:string, storedValue:string): boolean {
    return (formValue && formValue != storedValue)
  }
  
  // First check to see if there is a change then return a value
  private storeChange(formValue:any, storedValue:any): any {
    if (this.isValueChanged(formValue, storedValue)) {
      console.log("Change stored, new value: ", formValue)
      return formValue;
    } else {
      return storedValue;
    }
  }

  public deletePatient(form: NgForm) {
    this.resetData(form);
    console.log(form.value.id)
    this.apiService.deletePatientById(form.value.id).subscribe();
    this.returnToList();
    // TODO add success message
  }

}
