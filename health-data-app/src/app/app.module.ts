import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule} from '@angular/common/http';
import { ApiService } from './services/api.service';
import { PatientDataComponent } from './patient-data/patient-data.component';
import { HospitalDataComponent } from './hospital-data/hospital-data.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';
import { FormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';
import { DataService } from './services/data.service';
import { AddComponent } from './add/add.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'patientList', component: PatientDataComponent},
  {path: 'hospitalList', component: HospitalDataComponent},
  {path: 'map', component: MapComponent},
  {path: 'edit', component: EditComponent},
  {path: 'add', component: AddComponent},
  {path: '**', redirectTo: '/home'}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PatientDataComponent,
    HospitalDataComponent,
    HomeComponent,
    MapComponent,
    MapComponent,
    EditComponent,
    AddComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [ApiService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }