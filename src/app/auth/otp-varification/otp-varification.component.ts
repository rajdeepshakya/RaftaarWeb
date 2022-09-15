import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-otp-varification',
  templateUrl: './otp-varification.component.html',
  styleUrls: ['./otp-varification.component.scss']
})
export class OtpVarificationComponent implements OnInit {
  data1: any;
  data3: any = [];
  timeLeft: number = 11;
  interval: any;
  resenddata:boolean=false;

  constructor() { }

  ngOnInit(): void {


  }
timer(){
  this.interval = setInterval(() => {
    if ( this.timeLeft>=1) {
      this.resenddata=true;
      this.timeLeft--;
      //console.log(this.timeLeft)
      this.data3=this.timeLeft
      if(this.timeLeft==0){
        this.resenddata=false
      }
    } 
  }, 1000)
}

}
