import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-table-multiplication',
  templateUrl: './table-multiplication.component.html',
  styleUrls: ['./table-multiplication.component.css']
})
export class TableMultiplicationComponent implements OnInit {
  @Input() nombre!: number;
  tabChiffres: number[] = [];
  constructor() { }

  ngOnInit(): void {
  this.tabChiffres = this.remplissageTableau();    
  }

  remplissageTableau() {
    let table = [];
    let num = 10;
    let i = 1;
    while (i < (num+1)) {
      table.push(i);
      i++;
    }
    return table;
  }

}
