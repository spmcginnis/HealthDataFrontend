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
import { MapComponent } from './map/map.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'patientList', component: PatientDataComponent},
  {path: 'hospitalList', component: HospitalDataComponent},
  {path: 'map', component: MapComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PatientDataComponent,
    HospitalDataComponent,
    HomeComponent,
    MapComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [apiService],
  bootstrap: [AppComponent]
})
export class AppModule { }