import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-machine-list',
  templateUrl: './machine-list.component.html',
  styleUrls: ['./machine-list.component.scss']
})
export class MachineListComponent implements OnInit {
  cards:any=[]
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
      this.cards = this.cards.filter((element:any) => { if (element.req_type.toLowerCase()== "machine") return element});
        
      } else {
      }

    }))
  }

  edit(data:any){
    this.dataService.setData('editFlag',true);
    this.dataService.setData('editId',data.id);
      this.router.navigate(['/main/home/machine-requirement']);
    
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
