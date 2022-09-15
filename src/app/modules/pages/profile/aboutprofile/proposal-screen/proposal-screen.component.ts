import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-proposal-screen',
  templateUrl: './proposal-screen.component.html',
  styleUrls: ['./proposal-screen.component.scss']
})
export class ProposalScreenComponent implements OnInit {

  counternumber:any="";
  counthighlights:any="";
  contentform:any;
  uploadImage:string = ''
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.contentform = this.fb.group({
      number:['',Validators.required],
     
   
     });
     
  }
}
