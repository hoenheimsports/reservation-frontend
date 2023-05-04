import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-teen-dialog',
  templateUrl: './teen-dialog.component.html',
  styleUrls: ['./teen-dialog.component.scss']
})
export class TeenDialogComponent  implements OnInit{
  price!:number;

  ngOnInit(): void {
    this.price=environment.priceTeen;
  }



}
