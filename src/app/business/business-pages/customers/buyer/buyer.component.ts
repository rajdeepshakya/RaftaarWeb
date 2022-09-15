import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { DeleteComponent } from 'src/app/shared/dialogs/delete/delete.component';

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.scss']
})
export class BuyerComponent implements OnInit {
  buyer: any;
  noDataFound: boolean = false;
  counter(i: number) {
    return new Array(i);
  }
  constructor(private router: Router,
    private service:ApiServicesService,
    private dialog:MatDialog,
    ) { }

  ngOnInit(): void {
    this.getList()
  }

  getList(){
    let getBuyer={
      customer_category:'buyer'
    }
     this.service.get(getBuyer,API_ROUTES.customers.getBuyer).pipe().subscribe((res) => {
      console.log(res);
      if(res.success) {
        this.buyer = res.result;
      }

      if(this.buyer && (this.buyer.length == 0 || this.buyer==null)){
        this.noDataFound=true
      }
     },(error)=>{
      this.noDataFound=true
    }
     )
   }

   detailsOpen(id:any){
    this.router.navigate(['/business/customers/customer-details'],{queryParams: {id:id}});
   }
 
   edit(id:any){
     this.router.navigate(['/business/customers/add-client'],{queryParams: {id:id}});

   }
 
}
