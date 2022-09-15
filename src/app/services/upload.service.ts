import { Injectable } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';
import { Observable } from 'rxjs';
import * as AWS from 'aws-sdk/global';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class UploadService {
  folder: any;
  constructor(private loader:NgxUiLoaderService,private toastr:ToastrService) {}

  bucket = new S3(
    {
      accessKeyId: 'AKIA3PJ3WDEOJ37ZDWWX',
      secretAccessKey: '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',
      region: 'ap-south-1'
    }
  );

  async uploadFile(fileToUpload: File) {
    let typeOfFile = fileToUpload.type;
    try {
      const params = {
        Bucket: 'raftaar-dev',
        Key: fileToUpload.name,
        Body: fileToUpload,
        ACL: 'public-read'
      };
      
      return new Promise((resolve, reject) => {
         this.loader.start();
        //  this.toastr.success("ABCD");
        this.bucket.upload(params, function (err: any, data: any) {
          if (err) {
            reject(err);
            return err;
          } else {
            resolve(data);
            data.type= typeOfFile;
            return data;
            
          }
        });
         this.loader.stop();
      });
    } catch (err:any) {
       this.toastr.error("An error was occured during image uploading")
      console.error(err.message);
       this.loader.stop();
    }
    finally {
    }
  }

  // deleteFile(file: FileUpload) {
  //   const params = {
  //     Bucket: this.BUCKET,
  //     Key: file.name
  //   };

  //   this.getS3Bucket().deleteObject(params, function (err, data) {
  //     if (err) {
  //       console.log('There was an error deleting your file: ', err.message);
  //       return;
  //     }
  //     console.log('Successfully deleted file.');
  //   });
  // }

  async deleteFile(fileToDelete: any) {
    let typeOfFile = fileToDelete.type;
    try {
      const params = {
        Bucket: 'raftaar-dev',
        Key: fileToDelete.Key
      };
      
      return new Promise((resolve, reject) => {
         this.loader.start();
        //  this.toastr.success("ABCD");
        this.bucket.deleteObject(params, function (err: any, data: any) {
          if (err) {
            reject(err)
            console.log('There was an error deleting your file: ', err.message);
            return;
          }
          resolve(data)
          console.log('Successfully deleted file.');
        });
         //this.loader.stop();
      });
    } catch (err:any) {
       this.toastr.error("An error was occured during image uploading")
      console.error(err.message);
       this.loader.stop();
    }
    finally {
    }
  }

}

