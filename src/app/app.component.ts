import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TableMultiplication';
  nombre = 0;
  nombreTables = 0;
  badNumber = false;
  isSubmitted1 = false;
  isSubmitted2 = false;
  tableForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.tableForm = new FormGroup({
      nombre: new FormControl(''),
      nombreTables: new FormControl(''),
    });
  }

  get formControls() { return this.tableForm.controls; }

  multiplication() {
    this.isSubmitted1 = true;
    if (this.tableForm.value.nombre != null) {
      this.nombre = this.tableForm.get('nombre')?.value;
    }
    else {
      this.badNumber = true;
      this.nombre = 1;
      return
    }
  }

  tablesMultiplication() {
    this.isSubmitted2 = true;
    console.log(this.tableForm.value.nombreTables);
    if (this.tableForm.value.nombreTables != null && this.tableForm.value.nombreTables != 0) {
      this.nombreTables = this.tableForm.get('nombreTables')?.value;
    }
    else {
      this.nombreTables = 10;
    }
  }
}
