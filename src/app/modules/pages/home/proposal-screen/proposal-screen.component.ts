import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-proposal-screen',
  templateUrl: './proposal-screen.component.html',
  styleUrls: ['./proposal-screen.component.scss']
})
export class ProposalScreenComponent implements OnInit {
  files: any;
  constructor( 
    public upload:UploadService,
    private toastr:ToastrService,
    
    ) { }

  ngOnInit(): void {
  }
  fileupload(e: any) {
    if(this.files && this.files!= null && this.files !=undefined){
      this.toastr.error("More than 1 file is not allowed")
    }
    else{
      const selectedFile = e.target.files[0];
      this.uploadFile(selectedFile);
    }
    return false;

  }

  async uploadFile(selectedFile : any){
    let uploadedImage:any = await this.upload.uploadFile(selectedFile);
      if (uploadedImage) {
        console.log(uploadedImage);
        
        this.files=uploadedImage.Location
        
        
        return true;
      } else {
        return false;
      }
  }

  deleteImg(){
    this.files = undefined
  console.log(this.files);
  
  
}
}
