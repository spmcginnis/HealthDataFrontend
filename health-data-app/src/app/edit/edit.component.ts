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

  public refID:string;

  patientToEdit: Patients[];

  constructor(private apiService: ApiService, private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.refID = this.dataService.getID();
    
    // a test ID for now TODO remove test ID
    if (!this.refID) {
      this.refID = "5f86353c5033df945b28b3e9";
    }

    this.apiService.getPatientById(this.refID).subscribe(
      data => { this.patientToEdit = data; }
    );

  }

}
