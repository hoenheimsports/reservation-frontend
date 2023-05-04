import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-adult-dialog',
  templateUrl: './adult-dialog.component.html',
  styleUrls: ['./adult-dialog.component.scss']
})


export class AdultDialogComponent implements OnInit{
  price!:number;

  ngOnInit(): void {
    this.price=environment.priceAdult;
  }



}
