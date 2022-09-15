import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private commonService:CommonService) { }

  ngOnInit(): void {
  }

  goBack(){
    this.commonService.goBack()
  }

}
