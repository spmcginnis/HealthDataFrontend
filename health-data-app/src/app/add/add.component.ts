import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Patients } from '../dataClasses/patients';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})

export class AddComponent implements OnInit {
  // ngModel properties
  givenName;
  familyName;
  street;
  city;
  state;
  zip:number;
  dob:number;
  gender;
  languageCode;
  hospitalCode;

  // patient object
  patientToAdd: Patients;
  public errorMessage;

  constructor(private router: Router, private api: ApiService, private dataService: DataService) {}

  ngOnInit(): void {
    this.patientToAdd = <Patients>{};
  }

  public addPatient(form: NgForm) {
    // TODO check each field for validity. Currently only checks for completion.
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
      this.displayError("Form not submitted. All fields are required.", 4000);
      
    } else {
      this.patientToAdd.givenName = form.value.givenName;
      this.patientToAdd.familyName = form.value.familyName;
      this.patientToAdd.street = form.value.street;
      this.patientToAdd.city = form.value.city;
      this.patientToAdd.state = form.value.state;
      this.patientToAdd.zip = Number(form.value.zip);
      this.patientToAdd.dob = Number(form.value.dob);
      this.patientToAdd.gender = form.value.gender;
      this.patientToAdd.languageCode = form.value.languageCode;
      this.patientToAdd.hospitalCode = form.value.hospitalCode;

      // call post to db
      this.api.postNewPatient(this.patientToAdd).subscribe();

      // send message through data service
      this.navigateWithMessage("/patientList", "New patient added to DB.")
      
    }
  }

  private returnToList() {
    this.router.navigate(['/patientList'])
  }

  private navigateWithMessage(path:string, input:string) {
    this.dataService.setMessage(input);
    this.router.navigate([path]);
  }

  public clearForm(form: NgForm) {
    form.reset();
    this.errorMessage = "";
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async displayError(message, ms){
    this.errorMessage = message;
    await this.delay(ms);
    this.errorMessage = "";
  }
}
