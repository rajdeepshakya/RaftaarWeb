import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { DataService } from 'src/app/services/data.service';
import { EditPopupComponent } from 'src/app/shared/dialogs/edit-popup/edit-popup.component';

@Component({
  selector: 'app-manufacturing-o-r-list',
  templateUrl: './manufacturing-o-r-list.component.html',
  styleUrls: ['./manufacturing-o-r-list.component.scss']
})
export class ManufacturingORListComponent implements OnInit {
  cards:any=[]
  icons:any={
    'units': 'assets/images/bill_3.svg',
    'price': 'assets/images/price.svg',
    'date': 'assets/images/calendar_2.svg',
    'capacity': 'assets/images/capacity.svg',
    'contact': 'assets/images/call.svg',
    'gst': 'assets/images/archive-book.svg',
    'lead': 'assets/images/clock_2.svg',
}
  text: string;
  page:number=1;
  count: number = 0;
  Size: number = 20;
  constructor(private loader:NgxUiLoaderService,public dialog:MatDialog,private service:ApiServicesService,private dataService:DataService,
    private router:Router) { }

  ngOnInit(): void {
    this.getList();
  }
  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    if (pos == max) {
      this.Size = this.Size + 20;
      this.getList();
    }
  }
  
  getList(){
    this.loader.start();
    let page={
      pageNo:this.page,
      size:this.Size
    }
    this.service.get(page,API_ROUTES.MyRequirements.getAllRequirementList).pipe().subscribe((res => {
      this.loader.stop();
      console.log(res);
      if (res.success) {
        for (let [key, value] of Object.entries(res.result)) {
          this.cards.push(value);
          }
      // this.cards = this.cards.filter((element:any) => { if (element.req_type.toLowerCase()== "manufacturing order requirement") return element});
        
      } else {
      }

    }))
  }

  edit(data:any){
    this.dataService.setData('editFlag',true);
    this.dataService.setData('editId',data.id);
    if(data.req_type.toLowerCase()=="manufacturing order requirement"){
      this.router.navigate(['/main/home/manufacturing-o-r'],{queryParams: {id: data.id}});
    }
    else if(data.req_type.toLowerCase()=="other"){
      this.router.navigate(['/main/home/other'],{queryParams: {id: data.id}});
    }
    else if(data.req_type.toLowerCase()=="hr"){
      this.router.navigate(['/main/home/hr-requirement'],{queryParams: {id: data.id}});
    }
    else if(data.req_type.toLowerCase()=="machine"){
      this.router.navigate(['/main/home/machine-requirement'],{queryParams: {id: data.id}});
    }
    else if(data.req_type.toLowerCase()=="raw material"){
      this.router.navigate(['/main/home/raw-material'],{queryParams: {id: data.id}});
    }
    else if(data.req_type.toLowerCase()=="finance"){
      this.router.navigate(['/main/home/finance'],{queryParams: {id: data.id}});
    }
  }

  openDetails(data:any){
    if(data.req_type.toLowerCase()=="manufacturing order requirement"){
      this.router.navigate(['/main/home/manufacturing-o-r_home'],{queryParams: {id: data.id}});
    }
    else if(data.req_type.toLowerCase()=="other"){
      this.router.navigate(['/main/home/other_home'],{queryParams: {id: data.id}});
    }
    else if(data.req_type.toLowerCase()=="hr"){
      this.router.navigate(['/main/home/hr-requirement_home'],{queryParams: {id: data.id}});
    }
    else if(data.req_type.toLowerCase()=="machine"){
      this.router.navigate(['/main/home/machine_home'],{queryParams: {id: data.id}});
    }
    else if(data.req_type.toLowerCase()=="raw material"){
      this.router.navigate(['/main/home/rawmat_home'],{queryParams: {id: data.id}});
    }
    else if(data.req_type.toLowerCase()=="finance"){
      this.router.navigate(['/main/home/finance_home'],{queryParams: {id: data.id}});
    }
  }

  delete(id:any,type:any){
    if(type==1){
      this.text='Hey, do you really want to delete this manufacturing order requirement?';
    }
  else if(type==2){
  this.text='Hey, do you really want to delete this HR Requirement?'
  }
  else if(type==3){
    this.text='Hey, do you really want to delete this machine?'
      }
      else if(type==4){
        this.text='Hey, do you really want to delete this raw material?'
          }
          else if(type==5){
            this.text='Hey, do you really want to delete this finance?'
              }
              else if(type==6){
                this.text='Hey, do you really want to delete this other?'
                  }
    const dialogRef = this.dialog.open(EditPopupComponent, {
      maxHeight: '100vh',
      width:'465px',
      // panelClass:'yespost',
      data: {
        img:'assets/images/Delete.png',
        heading:this.text,
        report:'Yes, delete',
        cancel:'Go, back'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      
      let dataToDelete = {
        'requirement_id':id
      }
      this.service.delete(dataToDelete,API_ROUTES.MyRequirements.deleteRequirement).pipe().subscribe((res =>{
        console.log(res);
        if (res.success) {
          this.cards = [];
          this.getList();
        }
         else {
        }
      }))
    });
  
  }
  onDataChange(event: any) {
    this.page = event;
    this.getList();
  }
}
