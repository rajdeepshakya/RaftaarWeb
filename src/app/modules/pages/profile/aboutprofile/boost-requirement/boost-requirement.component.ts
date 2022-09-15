import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-boost-requirement',
  templateUrl: './boost-requirement.component.html',
  styleUrls: ['./boost-requirement.component.scss']
})
export class BoostRequirementComponent implements OnInit {
days:any=['Day1-₹25,456','Day2-₹35,456','Day3-₹45,456','Day4-₹25,456',]
  constructor() { }

  ngOnInit(): void {
  }

}
