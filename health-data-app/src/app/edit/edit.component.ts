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

  public _reset(form: NgForm) {

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

    // TODO repopulate fields

  }


  public returnToList() {
    this.router.navigate(['/patientList'])
  }


}
