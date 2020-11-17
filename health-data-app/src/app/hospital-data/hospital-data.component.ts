import { Component, OnInit } from '@angular/core';
import { apiService } from '../services/api.service';
import { Hospitals } from '../dataClasses/hospitals';

@Component({
  selector: 'app-hospital-data',
  templateUrl: './hospital-data.component.html',
  styleUrls: ['./hospital-data.component.css']
})
export class HospitalDataComponent implements OnInit {
  hospitalList: Hospitals[];

  public constructor( private _apiService: apiService ) {}

  ngOnInit() {
    this._apiService.getHospitals().subscribe(
      data => { this.hospitalList = data; }
    );
  }

}
