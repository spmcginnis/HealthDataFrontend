import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService
{
    constructor (private client: HttpClient) {}

    getPatients(): Observable<any> {
        return this.client.get("https://localhost:5001/api/patients/");
    }

    getHospitals(): Observable<any> {
        return this.client.get("https://localhost:5001/api/hospitals/")
    }
}

// Possible approaches:
// Make a second class for the flat-file version.
// Put it in a try?  Not for when it's a different application mode.