import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubjectserviceService } from 'src/app/services/subjectService/subjectservice.service';

@Component({
  selector: 'app-share-testimonial',
  templateUrl: './share-testimonial.component.html',
  styleUrls: ['./share-testimonial.component.scss']
})
export class ShareTestimonialComponent implements OnInit {
  open: any;
  comment: string;

  constructor( private subjectService:SubjectserviceService) { }

  ngOnInit(): void {
  }

  submitBtn() {
    this.subjectService.setNewUserInfo({
      comment: this.comment,
    });
  }
}
