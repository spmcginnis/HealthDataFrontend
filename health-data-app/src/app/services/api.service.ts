import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Patients } from '../dataClasses/patients';

@Injectable()
export class ApiService
{
    // TODO refactor the URL to point to a single value.
    // TODO refactor the observables to use strict typing.
    constructor (private client: HttpClient) {}

    getPatients(): Observable<any> {
        return this.client.get("https://localhost:5001/api/patients/")
            .pipe(catchError(this.handleError)
            );
    }

    getHospitals(): Observable<any> {
        return this.client.get("https://localhost:5001/api/hospitals/")
            .pipe(catchError(this.handleError)
            );
    }

    getPatientById(refID: string): Observable<any> {      
        return this.client.get("https://localhost:5001/api/patients/" + refID)
            .pipe(catchError(this.handleError)
            );
    }

    updatePatientById(patient: Patients) {
        return this.client.put<Patients>("https://localhost:5001/api/patients/" + patient.id, patient)
            .pipe(catchError(this.handleError)
            );
    }

    postNewPatient(patient) {
        let options = {headers: {"Content-Type": "application/json"}}
        return this.client.post("https://localhost:5001/api/patients/", JSON.parse(JSON.stringify(patient)))
            .pipe(catchError(this.handleError)
            );
    }

    private handleError(response: HttpErrorResponse) {
        if (response.error instanceof ErrorEvent) {
            // Handles a client or network error
            console.error(`Client or network error:  ${response.error.message}`);
        } else {
            // Response code indicates request was unsuccessful
            console.error(`Server returned code ${response.status}: ${response.error}`);
        }

        // Return an observable with a user-facing error message.
        return throwError(`There was an error with your request. Please try again later.`);
    }

}

// TODO Make a second set of methods to handle data with the flat-file version.
// TODO? Refactor data.service and api.service into one service to handle it all.