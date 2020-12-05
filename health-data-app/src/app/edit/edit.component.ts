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

  public patientID:string;

  constructor(private _apiService: ApiService, private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.patientID = this.dataService.getID();
    
  }

}
