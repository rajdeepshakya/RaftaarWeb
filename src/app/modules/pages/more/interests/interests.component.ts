import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { ElementRef, ViewChild} from '@angular/core';
import {UntypedFormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { PostPublishComponent } from 'src/app/shared/dialogs/post-publish/post-publish.component';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.scss']
})
export class InterestsComponent implements OnInit {
  selectDummyUserId: any = []
  selectUserId: any = []
  interestName:any;
  loginForm: any;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new UntypedFormControl('');
  filteredFruits: Observable<string[]>;
  setInterests:any =[];
  fruits: string[] = ['Lemon'];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  @ViewChild('fruitInput') fruitInput:any;
  submitted: boolean = false;
  constructor(private service:ApiServicesService, private fb:UntypedFormBuilder,private toastr:ToastrService,private commonService:CommonService,
    private dialog :MatDialog,private router:Router) {
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFruits.slice())),
    );
   }
   add(event: any): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selected(event:any): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }
  ngOnInit(): void {
    // this.onGetInterest();
    // this.loginForm = this.fb.group({
    //   interest: [this.selectDummyUserId],
    //   // lorem:[this.selectDummyUserId],
    //   // duration:[this.selectDummyUserId],

    // });
    this.loginForm = this.fb.group({
      interest: [this.selectDummyUserId],
      
    });
    this.onGetInterest();
    this.selectedInterest();

    
  }
  onGetInterest(){
    this.service.get({},`${API_ROUTES.Account.getInterest}`).pipe().subscribe((res)=>{
      this.interestName = res.result
    })
  }

  selectedInterest(){
    this.service.get({},`${API_ROUTES.More.selectedInterest}`).pipe().subscribe((res)=>{
      let result = res.result;
      this.selectDummyUserId = result.map((val:any)=>{
        return val.Interest.id;
      });
      this.selectDummyUserId = [...new Set(this.selectDummyUserId)];
      console.log(this.selectDummyUserId);
      this.loginForm.patchValue({
        interest: this.selectDummyUserId
      })
      
      // this.interestName = res.result
      
    })
  }

  onVerify(post:any){
    this.submitted=true
    if (this.selectDummyUserId.length < 3) {
      this.toastr.error("minimum 3 interests select")
    } 
    else {
    this.service.put(post,{},`${API_ROUTES.More.updateInterest}`).pipe().subscribe((res)=>{
      
      this.selectedInterest();
          // const dialogRef=this.dialog.open(PostPublishComponent,{
          //   maxHeight: '100vh',
          //   width:'465px',
          //   height:'400px',
          //   panelClass:'resetPassword',
          //   data: {
          //     img:'assets/images/Completed_check.svg',
          //     heading:'Your account created successfully',
          //     title:'Your account has been successfully created',
          //     image:'assets/images/logout_3.svg',
          //     btn:'Take me to home'
          //   }
          // })
          // dialogRef.afterClosed().subscribe(result => {
          //   this.router.navigate(['/main/home'])
          // });        
      
    },
    (error)=>{
      this.toastr.error(error.message);
    })
  }
  }
  
  interest(){
  
   
  }
  
  selectUser(val: any) {
    if (this.selectDummyUserId.includes(val)) {
      this.selectDummyUserId.splice(this.selectDummyUserId.indexOf(val), 1)
      console.log(this.selectDummyUserId);
      // this.selectUserId.splice(this.selectUserId.findIndex((v: any) => v.id === val), 1)
    }
    else {
      this.selectDummyUserId.push(val)
      // this.selectUserId.push({ 'id': val, 'priority': false })
      console.log(this.selectDummyUserId)
    }
   
  }

  goBack(){
    this.commonService.goBack();
  }
  // onVerify(post:any){
  //   this.service.post(post,`${API_ROUTES.Account.chooseInterest}`,{}).pipe().subscribe((res)=>{
  //     if(res.success_code==200){
  //       alert("Interest Added Successfully")
  //     }
  //   })
  // }
  
  // onGetInterest(){
  //   this.service.get({},`${API_ROUTES.Account.getInterest}`).pipe().subscribe((res)=>{
  //     this.interestName = res.result
  //   })
  // }
  // selectUser(val: any) {
  //   if (this.selectDummyUserId.includes(val)) {
  //     this.selectDummyUserId.splice(this.selectDummyUserId.indexOf(val), 1)
  //     console.log(this.selectDummyUserId);
      
  //     // this.selectUserId.splice(this.selectUserId.findIndex((v: any) => v.id === val), 1)
  //   }
  //   else {
     
  //     this.selectDummyUserId.push(val)
  //     // this.selectUserId.push({ 'id': val, 'priority': false })
  //     console.log(this.selectDummyUserId)
  //   }
  // }
}
