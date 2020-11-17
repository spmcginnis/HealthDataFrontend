import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class apiService
{
    constructor (private client: HttpClient) {}

    getPatients(): Observable<any> {
        return this.client.get("https://localhost:5001/api/patients/");
    }

    getHospitals(): Observable<any> {
        return this.client.get("https://localhost:5001/api/hospitals/")
    }
}