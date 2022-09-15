import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-hr-requirement-list',
  templateUrl: './hr-requirement-list.component.html',
  styleUrls: ['./hr-requirement-list.component.scss']
})
export class HrRequirementListComponent implements OnInit {
  cards:any=[
  ]
  constructor(private service:ApiServicesService,private dataService:DataService,
    private router:Router) { }

  ngOnInit(): void {
    this.getList();
  }

  getList(){
    this.service.get({},API_ROUTES.MyRequirements.getAllRequirementList).pipe().subscribe((res => {
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
      this.router.navigate(['/main/home/manufacturing-o-r']);
    }
    else if(data.req_type.toLowerCase()=="other"){
      this.router.navigate(['/main/home/other']);
    }
    else if(data.req_type.toLowerCase()=="hr"){
      this.router.navigate(['/main/home/hr-requirement']);
    }
    else if(data.req_type.toLowerCase()=="machine"){
      this.router.navigate(['/main/home/machine-requirement']);
    }
    else if(data.req_type.toLowerCase()=="raw material"){
      this.router.navigate(['/main/home/raw-material']);
    }
    else if(data.req_type.toLowerCase()=="finance"){
      this.router.navigate(['/main/home/finance']);
    }
  }

  delete(id:any){
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
  }
}