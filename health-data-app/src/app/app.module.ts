import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule} from '@angular/common/http';
import { apiService } from './services/api.service';
import { PatientDataComponent } from './patient-data/patient-data.component';
import { HospitalDataComponent } from './hospital-data/hospital-data.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PatientDataComponent,
    HospitalDataComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [apiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
