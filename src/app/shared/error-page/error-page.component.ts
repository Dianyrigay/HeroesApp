import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styles: [
    `
    .buttonSidenav {
      font-size: 16px;
    }

    .buttonSidenav a {
      text-decoration: none;
      color: white;
    }

    .buttonSidenav a:hover {
      color: #f44336;
    }
    `
  ]
})
export class ErrorPageComponent implements OnInit {

  slides = [{ 'image': 'https://gsr.dev/material2-carousel/assets/demo.png' },
   { 'image': 'https://gsr.dev/material2-carousel/assets/demo.png' },
   { 'image': 'https://gsr.dev/material2-carousel/assets/demo.png' },
   { 'image': 'https://gsr.dev/material2-carousel/assets/demo.png' },
   { 'image': 'https://gsr.dev/material2-carousel/assets/demo.png' }];
  constructor() { }

  ngOnInit(): void {
  }

}
