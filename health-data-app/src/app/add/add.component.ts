import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Patients } from '../dataClasses/patients';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})

export class AddComponent implements OnInit {
  patientToAdd: Patients;
  public errorMessage;

  constructor(private router: Router, private api: ApiService) {}

  ngOnInit(): void {
    this.patientToAdd = <Patients>{};
  }

  public addPatient(form: NgForm) {
    // TODO check data for validity
    let undefinedFields:number = 0;
    for (const key in form.value) {
      if (Object.prototype.hasOwnProperty.call(form.value, key)) {
        const element = form.value[key];
        
        if (element != undefined) {
          console.log(element);
        } else {
          undefinedFields += 1;
          console.log("undefined fields: ", undefinedFields);
        }
        
      }
    }

    if (undefinedFields > 0) {
      this.errorMessage = "Form not submitted. Please complete all fields.";
      console.log(this.patientToAdd);

    } else {
      this.patientToAdd.givenName = form.value.givenName;
      this.patientToAdd.familyName = form.value.familyName;
      this.patientToAdd.street = form.value.street;
      this.patientToAdd.city = form.value.city;
      this.patientToAdd.state = form.value.state;
      this.patientToAdd.zip = form.value.zip;
      this.patientToAdd.dob = form.value.dob;
      this.patientToAdd.gender = form.value.gender;
      this.patientToAdd.languageCode = form.value.languageCode;
      this.patientToAdd.hospitalCode = form.value.hospitalCode;

      console.log(this.patientToAdd);

      // call put to db
    }



  }

  public returnToList() {
    this.router.navigate(['/patientList'])
  }

  public clearForm(form: NgForm) {
    form.reset();
    this.errorMessage = "";
  }
}
