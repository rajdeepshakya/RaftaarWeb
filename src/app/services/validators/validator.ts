import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationsService {

  constructor() { }

  avoidSpace(event1: any) {
    var k = event1 ? event1.which : event1.keyCode
    if (k == 32 && (event1.target.value.length >= 0)) {
      return false
    } 
      return true
  }
  
   numeric(event:any) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if(charCode>31&&(charCode<48||charCode>57)){
        console.log(charCode)
        return false;
    }
return true;
    }

    alphaNumericKey(event:any)
    {
    var charCode = (event.which) ? event.which : event.keyCode
    if (charCode > 32 && (charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)&& (charCode < 48 || charCode > 57)) {
    return false;}
    return true;
    }  
    onlynumbers(event:any){
      const charCode=(event.which)?event.which:event.keyCode;
      if(charCode>31&&(charCode<48||charCode>57)){
          console.log(charCode)
          return false;
      }
  return true;
  }


  //only alphabets

  lettersOnly(event1: any) {
    var charCode = event1.keyCode;

    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 8)

      return true;
    else
      return false;
  }

  isNumberKey(evt:any){  
    console.log(evt)
    //var e = evt || window.event;
	var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode != 46 && charCode > 31 
	&& (charCode < 48 || charCode > 57))
        return false;
        return true;
	}

}


     
