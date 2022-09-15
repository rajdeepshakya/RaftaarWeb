import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditPopupComponent } from 'src/app/shared/dialogs/edit-popup/edit-popup.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  isShow=false
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
  constructor(private dialog:MatDialog) { }
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
}
