import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-kid-dialog',
  templateUrl: './kid-dialog.component.html',
  styleUrls: ['./kid-dialog.component.scss']
})
export class KidDialogComponent implements OnInit{
  price!:number;

  ngOnInit(): void {
    this.price=environment.priceKid;
  }



}
