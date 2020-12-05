import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Hospitals } from '../dataClasses/hospitals';

@Component({
  selector: 'app-hospital-data',
  templateUrl: './hospital-data.component.html',
  styleUrls: ['./hospital-data.component.css']
})

export class HospitalDataComponent implements OnInit {
  hospitalList: Hospitals[];

  public constructor( private apiService: ApiService ) {}

  ngOnInit() {
    this.apiService.getHospitals().subscribe(
      data => { this.hospitalList = data; }
    );

      
  }

}
