import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-tables-multiplication',
  templateUrl: './tables-multiplication.component.html',
  styleUrls: ['./tables-multiplication.component.css']
})
export class TablesMultiplicationComponent implements OnChanges {
  @Input() nombreTables!: number;
  tableMultiplication: number[] = [];
  constructor() { }

  ngOnChanges(): void {
    this.tableMultiplication = this.remplissageTableauMultiplication();
  }

  remplissageTableauMultiplication() {
    let table = [];
    let num = this.nombreTables;
    let i = 1;
    while (i < (num +1)) {
      table.push(i);
      i++;
    }
    return table;
  }
}
