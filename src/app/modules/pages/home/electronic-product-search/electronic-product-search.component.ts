import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-electronic-product-search',
  templateUrl: './electronic-product-search.component.html',
  styleUrls: ['./electronic-product-search.component.scss']
})
export class ElectronicProductSearchComponent implements OnInit {

  productdesign:any=['piyush','pandey']
  constructor() { }

  ngOnInit(): void {
  }

}
