import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myrequirement',
  templateUrl: './myrequirement.component.html',
  styleUrls: ['./myrequirement.component.scss']
})
export class MyrequirementComponent implements OnInit {
data:any=[1,2,3]
  constructor() { }

  ngOnInit(): void {
  }

}
