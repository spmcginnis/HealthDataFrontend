import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Patients } from '../dataClasses/patients';
import { environment } from 'src/environments/environment';

// https://spmcginnis.github.io/HealthDataFrontend/assets/api/patients
// https://spmcginnis.github.io/HealthDataFrontend/assets/api/hospitals

@Injectable()
export class ApiService
{
    constructor (private client: HttpClient) {}

    private buildURL(path:string, refID:string = ''): string {
        return environment.apiURL + path + refID
    }

    getPatients(): Observable<any> {
        return this.client.get(this.buildURL("api/patients"))
            .pipe(catchError(this.handleError)
            );
    }

    getHospitals(): Observable<any> {
        return this.client.get(this.buildURL("api/hospitals"))
            .pipe(catchError(this.handleError)
            );
    }

    getPatientById(refID: string): Observable<any> {      
        if (environment.production == true)
        {
            // Handle the github pages implementation environment // The JSON is parsed in edit.component.ts
            return this.getPatients(); 

        } else {
            return this.client.get(this.buildURL("api/patients/", refID))
            .pipe(catchError(this.handleError)
            );
        }

        


    }

    updatePatientById(patient: Patients) {
        return this.client.put<Patients>(this.buildURL("api/patients/", patient.id), patient)
            .pipe(catchError(this.handleError)
            );
    }

    postNewPatient(patient) {
        return this.client.post(this.buildURL("api/patients"), patient)
            .pipe(catchError(this.handleError)
            );
    
    }

    deletePatientById(refID: string) {
        return this.client.delete(this.buildURL("api/patients/", refID))
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