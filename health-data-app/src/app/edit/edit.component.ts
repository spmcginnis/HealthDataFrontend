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

  public resetForm() {
    
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
