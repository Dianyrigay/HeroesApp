import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    `
    .container{
      margin-inline: 25px;
      margin-block: 10px;
    }

    .fixed-header {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1;
      /* width: 100% ; */
    }

    .container{
      margin-block-start: 88px;
    }
    `
  ]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
