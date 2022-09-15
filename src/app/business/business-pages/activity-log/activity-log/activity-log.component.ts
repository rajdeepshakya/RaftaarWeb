import { Component, OnInit } from '@angular/core';
import { API_ROUTES } from 'src/app/core/_constants/api-route.constant';
import { ApiServicesService } from 'src/app/services/apiServices/api-services.service';
import { UploadService } from 'src/app/services/upload.service';
@Component({
  selector: 'app-activity-log',
  templateUrl: './activity-log.component.html',
  styleUrls: ['./activity-log.component.scss']
})
export class ActivityLogComponent implements OnInit {
  activityLog:any;
  activities:any=[
    {
      img: 'assets/images/box-tick.svg',
      name: 'You added a post',
      desc: 'Activity description', 
      date: '1222022'
    },
    {
      img: 'assets/images/box-tick.svg',
      name: 'You liked a comment',
      desc: 'Robert liked the post shared by Design Studios',
      date: 'Jan 22, 2022 at 1:30 PM '
    },
    {
      img: 'assets/images/box-tick.svg',
      name: 'You added requirement',
      desc: 'Stephan liked doctor comment',
      date: 'Jan 22, 2022 at 1:30 PM '
    },
    {
      img: 'assets/images/box-tick.svg',
      name: 'You added sales order',
      desc: 'Activity description', 
      date: 'Jan 22, 2022 at 1:30 PM '
    },
    {
      img: 'assets/images/box-tick.svg',
      name: 'You added purchase order',
      desc: 'Activity description', 
      date: 'Jan 22, 2022 at 1:30 PM '
    },
    {
      img: 'assets/images/box-tick.svg',
      name: 'You made a transaction',
      desc: 'Activity description', 
      date: 'Jan 22, 2022 at 1:30 PM '
    },
    {
      img: 'assets/images/box-tick.svg',
      name: 'You added exoenses',
      desc: 'Activity description', 
      date: 'Jan 22, 2022 at 1:30 PM '
    },
    {
      img: 'assets/images/box-tick.svg',
      name: 'You added product',
      desc: 'Activity description', 
      date: 'Jan 22, 2022 at 1:30 PM '
    }
  ]

  timePeriod: any = [
    {id: '1', period: 'This week' },
    {id: '2', period: 'This month' },
    {id: '3', period: 'This year' }
  ]

  logDate:any;
  noDataFound: boolean = false;
  constructor( public upload: UploadService, private service: ApiServicesService,) { }

  ngOnInit(): void {
    this.getActivitesLog();
    console.log(this.activities.date);
    this.logDate = new Date();
  }

  getActivitesLog() {

    this.service.get({}, `${API_ROUTES.ActivityLogs.logs}`).pipe().subscribe((res) => {
      if (res.success) {
        debugger
        console.log("Activity log ",JSON.stringify(res.result));
        this.activityLog = res.result;
      } 
      if(this.activityLog && (this.activityLog.length == 0 || this.activityLog==null)){
        this.noDataFound = true;
      }
    },(error)=>{
      this.noDataFound = true;
    }
    )
  }

  selectionChangePending(event:any) {

    console.log(event);
  }
}
