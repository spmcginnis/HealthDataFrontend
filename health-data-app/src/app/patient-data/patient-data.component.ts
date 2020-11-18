import { Component, OnInit } from '@angular/core';
import { Patients } from '../dataClasses/patients';
import { apiService } from '../services/api.service';

@Component({
  selector: 'app-patient-data',
  templateUrl: './patient-data.component.html',
  styleUrls: ['./patient-data.component.css']
})
export class PatientDataComponent implements OnInit {
  patientList: Patients[];

  public constructor(private _apiService: apiService) { }

  ngOnInit() {
    this._apiService.getPatients().subscribe(
      data => { this.patientList = data; }
    );
  }

}
