import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { EditPopupComponent } from 'src/app/shared/dialogs/edit-popup/edit-popup.component';
import { PostPublishComponent } from 'src/app/shared/dialogs/post-publish/post-publish.component';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {
  counternumber:any="";
  counthighlights:any="";
  projectForm:any;
  machine:any=['Select Machine','Machine 1']
  instrument:any=['Select Instrument','Instrument 1']
  interestName: any;
  projectId: any;
  instrudata: any;
  data: any;
  updateData: any;
  images: any;
  videos: any;
  pdf: any;
  toastr: any;
  Media: any[];
  Highlights:any[]
  constructor(public datepipe:DatePipe, private activeRoute:ActivatedRoute,private fb:FormBuilder,private dialog:MatDialog,private service:ApiServicesService,private router :Router) { }

  ngOnInit(): void {
    this.projectForm=this.fb.group({
      title:[''],
      description:[''],
      customer_name:[''],
      enter_quantity:[''],
      instruments:[''],
      project_start_date:[''],
      project_end_date:[''] ,
      is_live:[''] ,
      machine_id:[''],
      instrument_id:[''],
      is_starred:[''],
      highlights:[''],
      media:['']
    })
     this.activeRoute.queryParams.subscribe((params) =>{
      this.projectId = params?.['id'];
     
    })
    this.getIndustry()
    this.getMachineDetails()
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
        url:this.interestName.Media[0].url,
        media_type:this.interestName.Media[0].media_type
      }]
    
    let highlights=[{highlight_desc:this.interestName.Highlights[0].highlight_desc}]
    let projectDate=this.datepipe.transform(data.project_start_date,'yyyy/MM/dd');
    data.project_start_date=projectDate
    let projectendDate=this.datepipe.transform(data.project_end_date,'yyyy/MM/dd');
    data.project_end_date=projectendDate
    data.media=media
    data.highlights=highlights
    console.log(data, '===>')
    this.service.put( data,{project_id:this.projectId},`${API_ROUTES.Projects.updateProjects}`).pipe().subscribe((response)=>{
      if(response.success_code==200){
        const dialogRef = this.dialog.open(EditPopupComponent, {
          maxHeight: '100vh',
          width:'465px',
          panelClass:'yespost',
          data: {
            img:'../.assets/images/Icon.png',
            heading:'Are you sure you want to save this project?',
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
                heading:'Project Updated Successfully',
                title:'Please check your inbox and click in the recieved link to reset a password',
                btn:'Okay'
              }
              
            }
            );
            dialogRef.afterClosed().subscribe(result => {
              
              this.router.navigate(['/main/profile/projects'])
            });
           
          }
        });
      }

    })
}

getMachineDetails(){
  this.service.get({projectId:this.projectId},`${API_ROUTES.Projects.projectsDetail}`).pipe().subscribe((res)=>{
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
        // this.toastr.error(res.msg)
      }
      
  })
}
patchData() {
  this.projectForm.patchValue({
    media:this.interestName.Media,
    highlights:this.interestName.Highlights[0].highlight_desc,
    title:this.interestName.title,
    description:this.interestName.description,
    customer_name:this.interestName.customer_name,
    enter_quantity:this.interestName.enter_quantity,
    instruments:this.interestName.instruments,
    project_start_date:this.interestName.project_start_date,
    project_end_date:this.interestName.project_end_date ,
    is_live:this.interestName.is_live,
    machine_id:this.interestName.machine_id,
    instrument_id:this.interestName.instrument_id,
    is_starred:this.interestName.is_starred,

  });
}
getIndustry(){
  const params = {
    pageNO : 1,
    size : 5,
    type : 'machine'
  }
  this.service.get(params,`${API_ROUTES.Machine.machineList}`).pipe().subscribe((res)=>{
    this.data = res.result;
    console.log(this.data)
  })
  const instrudata = {
    pageNO : 1,
    size : 5,
    type : 'instrument'
  }
  this.service.get(instrudata,`${API_ROUTES.Machine.instrumentList}`).pipe().subscribe((res)=>{
    this.instrudata = res.result;
    console.log(this.instrudata)
  })
}

fix(id: any) {
  console.log(id.target.value);
  this.projectForm.value.machine_id =id;
  this.projectForm.value.industry_id=id;
  
}
// requirementDetail(data:any){
//   let dataToPost={
//     requirement_id:data//"a8ff6adf-3410-4437-bda5-694837abd86c"
//   }
//   this.service.get(dataToPost,API_ROUTES.MyRequirements.getRequirementDetail).pipe().subscribe((res=>{
//     console.log(res);
//     if (res.success) {
//       this.updateData = res.result;
//       this.images = this.updateData.Media.filter((element:any) => { if (element.media_type.includes("image")) return element});
//       this.videos = this.updateData.Media.filter((element:any) => { if (element.media_type.includes("video")) return element});
//       this.pdf = this.updateData.Media.filter((element:any) => { if (!element.media_type.includes("video") || !element.media_type.includes("image")) return element});
//     //   this.setData();
//     // this.setCustomfields();
      
      
//       // this.loader.start();
      
//     } else {
//       this.toastr.error(res.msg)
//     }
    
//   }))
// }
}
