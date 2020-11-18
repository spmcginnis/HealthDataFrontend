import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule} from '@angular/common/http';
import { apiService } from './services/api.service';
import { PatientDataComponent } from './patient-data/patient-data.component';
import { HospitalDataComponent } from './hospital-data/hospital-data.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'patientList', component: PatientDataComponent},
  {path: 'hospitalList', component: HospitalDataComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PatientDataComponent,
    HospitalDataComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [apiService],
  bootstrap: [AppComponent]
})
export class AppModule { }