import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditPopupComponent } from 'src/app/shared/dialogs/edit-popup/edit-popup.component';
import { PostPublishComponent } from 'src/app/shared/dialogs/post-publish/post-publish.component';

@Component({
  selector: 'app-market-add-product',
  templateUrl: './market-add-product.component.html',
  styleUrls: ['./market-add-product.component.scss']
})
export class MarketAddProductComponent implements OnInit {

  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {
  }
  openpostModal(){
    const dialogRef = this.dialog.open(EditPopupComponent, {
      maxHeight: '100vh',
      width:'465px',
      panelClass:'yespost',
      data: {
        img:'../.assets/images/Icon.png',
        heading:'Are you sure you want to post this project?',
        para:'Lorem Ipsum is simply dummy text of the printing text of the printing. ',
        report:'Back',
        cancel:'Yes, Post'
      }
    });
  }
}
