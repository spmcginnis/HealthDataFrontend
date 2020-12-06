import { Component, OnInit } from '@angular/core';
import { Hospitals } from '../dataClasses/hospitals';
import { Patients } from '../dataClasses/patients';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

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
      this.returnToList();
    }
    
    if (this.dataService.getID() && !this.refID) {
      this.refID = this.dataService.getID();
    }
    
    if (this.refID) {
      this.apiService.getPatientById(this.refID).subscribe(
        data => { this.patientToEdit = data; }
      );
    }

  }

  // Sorts the data for proper ordering of form regardless of order in the source
  public sortData(): Array<any> {
    let dataList:Array<any> = [];
    dataList.push(["ID","id",this.patientToEdit?.id]);
    dataList.push(["Given Name", "givenName", this.patientToEdit?.givenName]);
    dataList.push(["Family Name","familyName",this.patientToEdit?.familyName]);
    dataList.push(["Street","street",this.patientToEdit?.street]);
    dataList.push(["City","city",this.patientToEdit?.city]);
    dataList.push(["State","state",this.patientToEdit?.state]);
    dataList.push(["Zip Code","zip",this.patientToEdit?.zip]);
    dataList.push(["Date of Birth","dob",this.patientToEdit?.dob]);
    dataList.push(["Gender Code","gender",this.patientToEdit?.gender]);
    dataList.push(["Language Code","languageCode",this.patientToEdit?.languageCode]);
    dataList.push(["Hospital Code", "hospitalCode", this.patientToEdit?.hospitalCode]);
    
    return dataList
  }


  public resetForm() { // not working at the moment
    
    if (this.refID) {
      console.log(this.refID);
      console.log(this.patientToEdit);
      this.apiService.getPatientById(this.refID).subscribe(
        data => { this.patientToEdit = data; }
      );
    }
  }

  public returnToList() {
    this.router.navigate(['/patientList'])
  }
}
