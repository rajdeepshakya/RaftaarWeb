import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AnyNaptrRecord } from 'dns';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { CommonService } from 'src/app/services/common.service';
import { LocalStorageProvider } from 'src/app/services/storage/storage.service';
import { DeleteComponent } from 'src/app/shared/dialogs/delete/delete.component';

@Component({
  selector: 'app-profileprojects',
  templateUrl: './profileprojects.component.html',
  styleUrls: ['./profileprojects.component.scss']
})
export class ProfileprojectsComponent implements OnInit {
  cards=[
    {
    heading:'Unisense Digital Agency',
    min:'27 mins ago',
    para:"Boxboard is a simple and beautiful admin template with tons of flexible components",
    },
    {
      heading:'Unisense Digital Agency',
      min:'27 mins ago',
      para:"Boxboard is a simple and beautiful admin template with tons of flexible components",
      },
]
projectId: any;
myProfile:boolean = true;
constructor(private dialog :MatDialog,private service:ApiServicesService,private commonService:CommonService,
  private storageService:LocalStorageProvider,private activeRoute:ActivatedRoute, private storage:LocalStorageProvider, private router:Router) { }
interestName:any =[];
ngOnInit(): void {
  this.activeRoute.queryParams.subscribe((params) =>{
    this.projectId = params?.['id'];
    // console.log(this.machineId)
   
  })
  this.onUserList();
}

onUserList(){
  // let dataPost={
  //  size :'20'
  // }
  let params;
    if(this.storageService.getItem("currentUser") == "other"){
      this.myProfile = false;
      params = {
        id:this.storageService.getItem("currentUserId")
      }
    }
    else {
      this.myProfile = true;
      params = {}
    }
  this.service.get(params,`${API_ROUTES.Projects.projectsList}`).pipe().subscribe((res)=>{
    this.interestName = res.result;
    for(let i = 0;i<this.interestName.length;i++){
      let image = this.interestName[i].Media.find((element:any)=>element.media_type.toLowerCase().includes('image'))
    if(image){
      this.interestName[i].shapeImageUrl = image.url
    }
    else {
      this.interestName[i].shapeImageUrl='assets/images/placeholder-img.svg'
    }
  }
  })
}
onview(data:any){
  this.router.navigate(['main/profile/profile-project-detail'],{queryParams:{projectId:data}})

}
edit(id:any){
  this.router.navigate(['/main/profile/newProjects'],{queryParams:{id:id}})
  }



  projectDelete(id:any){
    const dialogRef=this.dialog.open(DeleteComponent,{
      maxHeight: '100vh',
      width:'400px',
      data: {
        img:'assets/images/Delete.png',
        heading:'Hey, do you really want to delete this product?',
        // para:'Lorem Ipsum is simply dummy text of the printing text of the printing. ',
        report:'Yes, delete',
        cancel:'Go back'
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      this.service.delete({project_id:id},`${API_ROUTES.Projects.deleteProject}`).pipe().subscribe((res)=>{
        if(res.success_code==201){
            this.onUserList();
          }
        
      })
    });
  }
  
  goBack(){
    this.commonService.goBack();
  }
}
