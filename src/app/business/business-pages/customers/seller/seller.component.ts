import { I } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.scss']
})
export class SellerComponent implements OnInit {
  seller: any;
  noDataFound: boolean = false;

  constructor(private router: Router,
    private service:ApiServicesService,
    private dialog:MatDialog,
    ) { }
 

  counter(i: number) {
    return new Array(i);
  }

  ngOnInit(): void {
    this.getList()
  }

  getList(){
    let getSeller={
      customer_category:'seller'
    }
     this.service.get(getSeller,API_ROUTES.customers.getSeller).pipe().subscribe((res) => {
       console.log(res);
       if(res.success) {
        this.seller = res.result;
       }

       if(this.seller && (this.seller.length == 0 || this.seller==null)){
        this.noDataFound=true
      }
       
     },(error)=>{
      this.noDataFound=true
    })
   }
 
   edit(id:any){
     this.router.navigate(['/business/customers/add-client'],{queryParams: {id:id}});
   }

}
