import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-meal-dialog',
  templateUrl: './meal-dialog.component.html',
  styleUrls: ['./meal-dialog.component.scss']
})
export class MealDialogComponent implements OnInit{
  price!:number;

  ngOnInit(): void {
    this.price=environment.priceMeal;
  }

}
