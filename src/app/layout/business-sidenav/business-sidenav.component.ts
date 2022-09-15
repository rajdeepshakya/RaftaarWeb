import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EditPopupComponent } from 'src/app/shared/dialogs/edit-popup/edit-popup.component';
import { RouteConstant } from 'src/app/core/_constants/route.constant';

@Component({
  selector: 'app-business-sidenav',
  templateUrl: './business-sidenav.component.html',
  styleUrls: ['./business-sidenav.component.scss']
})
export class BusinessSidenavComponent implements OnInit {
  isShow=false
  itemsList=[
    {
      list:'Dashboard',
      pathModule: RouteConstant.businessDashboard
    },
    {
      list:'Product Catalogue',
      pathModule: RouteConstant.productCatalogue
    },
    {
      list:'Sales Order',
      pathModule: RouteConstant.salesorder
    },
    {
      list:'Transactions',
      pathModule: RouteConstant.transactions
    },
    {
      list:'Purchase Order',
      pathModule: RouteConstant.purchaseOrder
    },
    {
      list:'Activity Log',
      pathModule: RouteConstant.activityLog
    },
    // {
    //   list:'Connect Tally',
    //   pathModule: ''
    // },
    {
      list:'Customers',
      pathModule: RouteConstant.customers
    },
  ]
  
  users=[
    {
      img:'.assets/images/save_2.svg',
      heading:'Saved Requirement',
      para:'Pellentesque vivamus nulla est, '
    },
    {
      img:'.assets/images/heart.svg',
      heading:'Interests',
      para:'Pellentesque vivamus nulla est'
    },
    {
      img:'.assets/images/setting-2.svg',
      heading:'Settings',
      para:'Pellentesque vivamus nulla est'
    },
    {
      img:'.assets/images/key.svg',
      heading:'Change Password',
      para:'Pellentesque vivamus nulla est'
    },
    {
      img:'.assets/images/vector_2.svg',
      heading:'Privacy Policy',
      para:'Pellentesque vivamus nulla est'
    },
    {
      img:'.assets/images/simcard-2.svg',
      heading:'Terms of Use',
      para:'Pellentesque vivamus nulla est'
    },
  ]
  // activeItem: boolean = false;
  // selected: any;

  constructor(private dialog:MatDialog, private route: Router) { }

  showdropdown(){
    this.isShow=!this.isShow
  }

  ngOnInit(): void {
  }
  
  logout(){
    const dialogRef=this.dialog.open(EditPopupComponent,{
      maxHeight: '100vh',
      width:'465px',
      data: {
        img:'../.assets/images/report.svg',
        heading:'Are you sure you want to logout?',
        para:'Lorem Ipsum is simply dummy text of the printing text of the printing. ',
        report:'Yes, Logout',
        cancel:'Cancel'
      }
    })
  }

  // routeToModules(item:any) {
  //   this.itemsList.map(value => {
  //     if(value.list == item) {
  //       this.activeItem = true;
  //       this.route.navigate(['/business/',value.pathModule]);
  //     }
  //   })
  // }
  
}
