export interface Patients {
    // On interface being used here, see https://angular.io/guide/http#requesting-a-typed-response
    // Properties correspond to data fields in the API.
    id:string;
    givenName:string;
    familyName:string;
    street:string;
    city:string;
    state:string;
    zip:number;
    dob:string;
    gender:string;
    languageCode:string;
    hospitalCode:string;    
}

// TODO Recheck types for data validation step