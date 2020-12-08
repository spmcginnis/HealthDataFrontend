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
  // TODO: refactor class and references from 'edit' to 'view'
  // TODO: refactor the html to generate the form and data procedurally
  // TODO: language code and hospital code should be dropdown with keys and values
  // TODO: process DOB
  public refID:string;

  patientToEdit: Patients;

  constructor(private apiService: ApiService, private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    
    if (!this.dataService.getID() && !this.refID) {
      if (localStorage.getItem('id')!="undefined") {
        this.refID = localStorage.getItem('id');
      } else {
        this.returnToList();
      }
      
    }

    if (this.dataService.getID() && !this.refID) {
      this.refID = this.dataService.getID();
    }
    
    if (this.refID) {
      this.apiService.getPatientById(this.refID).subscribe(
        data => { this.patientToEdit = data; }
      );


    }
    localStorage.removeItem('id');
    localStorage.setItem('id', this.refID);
    console.log(localStorage.getItem('id'));

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

}
