import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
@Component({
  selector: 'app-sales-filter',
  templateUrl: './sales-filter.component.html',
  styleUrls: ['./sales-filter.component.scss']
})
export class SalesFilterComponent implements OnInit {
  open: any;
  companiesList:any;
  businessActivityList:any;
  constructor( public dialogRef: MatDialogRef<SalesFilterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private service: ApiServicesService,) { }
  ngOnInit(): void {
    this.getCompanyList();
    this.getBusinessActivites();
  }
  // selects=[
  //   {
  //     label:'Company name'
  //   },
  //   {
  //     label:'Category '
  //   },
  //   {
  //     label:'Product name'
  //   },
  // ]
  filters=[
    {
      label:'Price Low to High'
    },
    {
      label:'Price High to Low'
    },
    {
      label:'Most recent'
    }
  ]
  getCompanyList() {
    debugger
    this.service.get({}, `${API_ROUTES.SalesOrder.getCompanyList}`).pipe().subscribe((res) => {
      if (res.success) {
        this.companiesList = res.result.companyDetail;
      } else {

      }
    }
    )
  }
  getBusinessActivites() {

    this.service.get({}, `${API_ROUTES.SalesOrder.getBusinessActivities}`).pipe().subscribe((res) => {
      if (res.success) {
        console.log(JSON.stringify(res.result));
        this.businessActivityList = res.result;
      } else {

      }
    }
    )
  }
}
