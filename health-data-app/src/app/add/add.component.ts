import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
  }


  public returnToList() {
    this.router.navigate(['/patientList'])
  }

  public clearForm(form: NgForm) {
    form.reset();
  }
}
