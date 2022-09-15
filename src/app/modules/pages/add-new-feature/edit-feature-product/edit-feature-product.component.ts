import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { EditPopupComponent } from 'src/app/shared/dialogs/edit-popup/edit-popup.component';
import { PostPublishComponent } from 'src/app/shared/dialogs/post-publish/post-publish.component';

@Component({
  selector: 'app-edit-feature-product',
  templateUrl: './edit-feature-product.component.html',
  styleUrls: ['./edit-feature-product.component.scss']
})
export class EditFeatureProductComponent implements OnInit {
  data: any;
  machineForm: FormGroup;
  submitted: boolean;
  editData: any;
  interestName: any;
  listtype: any;
  machine: any;
  machineDetails: any;
  productsId: any;
  images: any;
  videos: any;
  pdf: any;
  toastr: any;

  constructor(private fb:FormBuilder,private dialog :MatDialog,private service:ApiServicesService,private router :Router, private activeRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.machineForm=this.fb.group({
      title:[''],
      description:[''],
      highlights:[''],

    })
    this.activeRoute.queryParams.subscribe((params) =>{
      this.productsId = params?.['id'];
      this.getMachineDetails();
     
    })
    
    this.patchData()
  }
  savePost(){
    const dialogRef = this.dialog.open(EditPopupComponent, {
      maxHeight: '100vh',
      width:'465px',
      panelClass:'yespost',
      data: {
        img:'../.assets/images/Icon.png',
        heading:'Are you sure you want to save the changes?',
        report:'Cancel',
        cancel:'Yes, Save'
      }
    });
  }
  onSubmit(data:any){
    let media=[{
      url:this.interestName.Media.url,
      media_type:this.interestName.Media.media_type
    }]
  let highlights=[{highlight_desc:this.interestName.Highlights[0].highlight_desc}]
  data.media=media
  data.highlights=highlights
    console.log(data, '===>')
    this.service.put(data,{productId:this.productsId},`${API_ROUTES.FeatureProduct.productupdate}`).pipe().subscribe((res)=>{
      if(res.success_code==200){
        const dialogRef = this.dialog.open(EditPopupComponent, {
          maxHeight: '100vh',
          width:'465px',
          panelClass:'yespost',
          data: {
            img:'../.assets/images/Icon.png',
            heading:'Are you sure you want to save this product?',
            para:'Lorem Ipsum is simply dummy text of the printing text of the printing. ',
            report:'Back',
            cancel:'Yes, Post'
          }
        });
        dialogRef.afterClosed().subscribe((confirm: any) => {
          if (confirm !== undefined && confirm !== null && confirm) {
            const dialogRef = this.dialog.open(PostPublishComponent, {
              maxHeight: '100vh',
              width:'465px',
              panelClass:'products',
              data: {
                img:'assets/images/Completed_check.svg',
                heading:'Product Updated Successfully',
                title:'Please check your inbox and click in the recieved link to reset a password',
                btn:'Okay'
              }
              
            }
            );
            dialogRef.afterClosed().subscribe(result => {
              
              this.router.navigate(['/main/profile/products'])
            });
           
          }
        }); 
      }

    })
}
getMachineDetails(){
  this.service.get({productId:this.productsId},`${API_ROUTES.FeatureProduct.productDetails}`).pipe().subscribe((res)=>{
    this.interestName = res.result
    console.log(this.interestName);
      this.patchData();
      if (res.success) {
        this.interestName = res.result
        this.images = this.interestName.Media.filter((element:any) => { if (element.media_type.includes("Image")) return element});
        this.videos = this.interestName.Media.filter((element:any) => { if (element.media_type.includes("video")) return element});
        this.pdf = this.interestName.Media.filter((element:any) => { if (element.media_type.includes("pdf")) return element}); ;
      console.log(this.images);
      } else {
        this.toastr.error(res.msg)
      }
  })
}
patchData() {
  this.machineForm.patchValue({
    title:this.interestName.title,
    description:this.interestName.description,
    highlights:this.interestName.Highlights[0].highlight_desc,
    media:this.interestName.Media,

  });
}
}
